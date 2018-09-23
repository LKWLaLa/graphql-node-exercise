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
   
}


module.exports = {
    locationQueryFields: queryFields,
    LocationType: LocationType
}
