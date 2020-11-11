## React Secure
MERN stack implementation of Json Web Token Authentication

### Technologies
* Mongo DB
* Express JS
* React JS
* Node JS
* Json Web Token

### Overview
* Hash/Salt based user authentication, impossible to leak a user's password even if database compromised
* Json Web Token for current user session authentication
* Automatic redirect to login from routes requiring authentication

### Improvements / Stretch Goals
* Use current user's browser and ip information to generate more secure json web token in order to combat session hijacking
* Enforce password standards to avoid users registering with vulnerable passwords



## Demos

### Register
![Register Demo](https://github.com/chasekov/react-secure/blob/master/docs/sign_up.gif)

### Login 
![Login Demo](https://github.com/chasekov/react-secure/blob/master/docs/login.gif)


## How To Use

1. Pull the repository
2. Set up environment file for react-secure-api directory, example file contents for "./react-secure-api/.env" below
```
JWT_SECRET=ABCDEF$123
MONGO_HOST=mongodb+srv://username:password@host/db
```
3. Set up environment file for react-secure-web, example file contents for "./react-secure-web/.env" below
```
REACT_APP_API_HOST = 'http://localhost:3001'
```
4. Start react-secure-api
```
cd ./react-secure-api
npm start
```
5. Start react-secure-web
```
cd ./react-secure-web
yarn start
```
