/**
 * O web3 v4 decodifica campos uint/int retornados por chamadas de contrato
 * (`.methods.x().call()`) sempre como BigInt — configurar
 * `defaultReturnFormat` ou passar `returnFormat` explícito no `.call()` não
 * tem efeito sobre esse resultado (só afeta chamadas RPC "cruas", como
 * saldo). Então convertemos explicitamente onde o valor é usado em
 * aritmética (`* 1000`) ou renderizado direto em JSX, já que React não
 * lida com BigInt como texto.
 */
export const paraNumero = (valor) => Number(valor);
