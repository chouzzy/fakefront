import { AppProps } from 'next/app'
import '../../styles/globals.css'
import { ChakraProvider, theme } from '@chakra-ui/react'
import { Global } from '@emotion/react'

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ChakraProvider theme={theme}>
            <Global
                styles={`...`}
            />
            <Component {...pageProps} />
        </ChakraProvider>
    )
}

export default MyApp