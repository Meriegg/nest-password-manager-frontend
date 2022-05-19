import { MantineProvider } from '@mantine/core'
import { NotificationsProvider } from '@mantine/notifications'
import { Layout } from '../components/Layout'
import type { AppProps } from 'next/app'
import { reduxStore } from '../features'
import { Provider } from 'react-redux'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={reduxStore}>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{ colorScheme: 'dark' }}
      >
        <NotificationsProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </NotificationsProvider>
      </MantineProvider>
    </Provider>
  )
}

export default MyApp
