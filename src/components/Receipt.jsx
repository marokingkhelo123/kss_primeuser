import React, { useEffect, useRef, useState } from "react";

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
  const receiptIdRef = useRef(null);
  const [barcodeFontDataUrl, setBarcodeFontDataUrl] = useState(null);

  // Format uniqueString for Code39 barcode (requires * at start and end)
  const formatCode39 = (text) => {
    if (!text) return "*";
    // Code39 format: *data*
    return `*${text.toUpperCase()}*`;
  };

  const formatBarcodeValue = (value) => {
    if (!value) return "1234567890";
    return value.toString();
  };

  const formatOrderNumber = (orderNumber) => {
    if (!orderNumber) return "000000001";
    return orderNumber.toString().slice(-9);
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

  const arrayBufferToBase64 = (buffer) => {
    let binary = "";
    const bytes = new Uint8Array(buffer);
    const chunkSize = 0x8000;
    for (let i = 0; i < bytes.length; i += chunkSize) {
      const chunk = bytes.subarray(i, i + chunkSize);
      binary += String.fromCharCode(...chunk);
    }
    return window.btoa(binary);
  };

  // Load barcode font from public folder and store as data URL for printing
  useEffect(() => {
    // Use relative path so font loads in packaged Electron (file://) and in dev (http)
    const fontPath = "./Code39AzaleaRegular1.ttf";
    const fontFace = new FontFace(
      "Code39Azalea",
      `url(${fontPath})`
    );

    fetch(fontPath)
      .then((response) => response.arrayBuffer())
      .then((buffer) => {
        const base64 = arrayBufferToBase64(buffer);
        setBarcodeFontDataUrl(`data:font/ttf;base64,${base64}`);
      })
      .catch((error) => {
        console.error("Error loading barcode font data:", error);
      });

    fontFace.load().then((loadedFont) => {
      document.fonts.add(loadedFont);
    }).catch((error) => {
      console.error("Error loading barcode font:", error);
    });
  }, []);

  const receiptWidthMm = 74;

  // Generate receipt HTML for printing (matches browser version exactly)
  const generateReceiptHTML = () => {
    const betDetails = formatBetDetails(receiptData?.betAmounts || {});
    const betColumns = distributeBetsIntoColumns(betDetails);
    const maxColumnLength = Math.max(...betColumns.map(col => col.length));

    const fontSizes = {
      king: 27,
      sm: 13,
      xs: 14,
      base: 14,
      orderId: 13,
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

    const barcodeFontSrc = barcodeFontDataUrl
      ? `url("${barcodeFontDataUrl}")`
      : `url("./Code39AzaleaRegular1.ttf")`;

    return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    * {
      margin: 0;
      padding: 2px;
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
      margin: 0;
      padding: 0;
      background: white;
    }
    .receipt-container {
      position: fixed;
      left: 0;
      top: 0;
      width: ${receiptWidthMm}mm;
      max-width: ${receiptWidthMm}mm;
      margin: 0;
      padding: 0;
      background: white;
    }
    .receipt-content {
      padding: 8px; /* 📌 PRINTER PADDING: Adjust this value (top right bottom left) or use specific sides like padding: 10px 5px; */
      background: white;
      font-family: Arial, sans-serif;
      width: 100%;
      max-width: 100%;
      margin: 0;
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
    .order-number {
      font-size: ${fontSizes.orderId}px;
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
      font-family: monospace;
      font-size: ${fontSizes.xs}px;
      line-height: 1;
      letter-spacing: 1px;
      margin: 0;
      text-align: center;
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
      font-size: 99px;
      height: 45px;
      overflow: hidden;
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
      size: ${receiptWidthMm}mm auto;
      margin: 0 0 0 2mm; /* 📌 PRINTER PAGE MARGIN (Electron): left 2mm */
    }
    @font-face {
      font-family: "Code39Azalea";
      src: ${barcodeFontSrc} format("truetype");
    }
  </style>
</head>
<body>
  <div class="receipt-container">
    <div class="receipt-content">
      <div class="header">
        <h2>WinZooo</h2>
      </div>
      
      <div class="info-row">
        <div class="info-left">
          <div><strong>KUID -</strong> ${receiptData.kuid || "0001"}</div>
          <div><strong>Date</strong> ${receiptData.date || "01/01/2024"}</div>
        </div>
        <div class="info-right">
          <div><strong>Oder No.</strong> <span class="order-number">${formatOrderNumber(receiptData.orderNumber)}</span></div>
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
      
      <div class="total-separator">-------------------</div>
      <div class="total">
        Total Pts - ${receiptData.totalBetPoints?.toFixed(2) || "0.00"}
      </div>
      
      <div class="print-time">
        Print On ${receiptData.printTime || "01/01/24 01:47"}
      </div>
      
      <div class="barcode-container">
        <div class="barcode-text">${formatCode39(formatBarcodeValue(receiptData.uniqueString || "1234567"))}</div>
        <div class="barcode-label">${formatBarcodeValue(receiptData.uniqueString || "1234567")}</div>
      </div>
      
      <div class="footer">
        For Amusement Only
      </div>
    </div>
  </div>
</body>
</html>`;
  };

  // Track a stable receipt id to prevent duplicate prints
  useEffect(() => {
    if (!receiptData) return;
    const stableId =
      receiptData.orderNumber ||
      receiptData.uniqueString ||
      receiptData.betId ||
      receiptData._id ||
      receiptData.id ||
      null;

    if (stableId) {
      receiptIdRef.current = stableId.toString();
    } else if (!receiptIdRef.current) {
      receiptIdRef.current = `receipt-${Date.now()}`;
    }
  }, [receiptData]);

  // Auto-print after receipt data is ready
  useEffect(() => {
    if (!receiptData) return;

    // Use orderNumber or uniqueString as unique identifier
    const receiptId =
      receiptIdRef.current ||
      receiptData.orderNumber ||
      receiptData.uniqueString ||
      receiptData.betId ||
      receiptData._id ||
      receiptData.id ||
      "receipt-unknown";
    
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

    // Wait briefly for font load; print even if it never arrives
    const printTimer = setTimeout(() => {
      triggerPrint();
    }, barcodeFontDataUrl ? 600 : 900);

    return () => clearTimeout(printTimer);
  }, [receiptData, barcodeFontDataUrl, onClose]);

  const betDetails = formatBetDetails(receiptData?.betAmounts || {});
  const betColumns = distributeBetsIntoColumns(betDetails);
  const maxColumnLength = Math.max(...betColumns.map(col => col.length));

  if (!receiptData) return null;

  const fontSizes = {
    king: 34,
    sm: 16,
    xs: 16,
    base: 16,
    orderId: 14,
  };

  return (
    <>
      <div
        className="receipt-container"
        style={{ 
          position: "absolute",
          left: "-9999px",
          width: `${receiptWidthMm}mm`,
          maxWidth: `${receiptWidthMm}mm`,
          visibility: "hidden",
          display: "block"
        }}
      >
          {/* Receipt Content */}
          {/* 📌 VISUAL PADDING (on screen only): Tailwind classes p-3 (12px) and print:p-2 (8px) - For actual print margins, see @media print styles below */}
          <div
            className="bg-white p-3 print:p-2"
            style={{ 
              fontFamily: "Arial, sans-serif",
              width: "100%",
              maxWidth: "100%",
              margin: "0"
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
               WinZooo
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
                  <span style={{ fontSize: `${fontSizes.orderId}px` }}>
                    {formatOrderNumber(receiptData.orderNumber)}
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
            <div style={{
              fontFamily: "monospace",
              fontSize: `${fontSizes.xs}px`,
              lineHeight: "1",
              letterSpacing: "1px",
              textAlign: "center",
              margin: "0"
            }}>
              -------------------
            </div>
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
                  fontSize: "72px",
                  lineHeight: "1",
                  letterSpacing: "4px",
                  marginBottom: "4px"
                }}
              >
                {formatCode39(formatBarcodeValue(receiptData.uniqueString || "1234567"))}
              </div>
              <div
                className="mt-1 font-mono"
                style={{ 
                  letterSpacing: "1px", 
                  fontSize: `${fontSizes.xs}px`,
                  lineHeight: "1.2"
                }}
              >
                {formatBarcodeValue(receiptData.uniqueString || "1234567")}
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
          src: url("./Code39AzaleaRegular1.ttf") format("truetype");
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
            left: 0 !important;
            top: 0 !important;
            transform: none !important;
            width: ${receiptWidthMm}mm !important;
            max-width: ${receiptWidthMm}mm !important;
            box-shadow: none !important;
            margin: 0 !important;
            padding: 0 !important;
            border-radius: 0 !important;
            background: white !important;
          }
          .receipt-container > div {
            padding: 8px !important; /* 📌 PRINTER PADDING (Browser Print): Adjust this value for content padding inside the receipt */
            background: white !important;
          }
          @page {
            size: ${receiptWidthMm}mm auto;
            margin: 0 0 0 2mm; /* 📌 PRINTER PAGE MARGIN (Browser Print): left 2mm */
          }
        }
      `}</style>
    </>
  );
};

export default Receipt;