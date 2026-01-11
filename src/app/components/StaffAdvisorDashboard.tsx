import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { 
  Users, 
  FileText, 
  Calendar, 
  TrendingUp,
  UserCheck,
  GraduationCap,
  Briefcase,
  Target,
  Mail,
  Phone,
  BookOpen,
  ChevronRight,
  Plus,
  Search,
  Upload,
  Award,
  Download,
  AlertCircle,
  Bell
} from "lucide-react";
import { Input } from "./ui/input";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "./ui/dialog";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { toast } from "sonner";
import { Textarea } from "./ui/textarea";
import { Alert, AlertDescription } from "./ui/alert";

interface Student {
  id: string;
  name: string;
  rollNumber: string;
  email: string;
  phone: string;
  department: string;
  semester: string;
  cgpa: number;
  attendance: number;
  careerInterest: string;
  skillsAcquired: string[];
  placementStatus: "Placed" | "In Process" | "Not Started";
  companyName?: string;
  activityPoints: number;
  activities: Array<{
    id: string;
    name: string;
    community: string;
    points: number;
    date: string;
  }>;
}

interface FacultyStatus {
  id: string;
  name: string;
  department: string;
  filesUploaded: number;
  filesRequired: number;
  reportsUploaded: number;
  reportsRequired: number;
  lastUpdate: string;
  status: "Complete" | "Pending" | "Delayed";
}

export function StaffAdvisorDashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isStudentViewOpen, setIsStudentViewOpen] = useState(false);
  const [isActivityDialogOpen, setIsActivityDialogOpen] = useState(false);
  const [isCsvUploadOpen, setIsCsvUploadOpen] = useState(false);
  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);
  const [selectedFaculty, setSelectedFaculty] = useState<FacultyStatus | null>(null);
  const [alertMessage, setAlertMessage] = useState("");
  const [selectedActivity, setSelectedActivity] = useState("");
  const [selectedCommunity, setSelectedCommunity] = useState("");
  const [activityPoints, setActivityPoints] = useState("");

  // Mock data - Replace with actual API call
  const stats = {
    totalStudents: 45,
    batchYear: "2021-2025",
    placedStudents: 28,
    inProcess: 12,
    averageCGPA: 8.2,
    averageAttendance: 85,
    totalFaculty: 6,
    approvedFiles: 32,
    approvedReports: 20
  };

  const careerStats = {
    totalInternships: 35,
    activeInternships: 18,
    completedProjects: 67,
    skillWorkshops: 12,
    campusInterviews: 8
  };

  const students: Student[] = [
    {
      id: "1",
      name: "Rajesh Kumar",
      rollNumber: "21CS001",
      email: "rajesh.kumar@college.edu",
      phone: "+91 98765 43210",
      department: "Computer Science",
      semester: "8th",
      cgpa: 8.7,
      attendance: 92,
      careerInterest: "Software Development",
      skillsAcquired: ["Java", "Python", "React", "Node.js"],
      placementStatus: "Placed",
      companyName: "Tech Corp",
      activityPoints: 50,
      activities: [
        { id: "1", name: "Hackathon", community: "Tech Club", points: 20, date: "2023-05-15" },
        { id: "2", name: "Project Presentation", community: "Project Team", points: 15, date: "2023-06-20" },
        { id: "3", name: "Internship", community: "Tech Corp", points: 15, date: "2023-07-01" }
      ]
    },
    {
      id: "2",
      name: "Priya Sharma",
      rollNumber: "21CS002",
      email: "priya.sharma@college.edu",
      phone: "+91 98765 43211",
      department: "Computer Science",
      semester: "8th",
      cgpa: 9.1,
      attendance: 95,
      careerInterest: "Data Science",
      skillsAcquired: ["Python", "Machine Learning", "SQL", "TensorFlow"],
      placementStatus: "Placed",
      companyName: "Data Analytics Inc",
      activityPoints: 45,
      activities: [
        { id: "1", name: "Data Analysis Workshop", community: "Data Science Club", points: 15, date: "2023-04-10" },
        { id: "2", name: "Project Presentation", community: "Project Team", points: 15, date: "2023-06-20" },
        { id: "3", name: "Internship", community: "Data Analytics Inc", points: 15, date: "2023-07-01" }
      ]
    },
    {
      id: "3",
      name: "Amit Patel",
      rollNumber: "21CS003",
      email: "amit.patel@college.edu",
      phone: "+91 98765 43212",
      department: "Computer Science",
      semester: "8th",
      cgpa: 7.8,
      attendance: 88,
      careerInterest: "Web Development",
      skillsAcquired: ["HTML", "CSS", "JavaScript", "React"],
      placementStatus: "In Process",
      activityPoints: 30,
      activities: [
        { id: "1", name: "Web Development Workshop", community: "Web Dev Club", points: 10, date: "2023-03-20" },
        { id: "2", name: "Project Presentation", community: "Project Team", points: 10, date: "2023-06-20" }
      ]
    },
    {
      id: "4",
      name: "Sneha Reddy",
      rollNumber: "21CS004",
      email: "sneha.reddy@college.edu",
      phone: "+91 98765 43213",
      department: "Computer Science",
      semester: "8th",
      cgpa: 8.5,
      attendance: 90,
      careerInterest: "Cybersecurity",
      skillsAcquired: ["Network Security", "Ethical Hacking", "Python"],
      placementStatus: "In Process",
      activityPoints: 35,
      activities: [
        { id: "1", name: "Cybersecurity Workshop", community: "Cybersecurity Club", points: 15, date: "2023-04-10" },
        { id: "2", name: "Project Presentation", community: "Project Team", points: 10, date: "2023-06-20" }
      ]
    },
    {
      id: "5",
      name: "Vikram Singh",
      rollNumber: "21CS005",
      email: "vikram.singh@college.edu",
      phone: "+91 98765 43214",
      department: "Computer Science",
      semester: "8th",
      cgpa: 7.5,
      attendance: 82,
      careerInterest: "Mobile App Development",
      skillsAcquired: ["React Native", "Flutter", "Firebase"],
      placementStatus: "Not Started",
      activityPoints: 20,
      activities: [
        { id: "1", name: "Mobile App Development Workshop", community: "Mobile Dev Club", points: 10, date: "2023-03-20" }
      ]
    }
  ];

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.careerInterest.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getPlacementColor = (status: string) => {
    switch (status) {
      case "Placed": return "bg-green-100 text-green-800";
      case "In Process": return "bg-blue-100 text-blue-800";
      case "Not Started": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const handleViewStudent = (student: Student) => {
    setSelectedStudent(student);
    setIsStudentViewOpen(true);
  };

  const handleAddActivity = () => {
    if (!selectedStudent) return;
    if (!selectedActivity || !selectedCommunity || !activityPoints) {
      toast.error("Please fill in all fields");
      return;
    }
    const newActivity = {
      id: (selectedStudent.activities.length + 1).toString(),
      name: selectedActivity,
      community: selectedCommunity,
      points: parseInt(activityPoints, 10),
      date: new Date().toISOString().split('T')[0]
    };
    const updatedStudent = {
      ...selectedStudent,
      activities: [...selectedStudent.activities, newActivity],
      activityPoints: selectedStudent.activityPoints + parseInt(activityPoints, 10)
    };
    setSelectedStudent(updatedStudent);
    setIsActivityDialogOpen(false);
    toast.success("Activity added successfully");
  };

  const handleUploadCsv = () => {
    // Simulate CSV upload
    toast.success("CSV file uploaded successfully");
    setIsCsvUploadOpen(false);
  };

  const handleAlert = (message: string) => {
    setAlertMessage(message);
    setIsAlertDialogOpen(true);
  };

  const handleFacultyStatus = (faculty: FacultyStatus) => {
    setSelectedFaculty(faculty);
    setIsAlertDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex items-center gap-3">
        <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
          <Users className="h-6 w-6 text-green-600" />
        </div>
        <div>
          <h2>Staff Advisor Dashboard</h2>
          <p className="text-gray-600">Batch {stats.batchYear} - Student Management & Career Development</p>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Students</p>
                <div className="text-2xl mt-1">{stats.totalStudents}</div>
                <p className="text-xs text-gray-500 mt-1">Batch {stats.batchYear}</p>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <GraduationCap className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Placed Students</p>
                <div className="text-2xl mt-1">{stats.placedStudents}</div>
                <p className="text-xs text-green-600 mt-1">
                  {Math.round((stats.placedStudents / stats.totalStudents) * 100)}% placement rate
                </p>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                <UserCheck className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Average CGPA</p>
                <div className="text-2xl mt-1">{stats.averageCGPA}</div>
                <p className="text-xs text-gray-500 mt-1">
                  Batch performance
                </p>
              </div>
              <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Avg Attendance</p>
                <div className="text-2xl mt-1">{stats.averageAttendance}%</div>
                <p className="text-xs text-gray-500 mt-1">
                  Overall batch
                </p>
              </div>
              <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Faculty Status & Career Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Faculty Status Overview</CardTitle>
            <CardDescription>Course files and event reports status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <FileText className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Course Files</p>
                    <p className="text-xs text-gray-500">{stats.totalFaculty} faculty members</p>
                  </div>
                </div>
                <Badge className="bg-green-100 text-green-800">
                  {stats.approvedFiles} Approved
                </Badge>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Calendar className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Event Reports</p>
                    <p className="text-xs text-gray-500">Community engagement</p>
                  </div>
                </div>
                <Badge className="bg-green-100 text-green-800">
                  {stats.approvedReports} Approved
                </Badge>
              </div>

              <div className="pt-4 border-t">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Documentation Completion</span>
                  <span className="font-medium">87%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: "87%" }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Career Exploration Stats</CardTitle>
            <CardDescription>Student career development activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{careerStats.totalInternships}</div>
                <p className="text-xs text-gray-600 mt-1">Total Internships</p>
              </div>
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{careerStats.activeInternships}</div>
                <p className="text-xs text-gray-600 mt-1">Active Now</p>
              </div>
              <div className="text-center p-3 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">{careerStats.completedProjects}</div>
                <p className="text-xs text-gray-600 mt-1">Projects Done</p>
              </div>
              <div className="text-center p-3 bg-orange-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">{careerStats.skillWorkshops}</div>
                <p className="text-xs text-gray-600 mt-1">Skill Workshops</p>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Campus Interviews</span>
                <Badge variant="outline">{careerStats.campusInterviews} Scheduled</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Student List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Student List - Batch {stats.batchYear}</CardTitle>
              <CardDescription>Manage and track student progress and placements</CardDescription>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Student
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Student</DialogTitle>
                  <DialogDescription>Add a new student to your batch</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div>
                    <Label>Student Name</Label>
                    <Input placeholder="Enter student name" />
                  </div>
                  <div>
                    <Label>Roll Number</Label>
                    <Input placeholder="Enter roll number" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Email</Label>
                      <Input type="email" placeholder="student@college.edu" />
                    </div>
                    <div>
                      <Label>Phone</Label>
                      <Input placeholder="+91 XXXXX XXXXX" />
                    </div>
                  </div>
                  <Button className="w-full">Add Student</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          {/* Search */}
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by name, roll number, or career interest..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Student Cards */}
          <div className="space-y-3">
            {filteredStudents.map((student) => (
              <Card key={student.id} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => handleViewStudent(student)}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="h-12 w-12 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white flex-shrink-0">
                        {student.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-medium">{student.name}</p>
                          <Badge className={getPlacementColor(student.placementStatus)}>
                            {student.placementStatus}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-500">
                          {student.rollNumber} • {student.semester} Semester
                        </p>
                        {student.companyName && (
                          <p className="text-xs text-green-600 mt-1">
                            <Briefcase className="h-3 w-3 inline mr-1" />
                            {student.companyName}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <p className="text-xs text-gray-500">CGPA</p>
                        <p className="font-medium">{student.cgpa}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-gray-500">Attendance</p>
                        <p className="font-medium">{student.attendance}%</p>
                      </div>
                      <div className="text-center min-w-[120px]">
                        <p className="text-xs text-gray-500 mb-1">Career Interest</p>
                        <Badge variant="outline" className="text-xs">
                          <Target className="h-3 w-3 mr-1" />
                          {student.careerInterest}
                        </Badge>
                      </div>

                      <Button variant="outline" size="sm">
                        View Details
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

      {/* Student Detail Dialog */}
      <Dialog open={isStudentViewOpen} onOpenChange={setIsStudentViewOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Student Profile</DialogTitle>
            <DialogDescription>
              Complete information and progress tracking
            </DialogDescription>
          </DialogHeader>
          {selectedStudent && (
            <div className="space-y-6">
              {/* Student Header */}
              <div className="flex items-start gap-4">
                <div className="h-16 w-16 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white text-2xl flex-shrink-0">
                  {selectedStudent.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold">{selectedStudent.name}</h3>
                  <p className="text-gray-600">{selectedStudent.rollNumber} • {selectedStudent.department}</p>
                  <Badge className={getPlacementColor(selectedStudent.placementStatus) + " mt-2"}>
                    {selectedStudent.placementStatus}
                  </Badge>
                  {selectedStudent.companyName && (
                    <p className="text-sm text-green-600 mt-2">
                      <Briefcase className="h-4 w-4 inline mr-1" />
                      Placed at {selectedStudent.companyName}
                    </p>
                  )}
                </div>
              </div>

              {/* Contact Information */}
              <div>
                <h4 className="font-medium mb-3">Contact Information</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <a href={`mailto:${selectedStudent.email}`} className="text-blue-600 hover:underline">
                      {selectedStudent.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <span>{selectedStudent.phone}</span>
                  </div>
                </div>
              </div>

              {/* Academic Performance */}
              <div>
                <h4 className="font-medium mb-3">Academic Performance</h4>
                <div className="grid grid-cols-3 gap-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-gray-600">CGPA</p>
                    <div className="text-2xl font-bold text-blue-600 mt-1">{selectedStudent.cgpa}</div>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <p className="text-sm text-gray-600">Attendance</p>
                    <div className="text-2xl font-bold text-green-600 mt-1">{selectedStudent.attendance}%</div>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <p className="text-sm text-gray-600">Semester</p>
                    <div className="text-2xl font-bold text-purple-600 mt-1">{selectedStudent.semester}</div>
                  </div>
                </div>
              </div>

              {/* Career Information */}
              <div>
                <h4 className="font-medium mb-3">Career Development</h4>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-500">Career Interest</p>
                    <Badge variant="outline" className="mt-1">
                      <Target className="h-3 w-3 mr-1" />
                      {selectedStudent.careerInterest}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-2">Skills Acquired</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedStudent.skillsAcquired.map((skill, idx) => (
                        <Badge key={idx} variant="outline" className="bg-blue-50">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Activity Points */}
              <div>
                <h4 className="font-medium mb-3">Activity Points</h4>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-500">Total Points</p>
                    <Badge variant="outline" className="mt-1">
                      <Award className="h-3 w-3 mr-1" />
                      {selectedStudent.activityPoints}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-2">Activities</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedStudent.activities.map((activity, idx) => (
                        <Badge key={idx} variant="outline" className="bg-blue-50">
                          {activity.name} ({activity.points} points)
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Add Activity Button */}
              <div className="mt-4">
                <Button size="sm" onClick={() => setIsActivityDialogOpen(true)}>
                  Add Activity
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Add Activity Dialog */}
      <Dialog open={isActivityDialogOpen} onOpenChange={setIsActivityDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add Activity</DialogTitle>
            <DialogDescription>
              Add a new activity for the student
            </DialogDescription>
          </DialogHeader>
          {selectedStudent && (
            <div className="space-y-6">
              {/* Student Header */}
              <div className="flex items-start gap-4">
                <div className="h-16 w-16 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white text-2xl flex-shrink-0">
                  {selectedStudent.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold">{selectedStudent.name}</h3>
                  <p className="text-gray-600">{selectedStudent.rollNumber} • {selectedStudent.department}</p>
                  <Badge className={getPlacementColor(selectedStudent.placementStatus) + " mt-2"}>
                    {selectedStudent.placementStatus}
                  </Badge>
                  {selectedStudent.companyName && (
                    <p className="text-sm text-green-600 mt-2">
                      <Briefcase className="h-4 w-4 inline mr-1" />
                      Placed at {selectedStudent.companyName}
                    </p>
                  )}
                </div>
              </div>

              {/* Add Activity Form */}
              <div>
                <h4 className="font-medium mb-3">Add Activity</h4>
                <div className="space-y-4">
                  <div>
                    <Label>Activity Name</Label>
                    <Input
                      placeholder="Enter activity name"
                      value={selectedActivity}
                      onChange={(e) => setSelectedActivity(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>Community</Label>
                    <Input
                      placeholder="Enter community name"
                      value={selectedCommunity}
                      onChange={(e) => setSelectedCommunity(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>Points</Label>
                    <Input
                      placeholder="Enter points"
                      value={activityPoints}
                      onChange={(e) => setActivityPoints(e.target.value)}
                      type="number"
                    />
                  </div>
                </div>
              </div>

              {/* Add Activity Button */}
              <DialogFooter>
                <Button size="sm" onClick={handleAddActivity}>
                  Add Activity
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* CSV Upload Dialog */}
      <Dialog open={isCsvUploadOpen} onOpenChange={setIsCsvUploadOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Upload CSV</DialogTitle>
            <DialogDescription>
              Upload a CSV file to update student data
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            <div>
              <Label>CSV File</Label>
              <Input type="file" accept=".csv" />
            </div>
            <DialogFooter>
              <Button size="sm" onClick={handleUploadCsv}>
                Upload
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>

      {/* Alert Dialog */}
      <Dialog open={isAlertDialogOpen} onOpenChange={setIsAlertDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Alert</DialogTitle>
            <DialogDescription>
              {alertMessage}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button size="sm" onClick={() => setIsAlertDialogOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}