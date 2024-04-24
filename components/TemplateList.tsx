"use client"

import { useState } from 'react';
import Link from 'next/link';
import { Input } from "@material-tailwind/react";
import TemplateCopyButton from '@/components/TemplateCopyButton';

const TemplateList = ({ initialTemplates }) => {
  const [templates, setTemplates] = useState(initialTemplates);  // Manage templates state locally
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteCandidate, setDeleteCandidate] = useState(null);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleDelete = async (template) => {
    try {
      const response = await fetch(`/api/template/${template.id}`, {
        method: 'DELETE',
      });
      const result = await response.json();

      if (response.ok) {
        // Remove the deleted template from the local state
        setTemplates(currentTemplates => currentTemplates.filter(t => t.id !== template.id));
        console.log("Delete response:", result);
      } else {
        // Handle potential errors returned by the API
        throw new Error(result.error || 'Failed to delete the template.');
      }
    } catch (error) {
      // Log or display the error message
      console.error('Error deleting template:', error);
      alert(error.message);
    }
    // Close modal regardless of the outcome
    setDeleteCandidate(null);
  };

  return (
    <div>
      <Input
        label="Search for a template"
        size="lg"
        value={searchTerm}
        onChange={handleSearchChange}
        className=""
      />
      <ul className="grid grid-cols-2 gap-4 py-2">
        {templates.filter(template => template.name.toLowerCase().includes(searchTerm.toLowerCase())).map((template) => (
          <li key={template.id} className="break-words border border-gray-600 p-4 rounded">
            <Link href={`/template/${template.id}`}>
              <span className="hover:underline">{template.name}</span>
            </Link>
            <Link 
              href={`/buildtemplate?templateId=${template.id}&formType=edit`}
              className="ml-2 inline-block border border-gray-400 p-1 rounded">
              <button className="text-blue-500 hover:text-blue-700">Edit</button>
            </Link>
            <TemplateCopyButton templateId={template.id} />
            <button 
              onClick={() => setDeleteCandidate(template)}
              className="text-red-500 hover:text-red-700 border border-gray-400 p-1 rounded">
              Delete
            </button>
          </li>
        ))}
      </ul>
      {deleteCandidate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded">
            <h2 className="text-lg mb-4">Confirm Deletion</h2>
            <p>Are you sure you want to delete the template named "{deleteCandidate.name}"?</p>
            <div className="flex justify-end gap-4 mt-4">
              <button onClick={() => setDeleteCandidate(null)} className="bg-gray-300 p-2 rounded">Cancel</button>
              <button onClick={() => handleDelete(deleteCandidate)} className="bg-red-500 text-white p-2 rounded">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TemplateList;
