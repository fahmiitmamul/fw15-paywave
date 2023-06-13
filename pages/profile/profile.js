import Footer from '@/components/footer'
import Header from '@/components/header'
import Sidebar from '@/components/sidebar'
import Image from 'next/image'
import { BsPencilSquare } from 'react-icons/bs'
import { FiArrowRight } from 'react-icons/fi'
import TopUpModal from '@/components/topup-modal'
import { useSelector } from 'react-redux'
import Logout from '../auth/logout'
import Link from 'next/link'

export default function Profile() {
  const profile = useSelector((state) => state.profile.data)
  return (
    <>
      <Header />
      <div className="flex gap-10 w-full h-[800px] py-10 px-20">
        <Sidebar />
        <div className="w-full flex flex-col gap-5">
          <div className="flex flex-col gap-10 w-full rounded-2xl shadow-2xl h-full p-10">
            <div className="flex flex-col gap-5 justify-center items-center">
              <div className="w-[82px] h-[82px] rounded-lg overflow-hidden">
                <Image
                  width={80}
                  height={80}
                  src={profile.picture}
                  alt=""
                ></Image>
              </div>
              <button className="flex justify-center items-center gap-2">
                <BsPencilSquare />
                <div>Edit</div>
              </button>
              <div className="text-xl font-bold">{profile.fullName}</div>
              <div className="text-gray-500">{profile.email}</div>
              <Link href="/profile/personal-info" className="w-[50%]">
                <div className="flex justify-between items-center w-full p-7 bg-gray-300 rounded-lg cursor-pointer shadow-lg">
                  <div className="font-bold">Personal Information</div>
                  <FiArrowRight size={25} />
                </div>
              </Link>
              <Link href="/profile/change-password" className="w-[50%]">
                <div className="flex justify-between items-center w-full p-7 bg-gray-300 rounded-lg cursor-pointer shadow-lg">
                  <div className="font-bold">Change Password</div>
                  <FiArrowRight size={25} />
                </div>
              </Link>
              <Link href="/profile/change-pin" className="w-[50%]">
                <div className="flex justify-between items-center w-full p-7 bg-gray-300 rounded-lg cursor-pointer shadow-lg">
                  <div className="font-bold">Change PIN</div>
                  <FiArrowRight size={25} />
                </div>
              </Link>
              <div className="w-[50%]">
                <div className="flex justify-between items-center w-full p-7 bg-gray-300 rounded-lg cursor-pointer shadow-lg">
                  <Logout />
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
