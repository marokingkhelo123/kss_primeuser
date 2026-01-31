import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { io } from "socket.io-client";
import LoadingScreen from "./components/LoadingScreen";
import Login from "./pages/Login";
import Landing from "./pages/Landing";
import MyAccount from "./pages/MyAccount";
import Transactions from "./pages/Transactions";
import ResetPassword from "./pages/ResetPassword";
import DailyReportReceipt from "./components/DailyReportReceipt";
import { api } from "./utils/api";

function App() {
  const [isLoadingComplete, setIsLoadingComplete] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showMyAccount, setShowMyAccount] = useState(false);
  const [showTransactions, setShowTransactions] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [showDailyReport, setShowDailyReport] = useState(false);
  const [dailyReportData, setDailyReportData] = useState(null);
  const socketRef = useRef(null);

  const handleLoadingComplete = () => {
    setIsLoadingComplete(true);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    if (socketRef.current) {
      socketRef.current.disconnect();
      socketRef.current = null;
    }
    // Clear user data and tokens from localStorage on logout
    localStorage.removeItem("username");
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setIsLoggedIn(false);
    setShowMyAccount(false);
    setShowTransactions(false);
    setShowResetPassword(false);
  };

  const handleShowMyAccount = () => {
    setShowMyAccount(true);
    setShowTransactions(false);
    setShowResetPassword(false);
  };

  const handleCloseMyAccount = () => {
    setShowMyAccount(false);
  };

  const handleShowTransactions = () => {
    setShowTransactions(true);
    setShowMyAccount(false);
    setShowResetPassword(false);
  };

  const handleCloseTransactions = () => {
    setShowTransactions(false);
    setShowMyAccount(true); // Return to My Account page
  };

  const handleShowResetPassword = () => {
    setShowResetPassword(true);
    setShowMyAccount(false);
    setShowTransactions(false);
  };

  const handleCloseResetPassword = () => {
    setShowResetPassword(false);
    setShowMyAccount(true); // Return to My Account page
  };

  const handleShowDailyReport = async () => {
    const toastId = toast.loading("Loading daily report...");
    try {
      // Get user ID from localStorage
      const storedUser = localStorage.getItem("user");
      if (!storedUser) {
        console.error("User not found");
        toast.error("User not logged in. Please login again.", { id: toastId });
        return;
      }
      const user = JSON.parse(storedUser);
      const userId = user._id;

      // Fetch daily report data
      const response = await api.post("/users/getDailyReport", { userId });
      
      if (response.data && response.data.data) {
        setDailyReportData(response.data.data);
        setShowDailyReport(true);
        setShowMyAccount(false);
        toast.success("Daily report ready.", { id: toastId });
      } else {
        toast.error("No daily report data available.", { id: toastId });
      }
    } catch (error) {
      console.error("Error fetching daily report:", error);
      toast.error("Failed to load daily report. Please try again.", { id: toastId });
    }
  };

  const handleCloseDailyReport = () => {
    setShowDailyReport(false);
    setDailyReportData(null);
    setShowMyAccount(true); // Return to My Account page
  };

  // Connect to realtime channel after login
  useEffect(() => {
    if (!isLoggedIn) {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
      return;
    }

    const storedUser = localStorage.getItem("user");
    const parsedUser = storedUser ? JSON.parse(storedUser) : null;
    const userId = parsedUser?._id;
    if (!userId) return;

    const apiBase = import.meta.env.VITE_API_BASE_URL;
    if (!apiBase) return;
    const baseUrl = new URL(apiBase);
    const wsBase = `${baseUrl.protocol}//${baseUrl.host}`;

    const socket = io(wsBase, {
      transports: ["websocket"],
      query: {
        userId,
      },
    });

    socket.on("connect", () => {
      console.log("socket connected", socket.id);
    });
    socket.on("connect_error", (err) => {
      console.error("socket connect_error", err.message);
    });
    socket.on("disconnect", (reason) => {
      console.log("socket disconnect", reason);
    });
    socket.on("force-logout", (payload) => {
      console.log("force-logout received", payload);
      handleLogout();
    });

    socketRef.current = socket;

    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, [isLoggedIn]);

  // Show loading screen for a brief moment, then proceed to login
  if (!isLoadingComplete) {
    return <LoadingScreen onLoadingComplete={handleLoadingComplete} />;
  }

  // Show login page after loading screen
  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  // Show landing page as base, with components overlaid on top
  return (
    <>
      <Landing onLogout={handleLogout} onShowMyAccount={handleShowMyAccount} />
      {showMyAccount && (
        <MyAccount
          onClose={handleCloseMyAccount}
          onLogout={handleLogout}
          onShowTransactions={handleShowTransactions}
          onShowResetPassword={handleShowResetPassword}
          onShowDailyReport={handleShowDailyReport}
        />
      )}
      {showTransactions && (
        <Transactions onClose={handleCloseTransactions} />
      )}
      {showResetPassword && (
        <ResetPassword onClose={handleCloseResetPassword} />
      )}
      {showDailyReport && dailyReportData && (
        <DailyReportReceipt
          reportData={dailyReportData}
          onClose={handleCloseDailyReport}
        />
      )}
    </>
  );
}

export default App;
