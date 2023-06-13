import { BsDownload } from 'react-icons/bs'
import Picture from '../../public/picture.jpg'
import Success from '../../public/success.svg'
import Image from 'next/image'
import Sidebar from '@/components/sidebar'
import Header from '@/components/header'
import Footer from '@/components/footer'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { withIronSessionSsr } from 'iron-session/next'
import { getProfileAction } from '@/redux/actions/profile'
import cookieConfig from '@/helpers/cookie-config'
import { setMessage } from '@/redux/reducers/message'
import { useSelector } from 'react-redux'
import { FiUser } from 'react-icons/fi'

export const getServerSideProps = withIronSessionSsr(async ({ req }) => {
  const token = req.session.token || null
  return {
    props: {
      token,
    },
  }
}, cookieConfig)

export default function TransferSuccess({ token }) {
  const dispatch = useDispatch()
  const router = useRouter()
  const recipient = useSelector((state) => state.transfer.user)
  const amount = useSelector((state) => state.transfer.amount)
  const notes = useSelector((state) => state.transfer.notes)
  const profile = useSelector((state) => state.profile.data)

  useEffect(() => {
    dispatch(getProfileAction(token))
    if (!token) {
      router.push('/auth/login')
      dispatch(setMessage('You have to login first !'))
    }
  }, [dispatch, token, router])

  return (
    <>
      <Head>
        <title>Transfer Success</title>
      </Head>
      <Header />
      <div className="flex gap-10 w-full h-[800px] py-10 px-20">
        <Sidebar />
        <div className="w-full flex flex-col gap-5">
          <div className="flex flex-col gap-10 w-full rounded-2xl shadow-2xl h-full p-10">
            <div className="flex flex-col items-center gap-5 w-full justify-center">
              <Image src={Success} alt="" />
              <div className="font-bold text-xl">Transfer Success</div>
            </div>
            <div className="font-bold text-xl">Details</div>
            <div className="flex flex-col gap-5 w-full h-[500px] overflow-scroll">
              <div className="flex flex-col gap-2 border-gray-200 border-2 w-full h-[110px] shadow-md rounded-lg px-10 p-5">
                <div>Amount</div>
                <div className="font-bold text-xl">Rp {amount}</div>
              </div>
              <div className="flex flex-col gap-2 border-gray-200 border-2 w-full h-[110px] shadow-md rounded-lg px-10 p-5">
                <div>Balance Left</div>
                <div className="font-bold text-xl">Rp {profile.balance}</div>
              </div>
              <div className="flex flex-col gap-2 border-gray-200 border-2 w-full h-[110px] shadow-md rounded-lg px-10 p-5">
                <div>Date & Time</div>
                <div className="font-bold text-xl">May 11, 2020 0 12.20</div>
              </div>
              <div className="flex flex-col gap-2 border-gray-200 border-2 w-full h-[110px] shadow-md rounded-lg px-10 p-5">
                <div>Notes</div>
                <div className="font-bold text-xl">{notes}</div>
              </div>
            </div>
            <div className="font-bold text-2xl">Transfer To</div>
            <div className="flex gap-5 items-center w-full h-[110px] shadow-md rounded-lg px-10 p-5">
              {!recipient.picture && (
                <div className="w-12 h-12 bg-white border rounded flex justify-center items-center">
                  <FiUser size={35} />
                </div>
              )}
              {recipient.picture && (
                <div className="w-[52px] h-[52px] rounded-lg overflow-hidden">
                  <Image
                    src={recipient.picture}
                    alt={recipient.fullName || recipient.email}
                    width={60}
                    height={60}
                  ></Image>
                </div>
              )}
              <div className="flex flex-col gap-1.5">
                <div className="font-bold">{recipient.fullName}</div>
                <div className="text-gray-400">{recipient.email}</div>
              </div>
            </div>
            <div className="flex gap-5 w-full justify-end">
              <button className="btn bg-gray-300 normal-case">
                <BsDownload />
                Download PDF
              </button>
              <button className="btn btn-primary normal-case text-white">
                Back to home
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
