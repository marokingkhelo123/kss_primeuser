import { useState } from "react";
import loginLogo from "../assets/images/2_login/logo-login_kss@2x.png";
import userIcon from "../assets/images/2_login/ico-user@2x.png";
import lockIcon from "../assets/images/2_login/ico-lock@2x.png";
import backgroundImage from "../assets/images/0_background_and_logo/bg_main@2x.jpg";
import loginExitSound from "../assets/sounds/login&exit.mp3";
import { api } from "../utils/api";

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const playSound = () => {
    const audio = new Audio(loginExitSound);
    audio.play().catch((error) => {
      // Handle autoplay restrictions
      console.log("Sound playback failed:", error);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    playSound();
    setIsLoading(true);
    setError("");

    // Validate form data
    if (!formData.username || !formData.password) {
      setError("Please enter both username and password.");
      setIsLoading(false);
      return;
    }

    try {
      // Make API call to backend
      const response = await api.post("/users/login", {
        username: formData.username,
        password: formData.password,
      });

      // Check if response is successful
      if (response.data && response.data.data) {
        const { user, accessToken, refreshToken } = response.data.data;

        // Store tokens in localStorage for future API calls
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        
        // Store user information
        if (user) {
          localStorage.setItem("username", user.username || formData.username);
          localStorage.setItem("user", JSON.stringify(user));
        } else {
          localStorage.setItem("username", formData.username);
        }

        // Call onLogin callback to navigate to landing page
        if (onLogin) {
          onLogin();
        }
      } else {
        setError("Invalid response from server. Please try again.");
      }
    } catch (err) {
      // Handle different types of errors
      if (err.response) {
        // Server responded with error status
        const errorMessage = err.response.data?.message || 
                           err.response.data?.error || 
                           "Login failed. Please check your credentials.";
        setError(errorMessage);
      } else if (err.request) {
        // Request was made but no response received
        setError("Unable to connect to server. Please check your connection.");
      } else {
        // Something else happened
        setError(err.message || "Login failed. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4 relative"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Overlay for better readability */}
      <div className="absolute inset-0"></div>
      
      <div className="bg-black/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 w-full max-w-md border border-white/20 relative z-10 page-login">
        <div className="text-center mb-5">
          <img 
            src={loginLogo} 
            alt="KSS Logo" 
            className="w-40 h-auto mx-auto mb-4 logo-login"
          />
          {/* <p className="text-white/90 text-lg">Sign in to your account</p> */}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            {/* <label htmlFor="username" className="block text-white/90 text-sm font-medium mb-2">
              Username
            </label> */}
            <div className="relative bg-white rounded-lg">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                <img src={userIcon} alt="User" className="w-5 h-5 opacity-70" />
              </div>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg  placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all input-text-color"
                placeholder="Enter your username"
              />
            </div>
          </div>

          <div>
            {/* <label htmlFor="password" className="block text-white/90 text-sm font-medium mb-2">
              Password
            </label> */}
            <div className="relative bg-white rounded-lg">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                <img src={lockIcon} alt="Lock" className="w-5 h-5 opacity-70" />
              </div>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg  placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all input-text-color"
                placeholder="Enter your password"
              />
            </div>
          </div>

          {error && (
            <div className="p-3 bg-red-500/20 border border-red-500/50 rounded-lg backdrop-blur-sm">
              <p className="text-red-200 text-sm">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shadow-lg"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing in...
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

