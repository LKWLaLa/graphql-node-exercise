const graphql = require('graphql');
const Organization = require('../models/Organization')
const Location = require('../models/Location')
const Event = require('../models/Event')
const { organizationQueryFields, organizationMutationFields } = require('./organizationSchema')
const { eventQueryFields, eventMutationFields } = require('./eventSchema')
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

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: { 
      ...organizationMutationFields,
      ...eventMutationFields
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});