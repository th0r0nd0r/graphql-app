import * as graphql from 'graphql';
import _ from 'lodash';

const {
  GraphQLObjectType, 
  GraphQLString, 
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
} = graphql;

// dummy data
let books = [
  { title: 'Frumgers Dine at Midnight', genre: 'Biography', id: '1', authorId: '2'},
  { title: 'Spumpy and the Great Albacore', genre: 'Adventure', id: '2', authorId: '1'},
  { title: 'Robots Eat Electric Peeps', genre: 'Sci-Fi', id: '3', authorId: '3'},
];

let authors = [
  { name: 'Gunther Confitus', age: 41, id: '1'},
  { name: 'Lord Spumicus', age: 32, id: '2'},
  { name: 'Alfredo Rollatini', age: 389, id: '3'},
];


const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        console.log(parent);
        return _.find(authors, {id: parent.authorId});
      }
    }
  })
});

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // code to get data from db/other source
        return _.find(books, {id: args.id});
      }
    },
    author: {
      type: AuthorType,
      args: {id: { type: GraphQLID } },
      resolve(parent,args) {
        return _.find(authors, {id: args.id});
      }
    }
  }
});

export default new GraphQLSchema({
  query: RootQuery
});
