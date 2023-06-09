import { FiBell } from 'react-icons/fi'
import { FiPlus } from 'react-icons/fi'
import { FiArrowUp } from 'react-icons/fi'
import { RxDashboard } from 'react-icons/rx'
import { BsPersonCircle } from 'react-icons/bs'
import { FiLogOut } from 'react-icons/fi'
import Link from 'next/link'
import Picture from '../public/picture.jpg'
import Image from 'next/image'

export default function History() {
  return (
    <>
      <div className="flex justify-between items-center w-full h-[140px] rounded-2xl shadow-2xl p-12">
        <Link href="/" className="text-3xl font-bold text-primary">
          PayWave
        </Link>
        <div className="flex justify-center items-center gap-14">
          <div className="flex gap-3">
            <div className="w-[52px] h-[52px] rounded-lg overflow-hidden">
              <Image src={Picture} alt=""></Image>
            </div>
            <div className="flex flex-col gap-1">
              <div className="font-semibold">Robert Chandler</div>
              <div className="text-gray-600">+62 8139 3877 7946</div>
            </div>
          </div>
          <div>
            <FiBell size={25} />
          </div>
        </div>
      </div>
      <div className="flex gap-10 w-full h-[800px] py-10 px-20">
        <div className="w-[270px] h-full rounded-2xl shadow-2xl ">
          <div className="flex flex-col justify-between w-full h-full px-8 py-8">
            <div className="flex justify-center flex-col gap-10">
              <div className="flex gap-5 items-center text-xl cursor-pointer hover:text-primary">
                <RxDashboard />
                Dashboard
              </div>
              <div className="flex gap-5 items-center text-xl cursor-pointer hover:text-primary">
                <FiArrowUp />
                Transfer
              </div>
              <div className="flex gap-5 items-center text-xl cursor-pointer hover:text-primary">
                <FiPlus />
                Top Up
              </div>
              <div className="flex gap-5 items-center text-xl cursor-pointer hover:text-primary">
                <BsPersonCircle />
                Profile
              </div>
            </div>
            <div>
              <div className="flex gap-5 items-center text-xl cursor-pointer hover:text-red-500">
                <FiLogOut />
                Log Out
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col gap-5">
          <div className="flex flex-col gap-10 w-full rounded-2xl shadow-2xl h-full p-10">
            <div className="flex w-full justify-between">
              <div className="text-xl font-bold">Transaction History</div>
              <div>
                <div className="dropdown">
                  <label tabIndex={0} className="btn normal-case m-1">
                    Select Filter
                  </label>
                  <ul
                    tabIndex={0}
                    className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
                  >
                    <li>
                      <a>Item 1</a>
                    </li>
                    <li>
                      <a>Item 2</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
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
      <div className="flex justify-between items-center w-full h-[68px] bg-primary text-white font-semibold px-10">
        <div>2020 FazzPay. All right reserved.</div>
        <div className="flex gap-5">
          <div>+62 5637 8882 9901</div>
          <div>contact@fazzpay.com</div>
        </div>
      </div>
    </>
  )
}
