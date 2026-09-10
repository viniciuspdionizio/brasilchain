import { Html, Head, Main, NextScript } from "next/document";

// Custom Document: usado apenas para carregar o CSS legado do semantic-ui-css
// via <link>, pois o pacote é abandonado e seu CSS minificado tem seletores
// que o parser CSS do Next.js (Turbopack) rejeita ao ser importado via JS.
export default function Document() {
  return (
    <Html lang="pt-BR">
      <Head>
        <link rel="stylesheet" href="/vendor/semantic-ui/semantic.min.css" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
