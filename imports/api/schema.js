import Promise from 'bluebird';
import Seneca from 'seneca';
import test from '../services/test'; //Test senecajs Plugin

const SENECA_HOST = 'localhost';
const SENECA_PORT = 4050;
const SENECA_OPTIONS = {
  host: SENECA_HOST,
  port: SENECA_PORT
};

//Instanciate SenecaJS
const seneca = Seneca();

//Register "test" plugin (from services folder)
seneca.use(test, {});

seneca.listen(SENECA_OPTIONS);

//Define GrapQL root query as hello(name: !String) : String function
export const schema = [`
type Query {
  hello(name: String!): String
}
schema {
  query: Query
}
`];

//Instanciate SenecaJS client to call microservices
const client = seneca.client(SENECA_OPTIONS);
//Define root Query resolvers
export const resolvers = {
  Query: {
    hello(root, {name}, context) {
      //Return the promise containing data field from senecajs call to test plugin
      return new Promise((resolve, reject)=>{
        //Call microservices with message 'role:test,cmd:hello,name:*'
        client.act({ role:'test', cmd:'hello', name }, function(error, {data}){
          //Use promise to pass error or data as GrapQL response
          if(error){
            reject(error);
          }else {
            resolve(data);
          }
          
        });
      });

    }
  }
}
