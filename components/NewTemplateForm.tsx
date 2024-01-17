'use client'

import { createNewTemplate } from '@/utils/api'
// import { revalidatePath } from 'next/cache'
import { useRouter } from 'next/navigation'

const NewTemplateForm = () => {
  const router = useRouter()

  const handleOnClick = async () => {
    const { data } = await createNewTemplate()
    router.push(`/template/${data.id}`)
  }

  return (
    <div
      className="h-[500px]cursor-pointer overflow-hidden rounded-lg bg-white shadow"

    >
      <div className="px-4 py-5 sm:p-6">
        <button className="bg-blue-600 px-4 py-2 rounded-lg text-xl" onClick={handleOnClick} >new template</button>
      </div>
    </div>
  )
}

export default NewTemplateForm