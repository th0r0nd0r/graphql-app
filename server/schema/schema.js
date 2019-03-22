import graphql from 'graphql';

const { GraphQLObjectType, GraphQLString } = graphql;

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLString },
    title: { type: GraphQLString },
    genre: { type: GraphQLString}
  })
});