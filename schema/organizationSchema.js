const graphql = require('graphql')
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

const organizationQueryFields = { 
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

const organizationMutationFields = { 
    addOrganization: {
        type: OrganizationType,
        args: {
            name: { type: GraphQLNonNull(GraphQLString) }
        },
        resolve(parent, args){
            let organization = new Organization({
                name: args.name
            });
            return organization.save();
        }
    },
    updateOrganization: {
        type: OrganizationType,
        args: {
            id:   { type: new GraphQLNonNull(GraphQLID)  },
            name: { type: GraphQLString }
        },
        resolve(parent, args){
            return Organization.findByIdAndUpdate(
                args.id,
                {$set:{name:args.name}},
                {new:true}
            )       
        }
    }
}


module.exports = {
    organizationQueryFields: organizationQueryFields,
    organizationMutationFields: organizationMutationFields
}
