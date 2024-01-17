import { prisma } from "@/utils/db"
import { NextResponse } from "next/server"

export const POST = async ( request: Request ) => {
	const data = await request.json()
	const exercise = await prisma.exercise.create({
		data: {
			name: data.name,
			video: data.video,
			description: data.description
		}
	})

	return NextResponse.json({ data: exercise })
}