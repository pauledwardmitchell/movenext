import Link from 'next/link'
import Image from 'next/image'

import { getCldImageUrl } from 'next-cloudinary'
import { auth } from "@clerk/nextjs"

export default async function Home() {
  const { userId } = await auth()
  let href = userId ? '/myworkouts' : '/sign-in'

  const url = getCldImageUrl({
    width: 400,
    height: 400,
    src: 'augustyn_fitness_logo_hurdler'
  })

  return (
    <div className="w-screen h-screen bg-white flex justify-center items-center text-black">
      <div className="w-full max-w-[600px] mx-auto">
        <h1 className="text-6xl mb-4">hambisa.</h1>
        <Image
          width="400"
          height="400"
          src={url}
          sizes="100vw"
          alt="augustyn_fitness_logo"
        />
        <h1 className="text-6xl mb-4">let's move.</h1>
        <div>
          <Link href={href}>
            <button className="bg-blue-800 my-5 px-4 py-2 rounded-lg text-xl text-white">
              get started
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
