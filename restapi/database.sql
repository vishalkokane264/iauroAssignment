CREATE USER vishal IDENTIFIED BY 'Vishal@12';
GRANT ALL PRIVILEGES ON *.* to vishal;

CREATE DATABASE test;
USE test;

CREATE TABLE `user`(
	`id` int NOT NULL,
	`name` varchar(20) NOT NULL,
	`age` int NOT NULL,
	`department` varchar(20) NOT NULL,
	`subject` varchar(20) NOT NULL
	)ENGINE=InnoDB DEFAULT CHARSET=latin1;
	
insert into user values(1,'Vishal',25,'computer','cs');
