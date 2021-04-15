const sharp = require('sharp'); // dependência que permite manipular as imagens dentro da aplicaçao
const path = require('path');
const fs = require('fs');
const Post = require('../models/Post');

// Controllers são responsaveis pela regra de negôcio (a lógica do programa)
module.exports = {
  async index(req, res) { // Retorna todos os dados dos posts
    const posts = await Post.find().sort('-createdAt'); // decrescente pelo "-"createdAt
    return res.json(posts);
  },

  async store(req, res) {
    const {
      author, place, description, hashtags,
    } = req.body; // buscar os dados do corpo da requisção
    const { filename: image } = req.file; // pega o nome do arquivo e altera a variavel para image

    const [name] = image.split('.'); // separa o nome da extensão da imagem pelo método "split"
    const fileName = `${name}.jpg`; // coloca a extensão no arquivo

    await sharp(req.file.path)// pega a imagem na pasta da uploads
      .resize(500) // redemensiona  o tamanho da imagem e a qualidade
      .jpeg({ quality: 70 })
      .toFile(
        path.resolve(req.file.destination, 'resized', fileName),
      );
    console.log(req.file);

    fs.unlinkSync(req.file.path); // deleta o arquivo original na pasta "uploads"

    const post = await Post.create({
      author,
      place,
      description,
      hashtags,
      image: fileName,
    });

    req.io.emit('post', post); // emitirá uma informação para todos os usuarios conectados
    // na aplicação que um novo "post" foi enviado
    return res.json(post);
  },
};
