import { useState } from "react";
import { GraduationCap } from "lucide-react";
import { SignIn } from "./SignIn";
import { SignUp } from "./SignUp";

interface AuthPageProps {
  onLogin: (role: string) => void;
}

export function AuthPage({ onLogin }: AuthPageProps) {
  const [isSignIn, setIsSignIn] = useState(true);

  const handleSwitchToSignUp = () => {
    setIsSignIn(false);
  };

  const handleSwitchToSignIn = () => {
    setIsSignIn(true);
  };

  const handleSignUpSuccess = () => {
    setIsSignIn(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left Side - Branding */}
        

        {/* Right Side - Auth Form */}
        {isSignIn ? (
          <SignIn
            onLogin={onLogin}
            onSwitchToSignUp={handleSwitchToSignUp}
          />
        ) : (
          <SignUp
            onSignUpSuccess={handleSignUpSuccess}
            onSwitchToSignIn={handleSwitchToSignIn}
          />
        )}
      </div>
    </div>
  );
}
