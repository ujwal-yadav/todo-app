export const Modal = ({ isOpen, onClose, children }) => {
  return (
    <>
      {isOpen && (
        <div className="p-4 fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-gray-200 text-gray-950 border p-6 rounded-lg max-w-md w-full max-h-full overflow-y-auto">
            <div className="flex justify-between mb-4">
              <h1 className="text-xl font-bold">Todo Form</h1>
              <button
                onClick={onClose}
                className=" text-gray-500 hover:text-gray-700"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
            </div>
            {children}
          </div>
        </div>
      )}
    </>
  );
};
