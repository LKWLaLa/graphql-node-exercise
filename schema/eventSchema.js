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

const eventQueryFields = { 
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

// for addEvent - dateTime must be entered in ISO 8601 format.
//example: "2018-09-23T12:30"

const eventMutationFields = { 
    addEvent: {
        type: EventType,
        args: {
            name: { type: GraphQLString },
            description: { type: GraphQLString},
            organizationId: {type: GraphQLID} ,
            dateTime: { type: GraphQLString }
        },
        resolve(parent, args){
            let event = new Event({
                name: args.name,
                description: args.description,
                organizationId: args.organizationId,
                dateTime: new Date(args.dateTime)
            });
            return event.save();
        }
    },
    updateEvent: {
        type: EventType,
        args: {
            id:   { type: GraphQLID  },
            name: { type: GraphQLString },
            description: { type: GraphQLString},
            dateTime: { type: GraphQLString }
        },
        resolve(parent, args){
            let updateDetails = {}
            if(args.name){
                updateDetails.name = args.name
            }
            if(args.description){
                updateDetails.description = args.description
            }
            if(args.dateTime){
                updateDetails.dateTime = new Date(args.dateTime)
            }
            return Event.findByIdAndUpdate(
                args.id,
                {$set: updateDetails},
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
    eventQueryFields: eventQueryFields,
    eventMutationFields: eventMutationFields
}
