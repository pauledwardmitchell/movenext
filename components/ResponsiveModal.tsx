import { useState } from 'react';

function ResponsiveModal({isOpen, closeModal, assignmentId}) {

  return (
    <div>
      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full px-4">
          {/* Modal content */}
          <div className="flex items-center min-h-full">
            <div className="relative m-auto bg-white rounded-lg shadow-lg p-6 w-full max-w-md sm:max-w-lg lg:max-w-xl">
              {/* Modal header */}
              <div className="flex justify-between items-center border-b pb-3">
                <p className="text-lg font-semibold">Responsive Modal</p>
                <button onClick={closeModal} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                </button>
              </div>
              {/* Modal body */}
              <div className="my-4">
                <p>This is a responsive modal. {assignmentId}</p>
              </div>
              {/* Modal footer */}
              <div className="flex justify-end pt-2">
                <button onClick={closeModal} className="px-4 bg-gray-500 p-3 rounded-lg text-white hover:bg-gray-400">
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ResponsiveModal;
