import '../styles/globals.scss'
import Layout from '../components/client/Layout'
import { AppProps } from 'next/app'
import { Children, FC, ReactElement, ReactNode } from 'react'
import { NextPage } from 'next'
import { Provider } from 'react-redux'
import { useStore } from '../redux/store'

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => {
  // Use the layout defined at the page level, if available
  const store = useStore(pageProps.initialReduxState)
  const getLayout = Component.getLayout ?? ((page) => page)

  return getLayout(
  <Provider store={store}>
    <Component {...pageProps} />
  </Provider>
  )
}

export default MyApp
