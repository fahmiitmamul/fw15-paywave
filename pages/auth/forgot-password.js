import React, { useState } from 'react'
import Image from 'next/image'
import PhoneLogin from '../../public/phone-login.svg'
import Head from 'next/head'
import Mail from '../../public/mail.svg'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { useRouter } from 'next/router'
import http from '@/helpers/http'
import Logo from '../../public/logo.png'

export default function ForgotPassword() {
  const [successMsg, setSuccessMsg] = useState('')
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const router = useRouter()
  const validationSchema = Yup.object({
    email: Yup.string().required('Email is required !'),
  })

  async function doSubmit(values) {
    try {
      setLoading(true)
      const email = values.email
      const form = new URLSearchParams({ email }).toString()
      const { data } = await http().post('/auth/forgot-password', form)
      setLoading(false)
      if (data) {
        setSuccessMsg('Request to reset password has been sent')
      }
      setTimeout(() => {
        router.push('/auth/reset-password')
      }, 3000)
    } catch (err) {
      const message = err.response?.data?.message
      if (message === 'auth_wrong_user') {
        setErrorMsg('User not found')
      }

      if (message === 'auth_forgot_already_requested') {
        setErrorMsg('Request already sent')
      }

      setTimeout(() => {
        setErrorMsg(false)
        setSuccessMsg(false)
      }, 3000)
    }

    setLoading(false)
  }

  return (
    <>
      <Head>
        <title>Forgot Password</title>
      </Head>
      <div className="flex flex-auto w-full bg-primary bg-home bg-no-repeat bg-cover bg-bottom h-screen">
        <div className="hidden lg:flex flex-col gap-10 flex-auto w-1/2 justify-center items-center">
          <div className="w-[60%] text-2xl text-white font-black">PayWave</div>
          <Image src={PhoneLogin} alt="" className="w-[50%]"></Image>
          <div className="flex flex-col w-[60%] text-white gap-5">
            <div className="text-2xl font-bold">
              App that cover banking needs
            </div>
            <div>
              PayWave is an application that focussing in banking needs for all
              users in the world. Always updated and always following world
              trends. 5000+ users registered in FazzPay everyday with worldwide
              users coverage.
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center flex-auto w-1/2 px-5 bg-white">
          <div className="flex flex-col gap-10 max-w-lg">
            <div className="lg:hidden flex gap-5 text-4xl font-bold">
              <Image alt="" src={Logo} className="w-10 h-10"></Image>
              <div>PayWave</div>
            </div>
            <div className="text-2xl font-bold tracking-wide">
              Did You Forgot Your Password? Don&apos;t Worry, You Can Reset Your
              Password In a Minutes.
            </div>
            {errorMsg && (
              <div className="alert alert-error text-xl text-white text-center">
                {errorMsg}
              </div>
            )}
            {successMsg && (
              <div className="alert alert-success text-xl text-white text-center">
                {successMsg}
              </div>
            )}
            <div className="text-[#3A3D4299] tracking-wide">
              To reset your password, you must type your e-mail and we will send
              a link to your email and you will be directed to the reset
              password screens.
            </div>
            <Formik
              initialValues={{ email: '' }}
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
                    <div className="flex flex-col gap-5">
                      <div className="flex flex-col gap-8">
                        <div className="max-w-lg relative">
                          <input
                            type="text"
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
                        {!loading && 'Send Link'}
                      </button>
                    </div>
                  </form>
                )
              }}
            </Formik>
          </div>
        </div>
      </div>
    </>
  )
}
