const graphql = require('graphql');
const Organization = require('../models/Organization')
const Location = require('../models/Location')
const Event = require('../models/Event')
const { organizationQueryFields } = require('./organizationSchema')
const { eventQueryFields } = require('./eventSchema')
const { locationQueryFields } = require('./locationSchema')


const {
    GraphQLObjectType,
    GraphQLSchema,
} = graphql;


const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      ...organizationQueryFields, 
      ...locationQueryFields,
      ...eventQueryFields
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});