import ProgressBar from '@/components/progress-bar'
import '@/styles/globals.css'
import { Poppins } from 'next/font/google'

const poppins = Poppins({
  weight: '400',
  subsets: ['latin'],
})

export default function App({ Component, pageProps }) {
  return (
    <main className={poppins.className}>
      <ProgressBar />
      <Component {...pageProps} />
    </main>
  )
}
