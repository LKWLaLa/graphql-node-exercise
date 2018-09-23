const graphql = require('graphql');
const Organization = require('../models/Organization')
const Location = require('../models/Location')
const Event = require('../models/Event')
const {EventType, OrganizationType, LocationType} = require('./objectTypes')

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLList
} = graphql;

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
