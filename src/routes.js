const express = require('express');// importamos o express para utilizar o método Router()
const multer = require('multer');
const uploadConfig = require('./config/upload'); // COnfiguração do Multer

const PostController = require('./controllers/PostController');
const LikeController = require('./controllers/LikeController');

const routes = new express.Router();
const upload = multer(uploadConfig); // carregando o multer na variavel

routes.get('/posts', PostController.index); // Retorna todos os posts para o feed

// Utilizamos o multer na rota p/ fazer que o express entenda o corpo da requisição
// no formato Multipart (insomnia)
routes.post('/posts', upload.single('image'), PostController.store);

routes.post('/posts/:id/like', LikeController.store);

module.exports = routes;
