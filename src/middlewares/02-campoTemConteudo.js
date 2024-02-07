// O foco é verificar se o campo foi preenchido com o tipo correto.
const temConteudoEmail = (req, res, next) => {
  try {
    const { email } = req.body;
    // Validação do campo name
    if (!email) {
      return res
        .status(400)
        .json({ message: 'O campo "email" é obrigatório' });
    } 
    next();
  } catch (erro) {
    next(erro);
  }
};

const temConteudoPassWord = (req, res, next) => {
  try {
    const { password } = req.body;
    // Validação do campo name
    if (!password) {
      return res
        .status(400)
        .json({ message: 'O campo "PassWord" é obrigatório e deve ter pelo menos 3 caracteres' });
    } 
    next();
  } catch (erro) {
    next(erro);
  }
};
  
const temConteudoName = (req, res, next) => {
  try {
    const { name } = req.body;
    // Validação do campo name
    if (!name) {
      return res
        .status(400)
        .json({
          message: 'O campo "name" é obrigatório',
        });
    } 
    next();
  } catch (erro) {
    next(erro);
  }
};

const temConteudoAge = (req, res, next) => {
  try {
    const { age } = req.body;
  
    // Validação do campo age
    if (!age || Number.isNaN(age) || !Number.isInteger(Number(age))) {
      return res
        .status(400)
        .json({
          message: 'O campo "age" deve ser um número inteiro igual ou maior que 18',
        });
    }
    next();
  } catch (error) {
    next(error);
  }
};

const temConteudoTalk = (req, res, next) => {
  try {
    const { talk } = req.body;
    
    if (!talk || typeof talk !== 'object') {
      return res
        .status(400)
        .json({
          message: 'O campo "talk" é obrigatório',
        });
    } next();
  } catch (erro) {
    next(erro);
  }
};

const { isValidDataFormato } = require('../util/isValidFilds');

const temConteudoWatchedAt = (req, res, next) => {
  try {
    const { talk } = req.body;

    // Validação do campo watchedAt
    if (!talk.watchedAt || !isValidDataFormato(talk.watchedAt)) {
      return res
        .status(400)
        .json({
          message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
        });
    }
    next();
  } catch (error) {
    next(error);
  }
};

const { isRateValid } = require('../util/isValidFilds');

const temConteudoRate = (req, res, next) => {
  try {
    const { talk } = req.body;  
    
    if (!isRateValid(talk.rate)) {
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
  temConteudoEmail,
  temConteudoPassWord,
  temConteudoName,
  temConteudoAge,
  temConteudoTalk,
  temConteudoWatchedAt,
  temConteudoRate,
};