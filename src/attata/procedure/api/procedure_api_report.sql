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

  select date(`created`) as `date`, count(`id`) as `register_count_day` from `ara_users` where date(`created`) >= v_start_date group by date(`created`) order by date(`created`) desc;

  select date(`created`) as `date`, count(`id`) as `responses_count_day` from `ara_responses` where date(`created`) >= v_start_date group by date(`created`) order by date(`created`) desc;

  select date(`created` - interval (dayofweek(`created`) - v_week_start) day) as `date`, count(`id`) as `register_count_week` from `ara_users` where date(`created`) >= v_start_date group by date(`created` - interval (dayofweek(`created`) - v_week_start) day) order by date(`created` - interval (dayofweek(`created`) - v_week_start) day) desc;

  select date(`created` - interval (dayofweek(`created`) - v_week_start) day) as `date`, count(`id`) as `responses_count_week` from `ara_responses` where date(`created`) >= v_start_date group by date(`created` - interval (dayofweek(`created`) - v_week_start) day) order by date(`created` - interval (dayofweek(`created`) - v_week_start) day) desc;

end;$$
delimiter ;