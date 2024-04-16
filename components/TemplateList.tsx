'use client'

import { useState } from 'react';
import Link from 'next/link';
import { Input } from "@material-tailwind/react"
import TemplateCopyButton from '@/components/TemplateCopyButton';

const TemplateList = ({ templates }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredTemplates = templates.filter(template =>
    template.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Input
        label="Search for a template"
        size="lg"
        value={searchTerm}
        onChange={handleSearchChange}
        className=""
      />
      <ul className="grid grid-cols-2 gap-4">
        {filteredTemplates.map((template) => (
          <li key={template.id} className="break-words">
            <Link href={`/template/${template.id}`}>{template.name}</Link>
            <TemplateCopyButton templateId={template.id} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TemplateList;
