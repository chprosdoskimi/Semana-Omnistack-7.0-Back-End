const Post = require('../models/Post');

module.exports = {
  async store(req, res) {
    const post = await Post.findById(req.params.id);

    post.likes += 1;

    await post.save();
    req.io.emit('like', post); // Enviara uma mensagem para todos os usuarios
    // que o like foi atualizado
    return res.json(post);
  },
};
