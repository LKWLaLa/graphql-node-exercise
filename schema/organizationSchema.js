const graphql = require('graphql')
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


module.exports = {
    organizationQueryFields: queryFields,
    OrganizationType: OrganizationType
}
