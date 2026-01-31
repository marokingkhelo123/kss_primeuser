import { useState, useEffect } from "react";
import backgroundImage from "../assets/images/0_background_and_logo/bg_main@2x.jpg";
import logo from "../assets/images/3_landing/navbar/logo_kss@2x.png";
import closeIcon from "../assets/images/3_landing/navbar/ico-close@2x.png";
import balanceIcon from "../assets/images/3_landing/navbar/ico-balance@2x.png";
import userIcon from "../assets/images/3_landing/navbar/ico-user@2x.png";
import claimIcon from "../assets/images/3_landing/navbar/ico-claim@2x.png";
import transactionIcon from "../assets/images/4_my_account/ico-transaction@2x.png";
import resetPassIcon from "../assets/images/4_my_account/ico-reset-pass@2x.png";
import logOutIcon from "../assets/images/4_my_account/ico-log-out@2x.png";
import { api } from "../utils/api";

const MyAccount = ({ onClose, onLogout, onShowTransactions, onShowResetPassword, onShowDailyReport }) => {
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState("");
  const [balance, setBalance] = useState(0);
  const [balancePoints, setBalancePoints] = useState(0);
  const [winningPoints, setWinningPoints] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch user data from API
  const fetchUserData = async (userId) => {
    try {
      setIsLoading(true);
      const response = await api.post("/users/getUserBalance", { userId });
      
      if (response.data && response.data.data && response.data.data.user) {
        const user = response.data.data.user;
        
        // Update username
        if (user.username) {
          setUsername(user.username);
        }
        
        // Update user ID display
        if (user._id) {
          // Format user ID as KUID + last 5 digits of _id
          const idString = user._id.toString();
          const lastFive = idString.slice(-5).padStart(5, '0');
          setUserId(`KUID${lastFive}`);
        }
        
        // Update balance (shown in header)
        if (user.balance !== undefined) {
          setBalance(user.balance);
        }
        
        // Update balance points (shown in the panel)
        if (user.balance !== undefined) {
          setBalancePoints(user.balance);
        }
        
        // Update winning points (shown in the panel)
        if (user.winning_amount !== undefined) {
          setWinningPoints(user.winning_amount);
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
            setBalancePoints(user.balance);
          }
          if (user.winning_amount !== undefined) {
            setWinningPoints(user.winning_amount);
          }
        } catch (parseError) {
          console.error("Error parsing stored user data:", parseError);
        }
      }
    } finally {
      setIsLoading(false);
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
          setBalancePoints(user.balance);
        }
        if (user.winning_amount !== undefined) {
          setWinningPoints(user.winning_amount);
        }
        
        // Fetch fresh data from API
        fetchUserData(user._id);
      } catch (error) {
        console.error("Error parsing user data:", error);
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
    }
  }, []);

  const handleTransactions = () => {
    // Navigate to Transactions page
    if (onShowTransactions) {
      onShowTransactions();
    }
  };

  const handleResetPassword = () => {
    // Navigate to Reset Password page
    if (onShowResetPassword) {
      onShowResetPassword();
    }
  };

  const handleLogOut = () => {
    if (onLogout) {
      onLogout();
    }
  };

  const handleDailyReport = () => {
    // Navigate to Daily Report
    if (onShowDailyReport) {
      onShowDailyReport();
    }
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

        {/* Close icon - Button to close/exit and return to landing */}
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
        className="flex flex-col items-center justify-center min-h-screen90 p-8"
        
      >
        {/* Back Button */}
        <div className="w-full max-w-5xl">
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

        {/* My Account Title */}
        <h1 className="text-4xl font-bold text-white mb-12">
          My Account
        </h1>

        {/* Points Display Panel - Light beige background */}
        <div
          className="rounded-lg p-10 w-full max-w-5xl shadow-2xl"
          style={{ backgroundColor: "#F5E6D3" }}
        >
          {/* Points Display Section */}
          <div className="flex justify-around items-start mb-10">
            {/* Balance Points */}
            <div className="flex flex-col items-center flex-1">
              <span className="text-black font-semibold text-2xl mb-6">
                Balance Points
              </span>
              <div
                className="rounded-lg px-12 py-4 flex items-center justify-center w-full max-w-xs"
                style={{ backgroundColor: "#22C55E" }}
              >
                <span className="text-white font-bold text-6xl">
                  {balancePoints}
                </span>
              </div>
            </div>

            {/* Winning Points */}
            <div className="flex flex-col items-center flex-1">
              <span className="text-black font-semibold text-2xl mb-6">
                Winning Points
              </span>
              <div
                className="rounded-lg px-12 py-4 flex items-center justify-center w-full max-w-xs"
                style={{ backgroundColor: "#A855F7" }}
              >
                <span className="text-white font-bold text-6xl">
                  {winningPoints}
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons Section */}
          <div className="flex justify-around items-center border-t-2 border-gray-400 pt-8">
            {/* Transactions Button */}
            <button
              onClick={handleTransactions}
              className="flex flex-col items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity flex-1"
            >
              <div className="relative flex items-center justify-center">
                <img
                  src={transactionIcon}
                  alt="Transactions"
                  className="h-10 w-auto object-contain"
                />
              </div>
              <span className="text-black font-semibold text-lg">
                Transactions
              </span>
            </button>

            {/* Divider */}
            <div className="h-20 w-0.5 bg-gray-400 mx-4"></div>

            {/* Daily Report Button */}
            <button
              onClick={handleDailyReport}
              className="flex flex-col items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity flex-1"
            >
              <div className="relative flex items-center justify-center h-10 w-10">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-full w-full text-black"
                >
                  <line x1="12" y1="2" x2="12" y2="22"></line>
                  <path d="M17 5H9.5a3.5 3.5 0 1 0 0 7h5a3.5 3.5 0 1 1 0 7H6"></path>
                </svg>
              </div>
              <span className="text-black font-semibold text-lg">
                Daily Report
              </span>
            </button>

            {/* Divider */}
            <div className="h-20 w-0.5 bg-gray-400 mx-4"></div>

            {/* Reset Password Button */}
            <button
              onClick={handleResetPassword}
              className="flex flex-col items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity flex-1"
            >
              <img
                src={resetPassIcon}
                alt="Reset Password"
                className="h-10 w-auto object-contain"
              />
              <span className="text-black font-semibold text-lg">
                Reset Password
              </span>
            </button>

            {/* Divider */}
            <div className="h-20 w-0.5 bg-gray-400 mx-4"></div>

            {/* Log Out Button */}
            <button
              onClick={handleLogOut}
              className="flex flex-col items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity flex-1"
            >
              <img
                src={logOutIcon}
                alt="Log Out"
                className="h-10 w-auto object-contain"
              />
              <span className="text-black font-semibold text-lg">Log Out</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAccount;

