const fbExisteRate = (req, res, next) => {
  try {
    // if (!req.body.talk.rate || req.body.talk.rate.length === 0) {
    if (req.body.rate === undefined) {
      return res
        .status(400)
        .json({
          message: 'O campo "rate" é obrigatório',
        });
    } next();
  } catch (erro) {
    next(erro);
  }
};

const { isRateValid } = require('../util/isValidFilds');

const fbTemConteudoRate = (req, res, next) => {
  try {
    const { rate } = req.body;  
    
    if (!isRateValid(rate)) {
      return res
        .status(400)
        .json({
          message: 'O campo "rate" deve ser um número inteiro entre 1 e 5',
        });
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  fbExisteRate,
  fbTemConteudoRate,
};  