-- MODO Screen Truck: bookings database for Supabase (Postgres).
-- Run this whole file once in Supabase → SQL Editor.
-- Then add the owner's email to public.admins (last lines).

-- ─────────────────────────────── tables ───────────────────────────────
create table if not exists public.admins (
  email text primary key
);

create table if not exists public.bookings (
  id               text primary key,                       -- reference shown to the customer, e.g. MODO-7K2QD
  plan             text not null check (plan in ('whole','shared','event')),
  shift            text not null check (shift in ('morning','evening','full')),
  hours            int  check (hours in (4,8,10)),          -- event bookings only
  live_film        boolean not null default false,
  dates            date[] not null check (cardinality(dates) between 1 and 120),
  outside_tricity  boolean not null default false,
  creative         text not null default 'own' check (creative in ('own','modo')),
  business         text not null check (length(business) between 1 and 200),
  contact          text check (length(contact) <= 200),
  phone            text not null check (length(phone) between 10 and 20),
  email            text check (length(email) <= 200),
  areas            text[] not null default '{}',
  notes            text check (length(notes) <= 2000),
  status           text not null default 'new_request'
                   check (status in ('new_request','pending','awaiting_payment','confirmed','cancelled')),
  -- filled in by the database from the private rate card, never by the browser
  list_rate        numeric,
  est_subtotal     int,
  est_total        int,
  custom_quote     boolean not null default false,
  created_at       timestamptz not null default now()
);

create index if not exists bookings_dates_idx on public.bookings using gin (dates);

-- ─────────────────────────────── helpers ───────────────────────────────
create or replace function public.is_admin() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from admins where email = auth.jwt() ->> 'email');
$$;

-- Which date+shift slots a booking occupies ('full' and events take both shifts).
create or replace function public.booking_slots(b_plan text, b_shift text, b_dates date[])
returns table(day date, shift text) language sql immutable as $$
  select d, s
  from unnest(b_dates) as d,
       unnest(case when b_plan = 'event' or b_shift = 'full' then array['morning','evening'] else array[b_shift] end) as s;
$$;

-- Private rate card (excl. GST). Mirrors the MODO price list; edit here, not in the website.
create or replace function public.rate_for(b_plan text, b_shift text, n int)
returns numeric language sql immutable as $$
  select case
    when b_plan = 'whole'  and b_shift = 'morning' then 11000
    when b_plan = 'whole'  and b_shift = 'evening' then 16500
    when b_plan = 'whole'  and b_shift = 'full' and n >= 26 then 16000
    when b_plan = 'whole'  and b_shift = 'full' and n >= 6  then 20000
    when b_plan = 'whole'  and b_shift = 'full' then 25000
    when b_plan = 'shared' and b_shift = 'morning' then 1300
    when b_plan = 'shared' and n >= 26 then 38000.0/26
    when b_plan = 'shared' and n >= 6  then 1750
    when b_plan = 'shared' then 2000
  end;
$$;

-- ─────────────────── rules checked on every new booking ───────────────────
create or replace function public.bookings_before_insert() returns trigger
language plpgsql security definer set search_path = public as $$
declare
  n int := cardinality(new.dates);
  sub numeric;
  clash record;
begin
  -- one booking at a time per slot, so two people can't grab the same shift at once
  perform pg_advisory_xact_lock(hashtext('modo-bookings'));

  if exists (select 1 from unnest(new.dates) d where extract(isodow from d) = 1) then
    raise exception 'closed_day: the truck does not run on Mondays';
  end if;
  if exists (select 1 from unnest(new.dates) d where d < (now() at time zone 'Asia/Kolkata')::date + 2) then
    raise exception 'too_soon: earliest booking is 2 days out';
  end if;
  if new.plan = 'event' and n <> 1 then
    raise exception 'event bookings are for one date';
  end if;
  if new.plan = 'shared' and new.shift = 'full' then
    raise exception 'shared shifts are morning or evening';
  end if;

  -- clashes with existing active bookings
  for clash in
    select ns.day, ns.shift,
           count(*) filter (where b.plan <> 'shared') as exclusive,
           count(*) filter (where b.plan = 'shared')  as shared
    from booking_slots(new.plan, new.shift, new.dates) ns
    join bookings b on b.status <> 'cancelled'
    join lateral booking_slots(b.plan, b.shift, b.dates) bs on bs.day = ns.day and bs.shift = ns.shift
    group by ns.day, ns.shift
  loop
    if clash.exclusive > 0
       or (new.plan <> 'shared' and clash.shared > 0)
       or (new.plan = 'shared' and clash.shared >= 6) then
      raise exception 'slot_taken: % %', clash.day, clash.shift;
    end if;
  end loop;

  -- private estimate, for the owner's view only
  if new.plan = 'event' then
    sub := case new.hours when 4 then 18000 when 8 then 28000 when 10 then 34000 end
           + case when new.live_film then 8000 else 0 end;
    new.list_rate := null;
  else
    new.list_rate := rate_for(new.plan, new.shift, n);
    sub := new.list_rate * n;               -- shared: share at a full 6-brand shift
  end if;
  new.est_subtotal := round(sub);
  new.est_total    := round(sub * 1.18);
  new.custom_quote := new.plan <> 'event' and n > 7;
  new.status       := case when new.plan = 'shared' then 'pending' else 'new_request' end;
  new.created_at   := now();
  return new;
end $$;

drop trigger if exists bookings_before_insert on public.bookings;
create trigger bookings_before_insert before insert on public.bookings
  for each row execute function public.bookings_before_insert();

-- ─────────── what the public calendar can see: slots only, no names ───────────
create or replace function public.get_slot_usage()
returns table(day date, shift text, plan text, status text)
language sql stable security definer set search_path = public as $$
  select bs.day, bs.shift, b.plan, b.status
  from bookings b
  cross join lateral booking_slots(b.plan, b.shift, b.dates) bs
  where b.status <> 'cancelled'
    and bs.day >= (now() at time zone 'Asia/Kolkata')::date;
$$;

-- For the calendar, a "full" or event booking is reported per shift, so the page treats each row as one slot.
-- (The page maps each row to {plan, shift, dates:[day]}.)

-- ─────────────────────────────── access rules ───────────────────────────────
alter table public.bookings enable row level security;
alter table public.admins   enable row level security;

drop policy if exists "anyone can send a booking request" on public.bookings;
create policy "anyone can send a booking request" on public.bookings
  for insert to anon, authenticated with check (true);

drop policy if exists "admins read bookings" on public.bookings;
create policy "admins read bookings" on public.bookings
  for select to authenticated using (public.is_admin());

drop policy if exists "admins update bookings" on public.bookings;
create policy "admins update bookings" on public.bookings
  for update to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists "admins delete bookings" on public.bookings;
create policy "admins delete bookings" on public.bookings
  for delete to authenticated using (public.is_admin());

-- no policies on admins: only the SQL editor / service role can change who is an admin

revoke all on function public.get_slot_usage() from public;
grant execute on function public.get_slot_usage() to anon, authenticated;
grant execute on function public.is_admin() to anon, authenticated;

-- ─────────────────────────────── owner access ───────────────────────────────
insert into public.admins (email) values ('modovisuals@gmail.com') on conflict do nothing;
