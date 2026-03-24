# databas_projekt
Projekt till min databas kurs :)

## Rating app
An app where users can rate anything! Pondering on a nicer name for it lmao but "rating app" will do for now i guess. 

This is a database for the app I am wanting to develop as a hobby - 2 birds 1 stone am I right

Key elements:
- Users
- Categories (for the items that you can rate)
- Items
- Ratings

The rating app is here created as an express node.js webapp, unsure if this is what i will keep in the future becasue i want this to be avaliable as a mobile app, which i've never made before, but this is just a simplified mockup used to test the database

Database choice is MongoDB, since it works well with webapps due to JSON, as well as scalability if this app ends up popular with lots of users adding ratings and interacting with each other at the same time. Would be fun to add features such as comments in the future, which might end up being too much for an SQL database depending on amount of users

## How to run this application

1. Create a MongoDB Docker container
Prerequirements: Docker installed

 ``` docker pull mongo  ```

 ``` docker run -d -p 27017:27017 --name mongodb mongo:latest  ```

2. Create a .env file, following the .example.env

3.  ``` cd ./rating-app ```

4.  ``` npm i ```

5.  ``` npm start ```