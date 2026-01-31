import { useState, useEffect } from "react";
import backgroundImage from "../assets/images/0_background_and_logo/bg_main@2x.jpg";
import logo from "../assets/images/3_landing/navbar/logo_kss@2x.png";
import closeIcon from "../assets/images/3_landing/navbar/ico-close@2x.png";
import balanceIcon from "../assets/images/3_landing/navbar/ico-balance@2x.png";
import userIcon from "../assets/images/3_landing/navbar/ico-user@2x.png";
import claimIcon from "../assets/images/3_landing/navbar/ico-claim@2x.png";
import { api } from "../utils/api";

const Transactions = ({ onClose }) => {
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState("");
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch user data from API
  const fetchUserData = async (userId) => {
    try {
      const response = await api.post("/users/getUserBalance", { userId });
      if (response.data && response.data.data && response.data.data.user) {
        const user = response.data.data.user;
        if (user.username) {
          setUsername(user.username);
        }
        if (user._id) {
          const idString = user._id.toString();
          const lastFive = idString.slice(-5).padStart(5, '0');
          setUserId(`KUID${lastFive}`);
        }
        if (user.balance !== undefined) {
          setBalance(user.balance);
        }
        // Update localStorage with latest user data
        localStorage.setItem("user", JSON.stringify(user));
        if (user.username) {
          localStorage.setItem("username", user.username);
        }
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      // Fallback to localStorage data if API fails
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        try {
          const user = JSON.parse(storedUser);
          if (user.username) {
            setUsername(user.username);
          }
          if (user._id) {
            const idString = user._id.toString();
            const lastFive = idString.slice(-5).padStart(5, '0');
            setUserId(`KUID${lastFive}`);
          }
          if (user.balance !== undefined) {
            setBalance(user.balance);
          }
        } catch (parseError) {
          console.error("Error parsing stored user data:", parseError);
        }
      }
    }
  };

  useEffect(() => {
    // Get initial data from localStorage first (for immediate display)
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }

    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        if (user.username) {
          setUsername(user.username);
        }
        if (user._id) {
          const idString = user._id.toString();
          const lastFive = idString.slice(-5).padStart(5, '0');
          setUserId(`KUID${lastFive}`);
        }
        if (user.balance !== undefined) {
          setBalance(user.balance);
        }
        
        // Fetch fresh data from API
        fetchUserData(user._id);
        // Fetch transactions
        fetchTransactions(user._id);
      } catch (error) {
        console.error("Error parsing user data:", error);
        // Use sample data if API fails
        setTransactions(getSampleTransactions());
        setLoading(false);
      }
    } else {
      // Use sample data if no user data
      setTransactions(getSampleTransactions());
      setLoading(false);
    }
  }, []);

  const fetchTransactions = async (userId) => {
    try {
      setLoading(true);
      const response = await api.post("/users/getUserTransactions", { userId });
      if (response.data && response.data.data) {
        setTransactions(response.data.data);
      } else {
        // Fallback to sample data
        setTransactions(getSampleTransactions());
      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
      // Use sample data on error
      setTransactions(getSampleTransactions());
    } finally {
      setLoading(false);
    }
  };

  const getSampleTransactions = () => {
    return [
      {
        date: "13.07.2022",
        type: "Add balance",
        source: "Deposit balance",
        details: "+100",
        color: "black",
      },
      {
        date: "13.07.2022",
        type: "Gaming",
        source: "Loss balance",
        details: "-100",
        color: "red",
      },
      {
        date: "13.07.2022",
        type: "Add balance",
        source: "Desposit balance",
        details: "+100",
        color: "black",
      },
      {
        date: "13.07.2022",
        type: "Gaming",
        source: "Winnings Balance",
        details: "+100",
        color: "green",
      },
      {
        date: "13.07.2022",
        type: "Remove balance",
        source: "Withdraw Balance",
        details: "-100",
        color: "red",
      },
    ];
  };

  const formatTransaction = (transaction) => {
    // Format date
    const date = transaction.createdAt
      ? new Date(transaction.createdAt).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }).replace(/\//g, ".")
      : transaction.date || "13.07.2022";

    // Get type
    const type = transaction.type || "Gaming";

    // Get source
    const source = transaction.source || "Deposit balance";

    // Format details with color
    let details = "";
    let color = "black";

    if (transaction.type === "Add balance" || transaction.type === "Deposit") {
      details = `+${transaction.amount || 100}`;
      color = "black";
    } else if (
      transaction.type === "Remove Balance" ||
      transaction.type === "Withdraw"
    ) {
      details = `-${transaction.amount || 100}`;
      color = "red";
    } else if (transaction.type === "Gaming") {
      if (transaction.isProfit) {
        details = `+${transaction.amount || 100}`;
        color = "green";
      } else {
        details = `-${transaction.amount || 100}`;
        color = "red";
      }
    } else {
      details = transaction.amount
        ? `${transaction.amount > 0 ? "+" : ""}${transaction.amount}`
        : "+100";
      color = transaction.color || "black";
    }

    return { date, type, source, details, color };
  };

  return (
    <div
      className="fixed inset-0 z-50 w-full h-full overflow-auto"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Header Bar - Dark red horizontal bar */}
      <nav
        className="w-full h-16 flex items-center px-4 justify-between"
        style={{
          background: "linear-gradient(to bottom, #0063cd, #4c017c)",
        }}
      >
        {/* Logo - KSS brand logo on the left side */}
        <img
          src={logo}
          alt="KSS Logo"
          className="ml-5 h-12 w-auto object-contain w90"
        />

        {/* Disclaimer text - "FOR AMUSEMENT ONLY" message */}
        <span className="text-white font-semibold text-lg ml-5 mr-5">
          FOR AMUSEMENT ONLY
        </span>

        {/* User ID with user icon */}
        <div className="flex items-center gap-2">
          <img
            src={userIcon}
            alt="User Icon"
            className="h-12 w-auto object-contain"
          />
          <span className="text-white font-semibold text-lg">
            {username || userId}
          </span>
        </div>

        {/* Claim icon */}
        <div className="flex items-center mx-4">
          <img
            src={claimIcon}
            alt="Claim Icon"
            className="h-12 w-auto object-contain"
          />
        </div>

        {/* Balance icon - Displays user's account balance */}
        <div className="relative flex items-center">
          <img
            src={balanceIcon}
            alt="Balance"
            className="h-12 w-auto object-contain"
          />
          {/* Balance display - Overlaid on the icon */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <span className="text-black font-bold text-sm drop-shadow-lg">
              {balance}
            </span>
          </div>
        </div>

        {/* Close icon - Button to close/exit and return to previous page */}
        <img
          src={closeIcon}
          alt="Close"
          className="h-12 w-auto object-contain cursor-pointer mr-5"
          onClick={() => {
            if (onClose) {
              onClose();
            }
          }}
        />
      </nav>

      {/* Main Content Area - Yellow to Orange Gradient */}
      <div
        className="flex flex-col items-center min-h-screen90 p-8" 
      >
        {/* Back Button */}
        <div className="w-full max-w-6xl">
          <button
            onClick={() => {
              if (onClose) {
                onClose();
              }
            }}
            className="flex items-center gap-2 text-white font-semibold text-lg hover:opacity-80 transition-opacity bg-red-600 px-4 py-2 rounded-lg"
          >
            <span>←</span>
            <span>Back</span>
          </button>
        </div>

        {/* Transactions Title */}
        <h1 className="text-4xl font-bold text-white mb-8">
          Transactions
        </h1>

        {/* Transactions Panel - Light beige background */}
        <div
          className="rounded-lg p-8 w-full max-w-6xl shadow-2xl h-504"
          style={{ backgroundColor: "#F5E6D3" }}
        >
          {loading ? (
            <div className="text-center py-8">
              <span className="text-black font-semibold text-lg">
                Loading transactions...
              </span>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-400">
                    <th className="text-left py-4 px-4 text-black font-bold text-lg">
                      Date
                    </th>
                    <th className="text-left py-4 px-4 text-black font-bold text-lg">
                      Type
                    </th>
                    <th className="text-left py-4 px-4 text-black font-bold text-lg">
                      Source
                    </th>
                    <th className="text-left py-4 px-4 text-black font-bold text-lg">
                      Details
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.length === 0 ? (
                    <tr>
                      <td
                        colSpan="4"
                        className="text-center py-8 text-black font-semibold"
                      >
                        No transactions found
                      </td>
                    </tr>
                  ) : (
                    transactions.map((transaction, index) => {
                      const formatted = formatTransaction(transaction);
                      return (
                        <tr
                          key={index}
                          className="border-b border-gray-300 hover:bg-gray-100 transition-colors"
                        >
                          <td className="py-4 px-4 text-black font-semibold">
                            {formatted.date}
                          </td>
                          <td className="py-4 px-4 text-black font-semibold">
                            {formatted.type}
                          </td>
                          <td className="py-4 px-4 text-black font-semibold">
                            {formatted.source}
                          </td>
                          <td
                            className="py-4 px-4 font-semibold"
                            style={{
                              color:
                                formatted.color === "red"
                                  ? "#EF4444"
                                  : formatted.color === "green"
                                  ? "#22C55E"
                                  : "#000000",
                            }}
                          >
                            {formatted.details}
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Transactions;

