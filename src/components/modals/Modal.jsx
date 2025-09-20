import { Modal as FlowbiteModal } from "flowbite-react";

export default function Modal({ isOpen, onClose, title, children }) {
  const customTheme = {
    root: {
      base: "fixed inset-0 z-50 flex items-center justify-center h-screen overflow-y-auto overflow-x-hidden bg-gray-900 bg-opacity-50",
      show: {
        on: "flex",
        off: "hidden",
      },
    },
    content: {
      base: "relative h-auto w-full max-w-md mx-auto",
      inner: "relative flex flex-col bg-white rounded-lg shadow-xl",
    },
  };

  return (
    <FlowbiteModal
      show={isOpen}
      onClose={onClose}
      theme={customTheme}
      popup
      dismissible={true}
    >
      <div className="bg-white rounded-lg shadow-xl">
        <div className="border-b border-blue-100 p-4 flex items-center justify-between">
          {title && (
            <h3 className="text-xl font-bold text-blue-700 tracking-tight mt-2">
              {title}
            </h3>
          )}
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="p-6 bg-white rounded-b-lg">{children}</div>
      </div>
    </FlowbiteModal>
  );
}
