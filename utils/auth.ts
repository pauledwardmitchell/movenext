import { prisma } from './db'
import { auth, currentUser } from '@clerk/nextjs'

export const getUserFromClerkID = async (select = { id: true }) => {
  const { userId } = await auth()
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      clerkId: userId as string,
    },

  })

  return user
}

// export const getUserRoleFromClerkID = async (select = { id: true }) => {
//   const { userId } = await auth()
//   const user = await prisma.user.findUniqueOrThrow({
//     where: {
//       clerkId: userId as string,
//     },
//   })

//   return user.role
// }