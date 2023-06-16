import Footer from '@/components/footer'
import Header from '@/components/header'
import Sidebar from '@/components/sidebar'
import cookieConfig from '@/helpers/cookie-config'
import http from '@/helpers/http'
import * as Yup from 'yup'
import { useEffect, useState } from 'react'
import { withIronSessionSsr } from 'iron-session/next'
import { useDispatch } from 'react-redux'
import { getProfileAction } from '@/redux/actions/profile'
import { Formik } from 'formik'
import { CgProfile } from 'react-icons/cg'
import { MdEmail } from 'react-icons/md'

export const getServerSideProps = withIronSessionSsr(async ({ req }) => {
  const token = req.session.token || null
  return {
    props: {
      token,
    },
  }
}, cookieConfig)

export default function ManageProfile({ token }) {
  const [errormessage, seterrormessage] = useState('')
  const [successMsg, setsuccessMsg] = useState('')
  const [loading, setLoading] = useState('')
  const dispatch = useDispatch()

  const validationSchema = Yup.object({
    username: Yup.string().required('Username is required !'),
    fullName: Yup.string().required('Full Name is required !'),
    email: Yup.string().required('Email is required !'),
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
      const email = values.email
      const username = values.username
      const fullName = values.fullName
      const form = new URLSearchParams({
        email,
        username,
        fullName,
      }).toString()
      const { data } = await http(token).patch('/profile', form)
      if (data) {
        setsuccessMsg('Profile Changed successfully')
      }
      dispatch(getProfileAction(token))
      setLoading(false)
    } catch (err) {
      const message = err.response?.data?.message
      if (message) {
        seterrormessage('Error update profile')
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
              <div className="font-bold text-2xl">Edit Profile</div>
              <div>Lets fill this form to edit your profile</div>
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
                  username: '',
                  email: '',
                  fullName: '',
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
                              type="text"
                              name="username"
                              id="username"
                              value={values.username}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className={`border-b-2 border-gray-300 focus:border-indigo-500 focus:outline-none w-full transition duration-300 ease-in-out px-8 py-1 ${
                                touched.username &&
                                errors.username &&
                                'border-b-red-500'
                              }`}
                              placeholder="Enter Username"
                            ></input>
                            <CgProfile className="absolute top-0" size={25} />
                            {errors.username && touched.username && (
                              <label htmlFor="username" className="label">
                                <span className="label-text-alt text-error">
                                  {errors.username}
                                </span>
                              </label>
                            )}
                          </div>
                          <div className="max-w-lg relative">
                            <input
                              type="text"
                              name="email"
                              id="email"
                              value={values.email}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className={`border-b-2 border-gray-300 focus:border-indigo-500 focus:outline-none w-full transition duration-300 ease-in-out px-8 py-2 ${
                                touched.email &&
                                errors.email &&
                                'border-b-red-500'
                              }`}
                              placeholder="Enter Email"
                            ></input>
                            <MdEmail className="absolute top-2" size={25} />
                            {errors.email && touched.email && (
                              <label htmlFor="email" className="label">
                                <span className="label-text-alt text-error">
                                  {errors.email}
                                </span>
                              </label>
                            )}
                          </div>
                          <div className="max-w-lg relative">
                            <input
                              type="text"
                              name="fullName"
                              id="fullName"
                              value={values.fullName}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className={`border-b-2 border-gray-300 focus:border-indigo-500 focus:outline-none w-full transition duration-300 ease-in-out px-8 py-2 ${
                                touched.fullName &&
                                errors.fullName &&
                                'border-b-red-500'
                              }`}
                              placeholder="Enter Full Name"
                            ></input>
                            <CgProfile className="absolute top-1.5" size={25} />
                            {errors.fullName && touched.fullName && (
                              <label htmlFor="fullName" className="label">
                                <span className="label-text-alt text-error">
                                  {errors.fullName}
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
                          {!loading && 'Update Profile'}
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
