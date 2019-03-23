import * as graphql from 'graphql';
import _ from 'lodash';
import Book from '../models/book';
import Author from '../models/author';

const {
  GraphQLObjectType, 
  GraphQLString, 
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
} = graphql;

// dummy data
// let books = [
//   { title: 'Frumgers Dine at Midnight', genre: 'Biography', id: '1', authorId: '2'},
//   { title: 'Spumpy and the Great Albacore', genre: 'Adventure', id: '2', authorId: '1'},
//   { title: 'Robots Eat Electric Peeps', genre: 'Sci-Fi', id: '3', authorId: '3'},
//   { title: 'Tales of an Old Muffler', genre: 'Sci-Fi', id: '4', authorId: '3'},
//   { title: 'Axolotls Die Nonce', genre: 'Thriller', id: '5', authorId: '2'},
// ];

// let authors = [
//   { name: 'Gunther Confitus', age: 41, id: '1'},
//   { name: 'Lord Spumicus', age: 32, id: '2'},
//   { name: 'Alfredo Rollatini', age: 389, id: '3'},
// ];


const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        // return _.find(authors, {id: parent.authorId});
        return Author.findById(parent.authorId);
      }
    }
  })
});

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve (parent, args) {
        // return _.filter(books, {authorId: parent.id});
        return Book.find({authorId: parent.id});
      }
    }
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
        // return _.find(books, {id: args.id});
        return Book.findById(args.id);
      }
    },
    author: {
      type: AuthorType,
      args: {id: { type: GraphQLID } },
      resolve(parent,args) {
        // return _.find(authors, {id: args.id});
        return Author.findById(args.id);
      }
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        // return books;
        return Book.find({});
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent,args) {
        // return authors;
        return Author.find({});
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: {type: new GraphQLNonNull(GraphQLString)},
        age: {type: new GraphQLNonNull(GraphQLInt)},
      },
      resolve(parent, args) {
        let author = new Author({
          name: args.name,
          age: args.age
        });

        return author.save();
      }
    },
    addBook: {
      type: BookType,
      args: {
        title: {type: new GraphQLNonNull(GraphQLString)},
        genre: {type: new GraphQLNonNull(GraphQLString)},
        authorId: {type: new GraphQLNonNull(GraphQLID)}
      },
      resolve(parent, args) {
        let book = new Book({
          title: args.title,
          genre: args.genre,
          authorId: args.authorId
        });

        return book.save();
      }
    }
  }
});

export default new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});

