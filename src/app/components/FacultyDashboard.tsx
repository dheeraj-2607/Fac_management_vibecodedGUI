import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { FileText, Calendar, TrendingUp, Users, AlertCircle, ChevronRight, User, GraduationCap, Building } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { FacultyPortfolio } from "./FacultyPortfolio";

interface FacultyMember {
  id: string;
  name: string;
  department: string;
  role: string;
  email: string;
  phone: string;
  courses: string[];
  specialization: string;
  experience: string;
}

export function FacultyDashboard() {
  const [selectedFaculty, setSelectedFaculty] = useState<FacultyMember | null>(null);

  // TODO: Replace with actual API call
  // Example API endpoint: GET /api/dashboard/stats
  // const stats = await fetch('/api/dashboard/stats').then(r => r.json());
  
  const stats = {
    totalFiles: 23,
    totalReports: 8,
    pendingReports: 2,
    totalParticipants: 245,
    recentActivity: [
      { action: "Uploaded", item: "CS101_Syllabus_Fall2024.pdf", time: "2 hours ago" },
      { action: "Submitted", item: "Environmental Cleanup Drive Report", time: "1 day ago" },
      { action: "Approved", item: "Health Awareness Campaign Report", time: "3 days ago" }
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
    },
    {
      id: "2",
      name: "Dr. Michael Chen",
      department: "Mathematics",
      role: "Professor",
      email: "michael.chen@college.edu",
      phone: "+1 (555) 234-5678",
      courses: ["MATH201 - Calculus II", "MATH301 - Linear Algebra", "MATH401 - Advanced Statistics"],
      specialization: "Applied Mathematics & Statistics",
      experience: "18 years"
    },
    {
      id: "3",
      name: "Dr. Emily Rodriguez",
      department: "Biology",
      role: "Assistant Professor",
      email: "emily.rodriguez@college.edu",
      phone: "+1 (555) 345-6789",
      courses: ["BIO101 - General Biology", "BIO202 - Genetics", "BIO303 - Molecular Biology"],
      specialization: "Molecular Biology & Genetics",
      experience: "8 years"
    },
    {
      id: "4",
      name: "Dr. James Williams",
      department: "Physics",
      role: "Associate Professor",
      email: "james.williams@college.edu",
      phone: "+1 (555) 456-7890",
      courses: ["PHY101 - Physics I", "PHY201 - Electromagnetism", "PHY301 - Quantum Mechanics"],
      specialization: "Quantum Physics & Theoretical Physics",
      experience: "15 years"
    },
    {
      id: "5",
      name: "Dr. Patricia Williams",
      department: "English Literature",
      role: "Professor",
      email: "patricia.williams@college.edu",
      phone: "+1 (555) 567-8901",
      courses: ["ENG201 - American Literature", "ENG301 - Modern Poetry", "ENG401 - Literary Theory"],
      specialization: "Contemporary Literature & Critical Theory",
      experience: "20 years"
    },
    {
      id: "6",
      name: "Dr. Robert Taylor",
      department: "Chemistry",
      role: "Assistant Professor",
      email: "robert.taylor@college.edu",
      phone: "+1 (555) 678-9012",
      courses: ["CHEM101 - General Chemistry", "CHEM202 - Organic Chemistry", "CHEM303 - Biochemistry"],
      specialization: "Organic Chemistry & Biochemistry",
      experience: "6 years"
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
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Course Files</p>
                <div className="text-2xl mt-1">{stats.totalFiles}</div>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Event Reports</p>
                <div className="text-2xl mt-1">{stats.totalReports}</div>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Calendar className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Pending Reviews</p>
                <div className="text-2xl mt-1">{stats.pendingReports}</div>
              </div>
              <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Participants</p>
                <div className="text-2xl mt-1">{stats.totalParticipants}</div>
              </div>
              <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alerts */}
      {stats.pendingReports > 0 && (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Pending Actions</AlertTitle>
          <AlertDescription>
            You have {stats.pendingReports} draft report{stats.pendingReports > 1 ? 's' : ''} waiting to be submitted.
          </AlertDescription>
        </Alert>
      )}

      {/* Recent Activity & Faculty Directory */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest actions and updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats.recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-3 pb-3 border-b last:border-0">
                  <div className="h-2 w-2 rounded-full bg-blue-600 mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm">
                      <span className="font-medium">{activity.action}</span> {activity.item}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Faculty Directory
            </CardTitle>
            <CardDescription>Browse faculty members and their portfolios</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {facultyMembers.slice(0, 5).map((faculty) => (
                <Button
                  key={faculty.id}
                  variant="ghost"
                  className="w-full justify-start text-left h-auto py-3 hover:bg-gray-50"
                  onClick={() => setSelectedFaculty(faculty)}
                >
                  <div className="flex items-center gap-3 w-full">
                    <div className="h-10 w-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white flex-shrink-0">
                      {faculty.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{faculty.name}</p>
                      <p className="text-xs text-gray-500 truncate">{faculty.department}</p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-gray-400 flex-shrink-0" />
                  </div>
                </Button>
              ))}
            </div>
            {facultyMembers.length > 5 && (
              <div className="mt-3 pt-3 border-t">
                <p className="text-xs text-center text-gray-500">
                  +{facultyMembers.length - 5} more faculty members
                </p>
              </div>
            )}
          </CardContent>
        </Card>
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
              <Card key={faculty.id} className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setSelectedFaculty(faculty)}>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="h-12 w-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white flex-shrink-0">
                      {faculty.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{faculty.name}</p>
                      <Badge variant="outline" className="mt-1 text-xs">{faculty.role}</Badge>
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Building className="h-3 w-3 flex-shrink-0" />
                      <span className="truncate">{faculty.department}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <GraduationCap className="h-3 w-3 flex-shrink-0" />
                      <span className="truncate">{faculty.specialization}</span>
                    </div>
                  </div>

                  <div className="mt-3 pt-3 border-t">
                    <p className="text-xs text-gray-500 mb-2">Courses: {faculty.courses.length}</p>
                    <div className="flex flex-wrap gap-1">
                      {faculty.courses.slice(0, 2).map((course, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs bg-purple-50 truncate max-w-full">
                          {course.split(' - ')[0]}
                        </Badge>
                      ))}
                      {faculty.courses.length > 2 && (
                        <Badge variant="outline" className="text-xs bg-gray-50">
                          +{faculty.courses.length - 2}
                        </Badge>
                      )}
                    </div>
                  </div>

                  <Button variant="outline" size="sm" className="w-full mt-4">
                    View Portfolio
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}