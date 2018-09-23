const graphql = require('graphql');
const Organization = require('../models/Organization')
const Location = require('../models/Location')
const Event = require('../models/Event')

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLList
} = graphql;


const OrganizationType = new GraphQLObjectType({
    name: 'Organization',
    fields: ( ) => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        createdAt: { type: GraphQLString },
        updatedAt: { type: GraphQLString },
        events: {
            type: new GraphQLList(EventType),
            resolve(parent, args){
                return Event.find({ organizationId: parent.id });
            }
        },
        locations: {
            type: new GraphQLList(LocationType),
            resolve(parent, args){
                return Location.find({ organizationId: parent.id });
            } 
        }   
    })
});

const LocationType = new GraphQLObjectType({
    name: 'Location',
    fields: ( ) => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        address: { type: GraphQLString },
        organizationId: { type: GraphQLID },
        createdAt: { type: GraphQLString },
        updatedAt: { type: GraphQLString }
    })
});

const EventType = new GraphQLObjectType({
    name: 'Event',
    fields: ( ) => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        organizationId: { type: GraphQLID },
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
        },
        organizations: {
            type: new GraphQLList(OrganizationType),
            resolve(parent, args){
                return Organization.find({});
            }       
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});