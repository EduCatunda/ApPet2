import type { AppProps } from 'next/app'

import Head from 'next/head'

import { QueryClientProvider } from '@tanstack/react-query'

import { ChakraProvider } from '@chakra-ui/react'

import { theme } from '~/styles/theme'

import { Header } from '~/components/Header'

import { SessionProvider } from 'next-auth/react'

import { queryClient } from '~/service/queryClient'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Lista</title>
      </Head>
      <QueryClientProvider client={queryClient}>
        <SessionProvider>
          <ChakraProvider theme={theme}>
            <Header></Header>
            <Component {...pageProps} />
          </ChakraProvider>
        </SessionProvider>
      </QueryClientProvider>
    </>
  )
}

export default MyApp
