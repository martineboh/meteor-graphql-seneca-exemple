# Meteor/Senecajs/Grapqhl exemple

This exemple showcase the integration of microservices with [SenecaJS](http://senecajs.org/) and [MeteorJS](https://www.meteor.com/) by exposing a [GraphQL](http://graphql.org/) endpoint with the help of the new library [ApolloStack](http://www.apollostack.com/)

## Installation

Install meteor `curl https://install.meteor.com/ | sh`

Clone the repo 

`git clone https://github.com/Vanahe/meteor-graphql-seneca-exemple.git && cd meteor-graphql-seneca-exemple`

Install npm dependencies `meteor npm install`




## Usage

Run the application `meteor`

Visit the app at [http://localhost:4000/graphql](http://localhost:4000/graphql)

Sample query
```
{
	hello(name: "World")
}
```

will return
```
{
  "data": {
    "hello": "Hello, World!"
  }
}
```
