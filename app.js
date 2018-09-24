require('dotenv').config()
const express = require('express');
const app = express();
const graphqlHTTP = require('express-graphql');
const mongoose = require('mongoose');
const schema = require('./schema/rootSchema');

mongoose.connect(process.env.DB_ADDRESS)
mongoose.connection.once('open', () => {
  console.log('connected to database');   
});

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(3000, () => {
    console.log('now listening on port 3000');
});
