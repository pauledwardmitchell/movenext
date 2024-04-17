import { prisma } from "@/utils/db"
import { NextResponse } from "next/server"

export const PATCH = async ( request: Request, {params} ) => {
	const data = await request.json()
	const updatedExercise = await prisma.exercise.update({
		where: {
			id: params.id
		},
		data: {
			name: data.name,
			video: data.video,
			description: data.description,
			work: data.work
		}
	})

	return NextResponse.json({ data: updatedExercise })
}