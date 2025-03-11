CREATE DATABASE todo_db;

USE todo_db;
CREATE TABLE task (
  id int primary key auto_increment,
  description varchar(255) not null
);

INSERT into task (description) values ('My first task');
INSERT into task (description) values ('My second task');