const graphql = require('graphql');
const Organization = require('../models/Organization')
const Location = require('../models/Location')
const Event = require('../models/Event')

const {
    GraphQLObjectType,
    GraphQLString,
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
        latitude: { type: GraphQLString },
        longitude: { type: GraphQLString },
        organizationId: { type: GraphQLID },
        createdAt: { type: GraphQLString },
        updatedAt: { type: GraphQLString },
        organization: {
            type: OrganizationType,
            resolve(parent, args){
                return Organization.findById(parent.organizationId);
            }
        } 
    })
});

const EventType = new GraphQLObjectType({
    name: 'Event',
    fields: ( ) => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        organizationId: { type: GraphQLID },
        createdAt: { type: GraphQLString },
        updatedAt: { type: GraphQLString },
        description: { type: GraphQLString },
        dateTime: { 
            type: GraphQLString,
            resolve(parent, args){
                return Event.findById(parent.id)
                .then(res => res.dateTime.toLocaleString())
            } 
        },
        organization: {
            type: OrganizationType,
            resolve(parent, args){
                return Organization.findById(parent.organizationId);
            }
        } 
    })
});

module.exports = {
    EventType: EventType,
    OrganizationType: OrganizationType,
    LocationType: LocationType    
}