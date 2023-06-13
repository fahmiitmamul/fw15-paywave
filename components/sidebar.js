import { FiPlus } from 'react-icons/fi'
import { FiArrowUp } from 'react-icons/fi'
import { RxDashboard } from 'react-icons/rx'
import { BsPersonCircle } from 'react-icons/bs'
import { FiLogOut } from 'react-icons/fi'
import Logout from '@/pages/auth/logout'
import Sidebarlogout from '../pages/auth/sidebarlogout'
import Link from 'next/link'

export default function Sidebar() {
  return (
    <>
      <div className="w-[270px] h-full rounded-2xl shadow-2xl ">
        <div className="flex flex-col justify-between w-full h-full px-8 py-8">
          <div className="flex justify-center flex-col gap-10">
            <Link
              href="/dashboard"
              className="flex gap-5 items-center text-xl cursor-pointer hover:text-primary"
            >
              <RxDashboard />
              Dashboard
            </Link>
            <Link
              href="/transaction/transfer"
              className="flex gap-5 items-center text-xl cursor-pointer hover:text-primary"
            >
              <FiArrowUp />
              Transfer
            </Link>
            <label
              htmlFor="topup-modal"
              className="flex gap-5 items-center text-xl cursor-pointer hover:text-primary"
            >
              <FiPlus />
              Top Up
            </label>
            <Link
              href="/profile/profile"
              className="flex gap-5 items-center text-xl cursor-pointer hover:text-primary"
            >
              <BsPersonCircle />
              Profile
            </Link>
          </div>
          <div>
            <div className="flex gap-5 items-center text-xl cursor-pointer hover:text-red-500">
              <FiLogOut />
              <Sidebarlogout />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
