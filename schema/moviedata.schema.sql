create table   if not exists moviedata(
  id serial primary key,
title varchar(200),
 poster_path varchar(300),
 release_date date ,
  overview varchar(1000),
  comment varchar(300)
);

