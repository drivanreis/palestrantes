// foi eu que fiz 
const fs = require('fs').promises; // Importa o módulo fs.promises para utilizar as funções assíncronas
const { join } = require('path');

const lerArquivo = async () => {
  const filePath = join(__dirname, 'talker.json'); // Corrige o nome da variável e ajusta o caminho do arquivo
  try {
    const contentFile = await fs.readFile(filePath, 'utf8'); // Aguarda a leitura do arquivo
    return JSON.parse(contentFile);
  } catch (error) {
    console.log(error);
    throw error; // Adiciona o throw para propagar o erro após logar
  }
};

const escreverArquivo = async (conteudo) => {
  const filePath = join(__dirname, 'talker.json'); // Corrige o nome da variável e ajusta o caminho do arquivo
  try {
    await fs.writeFile(filePath, JSON.stringify(conteudo, null, 2), 'utf8'); // Aguarda a escrita do arquivo
  } catch (error) {
    console.log(error);
    throw error; // Adiciona o throw para propagar o erro após logar
  }
};

module.exports = { lerArquivo, escreverArquivo };
