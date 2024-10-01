import React from 'react';

const Popup = ({ isOpen, onClose, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-gray-800 p-6 rounded-lg shadow-xl max-w-md w-full">
        <h2 className="text-xl font-bold mb-4 text-white">Insufficient Run Time</h2>
        <p className="mb-6 text-gray-300">{message}</p>
        <button
          onClick={onClose}
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition duration-300"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Popup;