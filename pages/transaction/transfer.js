import { FiBell } from 'react-icons/fi'
import { FiPlus } from 'react-icons/fi'
import { FiArrowUp } from 'react-icons/fi'
import { RxDashboard } from 'react-icons/rx'
import { BsPersonCircle } from 'react-icons/bs'
import { FiLogOut } from 'react-icons/fi'
import { LuSearch } from 'react-icons/lu'
import Link from 'next/link'
import Picture from '../public/picture.jpg'
import Image from 'next/image'
import Head from 'next/head'
import Header from '@/components/header'
import Sidebar from '@/components/sidebar'
import Footer from '@/components/footer'

export default function Transfer() {
  return (
    <>
      <Head>
        <title>Transfer</title>
      </Head>
      <Header />
      <div className="flex gap-10 w-full h-[800px] py-10 px-20">
        <Sidebar />
        <div className="w-full flex flex-col gap-5">
          <div className="flex flex-col gap-10 w-full rounded-2xl shadow-2xl h-full p-10">
            <div className="text-lg font-bold">Search Receiver</div>
            <div>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search receiver here"
                  className="input input-bordered w-full max-w-full px-10 bg-gray-200"
                />
                <LuSearch size={25} className="absolute top-2.5 left-3" />
              </div>
            </div>
            <div className="flex flex-col gap-5 w-full h-[500px] overflow-scroll">
              <div className="flex gap-5 items-center w-full h-[110px] shadow-md rounded-lg px-10 p-5">
                <div className="w-[52px] h-[52px] rounded-lg overflow-hidden">
                  <Image src={Picture} alt=""></Image>
                </div>
                <div className="flex flex-col gap-1.5">
                  <div className="font-bold">Samuel Suhi</div>
                  <div className="text-gray-400">+62 813-8492-9994</div>
                </div>
              </div>
              <div className="flex gap-5 items-center w-full h-[110px] shadow-md rounded-lg px-10 p-5">
                <div className="w-[52px] h-[52px] rounded-lg overflow-hidden">
                  <Image src={Picture} alt=""></Image>
                </div>
                <div className="flex flex-col gap-1.5">
                  <div className="font-bold">Samuel Suhi</div>
                  <div className="text-gray-400">+62 813-8492-9994</div>
                </div>
              </div>
              <div className="flex gap-5 items-center w-full h-[110px] shadow-md rounded-lg px-10 p-5">
                <div className="w-[52px] h-[52px] rounded-lg overflow-hidden">
                  <Image src={Picture} alt=""></Image>
                </div>
                <div className="flex flex-col gap-1.5">
                  <div className="font-bold">Samuel Suhi</div>
                  <div className="text-gray-400">+62 813-8492-9994</div>
                </div>
              </div>
              <div className="flex gap-5 items-center w-full h-[110px] shadow-md rounded-lg px-10 p-5">
                <div className="w-[52px] h-[52px] rounded-lg overflow-hidden">
                  <Image src={Picture} alt=""></Image>
                </div>
                <div className="flex flex-col gap-1.5">
                  <div className="font-bold">Samuel Suhi</div>
                  <div className="text-gray-400">+62 813-8492-9994</div>
                </div>
              </div>
              <div className="flex gap-5 items-center w-full h-[110px] shadow-md rounded-lg px-10 p-5">
                <div className="w-[52px] h-[52px] rounded-lg overflow-hidden">
                  <Image src={Picture} alt=""></Image>
                </div>
                <div className="flex flex-col gap-1.5">
                  <div className="font-bold">Samuel Suhi</div>
                  <div className="text-gray-400">+62 813-8492-9994</div>
                </div>
              </div>
              <div className="flex gap-5 items-center w-full h-[110px] shadow-md rounded-lg px-10 p-5">
                <div className="w-[52px] h-[52px] rounded-lg overflow-hidden">
                  <Image src={Picture} alt=""></Image>
                </div>
                <div className="flex flex-col gap-1.5">
                  <div className="font-bold">Samuel Suhi</div>
                  <div className="text-gray-400">+62 813-8492-9994</div>
                </div>
              </div>
              <div className="flex gap-5 items-center w-full h-[110px] shadow-md rounded-lg px-10 p-5">
                <div className="w-[52px] h-[52px] rounded-lg overflow-hidden">
                  <Image src={Picture} alt=""></Image>
                </div>
                <div className="flex flex-col gap-1.5">
                  <div className="font-bold">Samuel Suhi</div>
                  <div className="text-gray-400">+62 813-8492-9994</div>
                </div>
              </div>
              <div className="flex gap-5 items-center w-full h-[110px] shadow-md rounded-lg px-10 p-5">
                <div className="w-[52px] h-[52px] rounded-lg overflow-hidden">
                  <Image src={Picture} alt=""></Image>
                </div>
                <div className="flex flex-col gap-1.5">
                  <div className="font-bold">Samuel Suhi</div>
                  <div className="text-gray-400">+62 813-8492-9994</div>
                </div>
              </div>
              <div className="flex gap-5 items-center w-full h-[110px] shadow-md rounded-lg px-10 p-5">
                <div className="w-[52px] h-[52px] rounded-lg overflow-hidden">
                  <Image src={Picture} alt=""></Image>
                </div>
                <div className="flex flex-col gap-1.5">
                  <div className="font-bold">Samuel Suhi</div>
                  <div className="text-gray-400">+62 813-8492-9994</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
