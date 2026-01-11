import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { GraduationCap, Mail, Lock, User, Building } from "lucide-react";
import { toast } from "sonner";

interface AuthPageProps {
  onLogin: (role: string) => void;
}

export function AuthPage({ onLogin }: AuthPageProps) {
  const [isSignIn, setIsSignIn] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    role: "",
    department: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSignIn) {
      // Sign In Logic
      if (!formData.email || !formData.password) {
        toast.error("Please enter email and password");
        return;
      }
      
      // TODO: Replace with actual API call
      // POST /api/auth/signin
      toast.success("Sign in successful!");
      
      // Default to Faculty role for demo
      onLogin("Faculty");
    } else {
      // Sign Up Logic
      if (!formData.email || !formData.password || !formData.confirmPassword || 
          !formData.fullName || !formData.role || !formData.department) {
        toast.error("Please fill in all fields");
        return;
      }
      
      if (formData.password !== formData.confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }
      
      if (formData.password.length < 6) {
        toast.error("Password must be at least 6 characters");
        return;
      }
      
      // TODO: Replace with actual API call
      // POST /api/auth/signup
      toast.success("Account created successfully! Please sign in.");
      setIsSignIn(true);
      setFormData({
        email: formData.email,
        password: "",
        confirmPassword: "",
        fullName: "",
        role: "",
        department: ""
      });
    }
  };

  const toggleMode = () => {
    setIsSignIn(!isSignIn);
    setFormData({
      email: "",
      password: "",
      confirmPassword: "",
      fullName: "",
      role: "",
      department: ""
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left Side - Branding */}
        <div className="hidden md:block space-y-6">
          <div className="flex items-center gap-3">
            <div className="h-16 w-16 bg-blue-600 rounded-xl flex items-center justify-center">
              <GraduationCap className="h-10 w-10 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Faculty Portal</h1>
              <p className="text-gray-600">College Management System</p>
            </div>
          </div>
          
          <div className="space-y-4 bg-white/50 backdrop-blur rounded-2xl p-8 border border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-900">Welcome to the Faculty Management Platform</h2>
            <p className="text-gray-600 leading-relaxed">
              A comprehensive solution for managing course files, event reports, peer reviews, 
              and administrative tasks. Built for educational excellence.
            </p>
            
            <div className="space-y-3 pt-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <User className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Multiple User Roles</h3>
                  <p className="text-sm text-gray-600">Faculty, Auditor, and Staff Advisor portals</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Building className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Department Management</h3>
                  <p className="text-sm text-gray-600">Organize by departments and courses</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Auth Form */}
        <Card className="shadow-2xl border-0">
          <CardHeader className="space-y-1 text-center">
            <div className="flex justify-center mb-4 md:hidden">
              <div className="h-12 w-12 bg-blue-600 rounded-xl flex items-center justify-center">
                <GraduationCap className="h-8 w-8 text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold">
              {isSignIn ? "Sign In" : "Create Account"}
            </CardTitle>
            <CardDescription>
              {isSignIn 
                ? "Enter your credentials to access your account" 
                : "Fill in your details to create a new account"}
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isSignIn && (
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="fullName"
                      placeholder="Dr. John Doe"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="pl-10"
                    />
                  </div>
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@college.edu"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="pl-10"
                  />
                </div>
              </div>
              
              {!isSignIn && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <Select
                      value={formData.role}
                      onValueChange={(value) => setFormData({ ...formData, role: value })}
                    >
                      <SelectTrigger id="role">
                        <SelectValue placeholder="Select your role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Faculty">Faculty</SelectItem>
                        <SelectItem value="Auditor">Auditor</SelectItem>
                        <SelectItem value="Staff Advisor">Staff Advisor</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <div className="relative">
                      <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="department"
                        placeholder="Computer Science"
                        value={formData.department}
                        onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                        className="pl-10"
                      />
                    </div>
                  </div>
                </>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="pl-10"
                  />
                </div>
              </div>
              
              {!isSignIn && (
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="••••••••"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      className="pl-10"
                    />
                  </div>
                </div>
              )}
              
              {isSignIn && (
                <div className="flex justify-end">
                  <Button type="button" variant="link" className="text-sm p-0 h-auto">
                    Forgot password?
                  </Button>
                </div>
              )}
              
              <Button type="submit" className="w-full">
                {isSignIn ? "Sign In" : "Create Account"}
              </Button>
              
              <div className="text-center text-sm">
                <span className="text-gray-600">
                  {isSignIn ? "Don't have an account? " : "Already have an account? "}
                </span>
                <Button
                  type="button"
                  variant="link"
                  className="p-0 h-auto font-semibold"
                  onClick={toggleMode}
                >
                  {isSignIn ? "Sign Up" : "Sign In"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
