DROP DATABASE IF EXISTS itsago;

CREATE DATABASE itsago;

USE itsago;

DROP TABLE IF EXISTS `Participants`;
DROP TABLE IF EXISTS `Events`;
DROP TABLE IF EXISTS `Users`;

DROP TABLE IF EXISTS `Users`;
CREATE TABLE IF NOT EXISTS `Users` (`uuid` CHAR(36) BINARY , `firstname` VARCHAR(255) NOT NULL, `lastname` VARCHAR(255) NOT NULL, `email` VARCHAR(255) NOT NULL, `hash` VARCHAR(255), `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, PRIMARY KEY (`uuid`)) ENGINE=InnoDB;

DROP TABLE IF EXISTS `Events`;
CREATE TABLE IF NOT EXISTS `Events` (`id` INTEGER NOT NULL auto_increment , `event` VARCHAR(255) NOT NULL, `date` VARCHAR(255) NOT NULL, `notes` VARCHAR(255), `totalCost` DECIMAL NOT NULL, `maxCPP` DECIMAL NOT NULL, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, `UserUuid` CHAR(36) BINARY, PRIMARY KEY (`id`), FOREIGN KEY (`UserUuid`) REFERENCES `Users` (`uuid`) ON DELETE CASCADE ON UPDATE CASCADE) ENGINE=InnoDB;

DROP TABLE IF EXISTS `Participants`;
CREATE TABLE IF NOT EXISTS `Participants` (`id` INTEGER NOT NULL auto_increment , `name` VARCHAR(255) NOT NULL, `photoURL` VARCHAR(255) NOT NULL, `email` VARCHAR(255) NOT NULL, `stripeToken` VARCHAR(255) DEFAULT NULL, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, `EventId` INTEGER, PRIMARY KEY (`id`), FOREIGN KEY (`EventId`) REFERENCES `Events` (`id`) ON DELETE CASCADE ON UPDATE CASCADE) ENGINE=InnoDB;


INSERT INTO `Users` (`uuid`,`firstname`,`lastname`,`email`,`hash`,`createdAt`,`updatedAt`) VALUES ('0219a160-a3e2-11e7-916d-1b889dd9cd57','Will','Williams','will.wms@gmail.com','$2a$10$XIWbVYt3DMcYxGV.aFP47uB8RjAQmDmgNmxWJEtBSK7D4C5htLk4y','2017-09-28 00:14:35','2017-09-28 00:14:35');
INSERT INTO `Users` (`uuid`,`firstname`,`lastname`,`email`,`hash`,`createdAt`,`updatedAt`) VALUES ('7eea9a50-a3e2-11e7-916d-1b889dd9cd57','Jacque','White','jacquecwhite@gmail.com','$2a$10$Z.TmcLeviHTMfSE9DJ6TpuwOQ0zAL.o8buoOONOiBqaxBPbcxINsu','2017-09-28 00:18:04','2017-09-28 00:18:04');
INSERT INTO `Users` (`uuid`,`firstname`,`lastname`,`email`,`hash`,`createdAt`,`updatedAt`) VALUES ('a09a69a0-a3e2-11e7-916d-1b889dd9cd57','Jayme','Howard','jamiewithay@gmail.com','$2a$10$AB.9hV3uQdsp6P6Gz7bjG.NLkKQDxQl6uEIKvSDYjbCJCmA5rCpgy','2017-09-28 00:19:01','2017-09-28 00:19:01');
INSERT INTO `Users` (`uuid`,`firstname`,`lastname`,`email`,`hash`,`createdAt`,`updatedAt`) VALUES ('bc0107d0-a3e2-11e7-916d-1b889dd9cd57','John','Torrence','torrencj@gmail.com','$2a$10$31gyK2NMTyUqWY.2A03U7.MCJKKxlR0Da1/6fPatdi6JmB6Rp89KG','2017-09-28 00:19:47','2017-09-28 00:19:47');
INSERT INTO `Users` (`uuid`,`firstname`,`lastname`,`email`,`hash`,`createdAt`,`updatedAt`) VALUES ('e5b9b9a0-a3e2-11e7-916d-1b889dd9cd57','Mariana','Perez','mariana_pt3@hotmail.com','$2a$10$kKDs/a5Qc9ivM7pcDisLJ.uI5nAjcotn9F9xeAUS/x2ScchEfJaPO','2017-09-28 00:20:57','2017-09-28 00:20:57');

INSERT INTO `Events` (`id`,`event`,`date`,`notes`,`totalCost`,`maxCPP`,`createdAt`,`updatedAt`,`UserUuid`) VALUES (DEFAULT,'Folsom Street Festival','2018-09-21','Bring sunscreen!','600.00','75.00','2017-09-28 01:32:22','2017-09-28 01:32:22','0219a160-a3e2-11e7-916d-1b889dd9cd57');
INSERT INTO `Events` (`id`,`event`,`date`,`notes`,`totalCost`,`maxCPP`,`createdAt`,`updatedAt`,`UserUuid`) VALUES (DEFAULT,'Cat Party','2017-09-27','Bring wine!','50.00','5.00','2017-09-28 01:34:10','2017-09-28 01:34:10','7eea9a50-a3e2-11e7-916d-1b889dd9cd57');
INSERT INTO `Events` (`id`,`event`,`date`,`notes`,`totalCost`,`maxCPP`,`createdAt`,`updatedAt`,`UserUuid`) VALUES (DEFAULT,'Vegetarian BBQ','2017-09-29','No tempeh, plz!','200.00','25.00','2017-09-28 01:36:31','2017-09-28 01:36:31','bc0107d0-a3e2-11e7-916d-1b889dd9cd57');
INSERT INTO `Events` (`id`,`event`,`date`,`notes`,`totalCost`,`maxCPP`,`createdAt`,`updatedAt`,`UserUuid`) VALUES (DEFAULT,'Party at the Millenium','2017-09-30','Pretend we live here...','150.00','40.00','2017-09-28 01:38:11','2017-09-28 01:38:11','e5b9b9a0-a3e2-11e7-916d-1b889dd9cd57');
