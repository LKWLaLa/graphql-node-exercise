require('dotenv').config()
const express = require('express');
const app = express();
const graphqlHTTP = require('express-graphql');
const mongoose = require('mongoose');
const schema = require('./schema/schema');
const Organization = require('./models/Organization')

mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@ds111993.mlab.com:11993/graphql-node-exercise`)
mongoose.connection.once('open', () => {
    console.log('connected to database');
    // Organization.bulkWrite([
    // {
    //   insertOne: {
    //     document: {
    //       name: '92nd St Y',
    //     }
    //   }
    // }]);
});

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(3000, () => {
    console.log('now listening on port 3000');
});
