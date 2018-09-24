const graphql = require('graphql');
const Organization = require('../models/Organization')
const Location = require('../models/Location')
const Event = require('../models/Event')
const {EventType, OrganizationType, LocationType} = require('./objectTypes')

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLList,
    GraphQLNonNull
} = graphql;

let googleMapsClient = require('@google/maps').createClient({
  key: process.env.GOOGLE_PLACES_API_KEY,
  Promise: Promise
});

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

const googleMapsRequest = (address) => {
    return googleMapsClient.geocode({
          address: address
        })
        .asPromise()
        .then((response) => {            
            return response.json.results[0].geometry.location
        })
}

const locationMutationFields = { 
    addLocation: {
        type: LocationType,
        args: {
            name: { type: new GraphQLNonNull(GraphQLString) },
            address: { type: new GraphQLNonNull(GraphQLString)},
            organizationId: {type: new GraphQLNonNull(GraphQLID)}
        },
        resolve(parent, args){
            return googleMapsRequest(args.address)
            .then((response) => {            
                let lat = response.lat
                let lng = response.lng
                let location = new Location({
                    name: args.name,
                    address: args.address,
                    organizationId: args.organizationId,
                    latitude: lat,
                    longitude: lng
                });
                return location.save();
            })
            .catch((err) => {
                console.log(err);
            });           
        }
    },
    updateLocation: {
        type: LocationType,
        args: {
            id:   { type: new GraphQLNonNull(GraphQLID)  },
            name: { type: GraphQLString },
            address: { type: GraphQLString}
        },
        resolve(parent, args){
            if(args.name && !args.address){
                return Location.findByIdAndUpdate(
                args.id,
                {$set: {name: args.name}},
                {new:true})       
            }
            if(args.address){
                let updateDetails = {}
                updateDetails.address = args.address
                if(args.name){
                    updateDetails.name = args.name
                }
                return googleMapsRequest(args.address)
                    .then( (response) => {
                        updateDetails.latitude = response.lat 
                        updateDetails.longitude = response.lng 

                        return Location.findByIdAndUpdate(
                            args.id,
                            {$set: updateDetails},
                            {new:true}
                        )     
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            }
        }     
    },
    deleteLocation: {
        type: LocationType,
        args: {
            id: { type: new GraphQLNonNull(GraphQLID)  }
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
