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

The rating app is here created as an express node.js webapp, unsure if this is what i will keep in the future becasue i want this to be avaliable as a mobile app, which i've never made before, but this is just a simplified mockup used to test the database. Please note that is why it looks kida ugly, it is just intended to test the functionality I've worked on.

Database choice is MongoDB, since it works well with webapps due to JSON, as well as scalability if this app ends up popular with lots of users adding ratings and interacting with each other at the same time. Would be fun to add features such as comments in the future, which might end up being too much for an SQL database depending on amount of users

Functionalities I would like to add in the future (that I didn't have the time for during this assignment, since I haven't used genai to generate any of this code)  
- Ability to follow other users
- Ability to like ratings, and also leave comments
- Sorting & search functions (for categories, items & ratings)

Thanks to using MongoDB and the current database constructions all of these functions should be relatively easy to implement.

## How to run this application

1. Create a MongoDB Docker container
Prerequirements: Docker installed

 ``` docker pull mongo  ```

 ``` docker run -d -p 27017:27017 --name mongodb mongo:latest  ```

2. Create a .env file, following the .example.env

3.  ``` cd ./rating-app ```

4.  ``` npm i ```

5.  ``` npm start ```