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
    event: {
        type: EventType,
        args: { id: { type: GraphQLID } },
        resolve(parent, args){
            return Event.findById(args.id);
        }       
    },
    events: {
        type: new GraphQLList(EventType),
        resolve(parent, args){
            return Event.find({});
        }       
    }
}


module.exports = {
    eventQueryFields: queryFields,
    EventType: EventType
}
