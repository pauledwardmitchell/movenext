import { prisma } from "@/utils/db"
import { NextResponse } from "next/server"

export const PATCH = async ( request: Request, {params} ) => {
	const data = await request.json()
	const updatedUser = await prisma.user.update({
		where: {
			id: params.id
		},
		data: {
			active: data.active
		}
	})

	return NextResponse.json({ data: updatedUser })
}