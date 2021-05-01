import 'styles/globals.css'
import Head from 'next/head'

import type { AppProps /*, AppContext */ } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Webside of Diqye</title>
        <meta data-n-head="ssr" name="viewport" content="width=device-width,initial-scale=1"></meta>
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
