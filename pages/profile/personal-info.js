import Footer from '@/components/footer'
import Header from '@/components/header'
import Sidebar from '@/components/sidebar'
import TopUpModal from '@/components/topup-modal'
import Link from 'next/link'
import { useSelector } from 'react-redux'

export default function PersonalInfo() {
  const profile = useSelector((state) => state.profile.data)
  return (
    <>
      <Header />
      <div className="flex gap-10 w-full h-[800px] py-10 px-20">
        <Sidebar />
        <div className="w-full flex flex-col gap-5">
          <div className="flex flex-col gap-10 w-full rounded-2xl shadow-2xl h-full p-10">
            <div className="flex flex-col gap-5 w-2/6">
              <div className="font-bold text-2xl">Personal Information</div>
              <div>
                We got your personal information from the sign up proccess. If
                you want to make changes on your information, contact our
                support.
              </div>
            </div>
            <div className="text-primary w-full flex justify-end">
              <Link href="/profile/manage-profile">Manage profile</Link>
            </div>
            <div className="flex flex-col gap-5 overflow-scroll">
              <div className="flex flex-col gap-2 border-gray-200 border-2 w-full h-[110px] shadow-md rounded-lg px-10 p-5">
                <div>Full Name</div>
                <div className="font-bold text-xl">
                  {profile.fullName === null ? 'Not set' : profile.fullName}
                </div>
              </div>
              <div className="flex flex-col gap-2 border-gray-200 border-2 w-full h-[110px] shadow-md rounded-lg px-10 p-5">
                <div>Verified E-mail</div>
                <div className="font-bold text-xl">
                  {profile.email === null ? 'Not set' : profile.email}
                </div>
              </div>
              <div className="flex justify-between gap-2 border-gray-200 border-2 w-full h-[110px] shadow-md rounded-lg px-10 p-5">
                <div className="flex flex-col">
                  <div>Phone Number</div>
                  <div className="font-bold text-xl">
                    {profile.phones?.length < 1 ? 'Not set' : profile.phones}
                  </div>
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
