import Picture from '../../public/picture.jpg'
import Image from 'next/image'
import Header from '@/components/header'
import Sidebar from '@/components/sidebar'
import Footer from '@/components/footer'
import Head from 'next/head'

export default function Confirmation() {
  return (
    <>
      <Head>
        <title>Confirmation</title>
      </Head>
      <Header />
      <div className="flex gap-10 w-full h-[800px] py-10 px-20">
        <Sidebar />
        <div className="w-full flex flex-col gap-5">
          <div className="flex flex-col gap-10 w-full rounded-2xl shadow-2xl h-full p-10">
            <div className="font-bold text-2xl">Transfer To</div>
            <div className="flex gap-5 items-center w-full h-[110px] shadow-md rounded-lg px-10 p-5">
              <div className="w-[52px] h-[52px] rounded-lg overflow-hidden">
                <Image src={Picture} alt=""></Image>
              </div>
              <div className="flex flex-col gap-1.5">
                <div className="font-bold">Samuel Suhi</div>
                <div className="text-gray-400">+62 813-8492-9994</div>
              </div>
            </div>
            <div className="font-bold text-xl">Details</div>
            <div className="flex flex-col gap-5 w-full h-[500px] overflow-scroll">
              <div className="flex flex-col gap-2 border-gray-200 border-2 w-full h-[110px] shadow-md rounded-lg px-10 p-5">
                <div>Amount</div>
                <div className="font-bold text-xl">Rp.100.000</div>
              </div>
              <div className="flex flex-col gap-2 border-gray-200 border-2 w-full h-[110px] shadow-md rounded-lg px-10 p-5">
                <div>Balance Left</div>
                <div className="font-bold text-xl">Rp.20.000</div>
              </div>
              <div className="flex flex-col gap-2 border-gray-200 border-2 w-full h-[110px] shadow-md rounded-lg px-10 p-5">
                <div>Date & Time</div>
                <div className="font-bold text-xl">May 11, 2020 0 12.20</div>
              </div>
              <div className="flex flex-col gap-2 border-gray-200 border-2 w-full h-[110px] shadow-md rounded-lg px-10 p-5">
                <div>Notes</div>
                <div className="font-bold text-xl">For buying some socks</div>
              </div>
            </div>
            <div className="flex w-full justify-end">
              <button className="btn btn-primary normal-case text-white">
                Continue
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
