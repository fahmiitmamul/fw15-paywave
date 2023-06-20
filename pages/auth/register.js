import React from 'react'
import Image from 'next/image'
import PhoneLogin from '../../public/phone-login.svg'
import Head from 'next/head'
import * as Yup from 'yup'
import Link from 'next/link'
import Lock from '../../public/lock.svg'
import Mail from '../../public/mail.svg'
import { Formik } from 'formik'
import { RxEyeClosed } from 'react-icons/rx'
import { RxEyeOpen } from 'react-icons/rx'
import { useState } from 'react'
import { useRouter } from 'next/router'
import Person from '../../public/person.svg'
import axios from 'axios'
import cookieConfig from '@/helpers/cookie-config'
import { withIronSessionSsr } from 'iron-session/next'

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req, res }) {
    const token = req.session?.token

    if (token) {
      res.setHeader('location', '/')
      res.statusCode = 302
      res.end()
      return {
        props: {
          token,
        },
      }
    }

    return {
      props: {},
    }
  },
  cookieConfig
)

export default function Register() {
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const router = useRouter()

  const validationSchema = Yup.object({
    username: Yup.string().required('Username is required !'),
    email: Yup.string().required('Email is required !'),
    password: Yup.string().required('Password is required !'),
  })

  function setInput() {
    setOpen(!open)
  }

  async function doSubmit(values) {
    try {
      setLoading(true)
      const username = values.username
      const email = values.email
      const password = values.password
      const form = new URLSearchParams({ username, email, password }).toString()
      const { data } = await axios.post('../api/register', form.toString())
      setLoading(false)
      if (data?.results?.token) {
        router.push('/auth/create-pin')
      }
    } catch (err) {
      const msg = err.response?.data?.message
      if (msg) {
        setErrorMessage('Error register')
      }
      setTimeout(() => {
        setSuccessMessage(false)
      }, 3000)
      setLoading(false)
    }
  }

  return (
    <>
      <Head>
        <title>Register</title>
      </Head>
      <div className="flex flex-auto w-full bg-primary bg-home bg-no-repeat bg-cover bg-bottom xl:h-screen">
        <div className="hidden lg:flex flex-col gap-10 flex-auto w-1/2 justify-center items-center">
          <div className="w-[60%] text-2xl text-white font-black">PayWave</div>
          <Image src={PhoneLogin} alt="" className="w-[50%]"></Image>
          <div className="flex flex-col w-[60%] text-white gap-5">
            <div className="text-2xl font-bold">
              App that cover banking needs
            </div>
            <div>
              FazzPay is an application that focussing in banking needs for all
              users in the world. Always updated and always following world
              trends. 5000+ users registered in FazzPay everyday with worldwide
              users coverage.
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center flex-auto w-1/2 bg-white px-5 h-screen sm:h-auto">
          <div className="flex flex-col gap-10 max-w-lg">
            <div className="lg:hidden flex gap-5 text-4xl font-bold">
              <Image alt="" src={Logo} className="w-10 h-10"></Image>
              <div>PayWave</div>
            </div>
            <div className="text-2xl font-bold tracking-wide">
              Start Accessing Banking Needs With All Devices and All Platforms
              With 30.000+ Users
            </div>
            <div className="text-[#3A3D4299] tracking-wide">
              Transfering money is eassier than ever, you can access FazzPay
              wherever you are. Desktop, laptop, mobile phone? we cover all of
              that for you!
            </div>
            <Formik
              initialValues={{
                username: '',
                email: '',
                password: '',
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
                  <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <div className="flex flex-col gap-5 max-w-lg justify-center">
                      <div className="flex flex-col gap-8">
                        {successMessage && (
                          <div className="alert alert-success text-lg text-center text-white">
                            {successMessage}
                          </div>
                        )}
                        {errorMessage && (
                          <div className="alert alert-error text-lg text-center text-white">
                            {errorMessage}
                          </div>
                        )}
                        <div className="max-w-lg relative">
                          <input
                            type="text"
                            name="username"
                            id="text"
                            value={values.username}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={`border-b-2 border-gray-300 focus:border-indigo-500 focus:outline-none w-full transition duration-300 ease-in-out px-8 py-1 ${
                              touched.username &&
                              errors.username &&
                              'border-b-red-500'
                            }`}
                            placeholder="Username"
                          ></input>
                          <Image
                            src={Person}
                            alt=""
                            className="absolute top-1"
                          />
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
                            type="email"
                            name="email"
                            id="email"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={`border-b-2 border-gray-300 focus:border-indigo-500 focus:outline-none w-full transition duration-300 ease-in-out px-8 py-1 ${
                              touched.email &&
                              errors.email &&
                              'border-b-red-500'
                            }`}
                            placeholder="Enter your email"
                          ></input>
                          <Image src={Mail} alt="" className="absolute top-1" />
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
                            type={open ? 'password' : 'text'}
                            name="password"
                            id="password"
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={`border-b-2 border-gray-300 focus:border-indigo-500 focus:outline-none w-full transition duration-300 ease-in-out px-8 py-2 ${
                              touched.password &&
                              errors.password &&
                              'border-b-red-500'
                            }`}
                            placeholder="Enter password"
                          ></input>
                          <Image src={Lock} alt="" className="absolute top-2" />
                          <button
                            onClick={setInput}
                            type="button"
                            className="absolute top-3 right-4"
                          >
                            {open ? (
                              <RxEyeClosed color="gray" size={20} />
                            ) : (
                              <RxEyeOpen color="gray" size={20} />
                            )}
                          </button>
                          {errors.password && touched.password && (
                            <label htmlFor="password" className="label">
                              <span className="label-text-alt text-error">
                                {errors.password}
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
                        {!loading && 'Register'}
                      </button>
                    </div>
                  </form>
                )
              }}
            </Formik>
            <div className="text-center max-w-lg">
              Already have an account? Let&apos;s&nbsp;
              <Link href="/auth/login" className="text-primary">
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
