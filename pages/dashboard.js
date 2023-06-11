import { FiArrowDown } from 'react-icons/fi'
import { FiPlus } from 'react-icons/fi'
import { FiArrowUp } from 'react-icons/fi'
import Picture from '../public/picture.jpg'
import Image from 'next/image'
import Header from '@/components/header'
import Sidebar from '@/components/sidebar'
import Footer from '@/components/footer'
import Head from 'next/head'
import TopUpModal from '@/components/topup-modal'

export default function Dashboard() {
  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <Header />
      <div className="flex gap-10 w-full h-[800px] py-10 px-20">
        <Sidebar />
        <div className="w-full flex flex-col gap-5">
          <div className="flex justify-between w-full rounded-2xl shadow-2xl h-[190px] bg-primary p-10">
            <div className="text-white">
              <div>Balance</div>
              <div className="text-[40px] font-semibold">Rp120.000</div>
              <div>+62 813-9387-7946</div>
            </div>
            <div className="flex flex-col gap-5">
              <button className="flex justify-between items-center btn btn-primary rounded-xl normal-case hover:bg-white hover:text-black text-white bg-[#FFFFFF33] border-white">
                <FiArrowUp size={25} />
                Transfer
              </button>
              <label
                htmlFor="topup-modal"
                className="flex justify-between items-center normal-case btn btn-primary rounded-xl hover:bg-white hover:text-black text-white bg-[#FFFFFF33] border-white"
              >
                <FiPlus size={25} />
                Top Up
              </label>
            </div>
          </div>
          <div className="flex gap-10">
            <div className="w-full h-[468px] shadow-2xl rounded-2xl p-10">
              <div className="flex flex-col gap-14 w-full">
                <div className="flex w-full justify-between">
                  <div className="flex flex-col gap-2">
                    <div>
                      <FiArrowDown color="green" size={35} />
                    </div>
                    <div>Income</div>
                    <div className="font-bold text-lg tracking-widest">
                      Rp.2.120.000
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div>
                      <FiArrowUp color="red" size={35} />
                    </div>
                    <div>Expense</div>
                    <div className="font-bold text-lg tracking-widest">
                      Rp.1.560.000
                    </div>
                  </div>
                </div>
                <div className="flex w-full justify-around">
                  <div className="flex flex-col gap-3 justify-end items-center">
                    <div className="w-[20px] h-[200px] rounded-full bg-primary"></div>
                    <div className="font-bold">Sun</div>
                  </div>
                  <div className="flex flex-col gap-3 justify-end items-center">
                    <div className="w-[20px] h-[90px] rounded-full bg-primary"></div>
                    <div className="font-bold">Mon</div>
                  </div>
                  <div className="flex flex-col gap-3 justify-end items-center">
                    <div className="font-bold text-sm text-green-600 rounded-lg bg-white shadow-2xl border-2 border-gray-100 p-2">
                      +Rp65.000
                    </div>
                    <div className="w-[20px] h-[120px] rounded-full bg-gray-300">
                      <div className="w-full h-[20px] rounded-full bg-primary border-4 border-white"></div>
                    </div>
                    <div className="font-bold">Tue</div>
                  </div>
                  <div className="flex flex-col gap-3 justify-end items-center">
                    <div className="w-[20px] h-[150px] rounded-full bg-gray-300"></div>
                    <div className="font-bold">Wed</div>
                  </div>
                  <div className="flex flex-col gap-3 justify-end items-center">
                    <div className="w-[20px] h-[130px] rounded-full bg-gray-300"></div>
                    <div className="font-bold">Thu</div>
                  </div>
                  <div className="flex flex-col gap-3 justify-end items-center">
                    <div className="w-[20px] h-[190px] rounded-full bg-primary"></div>
                    <div className="font-bold">Fri</div>
                  </div>
                  <div className="flex flex-col gap-3 justify-end items-center">
                    <div className="w-[20px] h-[170px] rounded-full bg-gray-300"></div>
                    <div className="font-bold">Sat</div>
                  </div>
                </div>
              </div>
              <div></div>
            </div>
            <div className="flex flex-col gap-8 w-full h-[468px] shadow-2xl rounded-2xl p-10">
              <div className="text-xl font-bold">Transaction History</div>
              <div className="flex flex-col gap-10 w-full">
                <div className="flex items-center w-full justify-between">
                  <div className="flex gap-5">
                    <div className="w-[52px] h-[52px] rounded-lg overflow-hidden">
                      <Image src={Picture} alt=""></Image>
                    </div>
                    <div>
                      <div className="font-semibold">Samuel Suhi</div>
                      <div className="text-[#7A7886]">Accept</div>
                    </div>
                  </div>
                  <div className="font-bold text-green-600">+Rp50.000</div>
                </div>
                <div className="flex items-center w-full justify-between">
                  <div className="flex gap-5">
                    <div className="w-[52px] h-[52px] rounded-lg overflow-hidden">
                      <Image src={Picture} alt=""></Image>
                    </div>
                    <div>
                      <div className="font-semibold">Netflix</div>
                      <div className="text-[#7A7886]">Transfer</div>
                    </div>
                  </div>
                  <div className="font-bold text-red-600">+Rp50.000</div>
                </div>
                <div className="flex items-center w-full justify-between">
                  <div className="flex gap-5">
                    <div className="w-[52px] h-[52px] rounded-lg overflow-hidden">
                      <Image src={Picture} alt=""></Image>
                    </div>
                    <div>
                      <div className="font-semibold">Christine</div>
                      <div className="text-[#7A7886]">Accept</div>
                    </div>
                  </div>
                  <div className="font-bold text-green-600">+Rp50.000</div>
                </div>
                <div className="flex items-center w-full justify-between">
                  <div className="flex gap-5">
                    <div className="w-[52px] h-[52px] rounded-lg overflow-hidden">
                      <Image src={Picture} alt=""></Image>
                    </div>
                    <div>
                      <div className="font-semibold">Robert Chandler</div>
                      <div className="text-[#7A7886]">Topup</div>
                    </div>
                  </div>
                  <div className="font-bold text-red-600">+Rp50.000</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <input type="checkbox" id="topup-modal" className="modal-toggle" />
      <TopUpModal />
    </>
  )
}
