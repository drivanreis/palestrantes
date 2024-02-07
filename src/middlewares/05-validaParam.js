const { isRateValid, isValidDataFormato } = require('../util/isValidFilds');

const validaRate = (req, res, next) => {
  try {
    if (!req.query.rate) { return next(); }
    const { rate } = req.query;
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

const validaDate = (req, res, next) => {
  try {
    if (!req.query.date) { return next(); }
    const { date } = req.query;
    if (!isValidDataFormato(date)) {
      return res
        .status(400)
        .json({
          message: 'O parâmetro "date" deve ter o formato "dd/mm/aaaa"',
        });
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  validaRate,
  validaDate };