import React, { useState } from 'react'
import Image from 'next/image'
import PhoneLogin from '../../public/phone-login.svg'
import Head from 'next/head'

export default function Login() {
  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <div className="flex flex-auto w-full h-screen bg-primary bg-home bg-no-repeat bg-cover bg-bottom">
        <div className="flex flex-col gap-10 flex-auto w-1/2 justify-center items-center">
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
            <div className="flex flex-col gap-5">
              <input className="input input-bordered max-w-lg"></input>
              <input className="input input-bordered max-w-lg"></input>
              <div className="text-right max-w-lg">Forgot Password ?</div>
            </div>
            <div>
              <button className="btn btn-primary normal-case max-w-lg w-full text-white shadow-2xl">
                Login
              </button>
            </div>
            <div className="text-center max-w-lg">
              Don&apos;t have an account ? Let&apos;s Sign Up
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
