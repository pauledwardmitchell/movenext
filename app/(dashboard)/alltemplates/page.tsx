import { getUserFromClerkID } from '@/utils/auth'
import { prisma } from "@/utils/db";
import TemplateList from '@/components/TemplateList'; 

const getTemplates = async () => {
  const templates = await prisma.template.findMany();
  return templates;
};

const AllTemplatesPage = async () => {
  const templates = await getTemplates();

    const user = await getUserFromClerkID()
  if (user.role !== 'ADMIN') {
    redirect('/myworkouts')
    return null
  }

  return (
    <div className="p-10 bg-zinc-400/10">
      <h2 className="text-3xl mb-8">All Templates</h2>
      <TemplateList initialTemplates={templates} />
    </div>
  );
};

export default AllTemplatesPage;
