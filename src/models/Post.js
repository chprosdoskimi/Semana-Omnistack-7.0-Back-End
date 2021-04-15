const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  author: String,
  place: String,
  description: String,
  hashtags: String,
  image: String,
  likes: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true, // adiciona a data de criação a uma coleção e a data da ultima alteração
});

module.exports = mongoose.model('Post', PostSchema);
