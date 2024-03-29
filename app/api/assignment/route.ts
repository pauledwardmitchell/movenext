import { prisma } from "@/utils/db"
import { NextResponse } from "next/server"

export const POST = async ( request: Request ) => {
	const data = await request.json()
	
	const assignment = await prisma.assignment.create({
		data: {
			name: data.name,
			user: {
				connect: {
					id: data.userId,
				},
			},
			template: {
				connect: {
					id: data.templateId
				},
			},

		}
	})

	return NextResponse.json({ data: assignment })
}