import Image from 'next/image'
import Phone from '../public/phone.svg'
import Partner1 from '../public/partner-1.svg'
import Partner2 from '../public/partner-2.svg'
import Partner3 from '../public/partner-3.svg'
import Partner4 from '../public/partner-4.svg'
import Call from '../public/call.png'
import Download from '../public/download.png'
import Lock from '../public/lock.png'
import Phone2 from '../public/phone-2.svg'
import Phone3 from '../public/phone-3.svg'
import Profile from '../public/profile.png'
import Link from 'next/link'
import Head from 'next/head'
import { FaArrowLeft } from 'react-icons/fa'
import { FaArrowRight } from 'react-icons/fa'
import { withIronSessionSsr } from 'iron-session/next'
import cookieConfig from '@/helpers/cookie-config'
import Logout from './auth/logout'

export const getServerSideProps = withIronSessionSsr(async ({ req }) => {
  const token = req.session.token || null
  return {
    props: {
      token,
    },
  }
}, cookieConfig)

export default function Home({ token }) {
  return (
    <>
      <Head>
        <title>PayWave</title>
      </Head>
      <div className="bg-primary bg-home flex flex-col w-full h-[885px] bg-no-repeat bg-cover">
        <div className="flex flex-wrap w-full h-auto justify-between gap-5 px-5 py-5 md:px-10 md:py-10">
          <div className="text-[29px] font-bold text-white">PayWave</div>
          <div className="flex gap-10">
            {token ? (
              <Logout />
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className="btn bg-transparent border-secondary normal-case text-white hover:bg-white hover:text-black hover:border-white shadow-xl"
                >
                  Log in
                </Link>
                <Link
                  href="/auth/register"
                  className="btn btn-secondary normal-case shadow-xl"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
        <div className="flex w-full h-[800px]">
          <div className="flex flex-auto lg:justify-center lg:items-center">
            <div className="w-full lg:w-[50%] h-[75%]">
              <div className="flex flex-col gap-10 max-w-[474px] p-10 md:pl-10 lg:px-0">
                <div className="sm:text-[60px] font-black text-white">
                  Awesome App For Saving Time
                </div>
                <div className="text-white">
                  We bring you a mobile app for banking problems that oftenly
                  wasting much of your times.
                </div>
                <div>
                  <button className="btn border-none bg-white border-white normal-case text-primary hover:shadow-2xl">
                    Try It Free
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="hidden xl:flex flex-auto">
            <div className="w-full flex justify-center items-center">
              <Image src={Phone} alt="phone"></Image>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-32 justify-center w-full bg-blue-50 py-14">
        <Image src={Partner1} alt="partner-2"></Image>
        <Image src={Partner2} alt="partner-3"></Image>
        <Image src={Partner3} alt="partner-1"></Image>
        <Image src={Partner4} alt="partner-4"></Image>
      </div>
      <div className="flex flex-col w-full h-auto px-5 lg:px-0 gap-20 bg-primary bg-home bg-no-repeat bg-cover">
        <div className="flex pt-20 flex-col">
          <div className="max-w-[670px] m-auto flex flex-col gap-10 text-white">
            <div className="text-center text-xl lg:text-[60px] font-black">
              About the application.
            </div>
            <div className="text-center">
              We have some great features from the application and it’s totally
              free to use by all users around the world.
            </div>
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-10 pb-20 text-center">
          <div className="w-[367px] md:h-[344px] py-5 bg-white rounded-3xl shadow-2xl cursor-pointer">
            <div className="w-full h-full flex flex-col gap-8 justify-center items-center px-10">
              <Image alt="" src={Call}></Image>
              <div className="text-[24px] font-bold text-[#3A3D42]">
                24/7 Support
              </div>
              <div className="text-center text-[#3A3D42E5]">
                We have 24/7 contact support so you can contact us whenever you
                want and we will respond it.
              </div>
            </div>
          </div>
          <div className="w-[367px] md:h-[344px] py-5 bg-white rounded-3xl shadow-2xl cursor-pointer">
            <div className="w-full h-full flex flex-col gap-8 justify-center items-center px-10">
              <Image alt="" src={Lock}></Image>
              <div className="text-[24px] font-bold text-[#3A3D42]">
                Data Privacy
              </div>
              <div className="text-center text-[#3A3D42E5]">
                We make sure your data is safe in our database and we will
                encrypt any data you submitted to us.
              </div>
            </div>
          </div>
          <div className="w-[367px] md:h-[344px] py-5 bg-white rounded-3xl shadow-2xl cursor-pointer">
            <div className="w-full h-full flex flex-col gap-8 justify-center items-center px-10">
              <Image alt="" src={Download}></Image>
              <div className="text-[24px] font-bold text-[#3A3D42]">
                Easy Download
              </div>
              <div className="text-center text-[#3A3D42E5]">
                PayWave is 100% totally free to use it’s now available on Google
                Play Store and App Store.
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-full h-auto lg:h-[1015px] bg-white">
        <div className="hidden lg:flex flex-auto bg-blue-50 w-full overflow-hidden justify-center">
          <div className="flex flex-col">
            <Image alt="" src={Phone3}></Image>
            <Image alt="" src={Phone2}></Image>
          </div>
        </div>
        <div className="flex flex-col px-10 lg:px-0 py-10 lg:py-0 gap-12 flex-auto bg-blue-50 w-full items-center justify-center">
          <div className="md:text-[60px] font-bold max-w-[620px] text-[#3A3D42E5] text-center">
            All The <span className="text-primary">Great</span> PayWave
            Features.
          </div>
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-2 max-w-[620px] h-auto bg-white shadow-2xl rounded-2xl p-8">
              <div className="text-lg text-[#3A3D42E5] font-bold">
                <span className="text-primary">1.</span> Small Fee
              </div>
              <div className="text-[#3A3D42E5]">
                We only charge 5% of every success transaction done in FazzPay
                app.
              </div>
            </div>
            <div className="flex flex-col gap-2 max-w-[620px] h-auto bg-white shadow-2xl rounded-2xl p-8">
              <div className="text-lg text-[#3A3D42E5] font-bold">
                <span className="text-primary">2.</span> Data Secured
              </div>
              <div className="text-[#3A3D42E5]">
                All your data is secured properly in our system and it’s
                encrypted.
              </div>
            </div>
            <div className="flex flex-col gap-2 max-w-[620px] h-auto bg-white shadow-2xl rounded-2xl p-6">
              <div className="text-lg text-[#3A3D42E5] font-bold">
                <span className="text-primary">3.</span> User Friendly
              </div>
              <div className="text-[#3A3D42E5]">
                PayWave come up with modern and sleek design and not
                complicated.
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center px-10 lg:px-0 py-10 lg:py-0 items-center w-full h-auto lg:h-[1015px] bg-white gap-16">
        <div className="md:text-[60px] font-black text-[#3A3D42E5] text-center">
          What Users are <span className="text-primary">Saying.</span>
        </div>
        <div className="text-[#3A3D42E5] max-w-[567px] text-center">
          We have some great features from the application and it’s totally free
          to use by all users around the world.
        </div>
        <div className="flex justify-center items-center gap-16 text-[#3A3D42E5]">
          <div className="hidden xl:flex w-[60px] h-[60px] rounded-2xl bg-blue-50 p-3 shadow-2xl cursor-pointer">
            <FaArrowLeft size={35} color="#4942E4" />
          </div>
          <div className="flex flex-col text-center justify-center items-center gap-20 lg:max-w-[988px] h-auto py-10 lg:py-0 lg:h-[496px] rounded-lg bg-blue-50 shadow-2xl px-5 lg:px-20">
            <div className="flex flex-col gap-5 items-center">
              <div>
                <Image src={Profile} alt=""></Image>
              </div>
              <div className="flex flex-col justify-center items-center">
                <div className="font-black text-2xl">Alex Hansinburg</div>
                <div>Designer</div>
              </div>
            </div>
            <div className="text-center">
              “This is the most outstanding app that I’ve ever try in my live,
              this app is such an amazing masterpiece and it’s suitable for you
              who is bussy with their bussiness and must transfer money to
              another person aut there. Just try this app and see the power!”
            </div>
          </div>
          <div className="hidden xl:flex w-[60px] h-[60px] rounded-2xl bg-blue-50 p-3 shadow-2xl cursor-pointer">
            <FaArrowRight size={35} color="#4942E4" />
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full lg:h-[438px] bg-primary p-5 lg:p-20 gap-10 text-white">
        <div className="text-[36px] font-bold">PayWave</div>
        <div className="max-w-[285px]">
          Simplify financial needs and saving much time in banking needs with
          one single app.
        </div>
        <div className="border-b-2"></div>
        <div className="flex flex-wrap w-full justify-between">
          <div>2023 PayWave. All right reserved.</div>
          <div className="flex flex-wrap gap-5">
            <div>+62 1234 5678 7891</div>
            <div>contact@paywave.com</div>
          </div>
        </div>
      </div>
    </>
  )
}
