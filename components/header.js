import Link from 'next/link'
import Image from 'next/image'
import { FiBell } from 'react-icons/fi'
import Picture from '../public/picture.jpg'

export default function Header() {
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
    </>
  )
}
