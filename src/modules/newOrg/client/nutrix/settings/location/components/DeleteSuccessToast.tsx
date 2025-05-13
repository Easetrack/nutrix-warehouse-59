
import React from "react";

interface DeleteSuccessToastProps {
  show: boolean;
  onClose: () => void;
}

const DeleteSuccessToast: React.FC<DeleteSuccessToastProps> = ({
  show,
  onClose
}) => {
  if (!show) return null;
  return (
    <div className="fixed right-6 bottom-6 z-50 w-[350px] pointer-events-none">
      <div className="bg-white border border-green-200 shadow-lg rounded-xl px-6 py-5 flex items-center gap-4 pointer-events-auto">
        <img
          src="/lovable-uploads/41779e4b-6637-49e8-a6a9-e99c9993ed56.png"
          alt="Warehouse"
          className="w-12 h-12"
        />
        <div>
          <p className="text-base font-semibold text-green-800 mb-1">Delete Success</p>
          <p className="text-gray-700 text-sm">Your Location has been Confirm successfully.</p>
        </div>
        <button className="ml-auto" aria-label="Close" onClick={onClose}>
          <span className="text-gray-400 text-2xl font-bold">&times;</span>
        </button>
      </div>
    </div>
  );
};

export default DeleteSuccessToast;
