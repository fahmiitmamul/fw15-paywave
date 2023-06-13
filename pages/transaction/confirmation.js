import Picture from '../../public/picture.jpg'
import Image from 'next/image'
import Header from '@/components/header'
import Sidebar from '@/components/sidebar'
import Footer from '@/components/footer'
import Head from 'next/head'
import PinModal from '@/components/pin-modal'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { withIronSessionSsr } from 'iron-session/next'
import { getProfileAction } from '@/redux/actions/profile'
import cookieConfig from '@/helpers/cookie-config'
import { useRouter } from 'next/router'

export const getServerSideProps = withIronSessionSsr(async ({ req }) => {
  const token = req.session.token || null
  return {
    props: {
      token,
    },
  }
}, cookieConfig)

export default function Confirmation({ token }) {
  const dispatch = useDispatch()
  const router = useRouter()

  useEffect(() => {
    dispatch(getProfileAction(token))
    if (!token) {
      router.push('/auth/login')
    }
  }, [dispatch, token, router])

  return (
    <>
      <Head>
        <title>Confirmation</title>
      </Head>
      <Header />
      <div className="flex gap-10 w-full h-[800px] py-10 px-20">
        <Sidebar />
        <div className="w-full flex flex-col gap-5">
          <div className="flex flex-col gap-10 w-full rounded-2xl shadow-2xl h-full p-10">
            <div className="font-bold text-2xl">Transfer To</div>
            <div className="flex gap-5 items-center w-full h-[110px] shadow-md rounded-lg px-10 p-5">
              <div className="w-[52px] h-[52px] rounded-lg overflow-hidden">
                <Image src={Picture} alt=""></Image>
              </div>
              <div className="flex flex-col gap-1.5">
                <div className="font-bold">Samuel Suhi</div>
                <div className="text-gray-400">+62 813-8492-9994</div>
              </div>
            </div>
            <div className="font-bold text-xl">Details</div>
            <div className="flex flex-col gap-5 w-full h-[500px] overflow-scroll">
              <div className="flex flex-col gap-2 border-gray-200 border-2 w-full h-[110px] shadow-md rounded-lg px-10 p-5">
                <div>Amount</div>
                <div className="font-bold text-xl">Rp.100.000</div>
              </div>
              <div className="flex flex-col gap-2 border-gray-200 border-2 w-full h-[110px] shadow-md rounded-lg px-10 p-5">
                <div>Balance Left</div>
                <div className="font-bold text-xl">Rp.20.000</div>
              </div>
              <div className="flex flex-col gap-2 border-gray-200 border-2 w-full h-[110px] shadow-md rounded-lg px-10 p-5">
                <div>Date & Time</div>
                <div className="font-bold text-xl">May 11, 2020 0 12.20</div>
              </div>
              <div className="flex flex-col gap-2 border-gray-200 border-2 w-full h-[110px] shadow-md rounded-lg px-10 p-5">
                <div>Notes</div>
                <div className="font-bold text-xl">For buying some socks</div>
              </div>
            </div>
            <div className="flex w-full justify-end">
              <label
                htmlFor="pinModal"
                className="btn btn-primary normal-case text-white"
              >
                Continue
              </label>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <input type="checkbox" id="pinModal" className="modal-toggle" />
      <PinModal />
    </>
  )
}
