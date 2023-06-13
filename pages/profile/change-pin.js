import Footer from '@/components/footer'
import Header from '@/components/header'
import PinInput from '@/components/pin-input'
import Sidebar from '@/components/sidebar'
import { useState } from 'react'

export default function ChangePin() {
  const [pin, setPin] = useState('')
  return (
    <>
      <Header />
      <div className="flex gap-10 w-full h-[800px] py-10 px-20">
        <Sidebar />
        <div className="w-full flex flex-col gap-5">
          <div className="flex flex-col gap-10 w-full rounded-2xl shadow-2xl h-full p-10">
            <div className="flex flex-col gap-5 w-2/6">
              <div className="font-bold text-2xl">Change Pin</div>
              <div>
                Enter your current 6 digits PayWave PIN below to continue to the
                next steps.
              </div>
            </div>
            <div className="flex w-full mx-auto mt-10 flex-col justify-center items-center gap-20 ">
              <PinInput onChangePin={setPin} />
              <div className="flex w-1/2 items-center justify-center">
                <button className="btn btn-primary w-1/2 normal-case text-white">
                  Change PIN
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
