import React from 'react'
import Image from 'next/image'
import PhoneLogin from '../../public/phone-login.svg'
import Head from 'next/head'
import Lock from '../../public/lock.svg'
import Mail from '../../public/mail.svg'
import { Formik } from 'formik'
import { RxEyeClosed } from 'react-icons/rx'
import { RxEyeOpen } from 'react-icons/rx'
import { useState } from 'react'
import * as Yup from 'yup'
import http from '@/helpers/http'
import { useRouter } from 'next/router'

export default function ResetPassword() {
  const [open, setOpen] = useState(false)
  const [errorMsg, seterrorMsg] = useState('')
  const [successMsg, setsuccessMsg] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const validationSchema = Yup.object({
    email: Yup.string().required('Email is required !'),
    password: Yup.string().required('Password is required !'),
    confirmPassword: Yup.string().required('Confirm Password is required !'),
  })

  function setInput() {
    setOpen(!open)
  }

  async function doSubmit(values) {
    setLoading(true)
    try {
      const email = values.email
      const newPassword = values.password
      const confirmPassword = values.password
      const form = new URLSearchParams({
        email,
        newPassword,
        confirmPassword,
      }).toString()
      const { data } = await http().post('/auth/reset-password', form)
      setLoading(false)
      if (data) {
        setsuccessMsg('Password has been set successfully')
      }
    } catch (err) {
      const message = err.response?.data?.message
      if (message) {
        seterrorMsg('Error reset password')
      }
    }
    setLoading(false)
  }

  if (errorMsg || successMsg) {
    setTimeout(() => {
      seterrorMsg(false)
      setsuccessMsg(false)
      router.push('/auth/login')
    }, 3000)
  }

  return (
    <>
      <Head>
        <title>Reset Password</title>
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
        <div className="flex flex-col justify-center items-center flex-auto w-1/2 bg-white">
          <div className="flex flex-col gap-10 max-w-lg">
            <div className="lg:hidden flex gap-5 text-4xl font-bold">
              <Image alt="" src={Logo} className="w-10 h-10"></Image>
              <div>PayWave</div>
            </div>
            <div className="text-2xl font-bold tracking-wide">
              Reset Password
            </div>
            <div className="text-[#3A3D4299] tracking-wide">
              Please enter code to reset your password
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
            <Formik
              initialValues={{
                email: '',
                password: '',
                confirmPassword: '',
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
                    <div className="flex flex-col gap-5">
                      <div className="flex flex-col gap-8">
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
                            placeholder="Email"
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
                        <div className="max-w-lg relative">
                          <input
                            type={open ? 'password' : 'text'}
                            name="confirmPassword"
                            id="confirmPassword"
                            value={values.confirmPassword}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={`border-b-2 border-gray-300 focus:border-indigo-500 focus:outline-none w-full transition duration-300 ease-in-out px-8 py-2 ${
                              touched.confirmPassword &&
                              errors.confirmPassword &&
                              'border-b-red-500'
                            }`}
                            placeholder="Confirm Password"
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
                          {errors.confirmPassword &&
                            touched.confirmPassword && (
                              <label
                                htmlFor="confirmPassword"
                                className="label"
                              >
                                <span className="label-text-alt text-error">
                                  {errors.confirmPassword}
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
                        {!loading && 'Reset Password'}
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
