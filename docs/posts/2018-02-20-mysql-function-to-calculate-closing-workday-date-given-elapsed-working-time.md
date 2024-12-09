---
title: MySQL Function to calculate closing WorkDay date given elapsed working time
slug: mysql-function-to-calculate-closing-workday-date-given-elapsed-working-time
date: 
  created: 2018-02-20 20:29:30
  updated: 2018-03-29 15:37:54
draft: False
description: MySQL Function to calculate closing WorkDay date given elapsed working time
authors: ['ankit']
comments: false
bsky: true
categories:
  - SQL
  - Development
---

On my post [MySQL function to calculate elapsed working time](./2016-07-19-mysql-function-to-calculate-elapsed-working-time.md) I was asked in comments if the assumptions can be reversed such that given start date, starting time and closing time of site and the elapsed working hours, function should return the closed date. I was convinced that it will be possible to achieve this with minor tweaks to original logic and so I only concentrated on original code and how to tweak it to achieve the result. It is very likely that there might exist a more elegant solution but ~~frankly I did not have a usecase~~ I did find a [usecase](#example-of-problem) afterall - Clue was in redefining the problem description for this. Presented below is the function that with my minimal testing seems to give correct results. Feel free to try it and as always any feedback is welcome. :smile:

## Problem Description:

Find out the WorkDay date by when a ticket must be closed given:

1.  Country of site for which incident was logged.
2.  Time and Date when Incident was logged.
3.  Elapsed working hours in decimal. (Ten and a half hours as 10.5 and     so on)
4.  Opening time of the site for which the incident was logged.
5.  Closing Time of the site for which incident was logged.
6.  SLA Type - Is the output date to be based purely on number of hours or based on SLA in days (eg: Next Business Day).

!!! question "Assumption"
	It is assumed that opening and closing times are same on all working days and that all the sites are closed on holidays and weekends.

<!-- more -->

### Example of problem

Let's say an incident was logged on "Friday 23rd Feb 2018 at 15:00" for a site in the "UK" which opens between 08:00 to 16:00. Now if the SLA is purely based on hours i.e. Tickets must be closed withing 16 hours then for the above incident function should calculate the closing date as: 

`2018-02-27 15:00` = 1 hour on Friday, then skip Saturday and Sunday, 8 hours on Monday and 7 hours on Tuesday the 27th of Feb 2018. However, if the SLA is based on number of days, then 16 hours will translate to an SLA of next business day hence in this case function should return `2018-02-26 16:00` which is a Monday end of day and the next business day for this incident. The use case really is in creating a report that shows the target closed date based on SLA. Specifically Next Business Day SLA, which isn't direct hours calculation and is really always the next working day but based on cut-off time when the call is logged. So a call logged on a working day 1 after cut-off will be counted as logged on working day 2 and hence will need to be closed by working day 3 whereas a call logged within cut-off of working day 1 will need to be closed by close of business working day 2. This is turn can allow for a comparison between Target Closed Date from this function and Actual Closed Date to show SLA failures where Actual Closed Date is greater than Target Closed Date. 

## Pre-Requisites:

Follow from [previous post](2016-07-19-mysql-function-to-calculate-elapsed-working-time.md)

## Function code and explanation

```sql linenums="1"
CREATE DEFINER=`ankit`@`%` FUNCTION `get_closed_date_given_start_time`(
	`param_country` VARCHAR(20),
	`assigneddatetime` VARCHAR(20),
	`param_elapsedhours` VARCHAR(10),
	`starttime` VARCHAR(20),
	`endtime` VARCHAR(20),
	`sla_type` VARCHAR(10)

)
RETURNS TEXT
LANGUAGE SQL
NOT DETERMINISTIC
CONTAINS SQL
SQL SECURITY DEFINER
COMMENT ''
BEGIN
Set @starttime = starttime;
Set @endtime = endtime;
Select time_to_sec(timediff(@endtime,@starttime))/3600 into @maxhoursaday;
Set @assigneddate = assigneddatetime;  
Set @timecount = param_elapsedhours;
Set @timevar1 = @assigneddate;
Set @nextdate = @assigneddate;
Set @timevar2 = null;
Set @param_country = param_country;
############ Check if the assigned time was before the starttime or closed time was after the endtime provided #############
Set @checkstart = null;
Set @checkend = null;
Set @slatype = sla_type;

Select CONCAT(SUBSTRING_INDEX(@assigneddate, ' ', 1), ' ',@starttime),
CONCAT(SUBSTRING_INDEX(@assigneddate, ' ', 1), ' ',@endtime)  into @checkstart, @checkend;

if (@slatype = 'H') then
	if (@assigneddate < @checkstart) then
		SET @nextdate = @checkstart;    
	end if;
else
	if (@assigneddate < @checkend) then
		SET @nextdate = @checkstart;
	end if;
end if;

Set @count = @timecount;
while @count>0 do 
	select weekday(@nextdate) into @weekday; # Assign the weekday value to @weekday. Weekday returns o for Monday, 2 for Tuesday ...5 for Saturday and 6 for Sunday
	 Select sum(if(date_format(holiday_date,'%Y-%m-%d') = substring_index(@nextdate,' ',1),1,0)) from holiday_table 
	 where Country_codes = 'ALL' or instr(Country_codes,@param_country)>0
	 into @holidayflag; #Check if the date stored in nextdate (which is assigneddate on first run of while loop) is a holiday and set the holiday flag
	if ( @weekday<5 and @holidayflag=0) then #Proceed if the date in nextdate variable is neither weekend nor a holiday
		if (@count = @timecount) then #Check if it is first run.ie. if nextdate is assigneddate
			Set @timevar1 = @nextdate; #assign assigndate to variable timevar1
			SELECT CONCAT(SUBSTRING_INDEX(@nextdate, ' ', 1), ' ',@endtime) INTO @timevar2;#get site closing time on assigned date and store it on to timevar2
		else
			Select CONCAT(substring_index(@nextdate,' ',1),' ',@starttime) into @timevar1;
			SELECT CONCAT(substring_index(@nextdate,' ',1), ' ', @endtime) INTO @timevar2;
		end if;
		SELECT LEAST(Greatest(((TIME_TO_SEC(TIMEDIFF(@timevar2, @timevar1))) / 3600),0),@maxhoursaday) INTO @timecounttemp;   
		Set @count = @count - @timecounttemp;
	end if;
	
	if @count > 0 then
	 Select adddate(concat(substring_index(@nextdate,' ',1),' ',@starttime),1) INTO @nextdate;
	 else
	 Select SUBSTRING_INDEX(@nextdate, ' ', 1) INTO @nextdate;
   end if;
end while;
Set @finaldate = null;
Select concat(@nextdate,' ',substring_index(addtime(@endtime,sec_to_time(3600*@count)),':',2)) INTO @finaldate;
RETURN @finaldate;

END
```

## Calling the function

Function will expect 6 parameters and with specific format as explained below:

  - param_country - This is the country code as specified in holiday table
  - assigneddatetime - This must be provided in the format `%Y-%m-%d %H-%i-%s`. So for our example it will be 2018-02-23 15:00:00
  - param_elapsedhours - This must be provided in decimal hours format.
      - Bear in mind that if SLA Type is not H, you need to understand the number of working hours in allowed number of days in SLA. So for 8 working hours in a day:
          - Same day SLA will have 8 hours
          - Next Business Day will have 16 hours(2 times 8)
          - A 2 day SLA will have 24 hours
          - and so on
  - starttime - This must be in the format `%H:%i`. So for our example it will be 08:00
  - endtime - This must be in the format `%H:%i`. So for our example it will be 16:00
  - sla_type - This must be 'H' if the sla is based on hours or anything else (say 'D') if SLA is based on days.

The call for this function will be as below: 

For Hours SLA:

```sql
Select get_closed_date_given_start_time('ALL','2018-02-23 15:00:00','16','08:00','16:00','H'); --(1)
```

1. This will give an output of `2018-02-27 15:00` 

For Next Business Day SLA:

```sql
Select get_closed_date_given_start_time('ALL','2018-02-23 15:00:00','16','08:00','16:00','D'); --(1)
```

1. This will give an output of `2018-02-26 16:00` 

For just calculating next working day date given number of hours:

```sql
Select get_closed_date_given_start_time('ALL','2018-02-23 15:00:00','10.5','08:00','16:00','H'); --(1)
```

1. This will give an output of `2018-02-27 09:30`
