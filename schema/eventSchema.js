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

const eventMutationFields = { 
    addEvent: {
        type: EventType,
        args: {
            name: { type: GraphQLString },
            description: { type: GraphQLString},
            organizationId: {type: GraphQLID}
        },
        resolve(parent, args){
            let event = new Event({
                name: args.name,
                description: args.description,
                organizationId: args.organizationId
            });
            return event.save();
        }
    },
    updateEvent: {
        type: EventType,
        args: {
            id:   { type: GraphQLID  },
            name: { type: GraphQLString },
            description: { type: GraphQLString}
        },
        resolve(parent, args){
            return Event.findByIdAndUpdate(
                args.id,
                {$set:{
                    name:args.name,
                    description:args.description
                }},
                {new:true}
            )       
        }
    },
    deleteEvent: {
        type: EventType,
        args: {
            id: { type: GraphQLID  }
        },
        resolve(parent, args){
            return Event.findByIdAndRemove(args.id)       
        }
    }

}


module.exports = {
    eventQueryFields: queryFields,
    eventMutationFields: eventMutationFields
}
