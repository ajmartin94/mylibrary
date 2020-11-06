# MyLibrary

## Project Intro
MyLibrary will be a full stack app designed to give users a place to create a virtual library. Users will be save books to a library, sort books into categories, find new options based on recommendations, and even find places where an audio or ebook version is available for free. 

## ERD
!['ERD image'](https://i.imgur.com/hpT1aSr.jpg)

## Wireframes
!['Homepage wireframe'](https://i.imgur.com/tNtWk80.png)

## User Stories
As an unregistered user, I want to browse the catalog of books
As an unregistered user, I want to be able to create a secure account
As a user, I want to be able to save books to my library
As a user, I want to be able to save books to different categories that I can label and control
As a user, I want to have books recommended to me that fit my interests

## MVP Goals
- Backend built on Python, Django, and PostgreSQL
- Frontend built on React, JavaScript, and Bootstrap
- Fully functional CRUD for bookshelfs
- Authentication and authorization for users
- Multiple libraries for users to add to
- Library visible to other users
- UI/UX simplicity with good accessibility

## Stretch Goals
- Bookshelf visualization with cover art
- Rating and commenting system for books
- Integrate other APIs to provide links/embed audio/eBook information
- Intelligent recommendation system in python

## Known/Expected Challenges
- Huge data. Strategy right now is to create a database with a minimal amount of data per book and expand when necessary. Using Open Library API for free book information. 
- Unfamiliar with Django. Confident it can be learned quickly but still a known challenge. 
