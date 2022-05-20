import { MantineProvider } from '@mantine/core'
import { NotificationsProvider } from '@mantine/notifications'
import { ModalsProvider } from '@mantine/modals'
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
          <ModalsProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ModalsProvider>
        </NotificationsProvider>
      </MantineProvider>
    </Provider>
  )
}

export default MyApp
