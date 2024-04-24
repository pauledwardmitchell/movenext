import { prisma } from "@/utils/db"
import { NextResponse } from "next/server"

export const PATCH = async ( request: Request, {params} ) => {
	const data = await request.json()
	const updatedTemplate = await prisma.template.update({
		where: {
			id: params.id
		},
		data: {
			name: data.name,
			sections: data.sections
		}
	})

	return NextResponse.json({ data: updatedTemplate })
}

export const DELETE = async (request: Request, { params }) => {
    try {
        // Attempt to delete the template using the provided ID
        const deleteResult = await prisma.template.delete({
            where: {
                id: params.id
            }
        });

        // Return a successful response with the deleted template data
        return NextResponse.json({ deleted: true, data: deleteResult });
    } catch (error) {
        // Handle cases where the delete operation fails (e.g., template not found)
        console.error('Delete failed:', error);
        return new NextResponse(JSON.stringify({ deleted: false, error: 'Template not found' }), {
            status: 404,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}
