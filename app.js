require('dotenv').config()
const express = require('express');
const app = express();
const graphqlHTTP = require('express-graphql');
const mongoose = require('mongoose');
const schema = require('./schema/rootSchema');
const seeds = require('./seeds')

mongoose.connect(process.env.DB_ADDRESS)
mongoose.connection.once('open', () => {
    console.log('connected to database');
    // seeds.clean()
    // seeds.populate()
});

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(3000, () => {
    console.log('now listening on port 3000');
});
