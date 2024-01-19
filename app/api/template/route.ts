import { prisma } from "@/utils/db"
import { NextResponse } from "next/server"

export const POST = async ( request: Request ) => {
	const data = await request.json()

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