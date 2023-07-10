import Footer from '@/src/components/footer'
import Header from '@/src/components/header'
import Sidebar from '@/src/components/sidebar'
import cookieConfig from '@/src/helpers/cookie-config'
import http from '@/src/helpers/http'
import * as Yup from 'yup'
import Lock from '../../../public/lock.svg'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { withIronSessionSsr } from 'iron-session/next'
import { useDispatch } from 'react-redux'
import { getProfileAction } from '@/src/redux/actions/profile'
import { Formik } from 'formik'

export const getServerSideProps = withIronSessionSsr(async ({ req }) => {
  const token = req.session.token || null
  return {
    props: {
      token,
    },
  }
}, cookieConfig)

export default function ChangePin({ token }) {
  const [errormessage, seterrormessage] = useState('')
  const [successMsg, setsuccessMsg] = useState('')
  const [loading, setLoading] = useState('')
  const dispatch = useDispatch()

  const validationSchema = Yup.object({
    oldPin: Yup.number().required('Old PIN is required !'),
    newPin: Yup.number().required('New PIN is required !'),
    confirmPin: Yup.number().required('Confirm PIN is required !'),
  })

  useEffect(() => {
    dispatch(getProfileAction(token))
  }, [dispatch, token])

  if (errormessage || successMsg) {
    setTimeout(() => {
      seterrormessage(false)
      setsuccessMsg(false)
    }, 3000)
  }

  async function doSubmit(values) {
    try {
      setLoading(true)
      const oldPin = values.oldPin
      const newPin = values.newPin
      const confirmPin = values.confirmPin
      const form = new URLSearchParams({
        oldPin,
        newPin,
        confirmPin,
      }).toString()
      const { data } = await http(token).patch('/profile/change-pin', form)
      if (data) {
        setsuccessMsg('PIN Changed successfully')
      }
      setLoading(false)
    } catch (err) {
      const message = err.response?.data?.message
      if (message === 'profile_change_pin_wrong_old') {
        seterrormessage('Wrong old pin')
      }
      setLoading(false)
    }
  }

  return (
    <>
      <Header />
      <div className="flex gap-10 w-full h-[800px] lg:py-10 lg:px-20">
        <Sidebar />
        <div className="w-full flex flex-col gap-5">
          <div className="flex flex-col w-full rounded-2xl shadow-2xl h-full p-10">
            <div className="flex flex-col gap-5 lg:w-2/6">
              <div className="font-bold text-2xl">Change Pin</div>
              <div>
                Enter your current 6 digits PayWave PIN below to continue to the
                next steps.
              </div>
            </div>
            <div className="flex w-full mx-auto mt-10 flex-col gap-5">
              {errormessage && (
                <div className="alert alert-error max-w-md text-lg text-white">
                  {errormessage}
                </div>
              )}
              {successMsg && (
                <div className="alert alert-success max-w-md text-lg text-white">
                  {successMsg}
                </div>
              )}
              <Formik
                initialValues={{
                  oldPin: '',
                  newPin: '',
                  confirmPin: '',
                }}
                validationSchema={validationSchema}
                onSubmit={doSubmit}
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
                      className="flex flex-col gap-5"
                    >
                      <div className="flex flex-col gap-5">
                        <div className="flex flex-col gap-8">
                          <div className="max-w-lg relative">
                            <input
                              type="number"
                              name="oldPin"
                              id="oldPin"
                              value={values.oldPin}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className={`border-b-2 border-gray-300 focus:border-indigo-500 focus:outline-none w-full transition duration-300 ease-in-out px-8 py-1 ${
                                touched.oldPin &&
                                errors.oldPin &&
                                'border-b-red-500'
                              }`}
                              placeholder="Enter Old Pin"
                            ></input>
                            <Image
                              alt=""
                              src={Lock}
                              className="absolute top-0"
                            />
                            {errors.oldPin && touched.oldPin && (
                              <label htmlFor="oldPin" className="label">
                                <span className="label-text-alt text-error">
                                  {errors.oldPin}
                                </span>
                              </label>
                            )}
                          </div>
                          <div className="max-w-lg relative">
                            <input
                              type="number"
                              name="newPin"
                              id="newPin"
                              value={values.newPin}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className={`border-b-2 border-gray-300 focus:border-indigo-500 focus:outline-none w-full transition duration-300 ease-in-out px-8 py-2 ${
                                touched.newPin &&
                                errors.newPin &&
                                'border-b-red-500'
                              }`}
                              placeholder="Enter New Pin"
                            ></input>
                            <Image
                              alt=""
                              src={Lock}
                              className="absolute top-2"
                            />
                            {errors.newPin && touched.newPin && (
                              <label htmlFor="newPin" className="label">
                                <span className="label-text-alt text-error">
                                  {errors.newPin}
                                </span>
                              </label>
                            )}
                          </div>
                          <div className="max-w-lg relative">
                            <input
                              type="number"
                              name="confirmPin"
                              id="confirmPin"
                              value={values.confirmPin}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className={`border-b-2 border-gray-300 focus:border-indigo-500 focus:outline-none w-full transition duration-300 ease-in-out px-8 py-2 ${
                                touched.confirmPin &&
                                errors.confirmPin &&
                                'border-b-red-500'
                              }`}
                              placeholder="Confirm PIN"
                            ></input>
                            <Image
                              alt=""
                              src={Lock}
                              className="absolute top-2"
                            />
                            {errors.confirmPin && touched.confirmPin && (
                              <label htmlFor="confirmPin" className="label">
                                <span className="label-text-alt text-error">
                                  {errors.confirmPin}
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
                          {loading && (
                            <span className="loading loading-spinner loading-sm"></span>
                          )}
                          {!loading && 'Change Pin'}
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
