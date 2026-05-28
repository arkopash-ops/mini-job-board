import { createPortal } from "react-dom";

interface LogoutModalProps {
  onCancel: () => void;
  onConfirm: () => void;
}

const LogoutModal = ({ onCancel, onConfirm }: LogoutModalProps) => {
  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="w-[90%] max-w-sm rounded-2xl bg-white p-6 shadow-xl">
        <h2 className="text-lg font-semibold text-gray-900">
          Do you really want to logout?
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          You'll need to sign in again to access your dashboard.
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-sm"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className="px-4 py-2 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm"
          >
            Logout
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default LogoutModal;
