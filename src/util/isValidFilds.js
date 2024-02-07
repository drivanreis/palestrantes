// Função auxiliar para validar email
// retorna bolleano
const isValidEmail = (email) => {
  // Validando se o email tem o formato correto.
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regexEmail.test(email);
  // Implemente sua lógica de verificação de email...
};

// Função auxiliar para validar o formato da data
// retorna bolleano
const isValidDataFormato = (data) => {
  const regexData = /^\d{2}\/\d{2}\/\d{4}$/;
  return regexData.test(data);
};

const isRateValid = (rate) => {
  if (rate < 1 || rate > 5 || !Number.isInteger(Number(rate))) {
    return false;
  }
  return true;
};

module.exports = {
  isValidEmail,
  isValidDataFormato,
  isRateValid,
};