import { useEffect } from "react";

const AttentionPopup = ({
  message,
  onClose,
  autoCloseDelay = 3000,
}) => {
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
        {/* Header - Purple background */}
        <div
          className="bg-purple-500 py-6 px-6 text-center"
          style={{ backgroundColor: "#A855F7" }}
        >
          <h2 className="text-white font-bold text-4xl">Attention!</h2>
        </div>

        {/* Body - White background */}
        <div className="bg-white py-8 px-6 text-center">
          <p className="text-black text-lg font-semibold">
            {message || "This ticket has already been scanned."}
          </p>
        </div>

        {/* Close button (optional) */}
        {onClose && (
          <div className="bg-white pb-6 px-6 flex justify-center">
            <button
              onClick={onClose}
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-8 rounded-lg transition-colors"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AttentionPopup;

