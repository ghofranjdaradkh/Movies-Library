create table   if not exists moviesdata(
  id serial primary key,
title varchar(200),
author varchar(200),
 release_date date,
  original_language varchar(200),
  Genre varchar(200),
  overview varchar(1000),
  Main_cast varchar(500),
  Awards varchar(500),
  comment varchar(300)
);