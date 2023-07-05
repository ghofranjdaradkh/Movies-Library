create table   if not exists moviesdata(
  id serial primary key,
title varchar(200),
 release_date date,
  overview varchar(1000),
  comment varchar(300)
);

