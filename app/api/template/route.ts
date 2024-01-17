import { prisma } from "@/utils/db"
import { NextResponse } from "next/server"

export const POST = async () => {
	const exercises = await prisma.exercise.findMany({})
	
//build this array so the thing can connect 

	let exercisesIdArray = []
	
	exercises.forEach(exercise => {
		let obj = {id: exercise.id}
		exercisesIdArray.push(obj)
	})

	const template = await prisma.template.create({
		data: {
			name: "Template Name",
			exercises: {
				connect: [{ id: "99477cff-18f9-456c-87f0-4eeecef3415b"}]
			}
		}
	})

	return NextResponse.json({ data: template })
}