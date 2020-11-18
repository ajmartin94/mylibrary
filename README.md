# MyLibrary

## Project Intro
MyLibrary is a full stack app designed to give users a place to create a virtual library. Users can save books to a library, make multiple libraries, view other users' library collections, and even rate any book in their library. 

## Technology Used
- React, Styled Components, Bootstrap
- React-Bootstrap, React Router, Axios
- Python, Django, Django Rest Framework
- Django CORS, SimpleJWT

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
- Backend built on Python, Django, and PostgreSQL - *Complete*
- Frontend built on React, JavaScript, and Bootstrap - *Complete*
- Fully functional CRUD for bookshelfs - *Complete*
- Authentication and authorization for users - *Complete*
- Multiple libraries for users to add to - *Complete*
- Library visible to other users - *Complete*
- UI/UX simplicity with good accessibility - *Complete*

## Stretch Goals
- Bookshelf visualization with cover art - *Complete*
- Rating and commenting system for books - *Rating system complete*
- Integrate other APIs to provide links/embed audio/eBook information - *Future feature*
- Intelligent recommendation system in python - *Future feature*

## Known/Expected Challenges
- Huge data. Strategy right now is to create a database with a minimal amount of data per book and expand when necessary. Using Open Library API for free book information. 
- Unfamiliar with Django. Confident it can be learned quickly but still a known challenge. 
