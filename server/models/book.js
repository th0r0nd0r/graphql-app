import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  title: String,
  genre: String,
  authorId: String,
});

export default mongoose.model('Book', bookSchema);