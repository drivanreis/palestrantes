// Função auxiliar para validar o token
const validarToken = (req, res, next) => {
  try { 
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: 'Token não encontrado' });
    }

    if (token.length !== 16 || typeof token !== 'string') {
      return res.status(401).json({ message: 'Token inválido' });
    }

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = validarToken;