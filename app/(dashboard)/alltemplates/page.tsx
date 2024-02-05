import { prisma } from "@/utils/db"
import Link from "next/link"

const getTemplates = async () => {
	const templates = await prisma.template.findMany()
	return templates
}

const AllTemplatesPage = async () => {
	const templates = await getTemplates()

	return (
	<div>
		<div className="p-10 bg-zinc-400/10">
			<h2 className="text-3xl mb-8">all templates</h2>
			<div className="">
			<ul>
			{templates.map((template) => (
				<li key={template.id}>
					<Link href={`/template/${template.id}`}>{template.name}</Link>
				</li>
			))}
			</ul>
			</div> 
		</div>
	</div>
	)
}

export default AllTemplatesPage