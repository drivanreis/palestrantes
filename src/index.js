// Quero afazer isso no conceito "EVV"
// Existe, Verifica, Valida
const cors = require('cors');
const express = require('express');
const routers = require('./routes');

const app = express();
app.use(express.json());
app.use(cors());

const HTTP_OK_STATUS = 200;
const HTTP_INTERNAL_SERVER_ERROR = 500;

const PORT = process.env.PORT || '3001';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.use(routers);

const errorMiddleware = (error, _req, res, _next) => {
  console.error(error.message);
  
  res.status(HTTP_INTERNAL_SERVER_ERROR)
    .json({ message: 'Erro interno do servidor' });
};
app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`RODANDO NA PORTA ${PORT}`);
});
