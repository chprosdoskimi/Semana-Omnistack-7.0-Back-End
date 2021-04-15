const multer = require('multer');
const path = require('path');

// Configuração do Multer
module.exports = {
  storage: multer.diskStorage({ // dirname aponta para a pasta em que está arquivo
    destination: path.resolve(__dirname, '..', '..', 'uploads'), // onde os arquivos serão armazenados
    filename(req, file, callback) {
      callback(null, file.originalname); // Utiliza o nome original do arquivo
    },
  }),
};
