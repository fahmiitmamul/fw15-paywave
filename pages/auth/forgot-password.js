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
      <div className="flex flex-auto w-full bg-primary bg-home bg-no-repeat bg-cover bg-bottom">
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
        <div className="flex flex-col justify-center items-center flex-auto w-1/2 bg-white">
          <div className="w-1/2 flex flex-col gap-10">
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
