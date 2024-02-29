import Link from 'next/link'
import Image from 'next/image'

import { getCldImageUrl } from 'next-cloudinary'
import { auth } from "@clerk/nextjs"

export default async function Home() {
  const { userId } = await auth()
  let href = userId ? '/myworkouts' : '/sign-in'

  const url = getCldImageUrl({
    width: 500,
    height: 500,
    src: 'garten'
  })

  return (
    <div className="w-screen h-screen bg-black flex justify-center items-center text-white">
      <div className="w-full max-w-[600px] mx-auto">
        <h1 className="text-6xl mb-4">Howzit, members!</h1>
        <p className="text-2xl text-white/60 mb-4">
          It's Springtime in Munich.
        </p>
        <Image
          width="500"
          height="500"
          src={url}
          sizes="100vw"
          alt="garten"
        />
        <div>
          <Link href={href}>
            <button className="bg-blue-600 my-5 px-4 py-2 rounded-lg text-xl">
              let's get moving
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
