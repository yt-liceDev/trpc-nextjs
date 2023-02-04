import { MantineProvider } from "@mantine/core"
import type { AppProps } from "next/app"
import Head from "next/head"
import { trpc } from "~/server/utils/trpc"

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Bookshelf</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <Component {...pageProps} />
      </MantineProvider>
    </>
  )
}

export default trpc.withTRPC(App)
