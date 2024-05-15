import { prisma } from "@/utils/db"
import { NextResponse } from "next/server"

export const DELETE = async (request: Request, { params }) => {
    try {
        const deleteResult = await prisma.assignment.delete({
            where: {
                id: params.id
            }
        });

        // Return a successful response with the deleted assignment data
        return NextResponse.json({ deleted: true, data: deleteResult });
    } catch (error) {
        // Handle cases where the delete operation fails (e.g., assignment not found)
        console.error('Delete failed:', error);
        return new NextResponse(JSON.stringify({ deleted: false, error: 'Assignment not found' }), {
            status: 404,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}