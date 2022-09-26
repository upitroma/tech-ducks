CREATE TABLE `names` (
  `id` int NOT NULL,
  `name` varchar(200) NOT NULL,
  `originalLocation` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=ascii;
