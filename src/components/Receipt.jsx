import React, { useEffect, useRef } from "react";

/**
 * RECEIPT PRINTER MARGINS/PADDING SETTINGS:
 * 
 * Both Electron and Browser printing use the same structure. Adjust margins/padding in both places:
 * 
 * 1. ELECTRON PRINTING (generateReceiptHTML function):
 *    - Line ~143: .receipt-content { padding: 12px; } - Content padding
 *    - Line ~217: @page { margin: 0; } - Page margin
 * 
 * 2. BROWSER PRINTING (@media print styles):
 *    - Line ~533: .receipt-container > div { padding: 12px !important; } - Content padding
 *    - Line ~538: @page { margin: 0; } - Page margin
 * 
 * Common margin/padding formats:
 *   - margin: 10mm; (all sides)
 *   - margin: 10mm 5mm; (top/bottom, left/right)
 *   - margin: 5mm 10mm 5mm 10mm; (top, right, bottom, left)
 *   - padding: 12px; (all sides)
 */

const Receipt = ({ receiptData, onClose }) => {
  const barcodeRef = useRef(null);
  const printedReceiptsRef = useRef(new Set());

  // Format uniqueString for Code39 barcode (requires * at start and end)
  const formatCode39 = (text) => {
    if (!text) return "*";
    // Code39 format: *data*
    return `*${text.toUpperCase()}*`;
  };

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

  // Load barcode font from BarcodeFonts folder
  useEffect(() => {
    const fontPath = "/Code39AzaleaRegular1.ttf"; // Font is in public folder
    const fontFace = new FontFace(
      "Code39Azalea",
      `url(${fontPath})`
    );
    
    fontFace.load().then((loadedFont) => {
      document.fonts.add(loadedFont);
    }).catch((error) => {
      console.error("Error loading barcode font:", error);
    });
  }, []);

  // Generate receipt HTML for printing (matches browser version exactly)
  const generateReceiptHTML = () => {
    const betDetails = formatBetDetails(receiptData?.betAmounts || {});
    const betColumns = distributeBetsIntoColumns(betDetails);
    const maxColumnLength = Math.max(...betColumns.map(col => col.length));

    const fontSizes = {
      king: 40,
      sm: 18,
      xs: 18,
      base: 18,
    };

    // Generate bet rows HTML (matching browser version structure)
    const betRowsHTML = Array.from({ length: maxColumnLength })
      .map((_, rowIndex) => {
        const col1 = betColumns[0][rowIndex] ? `${betColumns[0][rowIndex].number} * ${betColumns[0][rowIndex].amount}` : "";
        const col2 = betColumns[1][rowIndex] ? `${betColumns[1][rowIndex].number} * ${betColumns[1][rowIndex].amount}` : "";
        const col3 = betColumns[2][rowIndex] ? `${betColumns[2][rowIndex].number} * ${betColumns[2][rowIndex].amount}` : "";
        return `
          <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 4px; padding: 1px 0; line-height: 1.3; font-size: ${fontSizes.xs}px;">
            <div>${col1}</div>
            <div>${col2}</div>
            <div>${col3}</div>
          </div>
        `;
      })
      .join("");

    return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    html, body {
      width: 100%;
      height: auto;
      overflow: visible;
      background: white;
    }
    body {
      font-family: Arial, sans-serif;
      width: 100%;
      max-width: 100%;
      margin: 0 auto;
      padding: 0;
      background: white;
    }
    .receipt-container {
      width: 88%;
      max-width: 100%;
      margin: 0 auto;
      padding: 0;
      background: white;
      border: 3px solid #000;
    }
    .receipt-content {
      padding: 12px; /* 📌 PRINTER PADDING: Adjust this value (top right bottom left) or use specific sides like padding: 10px 5px; */
      background: white;
      font-family: Arial, sans-serif;
      width: 100%;
      max-width: 100%;
      margin: 0 auto;
    }
    .header {
      text-align: center;
      margin-bottom: 12px;
    }
    .header h2 {
      font-size: ${fontSizes.king}px;
      font-weight: bold;
      margin: 0;
      line-height: 1.2;
      color: black;
    }
    .info-row {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 4px;
      line-height: 1.4;
    }
    .info-left, .info-right {
      font-size: ${fontSizes.sm}px;
    }
    .info-right {
      text-align: right;
    }
    .bet-header {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 4px;
      font-weight: bold;
      font-size: ${fontSizes.xs}px;
      margin-top: 12px;
      margin-bottom: 4px;
    }
    .bet-details {
      margin-bottom: 8px;
    }
    .total-separator {
      border: 1px dotted #000;
      display: block;
      margin: 0;
    }
    .total {
      font-weight: bold;
      font-size: ${fontSizes.sm}px;
      margin-top: 8px;
      margin-bottom: 8px;
    }
    .print-time {
      text-align: center;
      font-size: ${fontSizes.xs}px;
      margin-bottom: 8px;
    }
    .barcode-container {
      text-align: center;
      margin-bottom: 8px;
    }
    .barcode-text {
      font-family: "Code39Azalea", monospace;
      font-size: 80px;
      line-height: 1;
      letter-spacing: 2px;
      margin-bottom: 4px;
    }
    .barcode-label {
      margin-top: 4px;
      font-family: monospace;
      letter-spacing: 1px;
      font-size: ${fontSizes.xs}px;
      line-height: 1.2;
    }
    .footer {
      text-align: center;
      margin-top: 12px;
      font-weight: bold;
      font-size: ${fontSizes.base}px;
      line-height: 1.2;
    }
    @page {
      size: auto;
      margin: 0; /* 📌 PRINTER PAGE MARGIN (Electron): Adjust all sides or use margin: 10mm 5mm; (top/bottom left/right) */
    }
    @font-face {
      font-family: "Code39Azalea";
      src: url("/Code39AzaleaRegular1.ttf") format("truetype");
    }
  </style>
</head>
<body>
  <div class="receipt-container">
    <div class="receipt-content">
      <div class="header">
        <h2>King Spinner</h2>
      </div>
      
      <div class="info-row">
        <div class="info-left">
          <div><strong>KUID -</strong> ${receiptData.kuid || "0001"}</div>
          <div><strong>Date</strong> ${receiptData.date || "01/01/2024"}</div>
        </div>
        <div class="info-right">
          <div><strong>Oder No.</strong> ${receiptData.orderNumber || "0000001"}</div>
          ${receiptData.drawTime ? `<div><strong>Draw Time -</strong> ${receiptData.drawTime}</div>` : ""}
        </div>
      </div>
      
      <div class="bet-header">
        <div>Ac / Qt</div>
        <div>Ac / Qt</div>
        <div>Ac / Qt</div>
      </div>
      
      <div class="bet-details">
        ${betRowsHTML}
      </div>
      
      <hr class="total-separator" />
      <div class="total">
        Total Pts - ${receiptData.totalBetPoints?.toFixed(2) || "0.00"}
      </div>
      
      <div class="print-time">
        Print On ${receiptData.printTime || "01/01/24 01:47"}
      </div>
      
      <div class="barcode-container">
        <div class="barcode-text">${formatCode39(receiptData.uniqueString || "123456789000000000000")}</div>
        <div class="barcode-label">${receiptData.uniqueString || "123456789000000000000"}</div>
      </div>
      
      <div class="footer">
        For Amusement Only
      </div>
    </div>
  </div>
</body>
</html>`;
  };

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
      
      // Wait for font to load
      setTimeout(() => {
        // Generate the receipt HTML
        const receiptHTML = generateReceiptHTML();
        
        if (window.electronAPI?.printReceipt) {
          window.electronAPI.printReceipt(receiptHTML).catch((error) => {
            console.error("Silent print failed:", error);
            // Fallback to regular print if Electron API fails
            window.print();
          });
        } else {
          // Fallback for non-Electron environments
          window.print();
        }

        // Close after print is initiated
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
          width: "auto",
          maxWidth: "100%",
          visibility: "hidden",
          display: "block"
        }}
      >
          {/* Receipt Content */}
          {/* 📌 VISUAL PADDING (on screen only): Tailwind classes p-4 (16px) and print:p-3 (12px) - For actual print margins, see @media print styles below */}
          <div
            className="bg-white p-4 print:p-3"
            style={{ 
              fontFamily: "Arial, sans-serif",
              width: "100%",
              maxWidth: "100%",
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
                King Spinner
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
            <hr style={{ border:"1px dotted #000", display:"block" }} />
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
              <div
                ref={barcodeRef}
                style={{ 
                  fontFamily: '"Code39Azalea", monospace',
                  fontSize: "80px",
                  lineHeight: "1",
                  letterSpacing: "2px",
                  marginBottom: "4px"
                }}
              >
                {formatCode39(receiptData.uniqueString || "123456789000000000000")}
              </div>
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
        @font-face {
          font-family: "Code39Azalea";
          src: url("/Code39AzaleaRegular1.ttf") format("truetype");
        }
        @media print {
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          html, body {
            width: 100%;
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
            left: 50% !important;
            top: 0 !important;
            transform: translateX(-50%) !important;
            width: 88% !important;
            max-width: 100% !important;
            box-shadow: none !important;
            margin: 0 !important;
            padding: 0 !important;
            border-radius: 0 !important;
            background: white !important;
            border:3px solid #000;
          }
          .receipt-container > div {
            padding: 12px !important; /* 📌 PRINTER PADDING (Browser Print): Adjust this value for content padding inside the receipt */
            background: white !important;
          }
          @page {
            size: auto;
            margin: 0; /* 📌 PRINTER PAGE MARGIN (Browser Print): Adjust all sides or use margin: 10mm 5mm; (top/bottom left/right) */
          }
        }
      `}</style>
    </>
  );
};

export default Receipt;

