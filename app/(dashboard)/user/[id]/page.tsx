import { prisma } from "@/utils/db";
import Link from "next/link";
import UserAssignments from "@/components/UserAssignments";

const getUser = async (id) => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
    include: {
      assignments: true,
    },
  });
  return user;
};

const UserPage = async ({ params }) => {
  const user = await getUser(params.id);
  return (
    <div className="w-full h-full">
      <div>{user.firstName} {user.lastName} | {user.email}</div>
      <UserAssignments initialAssignments={user.assignments} />
    </div>
  );
};

export default UserPage;
