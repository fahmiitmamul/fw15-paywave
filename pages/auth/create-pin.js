import React from 'react'
import Image from 'next/image'
import PhoneLogin from '../../public/phone-login.svg'
import Head from 'next/head'
import { Formik } from 'formik'
import * as Yup from 'yup'

export default function CreatePin() {
  const validationSchema = Yup.object({
    code: Yup.string().required('Code is required !'),
  })

  function doSubmit(values) {
    alert(JSON.stringify(values))
  }

  return (
    <>
      <Head>
        <title>Create PIN</title>
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
              FazzPay is an application that focussing in banking needs for all
              users in the world. Always updated and always following world
              trends. 5000+ users registered in FazzPay everyday with worldwide
              users coverage.
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center flex-auto w-1/2 bg-white">
          <div className="w-3/5 flex flex-col gap-10">
            <div className="text-2xl font-bold tracking-wide">
              Secure Your Account, Your Wallet, and Your Data With 6 Digits PIN
              That You Created Yourself.
            </div>
            <div className="text-[#3A3D4299] tracking-wide">
              Create 6 digits pin to secure all your money and your data in
              FazzPay app. Keep it secret and don&apos;t tell anyone about your
              FazzPay account password and the PIN.
            </div>
            <Formik
              initialValues={{ code: '' }}
              validationSchema={validationSchema}
              onSubmit={doSubmit}
            >
              {({ handleSubmit, isSubmitting }) => {
                return (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <div className="flex flex-col gap-5">
                      <div className="flex flex-col gap-8">
                        <div className="flex gap-2 relative">
                          <input
                            type="number"
                            className="w-12 overflow-hidden h-12 text-center text-2xl bg-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            maxLength="1"
                          />
                          <input
                            type="number"
                            className="w-12 h-12 text-center text-2xl bg-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            maxLength="1"
                          />
                          <input
                            type="number"
                            className="w-12 h-12 text-center text-2xl bg-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            maxLength="1"
                          />
                          <input
                            type="number"
                            className="w-12 h-12 text-center text-2xl bg-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            maxLength="1"
                          />
                          <input
                            type="number"
                            className="w-12 h-12 text-center text-2xl bg-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            maxLength="1"
                          />
                          <input
                            type="number"
                            className="w-12 h-12 text-center text-2xl bg-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            maxLength="1"
                          />
                        </div>
                      </div>
                    </div>
                    <div>
                      <button
                        type="submit"
                        className="btn btn-primary normal-case max-w-lg w-full text-white shadow-2xl"
                        disabled={isSubmitting}
                      >
                        Confirm
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
