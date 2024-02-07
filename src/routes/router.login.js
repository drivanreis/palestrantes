const router = require('express').Router();
const crypto = require('crypto');
const { existeEmail, existePassWord } = require('../middlewares/01-campoExiste');
const { temConteudoEmail, temConteudoPassWord } = require('../middlewares/02-campoTemConteudo');  
const { eValidoEmail, eValidoPassword } = require('../middlewares/03-conteudoEValido');  

const HTTP_OK_STATUS = 200;

// Resuisito 03 e 04 - POST /login
router.post('/',
  existeEmail,
  existePassWord,
  temConteudoEmail,
  temConteudoPassWord,
  eValidoEmail,
  eValidoPassword,
  async (_req, res) => {
    try {
      const token = crypto.randomBytes(8).toString('hex');
      return res.status(HTTP_OK_STATUS).json({ token });
    } catch (erro) {
      return res.status(500).json({ message: 'Erro interno' });
    }
  });

module.exports = router;
