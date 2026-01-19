import { useState } from "react";
import { FileText, Calendar, TrendingUp, Users, GraduationCap } from "lucide-react";
import { FacultyPortfolio } from "./FacultyPortfolio";
import { StatCard } from "./faculty/StatCard";
import { RecentActivity } from "./faculty/RecentActivity";
import { FacultyDirectory } from "./faculty/FacultyDirectory";
import { FacultyCard } from "./faculty/FacultyCard";
import { PendingActionsAlert } from "./faculty/PendingActionsAlert";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { FacultyMember, DashboardStats } from "../types/faculty";

export function FacultyDashboard() {
  const [selectedFaculty, setSelectedFaculty] = useState<FacultyMember | null>(null);

  // TODO: Replace with actual API call
  // Example API endpoint: GET /api/dashboard/stats
  // const stats = await fetch('/api/dashboard/stats').then(r => r.json());

  const stats: DashboardStats = {
    totalFiles: 23,
    totalReports: 8,
    pendingReports: 2,
    totalParticipants: 245,
    recentActivity: [
      { action: "Uploaded", item: "CS101_Syllabus_Fall2024.pdf", time: "2 hours ago" }
    ]
  };

  // TODO: Replace with actual API call
  // Example API endpoint: GET /api/faculty
  const facultyMembers: FacultyMember[] = [
    {
      id: "1",
      name: "Dr. Sarah Johnson",
      department: "Computer Science",
      role: "Associate Professor",
      email: "sarah.johnson@college.edu",
      phone: "+1 (555) 123-4567",
      courses: ["CS101 - Intro to Programming", "CS201 - Data Structures", "CS301 - Algorithms"],
      specialization: "Artificial Intelligence & Machine Learning",
      experience: "12 years"
    }
  ];

  if (selectedFaculty) {
    return <FacultyPortfolio faculty={selectedFaculty} onBack={() => setSelectedFaculty(null)} />;
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div>
        <h2>Faculty Dashboard</h2>
        <p className="text-gray-600">Welcome back, Dr. Sarah Johnson</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Course Files"
          value={stats.totalFiles}
          icon={FileText}
          backgroundColor="bg-blue-100"
          iconColor="text-blue-600"
        />
        <StatCard
          title="Event Reports"
          value={stats.totalReports}
          icon={Calendar}
          backgroundColor="bg-green-100"
          iconColor="text-green-600"
        />
        <StatCard
          title="Pending Reviews"
          value={stats.pendingReports}
          icon={TrendingUp}
          backgroundColor="bg-orange-100"
          iconColor="text-orange-600"
        />
        <StatCard
          title="Total Participants"
          value={stats.totalParticipants}
          icon={Users}
          backgroundColor="bg-purple-100"
          iconColor="text-purple-600"
        />
      </div>

      {/* Alerts */}
      <PendingActionsAlert pendingReports={stats.pendingReports} />

      {/* Recent Activity & Faculty Directory */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentActivity activities={stats.recentActivity} />
        <FacultyDirectory
          facultyMembers={facultyMembers}
          onSelectFaculty={setSelectedFaculty}
        />
      </div>

      {/* All Faculty Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5" />
            All Faculty Members
          </CardTitle>
          <CardDescription>View portfolios of all faculty members including their course files and event reports</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {facultyMembers.map((faculty) => (
              <FacultyCard
                key={faculty.id}
                faculty={faculty}
                onSelect={setSelectedFaculty}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}