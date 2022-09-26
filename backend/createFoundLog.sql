CREATE TABLE `foundLog` (
  `id` int NOT NULL AUTO_INCREMENT,
  `duckId` int NOT NULL,
  `date` datetime NOT NULL,
  `ip` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=ascii;
