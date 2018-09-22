const graphql = require('graphql');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID
} = graphql;

// stubbed data (fake db)
var organizations = [
    { name: '92nd St Y', createdAt: '2018-09-12 18:39:29', updatedAt: '2018-09-12 18:39:29', id: '1' },
    { name: 'Children\'s Aid Society', createdAt: '2018-09-12 18:39:29', updatedAt: '2018-09-12 18:39:29', id: '2' },
    { name: 'Millneck Services', createdAt: '2018-09-12 18:39:29', updatedAt: '2018-09-12 18:39:29', id: '3' },
];


const OrganizationType = new GraphQLObjectType({
    name: 'Organization',
    fields: ( ) => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        createdAt: { type: GraphQLString },
        updatedAt: { type: GraphQLString }
    })
});


const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        organization: {
            type: OrganizationType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
                return organizations.filter(org => args.id === org.id)[0]
            }       
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});