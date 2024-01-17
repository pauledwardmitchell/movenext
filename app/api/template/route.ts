import { prisma } from "@/utils/db"
import { NextResponse } from "next/server"

export const POST = async ( request: Request ) => {
	const data = await request.json()
	// const exercises = await prisma.exercise.findMany({})
	
//build this array so the thing can connect 

	// let exercisesIdArray = []
	
	// exercises.forEach(exercise => {
	// 	let obj = {id: exercise.id}
	// 	exercisesIdArray.push(obj)
	// })

	const template = await prisma.template.create({
		data: {
			name: "Template Name 4",
			exercises: {
				connect: data
			}
		}
	})

	return NextResponse.json({ data: template })
}