import { prisma } from "@/utils/db"
import { NextResponse } from "next/server"

export const POST = async ( request: Request ) => {
	const data = await request.json()

	const template = await prisma.template.create({
		data: {
			name: data.name,
			sections: data.sections
		}
	})

	return NextResponse.json({ data: template })
}