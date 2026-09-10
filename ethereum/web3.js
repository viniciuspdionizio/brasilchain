/**
 * Utilização da lib web3
 */

import { Web3, FMT_NUMBER, FMT_BYTES } from "web3";

let web3;

if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
  // Sendo executado no navegador E MetaMask está rodando.
  window.ethereum.request({ method: "eth_requestAccounts" });
  web3 = new Web3(window.ethereum);
} else {
  // Sendo executado no servidor OU Metamask não está rodando
  const provider = new Web3.providers.HttpProvider(
    "https://goerli.infura.io/v3/756076ed64b14936ac9aef53af019f95"
  );
  web3 = new Web3(provider);
}

// A partir da v4 o web3 retorna números como BigInt por padrão. Forçamos o
// retorno como string (comportamento da v1) para não quebrar o restante do
// código, que faz operações como `resultado * 1000` e renderiza os valores
// diretamente em JSX.
web3.defaultReturnFormat = { number: FMT_NUMBER.STR, bytes: FMT_BYTES.HEX };

export default web3;