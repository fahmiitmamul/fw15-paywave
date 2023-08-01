import { LuSearch } from 'react-icons/lu'
import Image from 'next/image'
import Head from 'next/head'
import Header from '@/src/components/header'
import Sidebar from '@/src/components/sidebar'
import Footer from '@/src/components/footer'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { withIronSessionSsr } from 'iron-session/next'
import { getProfileAction } from '@/src/redux/actions/profile'
import { setMessage } from '@/src/redux/reducers/message'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { setRecipient as setRecipientAction } from '../../redux/reducers/transfer'
import cookieConfig from '@/src/helpers/cookie-config'
import http from '@/src/helpers/http'
import { FiUser } from 'react-icons/fi'
import { useState, useCallback } from 'react'

export const getServerSideProps = withIronSessionSsr(async ({ req }) => {
  const token = req.session.token || null
  return {
    props: {
      token,
    },
  }
}, cookieConfig)

export default function Transfer({ token }) {
  const dispatch = useDispatch()
  const [recipient, setRecipient] = useState({})
  const router = useRouter()
  const [search, setSearch] = useState('')
  const getUsers = useCallback(
    async (page = 1, search = '') => {
      const { data } = await http(token).get('/users', {
        params: {
          page,
          search,
        },
      })
      setRecipient(data)
    },
    [token]
  )

  useEffect(() => {
    getUsers()
  }, [getUsers])

  useEffect(() => {
    getUsers(1, search)
  }, [getUsers, search])

  const recipientRedux = useSelector((state) => state.transfer.user)

  useEffect(() => {
    if (recipientRedux) {
      router.push('/transaction/input-amount')
    }
  }, [recipientRedux, router])

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
        <title>Transfer</title>
      </Head>
      <Header />
      <div className="flex gap-10 w-full h-[800px] lg:py-10 lg:px-20">
        <Sidebar />
        <div className="w-full flex flex-col gap-5">
          <div className="flex flex-col gap-10 w-full rounded-2xl shadow-2xl h-full p-10">
            <div className="text-lg font-bold">Search Receiver</div>
            <div>
              <div className="relative">
                <input
                  onChange={(e) => setSearch(e.target.value)}
                  type="text"
                  placeholder="Search receiver here"
                  className="input input-bordered w-full max-w-full px-10 bg-gray-200"
                />
                <LuSearch size={25} className="absolute top-2.5 left-3" />
              </div>
            </div>
            <div className="flex flex-col gap-5 w-full h-[500px] overflow-scroll">
              {recipient.results && (
                <>
                  {recipient.results.map((item) => (
                    <>
                      <div
                        onClick={() => dispatch(setRecipientAction(item))}
                        className="cursor-pointer flex gap-5 items-center w-full border-2 rounded-lg p-5"
                      >
                        <div className="w-[52px] h-[52px] rounded-lg overflow-hidden">
                          {!item.picture && (
                            <div className="w-12 h-12 bg-white border rounded flex justify-center items-center">
                              <FiUser size={35} />
                            </div>
                          )}
                          {item.picture && (
                            <div className="w-[52px] h-[52px] rounded-lg overflow-hidden">
                              <Image
                                src={item.picture}
                                alt={item.fullName || item.email}
                                width={60}
                                className="w-full h-full object-cover"
                                height={60}
                              ></Image>
                            </div>
                          )}
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <div className="font-bold">{item.fullName}</div>
                          <div className="text-gray-400">{item.email}</div>
                        </div>
                      </div>
                    </>
                  ))}
                </>
              )}
            </div>

            <div className="flex justify-center items-center gap-4">
              <button
                onClick={() => getUsers(recipient.pageInfo?.page - 1, search)}
                disabled={recipient.pageInfo?.page <= 1}
                className="btn bg-primary text-white border-none normal-case hover:bg-primary"
              >
                Prev
              </button>
              <div className="font-semibold">
                {recipient.pageInfo?.page} of {recipient.pageInfo?.totalPage}
              </div>
              <button
                onClick={() => getUsers(recipient.pageInfo?.page + 1, search)}
                disabled={
                  recipient.pageInfo?.page === recipient.pageInfo?.totalPage
                }
                className="btn bg-primary text-white border-none normal-case hover:bg-primary"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
