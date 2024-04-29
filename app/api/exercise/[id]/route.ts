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

export const DELETE = async (request: Request, { params }) => {
    try {
        const deleteResult = await prisma.exercise.delete({
            where: {
                id: params.id
            }
        });

        // Return a successful response with the deleted exercise data
        return NextResponse.json({ deleted: true, data: deleteResult });
    } catch (error) {
        // Handle cases where the delete operation fails (e.g., exercise not found)
        console.error('Delete failed:', error);
        return new NextResponse(JSON.stringify({ deleted: false, error: 'exercise not found' }), {
            status: 404,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}