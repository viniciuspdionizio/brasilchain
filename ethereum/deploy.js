/**
 * deploy.js publica o LicitacaoFactory numa rede.
 *
 * Uso:
 *  - Rede local (padrão, sem custo e sem depender de testnet nenhuma):
 *      1. Num terminal: `npm run chain` (sobe uma blockchain local)
 *      2. Noutro: `npm run deploy`
 *    Não precisa de nenhuma variável de ambiente para esse caminho.
 *
 *  - Rede pública (ex: Sepolia), pra ter um link público de demonstração:
 *    defina no seu .env.local (nunca no código-fonte):
 *      RPC_URL=https://sepolia.infura.io/v3/<sua_chave_infura>
 *      DEPLOYER_MNEMONIC=<mnemônico de uma carteira só de teste>
 *    e rode `npm run deploy`.
 *
 * Em ambos os casos, o endereço impresso no console deve ir para
 * NEXT_PUBLIC_FACTORY_ADDRESS no .env.local, para o frontend achar o
 * contrato.
 */

const { Web3 } = require('web3');

const { abi, evm } = require('./build/LicitacaoFactory.json');

const RPC_URL = process.env.RPC_URL || 'http://127.0.0.1:8545';
const MNEMONIC = process.env.DEPLOYER_MNEMONIC;

// Só carrega o HDWalletProvider (pesado e sem manutenção ativa) quando
// realmente for necessário, isto é, ao publicar numa rede remota.
let provider = RPC_URL;
if (MNEMONIC) {
  const HDWalletProvider = require('@truffle/hdwallet-provider');
  provider = new HDWalletProvider(MNEMONIC, RPC_URL);
}

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Publicando o contrato a partir da conta', accounts[0]);

  const result = await new web3.eth.Contract(abi)
    .deploy({ data: evm.bytecode.object })
    .send({ gas: '10000000', from: accounts[0] });

  console.log('Contrato publicado em:', result.options.address);
  console.log(
    `Defina NEXT_PUBLIC_FACTORY_ADDRESS=${result.options.address} no seu .env.local`
  );

  if (provider.engine) provider.engine.stop();
  process.exit(0);
};

deploy().catch((err) => {
  console.error(err);
  process.exit(1);
});
