import React, { useEffect, useRef } from "react";
import JsBarcode from "jsbarcode";

const Receipt = ({ receiptData, onClose }) => {
  const barcodeRef = useRef(null);
  const printedReceiptsRef = useRef(new Set());

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
    if (!receiptData?.uniqueString || !barcodeRef.current) return;

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

    return () => {
      // Cleanup: clear barcode on unmount
      if (barcodeRef.current) {
        barcodeRef.current.innerHTML = "";
      }
    };
  }, [receiptData?.uniqueString]);

  // Auto-print after barcode is ready
  useEffect(() => {
    if (!receiptData) return;

    // Use orderNumber or uniqueString as unique identifier
    const receiptId = receiptData.orderNumber || receiptData.uniqueString || Date.now().toString();
    
    // Skip if this receipt has already been printed
    if (printedReceiptsRef.current.has(receiptId)) {
      return;
    }

    const triggerPrint = () => {
      // Mark this receipt as printed
      printedReceiptsRef.current.add(receiptId);
      
      // Wait longer to ensure barcode SVG is fully rendered
      setTimeout(() => {
        window.print();
        // Close after print dialog is shown
        setTimeout(() => {
          if (onClose) onClose();
        }, 100);
      }, 500);
    };

    // Wait for barcode to be generated before printing
    const printTimer = setTimeout(() => {
      triggerPrint();
    }, 600);

    return () => clearTimeout(printTimer);
  }, [receiptData, onClose]);

  const betDetails = formatBetDetails(receiptData?.betAmounts || {});
  const betColumns = distributeBetsIntoColumns(betDetails);
  const maxColumnLength = Math.max(...betColumns.map(col => col.length));

  if (!receiptData) return null;

  const fontSizes = {
    king: 40,
    sm: 18,
    xs: 18,
    base: 18,
  };

  return (
    <>
      <div
        className="receipt-container"
        style={{ 
          position: "absolute",
          left: "-9999px",
          width: "400px",
          visibility: "hidden",
          display: "block"
        }}
      >
          {/* Receipt Content */}
          <div
            className="bg-white p-4 print:p-3"
            style={{ 
              fontFamily: "Arial, sans-serif",
              width: "100%",
              maxWidth: "400px",
              margin: "0 auto"
            }}
          >
            {/* Header - King Title */}
            <div className="text-center mb-3">
              <h2
                className="font-bold text-black"
                style={{ 
                  fontSize: `${fontSizes.king}px`, 
                  fontWeight: "bold",
                  margin: "0",
                  lineHeight: "1.2"
                }}
              >
                King
              </h2>
            </div>

            {/* First Row: KUID and Order Number */}
            <div className="mb-1 flex justify-between items-start">
              <div style={{ lineHeight: "1.4" }}>
                <div>
                  <span className="font-bold" style={{ fontSize: `${fontSizes.sm}px` }}>
                    KUID -{" "}
                  </span>
                  <span style={{ fontSize: `${fontSizes.sm}px` }}>
                    {receiptData.kuid || "0001"}
                  </span>
                </div>
                <div>
                  <span className="font-bold" style={{ fontSize: `${fontSizes.sm}px` }}>
                    Date{" "}
                  </span>
                  <span style={{ fontSize: `${fontSizes.sm}px` }}>
                    {receiptData.date || "01/01/2024"}
                  </span>
                </div>
              </div>
              <div style={{ lineHeight: "1.4", textAlign: "right" }}>
                <div>
                  <span className="font-bold" style={{ fontSize: `${fontSizes.sm}px` }}>
                    Oder No.{" "}
                  </span>
                  <span style={{ fontSize: `${fontSizes.sm}px` }}>
                    {receiptData.orderNumber || "0000001"}
                  </span>
                </div>
                {receiptData.drawTime && (
                  <div>
                    <span className="font-bold" style={{ fontSize: `${fontSizes.sm}px` }}>
                      Draw Time -{" "}
                    </span>
                    <span style={{ fontSize: `${fontSizes.sm}px` }}>
                      {receiptData.drawTime}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Bet Details Header */}
            <div className="mb-1 mt-3">
              <div className="grid grid-cols-3 gap-1 font-bold" style={{ fontSize: `${fontSizes.xs}px` }}>
                <div>Ac / Qt</div>
                <div>Ac / Qt</div>
                <div>Ac / Qt</div>
              </div>
            </div>

            {/* Bet Details List - Distributed across 3 columns */}
            <div className="mb-2">
              <div className="grid grid-cols-3 gap-1" style={{ fontSize: `${fontSizes.xs}px` }}>
                {Array.from({ length: maxColumnLength }).map((_, rowIndex) => (
                  <React.Fragment key={rowIndex}>
                    <div style={{ padding: "1px 0", lineHeight: "1.3" }}>
                      {betColumns[0][rowIndex] ? `${betColumns[0][rowIndex].number} * ${betColumns[0][rowIndex].amount}` : ""}
                    </div>
                    <div style={{ padding: "1px 0", lineHeight: "1.3" }}>
                      {betColumns[1][rowIndex] ? `${betColumns[1][rowIndex].number} * ${betColumns[1][rowIndex].amount}` : ""}
                    </div>
                    <div style={{ padding: "1px 0", lineHeight: "1.3" }}>
                      {betColumns[2][rowIndex] ? `${betColumns[2][rowIndex].number} * ${betColumns[2][rowIndex].amount}` : ""}
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Total Points */}
            <div className="mb-2 mt-2">
              <div className="font-bold" style={{ fontSize: `${fontSizes.sm}px` }}>
                Total Pts - {receiptData.totalBetPoints?.toFixed(2) || "0.00"}
              </div>
            </div>

            {/* Print Time - Centered */}
            <div className="mb-2 text-center">
              <div style={{ fontSize: `${fontSizes.xs}px` }}>
                Print On {receiptData.printTime || "01/01/24 01:47"}
              </div>
            </div>

            {/* Barcode */}
            <div className="mb-2 text-center">
              <svg 
                ref={barcodeRef} 
                className="mx-auto" 
                style={{ 
                  maxWidth: "100%",
                  display: "block",
                  visibility: "visible",
                  height: "60px"
                }}
              ></svg>
              <div
                className="mt-1 font-mono"
                style={{ 
                  letterSpacing: "1px", 
                  fontSize: `${fontSizes.xs}px`,
                  lineHeight: "1.2"
                }}
              >
                {receiptData.uniqueString || "123456789000000000000"}
              </div>
            </div>

            {/* Footer - Centered, Larger */}
            <div className="text-center mt-3">
              <div
                className="font-bold"
                style={{ 
                  fontSize: `${fontSizes.base}px`, 
                  fontWeight: "bold",
                  lineHeight: "1.2"
                }}
              >
                For Amusement Only
              </div>
            </div>
          </div>
      </div>

      {/* Print Styles */}
      <style>{`
        @media print {
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          html, body {
            width: 400px;
            height: auto;
            overflow: visible;
            background: white;
          }
          body * {
            visibility: hidden;
          }
          .receipt-container,
          .receipt-container * {
            visibility: visible !important;
          }
          .receipt-container {
            position: fixed !important;
            left: 0 !important;
            top: 0 !important;
            width: 400px !important;
            max-width: 400px !important;
            box-shadow: none !important;
            margin: 0 !important;
            padding: 0 !important;
            border-radius: 0 !important;
            background: white !important;
          }
          .receipt-container svg {
            visibility: visible !important;
            display: block !important;
            max-width: 100% !important;
          }
          .receipt-container > div {
            padding: 12px !important;
            background: white !important;
          }
          @page {
            size: 400px auto;
            margin: 0;
            padding: 0;
          }
        }
      `}</style>
    </>
  );
};

export default Receipt;

