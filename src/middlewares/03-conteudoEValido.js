const { isValidEmail } = require('../util/isValidFilds');

const eValidoEmail = (req, res, next) => {
  try {
    const { email } = req.body;

    if (!isValidEmail(email)) {
      return res.status(400).json({
        message: 'O "email" deve ter o formato "email@email.com"',
      });
    }
    next();
  } catch (error) {
    next(error);
  }
};

const eValidoPassword = (req, res, next) => {
  try {
    const { password } = req.body;
        
    if (password.length < 6) {
      return res.status(400).json({
        message: 'O "password" deve ter pelo menos 6 caracteres',
      });
    }
    next();
  } catch (error) {
    next(error);
  }
};

const eValidoName = (req, res, next) => {
  try {
    const { name } = req.body;
    // Validação do campo name
    if (name.trim().length < 3) {
      return res
        .status(400)
        .json({
          message: 'O "name" deve ter pelo menos 3 caracteres',
        });
    } 
    next();
  } catch (erro) {
    next(erro);
  }
};

const eValidoAge = (req, res, next) => {
  try {
    const { age } = req.body;

    if (age < 18) {
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
  
module.exports = { 
  eValidoEmail,
  eValidoPassword,
  eValidoName,
  eValidoAge,
};