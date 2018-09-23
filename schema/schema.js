const graphql = require('graphql');
const Organization = require('../models/Organization')

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID
} = graphql;


const OrganizationType = new GraphQLObjectType({
    name: 'Organization',
    fields: ( ) => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        createdAt: { type: GraphQLString },
        updatedAt: { type: GraphQLString }
    })
});


const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        organization: {
            type: OrganizationType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
                return Organization.findById(args.id);
            }       
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});