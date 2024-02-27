"use client"

import { useState } from 'react';

function MenuModal() {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <div>
      {/* Menu Button */}
      <button
        onClick={openModal}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Open Menu
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
          {/* Modal content */}
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <div className="mx-2 text-lg font-semibold">Menu Choices</div>
              <div className="my-2">
                {/* Menu items here */}
                <p className="text-gray-500">Menu Item 1</p>
                <p className="text-gray-500">Menu Item 2</p>
                <p className="text-gray-500">Menu Item 3</p>
              </div>
              <button
                onClick={closeModal}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MenuModal;
