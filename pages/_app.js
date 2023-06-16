import ProgressBar from '@/components/progress-bar'
import '@/styles/globals.css'
import { Nunito_Sans } from 'next/font/google'
import { Provider } from 'react-redux'
import { store } from '@/redux/store'

const Nunito = Nunito_Sans({
  weight: '400',
  subsets: ['latin'],
})

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <main className={Nunito.className}>
        <ProgressBar />
        <Component {...pageProps} />
      </main>
    </Provider>
  )
}
