import React, { useEffect, useRef } from "react";

/**
 * Daily Report Receipt Component
 * Prints daily game report with opening balance, draw points, winning points, profit points, and closing balance
 */

const DailyReportReceipt = ({ reportData, onClose }) => {
  const printedReceiptsRef = useRef(new Set());

  // Generate receipt HTML for printing
  const generateReceiptHTML = () => {
    const fontSizes = {
      king: 18,
      sm: 14,
      xs: 14,
      base: 14,
    };

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
      padding: 12px;
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
      margin-bottom: 8px;
      line-height: 1.4;
    }
    .info-left, .info-right {
      font-size: ${fontSizes.sm}px;
    }
    .info-right {
      text-align: right;
    }
    .report-details {
      margin-top: 12px;
      margin-bottom: 8px;
    }
    .detail-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 6px;
      font-size: ${fontSizes.sm}px;
      line-height: 1.4;
    }
    .detail-label {
      font-weight: bold;
    }
    .detail-value {
      text-align: right;
    }
    .total-separator {
      border: 1px dotted #000;
      display: block;
      margin: 12px 0;
    }
    .print-time {
      text-align: center;
      font-size: ${fontSizes.xs}px;
      margin-bottom: 8px;
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
      margin: 0;
    }
  </style>
</head>
<body>
  <div class="receipt-container">
    <div class="receipt-content">
      <div class="header">
        <h2>Today's Game Report</h2>
      </div>
      
      <div class="info-row">
        <div class="info-left">
          <div><strong>User Name:</strong> ${reportData.username || "N/A"}</div>
        </div>
        <div class="info-right">
          <div><strong>Date:</strong> ${reportData.date || "N/A"}</div>
        </div>
      </div>
      
      <div class="report-details">
        <div class="detail-row">
          <span class="detail-label">Opening Balance</span>
          <span class="detail-value">${(reportData.openingBalance || 0).toFixed(2)}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Total Draw Points</span>
          <span class="detail-value">${(reportData.totalDrawPoints || 0).toFixed(2)}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Total Winning Points</span>
          <span class="detail-value">${(reportData.totalWinningPoints || 0).toFixed(2)}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Total Profit Points</span>
          <span class="detail-value">${(reportData.totalProfitPoints || 0).toFixed(2)}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Closing Balance</span>
          <span class="detail-value">${(reportData.closingBalance || 0).toFixed(2)}</span>
        </div>
      </div>
      
      <hr class="total-separator" />
      
      <div class="print-time">
        Print On ${new Date().toLocaleString("en-US", {
          month: "2-digit",
          day: "2-digit",
          year: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        })}
      </div>
      
      <div class="footer">
        For Amusement Only
      </div>
    </div>
  </div>
</body>
</html>`;
  };

  // Auto-print after component is ready
  useEffect(() => {
    if (!reportData) return;

    // Use date as unique identifier
    const receiptId = `daily-report-${reportData.date}-${Date.now()}`;
    
    // Skip if this receipt has already been printed
    if (printedReceiptsRef.current.has(receiptId)) {
      return;
    }

    const triggerPrint = () => {
      // Mark this receipt as printed
      printedReceiptsRef.current.add(receiptId);
      
      // Wait a bit for rendering
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

    // Wait before printing
    const printTimer = setTimeout(() => {
      triggerPrint();
    }, 600);

    return () => clearTimeout(printTimer);
  }, [reportData, onClose]);

  if (!reportData) return null;

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
        <div
          className="bg-white p-4 print:p-3"
          style={{ 
            fontFamily: "Arial, sans-serif",
            width: "100%",
            maxWidth: "100%",
            margin: "0 auto"
          }}
        >
          {/* Header */}
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
              Today's game report
            </h2>
          </div>

          {/* User Name and Date */}
          <div className="mb-3 flex justify-between items-start">
            <div style={{ lineHeight: "1.4" }}>
              <div>
                <span className="font-bold" style={{ fontSize: `${fontSizes.sm}px` }}>
                  User Name:{" "}
                </span>
                <span style={{ fontSize: `${fontSizes.sm}px` }}>
                  {reportData.username || "N/A"}
                </span>
              </div>
            </div>
            <div style={{ lineHeight: "1.4", textAlign: "right" }}>
              <div>
                <span className="font-bold" style={{ fontSize: `${fontSizes.sm}px` }}>
                  Date:{" "}
                </span>
                <span style={{ fontSize: `${fontSizes.sm}px` }}>
                  {reportData.date || "N/A"}
                </span>
              </div>
            </div>
          </div>

          {/* Report Details */}
          <div className="mt-3 mb-2">
            <div className="mb-2 flex justify-between items-center" style={{ fontSize: `${fontSizes.sm}px`, lineHeight: "1.4" }}>
              <span className="font-bold">Opening Balance</span>
              <span style={{ textAlign: "right" }}>{(reportData.openingBalance || 0).toFixed(2)}</span>
            </div>
            <div className="mb-2 flex justify-between items-center" style={{ fontSize: `${fontSizes.sm}px`, lineHeight: "1.4" }}>
              <span className="font-bold">Total Draw Points</span>
              <span style={{ textAlign: "right" }}>{(reportData.totalDrawPoints || 0).toFixed(2)}</span>
            </div>
            <div className="mb-2 flex justify-between items-center" style={{ fontSize: `${fontSizes.sm}px`, lineHeight: "1.4" }}>
              <span className="font-bold">Total Winning Points</span>
              <span style={{ textAlign: "right" }}>{(reportData.totalWinningPoints || 0).toFixed(2)}</span>
            </div>
            <div className="mb-2 flex justify-between items-center" style={{ fontSize: `${fontSizes.sm}px`, lineHeight: "1.4" }}>
              <span className="font-bold">Total Profit Points</span>
              <span style={{ textAlign: "right" }}>{(reportData.totalProfitPoints || 0).toFixed(2)}</span>
            </div>
            <div className="mb-2 flex justify-between items-center" style={{ fontSize: `${fontSizes.sm}px`, lineHeight: "1.4" }}>
              <span className="font-bold">Closing Balance</span>
              <span style={{ textAlign: "right" }}>{(reportData.closingBalance || 0).toFixed(2)}</span>
            </div>
          </div>

          {/* Separator */}
          <hr style={{ border: "1px dotted #000", display: "block", margin: "12px 0" }} />

          {/* Print Time */}
          <div className="mb-2 text-center">
            <div style={{ fontSize: `${fontSizes.xs}px` }}>
              Print On {new Date().toLocaleString("en-US", {
                month: "2-digit",
                day: "2-digit",
                year: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
          </div>

          {/* Footer */}
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
            border: 3px solid #000;
          }
          .receipt-container > div {
            padding: 12px !important;
            background: white !important;
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

export default DailyReportReceipt;
