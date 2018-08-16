CREATE TABLE `bird` (
  `birdID` int(11) NOT NULL AUTO_INCREMENT,
  `commonName` char(50) NOT NULL,
  `scientificName` char(50) NOT NULL,
  `description` text,
  `birdPic` char(100) DEFAULT NULL,
  `birdCall` char(100) DEFAULT NULL,
  PRIMARY KEY (`birdID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci