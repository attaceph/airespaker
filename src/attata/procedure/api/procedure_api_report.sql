/*
 * Copyright (c) 2026 Dinh Thoai Tran <attaceph@protonmail.com>
 * All rights reserved.
 *
 * License: GPL v.2
 * Source: https://github.com/attaceph/airespaker
 *
 */

drop procedure if exists report;
delimiter $$
create procedure report ()
sql security definer
begin
  declare v_start_date varchar(256);
  declare v_week_start int;

  set v_start_date = '2026-07-17';
  set v_week_start = 0; -- Monday
  set v_week_start = 1; -- Sunday
  set v_week_start = 2; -- Saturday
  set v_week_start = 0;

  select date(`created`) as `date`, count(`id`) as `register_count_day` from `ara_users` where date(`created`) >= v_start_date group by date(`created`) order by date(`created`) desc;

  select date(`created`) as `date`, count(`id`) as `responses_count_day` from `ara_responses` where date(`created`) >= v_start_date group by date(`created`) order by date(`created`) desc;

  select date(r.`created`) as `date`, u.`username` as `username`, count(r.`id`) as `responses_count_day` from `ara_responses` r, `ara_users` u where r.`user_id` = u.`id` and date(r.`created`) >= v_start_date group by date(r.`created`), u.`username` order by date(r.`created`) desc;

  select date(`created` - interval (dayofweek(`created`) - v_week_start) day) as `date`, count(`id`) as `register_count_week` from `ara_users` where date(`created`) >= v_start_date group by date(`created` - interval (dayofweek(`created`) - v_week_start) day) order by date(`created` - interval (dayofweek(`created`) - v_week_start) day) desc;

  select date(`created` - interval (dayofweek(`created`) - v_week_start) day) as `date`, count(`id`) as `responses_count_week` from `ara_responses` where date(`created`) >= v_start_date group by date(`created` - interval (dayofweek(`created`) - v_week_start) day) order by date(`created` - interval (dayofweek(`created`) - v_week_start) day) desc;

  select date(r.`created` - interval (dayofweek(r.`created`) - v_week_start) day) as `date`, u.`username` as `username`, count(r.`id`) as `responses_count_week` from `ara_responses` r, `ara_users` u where r.`user_id` = u.`id` and date(r.`created`) >= v_start_date group by date(r.`created` - interval (dayofweek(r.`created`) - v_week_start) day), u.`username` order by date(r.`created` - interval (dayofweek(r.`created`) - v_week_start) day) desc;

  select date(`created`) as `date`, `username` as `username` from `ara_users` where date(`created`) >= v_start_date order by `created` desc;

end;$$
delimiter ;