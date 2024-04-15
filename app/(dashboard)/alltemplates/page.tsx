import Link from 'next/link';
import { prisma } from "@/utils/db";
import TemplateCopyButton from '@/components/TemplateCopyButton'; // Import the client component

export const getTemplates = async () => {
  const templates = await prisma.template.findMany();
  return templates;
};

const AllTemplatesPage = async () => {
  const templates = await getTemplates();

  return (
    <div className="p-10 bg-zinc-400/10">
      <h2 className="text-3xl mb-8">All Templates</h2>
      <ul>
        {templates.map((template) => (
          <li key={template.id}>
            <Link href={`/template/${template.id}`}>{template.name}</Link>
            <TemplateCopyButton templateId={template.id} /> {/* Render the client component */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllTemplatesPage;
