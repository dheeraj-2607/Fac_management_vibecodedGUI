import { useState } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "./components/ui/tabs";
import { FacultyDashboard } from "./components/FacultyDashboard";
import { CourseFileManager } from "./components/CourseFileManager";
import { EventReportManager } from "./components/EventReportManager";
import { AuditorDashboard } from "./components/AuditorDashboard";
import { StaffAdvisorDashboard } from "./components/StaffAdvisorDashboard";
import { AuthPage } from "./components/AuthPage";
import {
  LayoutDashboard,
  FileText,
  Calendar,
  GraduationCap,
  Shield,
  Users,
} from "lucide-react";
import { Toaster } from "./components/ui/sonner";
import { Button } from "./components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./components/ui/dropdown-menu";

type UserRole = "faculty" | "auditor" | "staff-advisor";

export default function App() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [userRole, setUserRole] = useState<UserRole>("faculty");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = (role: string) => {
    setIsAuthenticated(true);
    // Map the role from login to the internal role type
    if (role === "Auditor") {
      setUserRole("auditor");
    } else if (role === "Staff Advisor") {
      setUserRole("staff-advisor");
    } else {
      setUserRole("faculty");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setActiveTab("dashboard");
  };

  // Show auth page if not authenticated
  if (!isAuthenticated) {
    return (
      <>
        <AuthPage onLogin={handleLogin} />
        <Toaster />
      </>
    );
  }

  const getRoleInfo = () => {
    switch (userRole) {
      case "auditor":
        return { name: "Quality Auditor", icon: Shield, color: "bg-orange-600" };
      case "staff-advisor":
        return { name: "Staff Advisor", icon: Users, color: "bg-green-600" };
      default:
        return { name: "Faculty", icon: GraduationCap, color: "bg-blue-600" };
    }
  };

  const roleInfo = getRoleInfo();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className={`h-10 w-10 ${roleInfo.color} rounded-lg flex items-center justify-center`}>
                <roleInfo.icon className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl">Faculty Management</h1>
                <p className="text-sm text-gray-500">College</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <p className="text-sm">Dr. Sarah Johnson</p>
                <p className="text-xs text-gray-500">
                  Computer Science Department
                </p>
              </div>
              <div className="h-10 w-10 bg-purple-600 rounded-full flex items-center justify-center text-white">
                SJ
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Role Switcher */}
        <div className="mb-6 flex flex-wrap gap-3">
          <Button
            variant={userRole === "faculty" ? "default" : "outline"}
            onClick={() => {
              setUserRole("faculty");
              setActiveTab("dashboard");
            }}
            className="flex items-center gap-2"
          >
            <GraduationCap className="h-4 w-4" />
            Faculty Portal
          </Button>
          <Button
            variant={userRole === "auditor" ? "default" : "outline"}
            onClick={() => {
              setUserRole("auditor");
              setActiveTab("dashboard");
            }}
            className="flex items-center gap-2"
          >
            <Shield className="h-4 w-4" />
            Auditor Portal
          </Button>
          <Button
            variant={userRole === "staff-advisor" ? "default" : "outline"}
            onClick={() => {
              setUserRole("staff-advisor");
              setActiveTab("dashboard");
            }}
            className="flex items-center gap-2"
          >
            <Users className="h-4 w-4" />
            Staff Advisor Portal
          </Button>
        </div>

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          {/* Only show tabs for Faculty role */}
          {userRole === "faculty" && (
            <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:inline-grid">
              <TabsTrigger
                value="dashboard"
                className="flex items-center gap-2"
              >
                <LayoutDashboard className="h-4 w-4" />
                <span className="hidden sm:inline">
                  Dashboard
                </span>
                <span className="sm:hidden">Home</span>
              </TabsTrigger>
              <TabsTrigger
                value="files"
                className="flex items-center gap-2"
              >
                <FileText className="h-4 w-4" />
                <span className="hidden sm:inline">
                  Course Files
                </span>
                <span className="sm:hidden">Files</span>
              </TabsTrigger>
              <TabsTrigger
                value="events"
                className="flex items-center gap-2"
              >
                <Calendar className="h-4 w-4" />
                <span className="hidden sm:inline">
                  Event Reports
                </span>
                <span className="sm:hidden">Events</span>
              </TabsTrigger>
            </TabsList>
          )}

          <TabsContent value="dashboard" className="space-y-6">
            {userRole === "faculty" && <FacultyDashboard />}
            {userRole === "auditor" && <AuditorDashboard />}
            {userRole === "staff-advisor" && <StaffAdvisorDashboard />}
          </TabsContent>

          {/* Only render these tabs for faculty */}
          {userRole === "faculty" && (
            <>
              <TabsContent value="files" className="space-y-6">
                <CourseFileManager />
              </TabsContent>

              <TabsContent value="events" className="space-y-6">
                <EventReportManager />
              </TabsContent>
            </>
          )}
        </Tabs>
      </main>

      {/* Toast Notifications */}
      <Toaster />

      {/* Footer */}
      <footer className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500">
              © 2024 Springfield College. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-gray-500">
              <a href="#" className="hover:text-gray-700">
                Help & Support
              </a>
              <a href="#" className="hover:text-gray-700">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-gray-700">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}