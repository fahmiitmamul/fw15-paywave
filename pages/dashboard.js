import { FiArrowDown } from 'react-icons/fi'
import { FiPlus } from 'react-icons/fi'
import { FiArrowUp } from 'react-icons/fi'
import { useState } from 'react'
import Image from 'next/image'
import Header from '@/components/header'
import Sidebar from '@/components/sidebar'
import Footer from '@/components/footer'
import Head from 'next/head'
import Default from '../public/images.png'
import TopUpModal from '@/components/topup-modal'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProfileAction } from '@/redux/actions/profile'
import { withIronSessionSsr } from 'iron-session/next'
import cookieConfig from '@/helpers/cookie-config'
import { useRouter } from 'next/router'
import { setMessage } from '@/redux/reducers/message'
import http from '@/helpers/http'
import Link from 'next/link'

export const getServerSideProps = withIronSessionSsr(async ({ req }) => {
  const token = req.session.token || null
  return {
    props: {
      token,
    },
  }
}, cookieConfig)

export default function Dashboard({ token }) {
  const profile = useSelector((state) => state.profile.data)
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
        <title>Dashboard</title>
      </Head>
      <Header />
      <div className="flex gap-10 w-full xl:h-[800px]  xl:py-10 xl:px-20">
        <Sidebar />
        <div className="w-full flex flex-col gap-5">
          <div className="flex justify-between w-full rounded-2xl shadow-2xl gap-10 xl:h-[190px] bg-primary p-10 flex-wrap">
            <div className="text-white">
              <div>Balance</div>
              <div className="text-[40px] font-semibold">
                Rp{profile.balance == null ? ' 0' : profile.balance}
              </div>
              <div>{profile.email}</div>
            </div>
            <div className="flex flex-col gap-5">
              <Link
                href="/transaction/transfer"
                className="flex justify-between items-center btn btn-primary rounded-xl normal-case hover:bg-white hover:text-black text-white bg-[#FFFFFF33] border-white"
              >
                <FiArrowUp size={25} />
                Transfer
              </Link>
              <label
                htmlFor="topup-modal"
                className="flex justify-between items-center normal-case btn btn-primary rounded-xl hover:bg-white hover:text-black text-white bg-[#FFFFFF33] border-white"
              >
                <FiPlus size={25} />
                Top Up
              </label>
            </div>
          </div>
          <div className="flex gap-10 flex-wrap lg:flex-nowrap">
            <div className="w-full xl:h-[468px] shadow-2xl rounded-2xl p-10">
              <div className="flex flex-col gap-14">
                <div className="flex w-full justify-between flex-wrap">
                  <div className="flex flex-col gap-2">
                    <div>
                      <FiArrowDown color="green" size={35} />
                    </div>
                    <div>Income</div>
                    <div className="font-bold text-lg tracking-widest">
                      Rp.2.120.000
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div>
                      <FiArrowUp color="red" size={35} />
                    </div>
                    <div>Expense</div>
                    <div className="font-bold text-lg tracking-widest">
                      Rp.1.560.000
                    </div>
                  </div>
                </div>
                <div className="flex w-full justify-around">
                  <div className="flex flex-col gap-3 justify-end items-center">
                    <div className="w-[20px] h-[200px] rounded-full bg-primary"></div>
                    <div className="font-bold">Sun</div>
                  </div>
                  <div className="flex flex-col gap-3 justify-end items-center">
                    <div className="w-[20px] h-[90px] rounded-full bg-primary"></div>
                    <div className="font-bold">Mon</div>
                  </div>
                  <div className="flex flex-col gap-3 justify-end items-center">
                    <div className="font-bold text-sm text-green-600 rounded-lg bg-white shadow-2xl border-2 border-gray-100 p-2">
                      +Rp65.000
                    </div>
                    <div className="w-[20px] h-[120px] rounded-full bg-gray-300">
                      <div className="w-full h-[20px] rounded-full bg-primary border-4 border-white"></div>
                    </div>
                    <div className="font-bold">Tue</div>
                  </div>
                  <div className="flex flex-col gap-3 justify-end items-center">
                    <div className="w-[20px] h-[150px] rounded-full bg-gray-300"></div>
                    <div className="font-bold">Wed</div>
                  </div>
                  <div className="flex flex-col gap-3 justify-end items-center">
                    <div className="w-[20px] h-[130px] rounded-full bg-gray-300"></div>
                    <div className="font-bold">Thu</div>
                  </div>
                  <div className="flex flex-col gap-3 justify-end items-center">
                    <div className="w-[20px] h-[190px] rounded-full bg-primary"></div>
                    <div className="font-bold">Fri</div>
                  </div>
                  <div className="flex flex-col gap-3 justify-end items-center">
                    <div className="w-[20px] h-[170px] rounded-full bg-gray-300"></div>
                    <div className="font-bold">Sat</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-8 w-full h-[468px] shadow-2xl rounded-2xl p-10">
              <div className="text-xl font-bold">Transaction History</div>
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
      <input type="checkbox" id="topup-modal" className="modal-toggle" />
      <TopUpModal userToken={token} />
    </>
  )
}
