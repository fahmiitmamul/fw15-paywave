import Image from 'next/image'
import Header from '@/src/components/header'
import Sidebar from '@/src/components/sidebar'
import Footer from '@/src/components/footer'
import Head from 'next/head'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useRef } from 'react'
import { withIronSessionSsr } from 'iron-session/next'
import { getProfileAction } from '@/src/redux/actions/profile'
import cookieConfig from '@/src/helpers/cookie-config'
import { useRouter } from 'next/router'
import { setMessage } from '@/src/redux/reducers/message'
import { FiUser } from 'react-icons/fi'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { LuPencil } from 'react-icons/lu'
import { setAmount, setNotes } from '@/src/redux/reducers/transfer'

export const getServerSideProps = withIronSessionSsr(async ({ req }) => {
  const token = req.session.token || null
  return {
    props: {
      token,
    },
  }
}, cookieConfig)

export default function InputAmount({ token }) {
  const dispatch = useDispatch()
  const router = useRouter()
  const recipient = useSelector((state) => state.transfer.user)
  const profile = useSelector((state) => state.profile.data)
  const inputNumber = useRef()

  function setInput(e) {
    console.log(e.target.value)
  }

  const validationSchema = Yup.object({
    amount: Yup.number().required('Amount is required !'),
    notes: Yup.string().required('Notes is required !'),
  })

  const doLogin = async function (values) {
    dispatch(setAmount(values.amount))
    dispatch(setNotes(values.notes))
    router.push('/transaction/confirmation')
  }

  useEffect(() => {
    dispatch(getProfileAction(token))
    if (!token) {
      router.push('/auth/login')
      dispatch(setMessage('You have to login first !'))
    }

    if (!recipient) {
      router.push('/dashboard')
      dispatch(setMessage('You have to make transfer first !'))
    }
  }, [dispatch, token, router, recipient])

  return (
    <>
      <Head>
        <title>Confirmation</title>
      </Head>
      <Header />
      <div className="flex gap-10 w-full h-[800px] lg:py-10 lg:px-20">
        <Sidebar />
        <div className="w-full flex flex-col gap-5">
          <div className="flex flex-col gap-10 w-full rounded-2xl shadow-2xl h-full p-10">
            <div className="font-bold text-2xl">Transfer Money</div>
            <div className="flex flex-wrap gap-5 items-center w-full md:h-[110px] shadow-md rounded-lg px-10 p-5">
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
                    className="w-full h-full object-cover"
                  ></Image>
                </div>
              )}
              <div className="flex flex-col gap-1.5">
                <div className="font-bold">{recipient.fullName}</div>
                <div className="text-gray-400">{recipient.email}</div>
              </div>
            </div>
            <div className="max-w-[350px]">
              Type the amount you want to transfer and then press continue to
              the next steps.
            </div>
            <div className="flex w-full justify-center items-center">
              <Formik
                initialValues={{ amount: '', notes: '' }}
                validationSchema={validationSchema}
                onSubmit={doLogin}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleBlur,
                  handleSubmit,
                  handleChange,
                  isSubmitting,
                }) => {
                  return (
                    <form
                      onSubmit={handleSubmit}
                      className="flex flex-col gap-5 w-full justify-center items-center"
                    >
                      <div className="flex flex-col gap-5 w-full justify-center items-center">
                        <div className="flex flex-col gap-8 w-full justify-center items-center">
                          <div className="relative">
                            <input
                              type="number"
                              name="amount"
                              id="amount"
                              maxLength={3}
                              value={values.amount}
                              ref={inputNumber}
                              onChange={handleChange}
                              onKeyUp={(e) => console.log(e.target.value)}
                              onBlur={handleBlur}
                              className={`border border-gray-400 w-full rounded-lg py-10 text-4xl text-center ${
                                touched.amount && errors.amount
                              }`}
                              placeholder={new Intl.NumberFormat('in-IN', {
                                style: 'currency',
                                currency: 'IDR',
                              }).format(0)}
                            ></input>
                            {errors.amount && touched.amount && (
                              <label htmlFor="amount" className="label">
                                <span className="label-text-alt text-error">
                                  {errors.amount}
                                </span>
                              </label>
                            )}
                          </div>
                          <div className="text-center">
                            <span className="font-bold">
                              {new Intl.NumberFormat('in-IN', {
                                style: 'currency',
                                currency: 'IDR',
                              }).format(profile.balance)}
                            </span>{' '}
                            Available
                          </div>
                          <div className="max-w-sm relative">
                            <input
                              type="text"
                              name="notes"
                              id="notes"
                              value={values.notes}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className={`border-b-2 border-gray-300 focus:border-indigo-500 focus:outline-none w-full transition duration-300 ease-in-out px-8 py-2 ${
                                touched.notes &&
                                errors.notes &&
                                'border-b-red-500'
                              }`}
                              placeholder="Enter notes"
                            ></input>
                            <LuPencil className="absolute top-3" />
                            {errors.notes && touched.notes && (
                              <label htmlFor="notes" className="label">
                                <span className="label-text-alt text-error">
                                  {errors.notes}
                                </span>
                              </label>
                            )}
                          </div>
                        </div>
                      </div>
                      <div>
                        <button
                          type="submit"
                          className="btn btn-primary normal-case max-w-lg w-full text-white shadow-2xl"
                          disabled={isSubmitting}
                        >
                          Continue
                        </button>
                      </div>
                    </form>
                  )
                }}
              </Formik>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
