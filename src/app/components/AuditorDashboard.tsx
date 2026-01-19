import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { 
  FileText, 
  Calendar, 
  CheckCircle, 
  AlertCircle, 
  Users, 
  TrendingUp,
  Eye,
  ChevronRight,
  Shield,
  ClipboardCheck
} from "lucide-react";
import { Alert, AlertDescription } from "./ui/alert";
import { FacultyAuditPortfolio } from "./FacultyAuditPortfolio";

interface FacultyMember {
  id: string;
  name: string;
  department: string;
  totalFiles: number;
  totalReports: number;
  approvedFiles: number;
  approvedReports: number;
  pendingFiles: number;
  pendingReports: number;
  rejectedFiles: number;
  rejectedReports: number;
}

export function AuditorDashboard() {
  const [selectedFaculty, setSelectedFaculty] = useState<FacultyMember | null>(null);

  // Mock data - Replace with actual API call
  const stats = {
    totalFaculty: 6,
    totalFiles: 45,
    totalReports: 28,
    approvedFiles: 32,
    approvedReports: 20,
    pendingFiles: 10,
    pendingReports: 6,
    rejectedFiles: 3,
    rejectedReports: 2,
    completionRate: 78
  };

  const facultyMembers: FacultyMember[] = [
    {
      id: "1",
      name: "Dr. Sarah Johnson",
      department: "Computer Science",
      totalFiles: 8,
      totalReports: 5,
      approvedFiles: 6,
      approvedReports: 4,
      pendingFiles: 2,
      pendingReports: 1,
      rejectedFiles: 0,
      rejectedReports: 0
    },
    {
      id: "2",
      name: "Dr. Michael Chen",
      department: "Mathematics",
      totalFiles: 7,
      totalReports: 4,
      approvedFiles: 5,
      approvedReports: 3,
      pendingFiles: 1,
      pendingReports: 1,
      rejectedFiles: 1,
      rejectedReports: 0
    }
  ];

  const recentReviews = [
    { faculty: "Dr. Sarah Johnson", item: "CS101 Syllabus", action: "Approved", time: "2 hours ago" }
  ];

  if (selectedFaculty) {
    return <FacultyAuditPortfolio faculty={selectedFaculty} onBack={() => setSelectedFaculty(null)} />;
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex items-center gap-3">
        <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center">
          <Shield className="h-6 w-6 text-orange-600" />
        </div>
        <div>
          <h2>Auditor Dashboard</h2>
          <p className="text-gray-600">Quality Assurance & Compliance Review</p>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Faculty</p>
                <div className="text-2xl mt-1">{stats.totalFaculty}</div>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Course Files</p>
                <div className="text-2xl mt-1">{stats.totalFiles}</div>
                <p className="text-xs text-green-600 mt-1">
                  {stats.approvedFiles} approved
                </p>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                <FileText className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Event Reports</p>
                <div className="text-2xl mt-1">{stats.totalReports}</div>
                <p className="text-xs text-green-600 mt-1">
                  {stats.approvedReports} approved
                </p>
              </div>
              <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Calendar className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Pending Reviews</p>
                <div className="text-2xl mt-1">{stats.pendingFiles + stats.pendingReports}</div>
                <p className="text-xs text-orange-600 mt-1">
                  Requires attention
                </p>
              </div>
              <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <AlertCircle className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alerts */}
      {(stats.pendingFiles + stats.pendingReports) > 0 && (
        <Alert className="bg-orange-50 border-orange-200">
          <AlertCircle className="h-4 w-4 text-orange-600" />
          <AlertDescription>
            You have {stats.pendingFiles + stats.pendingReports} pending items awaiting review and approval.
          </AlertDescription>
        </Alert>
      )}

      {/* Review Statistics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Review Statistics</CardTitle>
            <CardDescription>Overall submission quality metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm">Course Files Approved</span>
                  <span className="text-sm font-medium">{Math.round((stats.approvedFiles / stats.totalFiles) * 100)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-600 h-2 rounded-full" 
                    style={{ width: `${(stats.approvedFiles / stats.totalFiles) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm">Event Reports Approved</span>
                  <span className="text-sm font-medium">{Math.round((stats.approvedReports / stats.totalReports) * 100)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-600 h-2 rounded-full" 
                    style={{ width: `${(stats.approvedReports / stats.totalReports) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm">Overall Completion Rate</span>
                  <span className="text-sm font-medium">{stats.completionRate}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full" 
                    style={{ width: `${stats.completionRate}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Review Activity</CardTitle>
            <CardDescription>Your latest review actions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentReviews.map((review, index) => (
                <div key={index} className="flex items-start gap-3 pb-3 border-b last:border-0">
                  <div className="h-2 w-2 rounded-full bg-orange-600 mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm">
                      <span className="font-medium">{review.action}</span> {review.item}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {review.faculty} • {review.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Faculty List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ClipboardCheck className="h-5 w-5" />
            Faculty Submission Status
          </CardTitle>
          <CardDescription>Review and audit faculty course files and event reports</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {facultyMembers.map((faculty) => (
              <Card key={faculty.id} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => setSelectedFaculty(faculty)}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="h-12 w-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white flex-shrink-0">
                        {faculty.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium">{faculty.name}</p>
                        <p className="text-sm text-gray-500">{faculty.department}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      {/* Course Files */}
                      <div className="text-center">
                        <p className="text-xs text-gray-500 mb-1">Course Files</p>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            {faculty.approvedFiles}
                          </Badge>
                          {faculty.pendingFiles > 0 && (
                            <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
                              <AlertCircle className="h-3 w-3 mr-1" />
                              {faculty.pendingFiles}
                            </Badge>
                          )}
                        </div>
                      </div>

                      {/* Event Reports */}
                      <div className="text-center">
                        <p className="text-xs text-gray-500 mb-1">Event Reports</p>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            {faculty.approvedReports}
                          </Badge>
                          {faculty.pendingReports > 0 && (
                            <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
                              <AlertCircle className="h-3 w-3 mr-1" />
                              {faculty.pendingReports}
                            </Badge>
                          )}
                        </div>
                      </div>

                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        Review
                        <ChevronRight className="h-4 w-4 ml-2" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
