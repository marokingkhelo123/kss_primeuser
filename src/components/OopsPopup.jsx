import { useEffect } from "react";

const OopsPopup = ({ message, onClose, autoCloseDelay = 3000 }) => {
  useEffect(() => {
    // Auto-close after delay if onClose is provided
    if (onClose && autoCloseDelay > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, autoCloseDelay);

      return () => clearTimeout(timer);
    }
  }, [onClose, autoCloseDelay]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-2xl max-w-md w-full mx-4 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header - Pink background */}
        <div
          className="bg-pink-500 py-6 px-6 text-center"
          style={{ backgroundColor: "#EC4899" }}
        >
          <h2 className="text-white font-bold text-4xl">Oops!</h2>
        </div>

        {/* Body - White background */}
        <div className="bg-white py-8 px-6 text-center">
          <p className="text-black text-lg font-semibold">
            {message || "There have no winning ticket. Better luck next time."}
          </p>
        </div>

        {/* Close button (optional) */}
        {onClose && (
          <div className="bg-white pb-6 px-6 flex justify-center">
            <button
              onClick={onClose}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-8 rounded-lg transition-colors"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OopsPopup;

