import { prisma } from "@/utils/db"
import { NextResponse } from "next/server"

export const POST = async ( request: Request ) => {
	const data = await request.json()
	
console.log("inside upload post request...", data)

	// const assignment = await prisma.assignment.create({
	// 	data: {
	// 		name: data.name,
	// 		user: {
	// 			connect: {
	// 				id: data.userId,
	// 			},
	// 		},
	// 		template: {
	// 			connect: {
	// 				id: data.templateId
	// 			},
	// 		},

	// 	}
	// })

	// return NextResponse.json({ data: assignment })
}

// import { NextApiRequest, NextApiResponse } from 'next';
// import { unstable_parseMultipartFormData, UploadHandler } from 'next/dist/server/multipart';
// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method !== 'POST') {
//     res.status(405).json({ error: 'Method not allowed' });
//     return;
//   }

//   // Placeholder values for video and image URLs
//   // These should be replaced with actual paths or URLs after processing the files
//   let videoUrl = "";
//   let imageUrl = "";

//   const uploadHandler: UploadHandler = async ({ file, filename, encoding, mimetype }) => {
//     // Process the file here (e.g., save it to your server or a cloud storage)
//     // and generate the URL or path for the file
//     // For simplicity, we're just generating a placeholder URL
//     if (mimetype.includes("video")) {
//       videoUrl = `https://example.com/path/to/video/${filename}`;
//     } else if (mimetype.includes("image")) {
//       imageUrl = `https://example.com/path/to/image/${filename}`;
//     }

//     // You must consume the file stream
//     file.on('data', (chunk) => {});
//     file.on('end', () => {});

//     return filename; // Return a unique identifier for the file (e.g., URL, path, or ID)
//   };

//   try {
//     const formData = await unstable_parseMultipartFormData(req, uploadHandler);

//     // Assuming you have a form field 'name' for the exercise name
//     const name = formData.get('name')?.toString() || 'Default Exercise Name';
//     const video = formData.get('video')?.toString() || 'push-up-video';
//     const image = formData.get('image')?.toString() || 'push-up-image';
//     const description = formData.get('name')?.toString() || '3 sets | 10 reps | 30 secs rest';


//     // Create an Exercise record using Prisma
//     const exercise = await prisma.exercise.create({
//       data: {
//         name: name,
//         video: video,
//         image: image,
//         description: description
//       },
//     });

//     res.status(200).json({ message: 'Exercise created successfully', exercise });
//   } catch (error) {
//     console.error('Error creating exercise:', error);
//     res.status(500).json({ error: 'Failed to create exercise' });
//   }
// }

