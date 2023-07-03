create table   if not exists moviesdata(
  id serial primary key,
title varchar(200),
 release_date date,
  original_language varchar(200),
  overview varchar(1000),
  comment varchar(300)
);

