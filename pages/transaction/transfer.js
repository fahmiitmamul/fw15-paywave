import { LuSearch } from 'react-icons/lu'
import Picture from '../../public/picture.jpg'
import Image from 'next/image'
import Head from 'next/head'
import Header from '@/components/header'
import Sidebar from '@/components/sidebar'
import Footer from '@/components/footer'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { withIronSessionSsr } from 'iron-session/next'
import { getProfileAction } from '@/redux/actions/profile'
import { setMessage } from '@/redux/reducers/message'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { setRecipient as setRecipientAction } from '@/redux/reducers/transfer'
import cookieConfig from '@/helpers/cookie-config'
import http from '@/helpers/http'
import { FiUser } from 'react-icons/fi'

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
  const [recipient, setRecipient] = React.useState({})
  const router = useRouter()
  const [search, setSearch] = React.useState('')
  const getUsers = React.useCallback(
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
      router.push('/transfer/amount')
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
      <div className="flex gap-10 w-full h-[800px] py-10 px-20">
        <Sidebar />
        <div className="w-full flex flex-col gap-5">
          <div className="flex flex-col gap-10 w-full rounded-2xl shadow-2xl h-full p-10">
            <div className="text-lg font-bold">Search Receiver</div>
            <div>
              <div className="relative">
                <input
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
                      <div className="flex gap-5 items-center w-full h-[110px] shadow-md rounded-lg px-10 p-5">
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
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
