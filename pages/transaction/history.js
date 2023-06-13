import Picture from '../../public/picture.jpg'
import Image from 'next/image'
import Header from '@/components/header'
import Sidebar from '@/components/sidebar'
import Footer from '@/components/footer'
import Head from 'next/head'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { withIronSessionSsr } from 'iron-session/next'
import { getProfileAction } from '@/redux/actions/profile'
import cookieConfig from '@/helpers/cookie-config'
import { useRouter } from 'next/router'
import { setMessage } from '@/redux/reducers/message'

export const getServerSideProps = withIronSessionSsr(async ({ req }) => {
  const token = req.session.token || null
  return {
    props: {
      token,
    },
  }
}, cookieConfig)

export default function History({ token }) {
  const dispatch = useDispatch()
  const router = useRouter()

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
        <title>History</title>
      </Head>
      <Header />
      <div className="flex gap-10 w-full h-[800px] py-10 px-20">
        <Sidebar />
        <div className="w-full flex flex-col gap-5">
          <div className="flex flex-col gap-10 w-full rounded-2xl shadow-2xl h-full p-10">
            <div className="flex w-full justify-between">
              <div className="text-xl font-bold">Transaction History</div>
              <div>
                <div className="dropdown">
                  <label tabIndex={0} className="btn normal-case m-1">
                    Select Filter
                  </label>
                  <ul
                    tabIndex={0}
                    className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
                  >
                    <li>
                      <a>Item 1</a>
                    </li>
                    <li>
                      <a>Item 2</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-10 w-full">
              <div className="flex items-center w-full justify-between">
                <div className="flex gap-5">
                  <div className="w-[52px] h-[52px] rounded-lg overflow-hidden">
                    <Image src={Picture} alt=""></Image>
                  </div>
                  <div>
                    <div className="font-semibold">Samuel Suhi</div>
                    <div className="text-[#7A7886]">Accept</div>
                  </div>
                </div>
                <div className="font-bold text-green-600">+Rp50.000</div>
              </div>
              <div className="flex items-center w-full justify-between">
                <div className="flex gap-5">
                  <div className="w-[52px] h-[52px] rounded-lg overflow-hidden">
                    <Image src={Picture} alt=""></Image>
                  </div>
                  <div>
                    <div className="font-semibold">Netflix</div>
                    <div className="text-[#7A7886]">Transfer</div>
                  </div>
                </div>
                <div className="font-bold text-red-600">+Rp50.000</div>
              </div>
              <div className="flex items-center w-full justify-between">
                <div className="flex gap-5">
                  <div className="w-[52px] h-[52px] rounded-lg overflow-hidden">
                    <Image src={Picture} alt=""></Image>
                  </div>
                  <div>
                    <div className="font-semibold">Christine</div>
                    <div className="text-[#7A7886]">Accept</div>
                  </div>
                </div>
                <div className="font-bold text-green-600">+Rp50.000</div>
              </div>
              <div className="flex items-center w-full justify-between">
                <div className="flex gap-5">
                  <div className="w-[52px] h-[52px] rounded-lg overflow-hidden">
                    <Image src={Picture} alt=""></Image>
                  </div>
                  <div>
                    <div className="font-semibold">Robert Chandler</div>
                    <div className="text-[#7A7886]">Topup</div>
                  </div>
                </div>
                <div className="font-bold text-red-600">+Rp50.000</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
