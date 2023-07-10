import Footer from '@/src/components/footer'
import Header from '@/src/components/header'
import Sidebar from '@/src/components/sidebar'
import Image from 'next/image'
import { BsPencilSquare } from 'react-icons/bs'
import { FiArrowRight } from 'react-icons/fi'
import TopUpModal from '@/src/components/topup-modal'
import { useDispatch, useSelector } from 'react-redux'
import Logout from '../auth/logout'
import Default from '../../../public/images.png'
import Link from 'next/link'
import { useState } from 'react'
import http from '@/src/helpers/http'
import cookieConfig from '@/src/helpers/cookie-config'
import { withIronSessionSsr } from 'iron-session/next'
import { getProfileAction } from '@/src/redux/actions/profile'

export const getServerSideProps = withIronSessionSsr(async ({ req }) => {
  const token = req.session.token || null
  return {
    props: {
      token,
    },
  }
}, cookieConfig)

export default function Profile({ token }) {
  const profile = useSelector((state) => state.profile.data)
  const [selectedPicture, setSelectedPicture] = useState('')
  const [loading, setLoading] = useState(false)
  const [pictureURI, setPictureURI] = useState('')
  const [message, setMessage] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const dispatch = useDispatch()

  const fileToDataUrl = (file) => {
    const reader = new FileReader()
    reader.addEventListener('load', () => {
      setPictureURI(reader.result)
    })
    reader.readAsDataURL(file)
  }

  const changePicture = (e) => {
    const file = e.target.files[0]
    setSelectedPicture(file)
    fileToDataUrl(file)
  }

  if (message || errorMsg) {
    setTimeout(() => {
      setMessage(false)
      setErrorMsg(false)
      setPictureURI(false)
    }, 3000)
  }

  const doSubmit = async (e) => {
    setLoading(true)
    e.preventDefault()
    const form = new FormData()
    if (selectedPicture) {
      form.append('picture', selectedPicture)
    }

    try {
      const { data } = await http(token).patch('/profile', form, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      if (data) {
        setMessage('Change profile photo successfully')
      }
      dispatch(getProfileAction(token))
      setLoading(false)
    } catch (err) {
      const results = err.response?.data?.message
      if (results) {
        setErrorMsg('Error change photo')
      }
    }
    setLoading(false)
    setSelectedPicture(false)
  }

  return (
    <>
      <Header />
      <div className="flex gap-10 w-full h-[800px] lg:py-10 lg:px-20">
        <Sidebar />
        <div className="w-full flex flex-col gap-5">
          <div className="flex flex-col gap-10 w-full rounded-2xl shadow-2xl h-full p-5 lg:p-10">
            <div className="flex flex-col gap-5 justify-center items-center">
              {message && (
                <div className="alert alert-success text-lg text-white max-w-lg">
                  {message}
                </div>
              )}
              {errorMsg && (
                <div className="alert alert-error text-lg text-white max-w-lg">
                  {errorMsg}
                </div>
              )}
              <div className="w-[82px] h-[82px] rounded-lg overflow-hidden">
                {selectedPicture && (
                  <Image width={80} height={80} src={pictureURI} alt=""></Image>
                )}
                {!selectedPicture && !profile.picture && (
                  <Image width={80} height={80} src={Default} alt=""></Image>
                )}
                {!selectedPicture && profile.picture && (
                  <Image
                    width={80}
                    height={80}
                    src={profile.picture}
                    alt=""
                  ></Image>
                )}
              </div>
              <form
                onSubmit={doSubmit}
                className="flex flex-col gap-3 justify-center items-center"
              >
                <button
                  type="button"
                  className="flex justify-center items-center gap-2"
                >
                  <BsPencilSquare />
                  <div className="relative">
                    <input
                      type="file"
                      id="customFileInput"
                      className="custom-file-input cursor-pointer"
                      onChange={changePicture}
                    />
                    <label
                      htmlFor="customFileInput"
                      className="custom-file-label cursor-pointer"
                    >
                      Edit
                    </label>
                  </div>
                </button>
                {pictureURI && (
                  <button
                    type="submit"
                    className="btn btn-primary normal-case text-white"
                  >
                    {loading && (
                      <span className="loading loading-spinner loading-sm"></span>
                    )}
                    {!loading && 'Save Changes'}
                  </button>
                )}
              </form>

              <div className="text-xl font-bold">{profile.fullName}</div>
              <div className="text-gray-500">{profile.email}</div>
              <Link href="/profile/personal-info" className="lg:w-[50%] w-full">
                <div className="flex justify-between items-center w-full p-7 bg-gray-300 rounded-lg cursor-pointer shadow-lg">
                  <div className="font-bold">Personal Information</div>
                  <FiArrowRight size={25} />
                </div>
              </Link>
              <Link
                href="/profile/change-password"
                className="lg:w-[50%] w-full"
              >
                <div className="flex justify-between items-center w-full p-7 bg-gray-300 rounded-lg cursor-pointer shadow-lg">
                  <div className="font-bold">Change Password</div>
                  <FiArrowRight size={25} />
                </div>
              </Link>
              <Link href="/profile/change-pin" className="lg:w-[50%] w-full">
                <div className="flex justify-between items-center w-full p-7 bg-gray-300 rounded-lg cursor-pointer shadow-lg">
                  <div className="font-bold">Change PIN</div>
                  <FiArrowRight size={25} />
                </div>
              </Link>
              <div className="lg:w-[50%] w-full">
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
