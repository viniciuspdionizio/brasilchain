/**
 * Arquivo .js contendo o contrato "LicitacaoFactory", apontado pelo endereço
 * onde ele foi publicado (ver NEXT_PUBLIC_FACTORY_ADDRESS no .env.local).
 *
 * O endereço depende de onde o contrato foi feito o deploy (rede local,
 * Sepolia, etc) e muda a cada novo deploy — por isso não fica fixo no
 * código. Rode `npm run deploy` (veja o README) para publicar o contrato e
 * obter esse endereço.
 */

import web3 from "./web3";
import LicitacaoFactory from "./build/LicitacaoFactory.json";

const address = process.env.NEXT_PUBLIC_FACTORY_ADDRESS;

if (!address) {
  throw new Error(
    "NEXT_PUBLIC_FACTORY_ADDRESS não foi definido. Faça o deploy do contrato " +
    "(`npm run deploy`, com uma blockchain local rodando via `npm run chain`) " +
    "e coloque o endereço retornado no seu .env.local."
  );
}

const contract = new web3.eth.Contract(LicitacaoFactory.abi, address);

export default contract;
