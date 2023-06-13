import React, { useEffect, useState } from 'react'
import PinInput from '@/components/pin-input'
import Image from 'next/image'
import PhoneLogin from '../../public/phone-login.svg'
import Head from 'next/head'
import cookieConfig from '@/helpers/cookie-config'
import http from '@/helpers/http'
import { withIronSessionSsr } from 'iron-session/next'
import { useDispatch, useSelector } from 'react-redux'
import { getProfileAction } from '@/redux/actions/profile'
import { useRouter } from 'next/router'

export const getServerSideProps = withIronSessionSsr(async ({ req }) => {
  const token = req.session.token || null
  return {
    props: {
      token,
    },
  }
}, cookieConfig)

export default function CreatePin({ token }) {
  const profile = useSelector((state) => state.profile.data)
  const [loading, setLoading] = useState(false)
  const [errMessage, seterrMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [pin, setPin] = useState('')
  const dispatch = useDispatch()
  const router = useRouter()

  async function doSubmit(e) {
    e.preventDefault()
    try {
      setLoading(true)
      const email = profile.email
      const form = new URLSearchParams({ email: email, code: pin })
      alert(form)
      const { data } = await http(token).post('/auth/set-pin', form)
      setLoading(false)

      if (data) {
        setSuccessMessage('Pin set successfully')
      }

      setTimeout(() => {
        router.push('/dashboard')
      }, 3000)
    } catch (err) {
      const errMsg = err.response?.data?.message
      if (errMsg === 'auth_pin_already_set') {
        seterrMessage('Pin already set')
      }
      setTimeout(() => {
        seterrMessage(false)
      }, 3000)
      setLoading(false)
    }
  }

  useEffect(() => {
    dispatch(getProfileAction(token))
  }, [dispatch, token, router])

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
              PayWave is an application that focussing in banking needs for all
              users in the world. Always updated and always following world
              trends. 5000+ users registered in FazzPay everyday with worldwide
              users coverage.
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center flex-auto w-1/2 bg-white">
          <div className="flex flex-col gap-10 justify-center items-center">
            <div className="w-3/5 flex flex-col gap-10">
              <div className="text-2xl font-bold tracking-wide">
                Secure Your Account, Your Wallet, and Your Data With 6 Digits
                PIN That You Created Yourself.
              </div>
              {errMessage && (
                <div className="alert alert-error text-xl text-white text-center">
                  {errMessage}
                </div>
              )}
              {successMessage && (
                <div className="alert alert-success text-xl text-white text-center">
                  {successMessage}
                </div>
              )}
              <div className="text-[#3A3D4299] tracking-wide">
                Create 6 digits pin to secure all your money and your data in
                FazzPay app. Keep it secret and don&apos;t tell anyone about
                your FazzPay account password and the PIN.
              </div>
            </div>
            <form className="flex flex-col gap-5" onSubmit={doSubmit}>
              <PinInput onChangePin={setPin} />
              <button
                type="submit"
                className="btn btn-primary normal-case max-w-sm w-full text-white shadow-2xl"
              >
                {loading && (
                  <span className="loading loading-spinner loading-sm"></span>
                )}
                {!loading && 'Set Pin'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
