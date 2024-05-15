import Link from 'next/link';
import Image from 'next/image';
import { getCldImageUrl } from 'next-cloudinary';
import { auth } from "@clerk/nextjs";

export default async function Home() {
  const { userId } = await auth();
  let href = userId ? '/myworkouts' : '/sign-in';

  const url = getCldImageUrl({
    width: 400,
    height: 400,
    src: 'augustyn_fitness_logo_hurdler_png',
  });

  return (
    <div className="w-screen h-screen bg-black flex justify-center items-center text-white">
      <div className="text-center">
        <h1 className="text-6xl mb-4">hambisa</h1>
        <Image
          width="400"
          height="400"
          src={url}
          sizes="100vw"
          alt="augustyn_fitness_logo"
        />
        <h1 className="text-6xl mb-4">let's move</h1>
        <div>
          <Link href={href}>
            <button className="bg-blue-600 my-5 px-4 py-2 rounded-lg text-xl text-white">
              get started
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
