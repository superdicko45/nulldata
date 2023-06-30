-- nulldata.empleados definition

CREATE TABLE `empleados` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `puesto` varchar(255) NOT NULL,
  `fecha_nacimiento` datetime NOT NULL,
  `domicilio` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;


-- nulldata.empleado_skills definition

CREATE TABLE `empleado_skills` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `empleado_id` int(11) DEFAULT NULL,
  `nombre` varchar(100) DEFAULT NULL,
  `calificacion` int(3) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `empleado_idx` (`empleado_id`),
  CONSTRAINT `empleados_fk` FOREIGN KEY (`empleado_id`) REFERENCES `empleados` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4;


INSERT INTO empleados (nombre,email,puesto,fecha_nacimiento,domicilio) VALUES
	 ('Mauricio','mau@mail.com','Dev','2023-12-05 00:00:00',NULL),
	 ('Emmanuel','ema@mail.com','Dev','2023-12-05 00:00:00',NULL),
	 ('Mauasd','asd@mail.com','asdasd','1970-01-01 00:00:00','asdasd'),
	 ('Mauasd','asdl@mail.com','asdasd','1970-01-01 00:00:00','asdasd'),
	 ('Kevin Israel','mail2@mail2.com','Developer','2023-05-05 00:00:00','San rafael');
	 

INSERT INTO empleado_skills (empleado_id,nombre,calificacion) VALUES
	 (1,'PHP',5),
	 (1,'MYSQL',3),
	 (1,'JS',5),
	 (5,'PHP',5),
	 (5,'MYSQL',4),
	 (4,'PHP',5),
	 (4,'MYSQL',3);