/**
* Compile.js é apenas utilizado CASO o arquivo contendo os contratos inteligentes
* Utilizado para compilar os contratos inteligentes, assim criando dois arquivos (contratos)
* armazenados separadamente em um arquivo .json com seu nome dentro do diretório "./build"
* ATENÇÃO: ao realizar um novo deploy, o endereço do novo contrato será retornado no console, e o mesmo deverá ser substituido no arquivo ./factory.js
 */

const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath);

const licitacaoPath = path.resolve(__dirname, 'contracts', 'Licitacao.sol');

const source = fs.readFileSync(licitacaoPath, 'utf8');

const input = {
  language: "Solidity",
  sources: {
    "Licitacao.sol": {
      content: source,
    },
  },
  settings: {
    // Fixa a EVM alvo em "shanghai" (a mais recente suportada pelo Ganache
    // usado nos testes locais/rede de desenvolvimento). Sem isso, versões
    // mais novas do solc usam por padrão uma EVM mais recente que o Ganache,
    // gerando opcodes (ex: PUSH0/TLOAD/TSTORE) que ele não reconhece e
    // fazendo qualquer chamada ao contrato reverter com "invalid opcode".
    evmVersion: "shanghai",
    outputSelection: {
      "*": {
        "*": ["*"],
      },
    },
  },
};

const output = JSON.parse(solc.compile(JSON.stringify(input)));

console.log('output', output);
fs.ensureDirSync(buildPath);


for (let contract in output.contracts["Licitacao.sol"]) {
    fs.outputJSONSync(
      path.resolve(buildPath, contract + ".json"),
      output.contracts["Licitacao.sol"][contract]
    );
}