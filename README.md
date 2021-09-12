# Event app
#### Table of Contents  
[Frontend](#Frontend)  
[Server](#Server)

## Frontend
Simple frontend made with create-react-app and TypeScript.
Application is using "proxy" property inside package.json file to proxy request to the endpoint.
__Make sure you set proper env variable for event endpoint in .env.production before build.__
#### Env file
| variable | description
| ------ | ------ |
| REACT_APP_EVENT_API_URI | event endpoint uri |
#### .env.development file defaults
| variable | default
| ------ | ------ |
| REACT_APP_EVENT_API_URI | /api/events |
#### .env.production file defaults
| variable | default
| ------ | ------ |
| REACT_APP_EVENT_API_URI | /api/events |

#### Installation
Install dependencies
```
npm install
```
#### Starting app
Start app
```
npm start
```
#### Running tests
```
npm test
```
## Server
Simple event adding endpoint

### Technologies
Server is made with:
* TypeScript
* InversifyJs
* Express
* Mongoose

### Endpoints

| method | endpoint | description |
| ------ | ------ | ------ |  
| POST | /api/events | creating new event
| GET | /api/events | getting all events

#### API errors
All api errors have same structure
##### example error
```
{
   "message": "Missing 'firstName' field" 
}
```

#### [POST] /api/events request body
| field name | type | required |
| ------ | ------ | ------ |  
| firstName | string | true
| lastName | string | true
| emailAddress | string | true
| eventTimestamp | number | true


#### [POST] /api/events example request body
```
{
    "firstName": "first name",
    "lastName": "last name",
    "emailAddress": "example@domain.com",
    "eventTimestamp": 123436578
}
```
#### [POST] /api/events example response
```
{
    "id": "111111-4444-5555-6666-7777"
    "firstName": "first name",
    "lastName": "last name",
    "emailAddress": "example@domain.com",
    "eventTimestamp": 123436578
}
```
#### [GET] /api/events example response
```
[
    {
        "id": "111111-4444-5555-6666-7777"
        "firstName": "first name",
        "lastName": "last name",
        "emailAddress": "example@domain.com",
        "eventTimestamp": 123436578
    },
    {
        "id": "22222-4444-5555-6666-7777"
        "firstName": "first name2",
        "lastName": "last name2",
        "emailAddress": "example2@domain.com",
        "eventTimestamp": 1234365789
    }
]
```

### Requirements
Application will need some environment variables in order to start.
With docker-compose it will load them form file server/dev.env 
With manual installation you will need to set them before running npm commands

| variable | description
| ------ | ------ |
| PORT | server port |
| MONGODB_URI | connection string for mongo db for production |
| MONGODB_TEST_URI | connection string for mongo db for testing |

### Starting with Docker
By default, the Docker is exposing port 8080 and docker-compose is binding it to the same port on your local machine
#### MongoDb
docker-compose is building it's own service with MongoDb running. If you don't need it, comment out or remove it from docker-compose.yaml
Database port is binded to local machine at port __27018__
#### Env file
You can find file in server/env/dev.env
#### Env file defaults
| variable | default
| ------ | ------ |
| PORT | 8080 |
| MONGODB_URI | mongodb://root:example@mongodb:27017/events?authSource=admin |
| MONGODB_TEST_URI | mongodb://root:example@mongodb:27017/events-test?authSource=admin |

#### Starting server 
Start server using docker-compose inside /server directory
```
docker-compose up --build
```
#### Testing
Start server
```
docker-compose up --build
```
Run tests
```
docker exec -it event-api-container npm run test
```
### Starting manually
Install the dependencies
```
npm run install
```
In order to start server you will need to provide PORT and MONGODB_URI env parameters.

#### Linux
```
PORT=8080 MONGODB_URI=mongodb://user:password@ipaddress:port/database npm run dev
```
#### Windows cmd
```
set MONGODB_URI=mongodb://localhost:27017/event-api & set PORT=8888 && npm run dev
```
#### Testing
Install dependencies
```
npm install
```
Start test with provided MONGODB_TEST_URI env variable with Mongo connection string.
#### on Linux
```
MONGODB_URI=mongodb://localhost:27017/event-api-testing npm test
```

#### on Windows cmd
```
set MONGODB_URI=mongodb://localhost:27017/event-api-testing && npm test
```