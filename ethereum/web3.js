/**
 * Utilização da lib web3
 *
 * Quando não há MetaMask (SSR, ou navegador sem extensão), conecta por
 * padrão numa blockchain LOCAL (ex: `npm run chain`), em vez de uma testnet
 * pública. Testnets públicas (Goerli, e agora Sepolia) têm vida curta e
 * acabam sendo desligadas — rede local não depende de nada externo.
 *
 * Para apontar para uma rede pública (ex: Sepolia) defina
 * NEXT_PUBLIC_RPC_URL no seu .env.local.
 */

import { Web3 } from "web3";

const RPC_URL_PADRAO = "http://127.0.0.1:8545";

let web3;

if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
  // Sendo executado no navegador E MetaMask está rodando.
  window.ethereum.request({ method: "eth_requestAccounts" });
  web3 = new Web3(window.ethereum);
} else {
  // Sendo executado no servidor OU Metamask não está rodando
  const provider = new Web3.providers.HttpProvider(
    process.env.NEXT_PUBLIC_RPC_URL || RPC_URL_PADRAO
  );
  web3 = new Web3(provider);
}

export default web3;
