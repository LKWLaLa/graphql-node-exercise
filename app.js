const express = require('express');
const app = express();
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(3000, () => {
    console.log('now listening on port 3000');
});
