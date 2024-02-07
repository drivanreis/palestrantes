// O foco é verificar se o campo existe.
const existeEmail = (req, res, next) => {
  try {
    // Verifica se a chave "name" existe em req.body
    if (!req.body || !req.body.email) {
      return res
        .status(400)
        .json({ message: 'O campo "email" é obrigatório' });
    } next();
  } catch (erro) {
    next(erro);
  }
};

const existePassWord = (req, res, next) => {
  try {
    // Verifica se a chave "password" existe em req.body
    if (!req.body || !req.body.password) {
      return res
        .status(400)
        .json({ message: 'O campo "password" é obrigatório' });
    } next();
  } catch (erro) {
    next(erro);
  }
};

const existeNome = (req, res, next) => {
  try {
    // Verifica se a chave "name" existe em req.body
    if (!req.body || !req.body.name) {
      return res
        .status(400)
        .json({
          message: 'O campo "name" é obrigatório',
        });
    } next();
  } catch (erro) {
    next(erro);
  }
};

const existeAge = (req, res, next) => {
  try {
    // Verifica se a chave "age" existe em req.body
    if (!req.body || !req.body.age) {
      return res
        .status(400)
        .json({
          message: 'O campo "age" é obrigatório',
        });
    } next();
  } catch (erro) {
    next(erro);
  }
};

const existeTalk = (req, res, next) => {
  try {
    // Verifica se a chave "talk" existe em req.body
    if (!req.body || !req.body.talk) {
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

const existeWatchedAt = (req, res, next) => {
  try {
    // Verifica se a chave "WatchedAt" existe em req.body
    if (!req.body || !req.body.talk || !req.body.talk.watchedAt) {
      return res
        .status(400)
        .json({ message: 'O campo "watchedAt" é obrigatório' });
    } next();
  } catch (erro) {
    next(erro);
  }
};

const existeRate = (req, res, next) => {
  try {
    // if (!req.body.talk.rate || req.body.talk.rate.length === 0) {
    if (req.body.talk.rate === undefined) {
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
  
module.exports = {
  existeEmail,
  existePassWord,
  existeNome,
  existeAge,
  existeTalk,
  existeWatchedAt,
  existeRate,
};