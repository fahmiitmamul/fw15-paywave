import Footer from '@/components/footer'
import Header from '@/components/header'
import Sidebar from '@/components/sidebar'
import Image from 'next/image'
import Picture from '../public/picture.jpg'
import { BsPencilSquare } from 'react-icons/bs'
import { FiArrowRight } from 'react-icons/fi'

export default function Profile() {
  return (
    <>
      <Header />
      <div className="flex gap-10 w-full h-[800px] py-10 px-20">
        <Sidebar />
        <div className="w-full flex flex-col gap-5">
          <div className="flex flex-col gap-10 w-full rounded-2xl shadow-2xl h-full p-10">
            <div className="flex flex-col gap-5 justify-center items-center">
              <div className="w-[82px] h-[82px] rounded-lg overflow-hidden">
                <Image src={Picture} alt=""></Image>
              </div>
              <button className="flex justify-center items-center gap-2">
                <BsPencilSquare />
                <div>Edit</div>
              </button>
              <div className="text-xl font-bold">Robert Chandler</div>
              <div className="text-gray-500">+62 813-9387-7946</div>
              <div className="w-[50%]">
                <div className="flex justify-between items-center w-full p-7 bg-gray-300 rounded-lg cursor-pointer shadow-lg">
                  <div className="font-bold">Personal Information</div>
                  <FiArrowRight size={25} />
                </div>
              </div>
              <div className="w-[50%]">
                <div className="flex justify-between items-center w-full p-7 bg-gray-300 rounded-lg cursor-pointer shadow-lg">
                  <div className="font-bold">Change Password</div>
                  <FiArrowRight size={25} />
                </div>
              </div>
              <div className="w-[50%]">
                <div className="flex justify-between items-center w-full p-7 bg-gray-300 rounded-lg cursor-pointer shadow-lg">
                  <div className="font-bold">Change PIN</div>
                  <FiArrowRight size={25} />
                </div>
              </div>
              <div className="w-[50%]">
                <div className="flex justify-between items-center w-full p-7 bg-gray-300 rounded-lg cursor-pointer shadow-lg">
                  <div className="font-bold">Logout</div>
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
