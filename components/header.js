import Link from 'next/link'
import Image from 'next/image'
import { FiArrowDown, FiArrowUp, FiBell } from 'react-icons/fi'
import Picture from '../public/picture.jpg'
import { useSelector } from 'react-redux'

export default function Header() {
  const profile = useSelector((state) => state.profile.data)
  return (
    <>
      <div className="flex justify-between items-center w-full h-[140px] rounded-2xl shadow-2xl p-12">
        <Link href="/" className="text-3xl font-bold text-primary">
          PayWave
        </Link>
        <div className="flex justify-center items-center gap-14">
          <div className="flex gap-3">
            <div className="w-[52px] h-[52px] rounded-lg overflow-hidden">
              <Image
                src={profile.picture}
                width={50}
                height={50}
                alt=""
              ></Image>
            </div>
            <div className="flex flex-col gap-1">
              <div className="font-semibold">{profile.fullName}</div>
              <div className="text-gray-600">+62 8139 3877 7946</div>
            </div>
          </div>
          <div className="z-10">
            <div className="dropdown dropdown-end">
              <label
                tabIndex={0}
                className="flex items-center justify-center cursor-pointer"
              >
                <FiBell size={25} />
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-[500px] h-[500px]"
              >
                <div className="flex flex-col gap-5 overflow-scroll">
                  <div className="flex gap-3 items-center p-5 rounded-lg shadow-lg border-2 border-gray-200">
                    <FiArrowDown size={25} color="green" />
                    <div>
                      <div className="text-gray-400 text-lg">
                        Accept from Joshua Lee
                      </div>
                      <div className="font-bold text-xl">Rp220.000</div>
                    </div>
                  </div>
                  <div className="flex gap-3 items-center p-5 rounded-lg shadow-lg border-2 border-gray-200">
                    <FiArrowUp size={25} color="red" />
                    <div>
                      <div className="text-gray-400 text-lg">
                        Transfer to Deni
                      </div>
                      <div className="font-bold text-xl">Rp220.000</div>
                    </div>
                  </div>
                  <div className="flex gap-3 items-center p-5 rounded-lg shadow-lg border-2 border-gray-200">
                    <FiArrowUp size={25} color="red" />
                    <div>
                      <div className="text-gray-400 text-lg">
                        Transfer to Deni
                      </div>
                      <div className="font-bold text-xl">Rp220.000</div>
                    </div>
                  </div>
                  <div className="flex gap-3 items-center p-5 rounded-lg shadow-lg border-2 border-gray-200">
                    <FiArrowUp size={25} color="red" />
                    <div>
                      <div className="text-gray-400 text-lg">
                        Transfer to Jessica Lee
                      </div>
                      <div className="font-bold text-xl">Rp220.000</div>
                    </div>
                  </div>
                  <div className="flex gap-3 items-center p-5 rounded-lg shadow-lg border-2 border-gray-200">
                    <FiArrowDown size={25} color="green" />
                    <div>
                      <div className="text-gray-400 text-lg">
                        Accept from Joshua Lee
                      </div>
                      <div className="font-bold text-xl">Rp220.000</div>
                    </div>
                  </div>
                </div>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
