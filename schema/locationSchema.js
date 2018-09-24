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

const locationQueryFields = { 
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

const locationMutationFields = { 
    addLocation: {
        type: LocationType,
        args: {
            name: { type: GraphQLString },
            address: { type: GraphQLString},
            organizationId: {type: GraphQLID}
        },
        resolve(parent, args){
            let location = new Location({
                name: args.name,
                address: args.address,
                organizationId: args.organizationId
            });
            return location.save();
        }
    },
    updateLocation: {
        type: LocationType,
        args: {
            id:   { type: GraphQLID  },
            name: { type: GraphQLString },
            address: { type: GraphQLString}
        },
        resolve(parent, args){
            let updateDetails = {}
            if(args.name){
                updateDetails.name = args.name
            }
            if(args.address){
                updateDetails.address = args.address
            }
            return Location.findByIdAndUpdate(
                args.id,
                {$set: updateDetails},
                {new:true}
            )       
        }
    },
    deleteLocation: {
        type: LocationType,
        args: {
            id: { type: GraphQLID  }
        },
        resolve(parent, args){
            return Location.findByIdAndRemove(args.id)       
        }
    }

}


module.exports = {
    locationQueryFields: locationQueryFields,
    locationMutationFields: locationMutationFields
}
