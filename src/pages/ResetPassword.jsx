import { useState, useEffect } from "react";
import backgroundImage from "../assets/images/0_background_and_logo/bg_main@2x.jpg";
import logo from "../assets/images/3_landing/navbar/logo_kss@2x.png";
import closeIcon from "../assets/images/3_landing/navbar/ico-close@2x.png";
import balanceIcon from "../assets/images/3_landing/navbar/ico-balance@2x.png";
import userIcon from "../assets/images/3_landing/navbar/ico-user@2x.png";
import claimIcon from "../assets/images/3_landing/navbar/ico-claim@2x.png";
import lockIcon from "../assets/images/6_reset_password/ico-lock@2x.png";
import { api } from "../utils/api";

const ResetPassword = ({ onClose }) => {
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState("");
  const [balance, setBalance] = useState(0);
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    // Validation
    if (!formData.oldPassword || !formData.newPassword || !formData.confirmPassword) {
      setError("Please fill in all fields.");
      setIsLoading(false);
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setError("New password and confirm password do not match.");
      setIsLoading(false);
      return;
    }

    if (formData.newPassword.length < 6) {
      setError("New password must be at least 6 characters long.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await api.post("/users/update-password", {
        username: username,
        oldpassword: formData.oldPassword,
        newpassword: formData.newPassword,
      });

      if (response.data && response.data.data) {
        if (response.data.data.updated) {
          setSuccess(response.data.data.message || "Password updated successfully!");
          // Clear form
          setFormData({
            oldPassword: "",
            newPassword: "",
            confirmPassword: "",
          });
          // After successful password change, user should login again
          setTimeout(() => {
            if (onClose) {
              onClose();
            }
          }, 2000);
        } else {
          setError(response.data.data.message || "Failed to update password.");
        }
      } else {
        setError("Invalid response from server.");
      }
    } catch (err) {
      if (err.response) {
        const errorMessage =
          err.response.data?.message ||
          err.response.data?.error ||
          "Failed to update password. Please check your old password.";
        setError(errorMessage);
      } else if (err.request) {
        setError("Unable to connect to server. Please check your connection.");
      } else {
        setError(err.message || "An error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
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
        <div 
          className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
          onClick={() => {
            if (onClose) {
              onClose();
            }
          }}
        >
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

        {/* Reset Password Panel - Light beige background */}

         <h1 className="text-4xl font-bold text-white mb-10 text-center">
            Reset Password
          </h1>

        <div
          className="rounded-lg p-10 w-full max-w-2xl shadow-2xl"
          style={{ backgroundColor: "#F5E6D3" }}
        >
          {/* Reset Password Title */}
         

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Old Password Field */}
            <div className="flex items-center gap-4">
              <img
                src={lockIcon}
                alt="Lock Icon"
                className="h-8 w-auto object-contain"
              />
              <input
                type="password"
                name="oldPassword"
                value={formData.oldPassword}
                onChange={handleChange}
                placeholder="Old Password"
                className="flex-1 bg-[#F5E6D3] border-2 border-gray-400 rounded-lg px-4 py-4 text-black placeholder-gray-500 focus:outline-none focus:border-orange-500 text-lg"
                required
              />
            </div>

            {/* New Password Field */}
            <div className="flex items-center gap-4">
              <img
                src={lockIcon}
                alt="Lock Icon"
                className="h-8 w-auto object-contain"
              />
              <input
                type="password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                placeholder="New Password"
                className="flex-1 bg-[#F5E6D3] border-2 border-gray-400 rounded-lg px-4 py-4 text-black placeholder-gray-500 focus:outline-none focus:border-orange-500 text-lg"
                required
              />
            </div>

            {/* Confirm Password Field */}
            <div className="flex items-center gap-4">
              <img
                src={lockIcon}
                alt="Lock Icon"
                className="h-8 w-auto object-contain"
              />
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
                className="flex-1 bg-[#F5E6D3] border-2 border-gray-400 rounded-lg px-4 py-4 text-black placeholder-gray-500 focus:outline-none focus:border-orange-500 text-lg"
                required
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-4 bg-red-100 border-2 border-red-400 rounded-lg">
                <p className="text-red-700 font-semibold text-center">
                  {error}
                </p>
              </div>
            )}

            {/* Success Message */}
            {success && (
              <div className="p-4 bg-green-100 border-2 border-green-400 rounded-lg">
                <p className="text-green-700 font-semibold text-center">
                  {success}
                </p>
              </div>
            )}

            {/* Reset Password Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold text-xl py-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-8"
            >
              {isLoading ? "Resetting Password..." : "Reset Password"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;

