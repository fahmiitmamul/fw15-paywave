import ProgressBar from '@/components/progress-bar'
import '@/styles/globals.css'
import { Nunito_Sans } from 'next/font/google'

const Nunito = Nunito_Sans({
  weight: '400',
  subsets: ['latin'],
})

export default function App({ Component, pageProps }) {
  return (
    <main className={Nunito.className}>
      <ProgressBar />
      <Component {...pageProps} />
    </main>
  )
}
