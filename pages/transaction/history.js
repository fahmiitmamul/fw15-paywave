import Image from 'next/image'
import Header from '@/components/header'
import Sidebar from '@/components/sidebar'
import Footer from '@/components/footer'
import Head from 'next/head'
import Default from '../../public/images.png'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { withIronSessionSsr } from 'iron-session/next'
import { getProfileAction } from '@/redux/actions/profile'
import cookieConfig from '@/helpers/cookie-config'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { setMessage } from '@/redux/reducers/message'
import http from '@/helpers/http'

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
  const [transactions, setTransaction] = useState([])
  const [errorFetch, setErrorFetch] = useState('')

  useEffect(() => {
    dispatch(getProfileAction(token))
    if (!token) {
      router.push('/auth/login')
      dispatch(setMessage('You have to login first !'))
    }

    async function fetchHistoryTransaction() {
      try {
        const { data } = await http(token).get('/transactions?page=1&limit=5')
        setTransaction(data.results)
      } catch (err) {
        const message = err.response?.data?.message
        if (message) {
          setErrorFetch('Message')
        }
      }
    }

    fetchHistoryTransaction()
  }, [dispatch, token, router])

  return (
    <>
      <Head>
        <title>History</title>
      </Head>
      <Header />
      <div className="flex gap-10 w-full h-[800px] lg:py-10 lg:px-20">
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
                    className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-24"
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
              <div className="flex flex-col gap-10 w-full overflow-scroll">
                {transactions.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center w-full justify-between"
                  >
                    <div className="flex w-full gap-5">
                      {item.type === 'TOP-UP' && (
                        <>
                          <div className="flex w-full justify-between">
                            <div className="flex gap-5">
                              <div className="w-[52px] h-[52px] rounded-lg overflow-hidden">
                                {!item.recipient.picture && (
                                  <div>
                                    <Image src={Default} alt=""></Image>
                                  </div>
                                )}
                                {item.recipient.picture && (
                                  <Image
                                    src={item.recipient.picture}
                                    alt=""
                                    width={60}
                                    height={60}
                                  ></Image>
                                )}
                              </div>
                              <div>
                                <div className="font-semibold">
                                  {item.recipient.fullName ||
                                    item.recipient.email}
                                </div>
                                <div className="text-[#7A7886]">
                                  {item.type}
                                </div>
                              </div>
                            </div>
                            <div className="font-bold text-green-600">
                              + Rp{Number(item.amount).toLocaleString('id')}
                            </div>
                          </div>
                        </>
                      )}
                      {item.type === 'TRANSFER' && (
                        <>
                          <div className="flex w-full justify-between">
                            <div className="flex gap-5">
                              <div className="w-[52px] h-[52px] rounded-lg overflow-hidden">
                                {!item.recipient.picture && (
                                  <div>
                                    <Image src={Default} alt=""></Image>
                                  </div>
                                )}
                                {item.recipient.picture && (
                                  <Image
                                    src={item.recipient.picture}
                                    alt=""
                                    width={60}
                                    height={60}
                                  ></Image>
                                )}
                              </div>
                              <div>
                                <div className="font-semibold">
                                  {item.recipient.fullName ||
                                    item.recipient.email}
                                </div>
                                <div className="text-[#7A7886]">
                                  {item.type}
                                </div>
                              </div>
                            </div>
                            <div className="font-bold text-red-600">
                              - Rp{Number(item.amount).toLocaleString('id')}
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
