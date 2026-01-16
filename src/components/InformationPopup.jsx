import { useState, useEffect } from "react";
import { api } from "../utils/api";

const InformationPopup = ({ isOpen, onClose, userId }) => {
  const [infoData, setInfoData] = useState([]);
  const [isInfoLoading, setIsInfoLoading] = useState(false);
  const [copiedCode, setCopiedCode] = useState(null);

  // Map backend bet keys to numeric betting numbers
  const mapBetKeyToNumber = (key) => {
    const wordToNumber = {
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

    if (key.startsWith("bet")) {
      const numeric = Number(key.replace("bet", ""));
      return Number.isNaN(numeric) ? null : numeric;
    }

    if (wordToNumber[key] !== undefined) {
      return wordToNumber[key];
    }

    return null;
  };

  const formatInformationRows = (bets = []) => {
    return bets.map((bet) => {
      const betDate = bet.startTime
        ? new Date(bet.startTime)
        : bet.createdAt
        ? new Date(bet.createdAt)
        : null;

      const formattedDate = betDate
        ? betDate.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "2-digit",
          })
        : "--";

      const formattedTime = betDate
        ? betDate.toLocaleTimeString("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          })
        : "--";

      const betAmounts = bet.betAmounts || {};
      const bettingNumbers = Object.entries(betAmounts)
        .filter(([, amount]) => Number(amount) > 0)
        .map(([key]) => mapBetKeyToNumber(key))
        .filter((value) => value !== null)
        .sort((a, b) => a - b);

      const points =
        typeof bet.totalBetPoints === "number"
          ? bet.totalBetPoints
          : Object.values(betAmounts).reduce(
              (sum, amount) => sum + Number(amount || 0),
              0
            );

      return {
        date: formattedDate,
        time: formattedTime,
        bettingNumbers,
        points,
        ticketCode: bet.uniqueString || "--",
      };
    });
  };

  // Resolve userId from prop or localStorage
  const resolveUserId = () => {
    if (userId) return userId;

    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser && parsedUser._id) {
          return parsedUser._id;
        }
      } catch (error) {
        console.error("Error parsing user from localStorage:", error);
      }
    }

    return null;
  };

  // Fetch user information for the popup
  const fetchUserInformation = async () => {
    const activeUserId = resolveUserId();
    if (!activeUserId) {
      console.warn("UserId is not available to load information table");
      return;
    }

    setIsInfoLoading(true);
    try {
      const response = await api.post("/users/get-user-info", {
        userId: activeUserId,
      });
      const bets = response.data?.data || [];
      setInfoData(formatInformationRows(bets).reverse());
    } catch (error) {
      console.error("Error fetching user information:", error);
      setInfoData([]);
    } finally {
      setIsInfoLoading(false);
    }
  };

  // Fetch data when popup opens
  useEffect(() => {
    if (isOpen) {
      fetchUserInformation();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, userId]);

  const handleCopy = async (ticketCode) => {
    if (!ticketCode || ticketCode === "--") return;
    try {
      await navigator.clipboard.writeText(ticketCode);
      setCopiedCode(ticketCode);
      setTimeout(() => setCopiedCode(null), 1500);
    } catch (error) {
      console.error("Failed to copy ticket code:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}
      onClick={onClose}
    >
      <div
        className="relative bg-blue-600 rounded-lg p-8 w-full max-w-[90vw] md:max-w-4xl mx-4 max-h-[80vh] overflow-y-auto"
        style={{ backgroundColor: "#1e40af" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button - Red circular button with white X */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors"
        >
          <span className="text-white text-2xl font-bold cursor-pointer ">
            X
          </span>
        </button>

        {/* Title */}
        <h2 className="text-white font-bold text-2xl text-center mb-6">
          Information
        </h2>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-white">
            <thead>
              <tr className="border-b border-blue-400">
                <th className="text-left py-3 px-4 font-bold">Date</th>
                <th className="text-left py-3 px-4 font-bold">Time</th>
                <th className="text-left py-3 px-4 font-bold">
                  Betting Number
                </th>
                <th className="text-left py-3 px-4 font-bold">Points</th>
                <th className="text-left py-3 px-4 font-bold">Ticket Code</th>
              </tr>
            </thead>
            <tbody>
              {isInfoLoading ? (
                <tr className="border-b border-blue-400">
                  <td className="py-3 px-4 text-center" colSpan={5}>
                    Loading...
                  </td>
                </tr>
              ) : infoData.length === 0 ? (
                <tr className="border-b border-blue-400">
                  <td className="py-3 px-4 text-center" colSpan={5}>
                    No information available yet.
                  </td>
                </tr>
              ) : (
                infoData.map((row, index) => (
                  <tr key={index} className="border-b border-blue-400">
                    <td className="py-3 px-4">{row.date}</td>
                    <td className="py-3 px-4">{row.time}</td>
                    <td className="py-3 px-4">
                      {row.bettingNumbers.join(", ")}
                    </td>
                    <td className="py-3 px-4">{row.points}</td>
                    <td className="py-3 px-4">
                      <div className="flex flex-wrap items-center gap-2">
                        <span>{row.ticketCode}</span>
                        <button
                          type="button"
                          onClick={() => handleCopy(row.ticketCode)}
                          className="rounded bg-blue-500 p-2 text-white hover:bg-blue-400 transition-colors"
                          aria-label="Copy ticket code"
                          title="Copy ticket code"
                        >
                          <svg
                            viewBox="0 0 24 24"
                            className="h-4 w-4"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <rect x="9" y="9" width="10" height="10" rx="2" />
                            <path d="M5 15V5a2 2 0 0 1 2-2h10" />
                          </svg>
                        </button>
                        {copiedCode === row.ticketCode && (
                          <span className="text-xs text-green-200">
                            Copied
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Note */}
        <p className="text-white text-center mt-6 text-sm">
          Note: Only for 1 day, next day it will be deleted.
        </p>
      </div>
    </div>
  );
};

export default InformationPopup;
