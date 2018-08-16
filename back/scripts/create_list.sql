CREATE TABLE `list` (
  `listID` int(11) NOT NULL AUTO_INCREMENT,
  `listElement` int(11) NOT NULL,
  `listElementRank` int(11) DEFAULT NULL,
  PRIMARY KEY (`listID`),
  KEY `birdID_idx` (`listElement`),
  CONSTRAINT `fkBirdIDListElement` FOREIGN KEY (`listElement`) REFERENCES `bird` (`birdid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci