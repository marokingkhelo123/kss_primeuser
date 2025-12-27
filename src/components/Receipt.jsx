import React, { useEffect, useRef } from "react";
import JsBarcode from "jsbarcode";

const Receipt = ({ receiptData, onClose }) => {
  const barcodeRef = useRef(null);

  // Map backend bet keys to numbers
  const betKeyToNumber = {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
    ten: 10,
    eleven: 11,
    twelve: 12,
  };

  // Convert bet amounts to array format for display
  const formatBetDetails = (betAmounts) => {
    if (!betAmounts) return [];
    const bets = [];
    for (const [key, amount] of Object.entries(betAmounts)) {
      if (amount > 0) {
        const number = betKeyToNumber[key];
        if (number) {
          bets.push({ number, amount });
        }
      }
    }
    return bets.sort((a, b) => a.number - b.number);
  };

  // Distribute bets across 3 columns
  const distributeBetsIntoColumns = (bets) => {
    const columns = [[], [], []];
    bets.forEach((bet, index) => {
      columns[index % 3].push(bet);
    });
    return columns;
  };

  // Generate barcode
  useEffect(() => {
    if (barcodeRef.current && receiptData?.uniqueString) {
      try {
        // Clear previous barcode
        barcodeRef.current.innerHTML = "";
        JsBarcode(barcodeRef.current, receiptData.uniqueString, {
          format: "CODE128",
          width: 2,
          height: 60,
          displayValue: false,
        });
      } catch (error) {
        console.error("Error generating barcode:", error);
      }
    }
    return () => {
      // Cleanup: clear barcode on unmount
      if (barcodeRef.current) {
        barcodeRef.current.innerHTML = "";
      }
    };
  }, [receiptData]);

  const betDetails = formatBetDetails(receiptData?.betAmounts || {});
  const betColumns = distributeBetsIntoColumns(betDetails);
  const maxColumnLength = Math.max(...betColumns.map(col => col.length));

  const handlePrint = () => {
    window.print();
  };

  if (!receiptData) return null;

  const fontSizes = {
    king: 40,
    sm: 15,
    xs: 16,
    base: 17,
  };

  return (
    <>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}
        onClick={onClose}
      >
        <div
          className="bg-white rounded-lg shadow-2xl w-full max-w-sm mx-4 overflow-hidden receipt-container"
          onClick={(e) => e.stopPropagation()}
          style={{ width: "400px" }}
        >
          {/* Receipt Content */}
          <div
            className="bg-white p-6 print:p-4"
            style={{ fontFamily: "Arial, sans-serif" }}
          >
            {/* Header */}
            <div className="text-center mb-4">
              <h2
                className="text-3xl font-bold text-black"
                style={{ fontSize: `${fontSizes.king}px`, fontWeight: "bold" }}
              >
                King
              </h2>
            </div>

            {/* First Row: KUID and Order Number */}
            <div className="mb-2 flex justify-between">
              <div>
                <span className="text-sm font-bold" style={{ fontSize: `${fontSizes.sm}px` }}>
                  KUID -{" "}
                </span>
                <span className="text-sm" style={{ fontSize: `${fontSizes.sm}px` }}>
                  {receiptData.kuid || "N/A"}
                </span>
              </div>
              <div>
                <span className="text-sm font-bold" style={{ fontSize: `${fontSizes.sm}px` }}>
                  Oder No.{" "}
                </span>
                <span className="text-sm" style={{ fontSize: `${fontSizes.sm}px` }}>
                  {receiptData.orderNumber || "N/A"}
                </span>
              </div>
            </div>

            {/* Second Row: Date and Draw Time */}
            <div className="mb-4 flex justify-between">
              <div>
                <span className="text-sm font-bold" style={{ fontSize: `${fontSizes.sm}px` }}>
                  Date{" "}
                </span>
                <span className="text-sm" style={{ fontSize: `${fontSizes.sm}px` }}>
                  {receiptData.date || "N/A"}
                </span>
              </div>
              {receiptData.drawTime && (
                <div>
                  <span className="text-sm font-bold" style={{ fontSize: `${fontSizes.sm}px` }}>
                    Draw Time -{" "}
                  </span>
                  <span className="text-sm" style={{ fontSize: `${fontSizes.sm}px` }}>
                    {receiptData.drawTime}
                  </span>
                </div>
              )}
            </div>

            {/* Bet Details Header */}
            <div className="mb-2">
              <div className="grid grid-cols-3 gap-2 text-xs font-bold border-b border-gray-300 pb-1">
                <div style={{ fontSize: `${fontSizes.xs}px` }}>Ac / Qt</div>
                <div style={{ fontSize: `${fontSizes.xs}px` }}>Ac / Qt</div>
                <div style={{ fontSize: `${fontSizes.xs}px` }}>Ac / Qt</div>
              </div>
            </div>

            {/* Bet Details List - Distributed across 3 columns */}
            <div className="mb-4">
              <div className="grid grid-cols-3 gap-2 text-xs">
                {Array.from({ length: maxColumnLength }).map((_, rowIndex) => (
                  <React.Fragment key={rowIndex}>
                    <div className="py-0.5" style={{ fontSize: `${fontSizes.xs}px` }}>
                      {betColumns[0][rowIndex] ? `${betColumns[0][rowIndex].number} * ${betColumns[0][rowIndex].amount}` : ""}
                    </div>
                    <div className="py-0.5" style={{ fontSize: `${fontSizes.xs}px` }}>
                      {betColumns[1][rowIndex] ? `${betColumns[1][rowIndex].number} * ${betColumns[1][rowIndex].amount}` : ""}
                    </div>
                    <div className="py-0.5" style={{ fontSize: `${fontSizes.xs}px` }}>
                      {betColumns[2][rowIndex] ? `${betColumns[2][rowIndex].number} * ${betColumns[2][rowIndex].amount}` : ""}
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Total Points */}
            <div className="mb-4 border-t border-gray-300 pt-2">
              <div className="text-sm font-bold" style={{ fontSize: `${fontSizes.sm}px` }}>
                Total Pts - {receiptData.totalBetPoints?.toFixed(2) || "0.00"}
              </div>
            </div>

            {/* Print Time - Centered */}
            <div className="mb-4 text-center">
              <div className="text-xs" style={{ fontSize: `${fontSizes.xs}px` }}>
                Print On {receiptData.printTime || "N/A"}
              </div>
            </div>

            {/* Barcode */}
            <div className="mb-4 text-center">
              <svg ref={barcodeRef} className="mx-auto" style={{ maxWidth: "100%" }}></svg>
              <div
                className="text-xs mt-2 font-mono"
                style={{ letterSpacing: "1px", fontSize: `${fontSizes.xs}px` }}
              >
                {receiptData.uniqueString || ""}
              </div>
            </div>

            {/* Footer - Centered, Larger */}
            <div className="text-center mt-4">
              <div
                className="text-base font-bold"
                style={{ fontSize: `${fontSizes.base}px`, fontWeight: "bold" }}
              >
                For Amusement Only
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="bg-white pb-6 px-6 flex justify-center gap-4 print:hidden">
            <button
              onClick={handlePrint}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition-colors"
            >
              Print
            </button>
            <button
              onClick={onClose}
              className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded-lg transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>

      {/* Print Styles */}
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .receipt-container,
          .receipt-container * {
            visibility: visible;
          }
          .receipt-container {
            position: absolute;
            left: 0;
            top: 0;
            width: 400px;
            max-width: 400px;
            box-shadow: none;
            margin: 0;
            padding: 0;
            border-radius: 0;
          }
          .print\\:hidden {
            display: none !important;
          }
          @page {
            size: auto;
            margin: 0;
          }
        }
      `}</style>
    </>
  );
};

export default Receipt;

