import * as graphql from 'graphql';
import _ from 'lodash';

const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;

// dummy data
let books = [
  { title: 'Frumgers Dine at Midnight', genre: 'Biography', id: '1'},
  { title: 'Spumpy and the Great Albacore', genre: 'Adventure', id: '2'},
  { title: 'Robots Eat Electric Peeps', genre: 'Sci-Fi', id: '3'},
];


const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLString },
    title: { type: GraphQLString },
    genre: { type: GraphQLString }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        // code to get data from db/other source
        _.find(books, {id: args.id});
      }
    }
  }
});

export default new GraphQLSchema({
  query: RootQuery
});
