/*
Skapar en databas för en rating app
Av: Aaren Bertilsson YH25
*/

/*
 TODO: maybe i wanna make this as a nosql instead?? likee mongoDB? 
 idk what would be best - should look into it
 */

CREATE DATABASE RatingApp;

USE RatingApp;

-- User tabell
CREATE TABLE User (
UserID INT AUTO_INCREMENT PRIMARY KEY,
Username VARCHAR(100) NOT NULL UNIQUE,
Nickname VARCHAR(100) NOT NULL,
Pronouns VARCHAR(100) NOT NULL,
Mail VARCHAR(255) NOT NULL UNIQUE,
Bio VARCHAR (255) NOT NULL,
ImageURL VARCHAR (255),
HashedPassword VARCHAR (255) NOT NULL,
);
