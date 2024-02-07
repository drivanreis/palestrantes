const router = require('express').Router();
const { lerArquivo, escreverArquivo } = require('../conexaoForFile');
const validarToken = require('../middlewares/00-validarToken');
const { validaRate, validaDate } = require('../middlewares/05-validaParam');
const { fbExisteRate, fbTemConteudoRate } = require('../middlewares/06-forcaBruta');

const { 
  existeNome,
  existeAge,
  existeTalk,
  existeWatchedAt,
  existeRate,
} = require('../middlewares/01-campoExiste');
const { 
  temConteudoName,
  temConteudoAge,
  temConteudoTalk,
  temConteudoWatchedAt,
  temConteudoRate, 
} = require('../middlewares/02-campoTemConteudo');
const { 
  eValidoName, 
  eValidoAge, 
} = require('../middlewares/03-conteudoEValido');

const HTTP_OK_STATUS = 200;
const HTTP_NOT_FOUND = 404;

// Resuisito 01 - GET /talker
router.get('/', async (_req, res, next) => {
  try {
    const pessoasPalestrantes = await lerArquivo();

    if (pessoasPalestrantes.length === 0) {
      return res.status(HTTP_OK_STATUS).send([]);
    }

    res.status(HTTP_OK_STATUS).send(pessoasPalestrantes);
  } catch (error) {
    next(error);
  }
});

// Resuisito 08, 09 E 10 - GET /talker/search?q=searchTerm

router.get('/search/', validarToken, validaDate, validaRate, async (req, res) => {
  const { q, rate, date } = req.query;
  const pessoasPalestrantes = await lerArquivo();
  let filtraPessoa = [...pessoasPalestrantes];
  if (q) { filtraPessoa = filtraPessoa.filter((talker) => talker.name.includes(q)); } 
  if (rate) { filtraPessoa = filtraPessoa.filter((talker) => talker.talk.rate === +rate); }
  if (date) {
    filtraPessoa = filtraPessoa.filter((talker) => talker.talk.watchedAt === date);
  }

  if (filtraPessoa.length === 0) { return res.status(200).send([]); }
  return res.status(200).send(filtraPessoa);
});

const connection = require('../db/connection');
// Resuisito 12 - GET /talker/db
router.get('/db', async (_req, res, next) => {
  try {
    const [pessoasPalestrantes] = await connection.execute('SELECT * FROM talkers');
    if (pessoasPalestrantes.length === 0) { return res.status(HTTP_OK_STATUS).send([]); }
    const dadosTransformados = pessoasPalestrantes.map((item) => ({
      age: item.age,
      id: item.id,
      name: item.name,
      talk: {
        rate: item.talk_rate,
        watchedAt: item.talk_watched_at,
      },
    }));
    res.status(HTTP_OK_STATUS).send(dadosTransformados);
  } catch (error) {
    next(error);
  }
});

// Resuisito 02 - GET /talker/:ID
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const talker = (await lerArquivo()).find((talkerAtual) => talkerAtual.id === +id);

    if (!talker) {
      return res.status(HTTP_NOT_FOUND).json({ message: 'Pessoa palestrante não encontrada' });
    }

    res.status(HTTP_OK_STATUS).send(talker);
  } catch (error) {
    next(error);
  }
});

// Resuisito 05 - POST /talker
router.post('/',
  validarToken,
  existeNome,
  existeAge,
  existeTalk,
  existeWatchedAt,
  existeRate,
  temConteudoName,
  temConteudoAge,
  temConteudoTalk,
  temConteudoWatchedAt,
  temConteudoRate,
  eValidoName,
  eValidoAge,
  async (req, res, next) => {
    try {
      const { name, age, talk } = req.body;
      const pessoasPalestrantes = await lerArquivo();
      // const id = Date.now();
      const id = pessoasPalestrantes.length + 1;
      // const idExistente = pessoasPalestrantes.some((pessoa) => pessoa.id === +id);
      // if (idExistente) {
      //   return res.status(400).json({ message: 'ID já existente. Escolha um ID único.' });
      // }
      const pessoaCadastrada = { id, name, age, talk };
      pessoasPalestrantes.push(pessoaCadastrada);
      await escreverArquivo(pessoasPalestrantes);
      return res.status(201).json(pessoaCadastrada);
    } catch (error) {
      next(error);
    }
  });

// Resuisito 06 - PUT /talker
router.put('/:id',
  validarToken,
  existeNome,
  existeAge,
  existeTalk,
  existeWatchedAt,
  existeRate,
  temConteudoName,
  temConteudoAge,
  temConteudoTalk,
  temConteudoWatchedAt,
  temConteudoRate,
  eValidoName,
  eValidoAge,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { name, age, talk } = req.body;
      const pessoasPalestrantes = await lerArquivo();
      const index = pessoasPalestrantes.findIndex((pessoa) => pessoa.id === +id);
      if (index === -1) {
        return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
      }
      pessoasPalestrantes[index] = { id: +id, name, age, talk };
      await escreverArquivo(pessoasPalestrantes);
      return res.status(200).json(pessoasPalestrantes[index]);
    } catch (error) {
      next(error);
    }
  });

// Requisito 11 - PATCH /talker/rate/:id
router
  .patch('/rate/:id',
    validarToken,
    fbExisteRate,
    fbTemConteudoRate,
    async (req, res, next) => {
      try {
        const { id } = req.params;
        const { rate } = req.body;
    
        const pessoasPalestrantes = await lerArquivo();
        const index = pessoasPalestrantes.findIndex((pessoa) => pessoa.id === +id);
        if (index === -1) {
          return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
        }
        pessoasPalestrantes[index].talk.rate = +rate;
        await escreverArquivo(pessoasPalestrantes);
        return res.status(204).end();
      } catch (error) {
        next(error);
      }
    });

// Resuisito 07 - DELETE /talker  
router.delete('/:id', validarToken, async (req, res, next) => {
  try {
    const { id } = req.params;
    const pessoasPalestrantes = await lerArquivo();
    const index = pessoasPalestrantes.findIndex((pessoa) => pessoa.id === +id);
  
    if (index === -1) {
      return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    }
  
    pessoasPalestrantes.splice(index, 1); // Remove a pessoa palestrante pelo índice
    await escreverArquivo(pessoasPalestrantes);
      
    return res.status(204).end();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
