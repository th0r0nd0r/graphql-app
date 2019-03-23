import express from 'express';
import graphqlHTTP from 'express-graphql';
import schema from './schema/schema';
import mongoose from 'mongoose';

const app = express();

// connect to database
// NOTE: the connection string should at the very least be an environment variable, oustide the application code.
// I'm just exposing it here for the purpose of easily sharing access to the coding challenge.
mongoose.connect('mongodb+srv://yew_nuser:p4ssw0rd@colonelclustered-pfwc5.mongodb.net/test?retryWrites=true', {useNewUrlParser: true});

mongoose.connection.once('open', () => {
  console.log('connected to database');
});


app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}));

app.listen(4000, () => {
  console.log("Now listening for requests on port 4000");
});