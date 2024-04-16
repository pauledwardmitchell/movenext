import { prisma } from "@/utils/db";
import TemplateList from '@/components/TemplateList'; 

const getTemplates = async () => {
  const templates = await prisma.template.findMany();
  return templates;
};

const AllTemplatesPage = async () => {
  const templates = await getTemplates();

  return (
    <div className="p-10 bg-zinc-400/10">
      <h2 className="text-3xl mb-8">All Templates</h2>
      <TemplateList templates={templates} />
    </div>
  );
};

export default AllTemplatesPage;
