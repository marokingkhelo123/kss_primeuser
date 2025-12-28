import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import LoadingScreen from "./components/LoadingScreen";
import Login from "./pages/Login";
import Landing from "./pages/Landing";
import MyAccount from "./pages/MyAccount";
import Transactions from "./pages/Transactions";
import ResetPassword from "./pages/ResetPassword";

function App() {
  const [isLoadingComplete, setIsLoadingComplete] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showMyAccount, setShowMyAccount] = useState(false);
  const [showTransactions, setShowTransactions] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);
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
        />
      )}
      {showTransactions && (
        <Transactions onClose={handleCloseTransactions} />
      )}
      {showResetPassword && (
        <ResetPassword onClose={handleCloseResetPassword} />
      )}
    </>
  );
}

export default App;
