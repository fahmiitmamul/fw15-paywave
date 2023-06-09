import React from 'react'
import Image from 'next/image'
import PhoneLogin from '../../public/phone-login.svg'
import Head from 'next/head'
import Mail from '../../public/mail.svg'
import { Formik } from 'formik'
import * as Yup from 'yup'

export default function ForgotPassword() {
  const validationSchema = Yup.object({
    code: Yup.string().required('Code is required !'),
  })

  function doSubmit(values) {
    alert(JSON.stringify(values))
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
        <div className="flex flex-col justify-center items-center flex-auto w-1/2 bg-white">
          <div className="w-1/2 flex flex-col gap-10">
            <div className="text-2xl font-bold tracking-wide">
              Did You Forgot Your Password? Don&apos;t Worry, You Can Reset Your
              Password In a Minutes.
            </div>
            <div className="text-[#3A3D4299] tracking-wide">
              To reset your password, you must type your e-mail and we will send
              a link to your email and you will be directed to the reset
              password screens.
            </div>
            <Formik
              initialValues={{ code: '' }}
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
                            name="code"
                            id="code"
                            value={values.code}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={`border-b-2 border-gray-300 focus:border-indigo-500 focus:outline-none w-full transition duration-300 ease-in-out px-8 py-1 ${
                              touched.code && errors.code && 'border-b-red-500'
                            }`}
                            placeholder="Enter your code"
                          ></input>
                          <Image src={Mail} alt="" className="absolute top-1" />
                          {errors.code && touched.code && (
                            <label htmlFor="code" className="label">
                              <span className="label-text-alt text-error">
                                {errors.code}
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
                        Send Link
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
