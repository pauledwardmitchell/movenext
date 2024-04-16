'use client'

import { useRouter } from 'next/navigation'

const TemplateCopyButton = ({ templateId }) => {
  const router = useRouter();

  const handleCopyTemplate = () => {
    router.push(`/buildtemplate?templateId=${templateId}`);
  };

  return (
    <button onClick={handleCopyTemplate} className="m-4 px-3 py-1 rounded bg-blue-500 text-white">
      Copy
    </button>
  );
};

export default TemplateCopyButton;
