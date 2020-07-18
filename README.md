# Flashcard Server

> A simple web server to create and share flashcards.

Live demo \
Server: [http://fcapi.herokuapp.com/api/v1/](http://fcapi.herokuapp.com/api/v1/)

---

## Installation

### Prerequisites:

+ NodeJS
+ NPM
+ MongoDB

### Installation steps:

#### Option 01: docker-compose
+ cp .env.example .env
+ fill the .env file in with proper credentials for docker environment
+ docker-compose up --build

#### Option 02: Regular installation
+ npm install
+ cp .env.example .env
+ fill the .env file in with proper credentials
+ npm run dev
