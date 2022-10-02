import type { AppProps } from 'next/app'

import { ChakraProvider } from '@chakra-ui/react'

import { theme } from '~/styles/theme'

import { Header } from '~/components/Header'

import { SessionProvider } from 'next-auth/react'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider>
      <ChakraProvider theme={theme}>
        <Header></Header>
        <Component {...pageProps} />
      </ChakraProvider>
    </SessionProvider>
  )
}

export default MyApp
