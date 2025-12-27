import { useEffect } from "react";
import loadingLogo from "../assets/images/1_loading/logo.png";
import backgroundImage from "../assets/images/0_background_and_logo/bg_main@2x.jpg";

const LoadingScreen = ({ onLoadingComplete }) => {
  useEffect(() => {
    // Show loading screen for 2 seconds, then proceed to login
    const timer = setTimeout(() => {
      onLoadingComplete();
    }, 2000);

    // Cleanup timer on unmount
    return () => clearTimeout(timer);
  }, [onLoadingComplete]);

  return (
    <div 
      className="min-h-screen flex items-center justify-center relative"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Overlay for better text readability */}
      <div className="absolute inset-0"></div>
      
      <div className="text-center relative z-10">
        {/* Logo */}
        <div className="mb-8 flex justify-center">
          <img 
            src={loadingLogo} 
            alt="KSS Logo" 
            className="w-64 h-auto animate-pulse"
          />
        </div>

        {/* Loading Text */}
        <div className="mb-6 flex justify-center">
          <p className="text-black text-4xl font-semibold">Loading</p>
        </div>

        {/* Loading dots animation */}
        <div className="flex justify-center space-x-2 mt-4">
          <div className="w-2 h-2 bg-black rounded-full animate-bounce" style={{ animationDelay: "0s" }}></div>
          <div className="w-2 h-2 bg-black rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
          <div className="w-2 h-2 bg-black rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;

