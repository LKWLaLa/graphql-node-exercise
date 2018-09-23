require('dotenv').config()
const express = require('express');
const app = express();
const graphqlHTTP = require('express-graphql');
const mongoose = require('mongoose');
const schema = require('./schema/schema');
const Organization = require('./models/Organization')
const Location = require('./models/Location')
const Event = require('./models/Event')
const seeds = require('./seeds')

mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@ds111993.mlab.com:11993/graphql-node-exercise`)
mongoose.connection.once('open', () => {
    console.log('connected to database');
    seeds.clean()
    seeds.populate()
});

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(3000, () => {
    console.log('now listening on port 3000');
});
