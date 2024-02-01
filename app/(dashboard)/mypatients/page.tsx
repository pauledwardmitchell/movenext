import { prisma } from "@/utils/db"
import Link from "next/link"

//will have to fetch based on provider
const getUsers = async () => {
	const users = await prisma.user.findMany()
	return users
}

const MyPatientsPage = async () => {
	const users = await getUsers()

	return (
	<div>
		<div className="p-10 bg-zinc-400/10">
			<h2 className="text-3xl mb-8">my patients</h2>
			<div className="">
			<ul>
			{users.map((user) => (
				<li>
					<Link href={`/user/${user.id}`}>{user.email}</Link>
				</li>
			))}
			</ul>
			</div> 
		</div>
	</div>
	)
}

export default MyPatientsPage