CREATE TABLE `userlistxref` (
  `xrefID` int(11) NOT NULL AUTO_INCREMENT,
  `userID` int(11) NOT NULL,
  `listID` int(11) NOT NULL,
  PRIMARY KEY (`xrefID`),
  KEY `userID_idx` (`userID`),
  KEY `listID_idx` (`listID`),
  CONSTRAINT `fkListIDXref` FOREIGN KEY (`listID`) REFERENCES `list` (`listid`),
  CONSTRAINT `fkUserIDXref` FOREIGN KEY (`userID`) REFERENCES `user` (`userid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci