import { useState } from "react";
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

  const handleLoadingComplete = () => {
    setIsLoadingComplete(true);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
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

  // Show loading screen for a brief moment, then proceed to login
  if (!isLoadingComplete) {
    return <LoadingScreen onLoadingComplete={handleLoadingComplete} />;
  }

  // Show login page after loading screen
  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  // Show Reset Password page if requested
  if (showResetPassword) {
    return <ResetPassword onClose={handleCloseResetPassword} />;
  }

  // Show Transactions page if requested
  if (showTransactions) {
    return <Transactions onClose={handleCloseTransactions} />;
  }

  // Show My Account page if requested
  if (showMyAccount) {
    return (
      <MyAccount
        onClose={handleCloseMyAccount}
        onLogout={handleLogout}
        onShowTransactions={handleShowTransactions}
        onShowResetPassword={handleShowResetPassword}
      />
    );
  }

  // Show landing page after login
  return <Landing onLogout={handleLogout} onShowMyAccount={handleShowMyAccount} />;
}

export default App;
