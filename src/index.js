const express = require('express'); // Permite lidar com rotas, parametros e respostas
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors'); // Permite que qualquer aplicação no Front-End acesse o Back-End
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(express.json());

// Dividi o servidor para que ele suporte tanto protocolo http e websocket(permite comunicação em tempo real)
const server = require('http').Server(app); // Server tem acesso ao protocolo HTTP
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
    credentials: true,
  },
}); // io permite receber e enviar requisições para todos os usuarios conectados

mongoose.connect(process.env.DB_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use((req, res, next) => { // Middleware são interceptadores de rotas aqui vamos desponibilizar
  req.io = io; // para todas as demais rotas o io
  next();
});

app.use(cors());

// rota para acessar arquivos estáticos
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads', 'resized')));

app.use(require('./routes'));

server.listen(3333);
