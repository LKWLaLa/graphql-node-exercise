const graphql = require('graphql');
const Organization = require('../models/Organization')
const Location = require('../models/Location')
const Event = require('../models/Event')
const { OrganizationType } = require('./organizationSchema')

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLList
} = graphql;

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

const queryFields = { 
    location: {
        type: LocationType,
        args: { id: { type: GraphQLID } },
        resolve(parent, args){
            return Location.findById(args.id);
        }       
    },
    locations: {
        type: new GraphQLList(LocationType),
        resolve(parent, args){
            return Location.find({});
        }       
    }
}


module.exports = {
    locationQueryFields: queryFields,
    LocationType: LocationType
}
