import { Html, Head, Main, NextScript } from "next/document"

export default function Document() {
  // Determinar la base URL para GitHub Pages
  const baseUrl = process.env.NODE_ENV === "production" ? "/Portafolio" : ""

  return (
    <Html lang="es">
      <Head>
        <base href={`${baseUrl}/`} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

