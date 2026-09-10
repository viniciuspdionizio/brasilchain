import "react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css";

// CSS global só pode ser importado aqui (regra do Next.js). O CSS do
// semantic-ui-css em si é carregado via <link> em pages/_document.js.
export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
