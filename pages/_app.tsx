import 'styles/globals.css'
import Head from 'next/head'

import type { AppProps /*, AppContext */ } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Webside of Diqye</title>
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
