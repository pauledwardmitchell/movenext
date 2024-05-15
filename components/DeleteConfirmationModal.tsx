
const DeleteConfirmationModal = ({ show, onClose, onConfirm, assignmentName }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded shadow-lg">
        <h2 className="text-lg mb-4">Confirm Deletion</h2>
        <p>Are you sure you want to delete the assignment "{assignmentName}"?</p>
        <div className="flex justify-end gap-4 mt-4">
          <button onClick={onClose} className="bg-gray-300 p-2 rounded">Cancel</button>
          <button onClick={onConfirm} className="bg-red-500 text-white p-2 rounded">Delete</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
