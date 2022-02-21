## Tipaw Test Backend
This is Node.js backend api for Tipaw Test.

## Install

**Postgres**  
This project requires Postgres to be installed and running

After installing the PostgreSQL, create new database named `tipaw` and change the username and password in `.env` file with your credential.

**Project Specific Dependencies**  
To install this project for first use run:
```sh
yarn install
```   

## Launch
Run the backend app
```sh
yarn dev
```
Access API at: http://domain:5000/

## Project Structure
```
backend
├── config
|  └── config.js
├── migrations
├── seeders
├── src
|  └── controllers
|  |      └── controller files
|  └── middlewares
|  |      └── middleware files
|  └── models
|  |      └── model files
|  └── routes
|  |      └── routes files
|  └── services
|  |      └── service files
|  └── index.js
└── test
