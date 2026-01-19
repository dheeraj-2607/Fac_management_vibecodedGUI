import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ArrowLeft, FileText, Calendar, Download, User, Mail, Phone, GraduationCap, Building } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { Alert, AlertDescription } from "./ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

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

interface CourseFile {
  id: string;
  fileName: string;
  fileType: string;
  uploadDate: string;
  courseName: string;
  semester: string;
  status: "Draft" | "Submitted" | "Approved" | "Rejected";
}

interface EventReport {
  id: string;
  eventName: string;
  eventType: string;
  eventDate: string;
  location: string;
  participants: number;
  duration: string;
  description: string;
  objectives: string;
  outcomes: string;
  status: "Draft" | "Submitted" | "Approved" | "Rejected";
}

interface FacultyPortfolioProps {
  faculty: FacultyMember;
  onBack: () => void;
}

export function FacultyPortfolio({ faculty, onBack }: FacultyPortfolioProps) {
  const [selectedFile, setSelectedFile] = useState<CourseFile | null>(null);
  const [selectedReport, setSelectedReport] = useState<EventReport | null>(null);
  const [isFileViewOpen, setIsFileViewOpen] = useState(false);
  const [isReportViewOpen, setIsReportViewOpen] = useState(false);

  // Mock data - Replace with actual API call
  const courseFiles: CourseFile[] = [
    {
      id: "1",
      fileName: "CS101_Syllabus_Fall2024.pdf",
      fileType: "Syllabus",
      uploadDate: "2024-11-15",
      courseName: "CS101 - Introduction to Programming",
      semester: "Fall 2024",
      status: "Approved"
    }
  ];

  const eventReports: EventReport[] = [
    {
      id: "1",
      eventName: "Community Health Awareness Campaign",
      eventType: "Community Service",
      eventDate: "2024-11-15",
      location: "Local Community Center",
      participants: 45,
      duration: "4 hours",
      description: "Organized a health awareness campaign focusing on preventive healthcare and nutrition.",
      objectives: "Educate community members about healthy lifestyle choices and disease prevention",
      outcomes: "Successfully reached 45 community members, distributed health information materials",
      status: "Approved"
    },
    
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved": return "bg-green-100 text-green-800";
      case "Submitted": return "bg-blue-100 text-blue-800";
      case "Draft": return "bg-gray-100 text-gray-800";
      case "Rejected": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const handleViewFile = (file: CourseFile) => {
    setSelectedFile(file);
    setIsFileViewOpen(true);
  };

  const handleViewReport = (report: EventReport) => {
    setSelectedReport(report);
    setIsReportViewOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Button variant="outline" onClick={onBack} className="mb-4">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Faculty List
      </Button>

      {/* Faculty Profile Header */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Avatar */}
            <div className="flex-shrink-0">
              <div className="h-24 w-24 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white text-3xl">
                {faculty.name.split(' ').map(n => n[0]).join('')}
              </div>
            </div>

            {/* Faculty Info */}
            <div className="flex-1 space-y-4">
              <div>
                <h2 className="flex items-center gap-2">
                  {faculty.name}
                  <Badge className="bg-blue-100 text-blue-800">{faculty.role}</Badge>
                </h2>
                <p className="text-gray-600">{faculty.specialization}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2 text-sm">
                  <Building className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600">Department:</span>
                  <span>{faculty.department}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <GraduationCap className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600">Experience:</span>
                  <span>{faculty.experience}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600">Email:</span>
                  <a href={`mailto:${faculty.email}`} className="text-blue-600 hover:underline">
                    {faculty.email}
                  </a>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600">Phone:</span>
                  <span>{faculty.phone}</span>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-2">Courses Teaching:</p>
                <div className="flex flex-wrap gap-2">
                  {faculty.courses.map((course, index) => (
                    <Badge key={index} variant="outline" className="bg-purple-50">
                      {course}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Portfolio Content */}
      <Tabs defaultValue="course-files" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="course-files" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Course Files ({courseFiles.length})
          </TabsTrigger>
          <TabsTrigger value="event-reports" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Event Reports ({eventReports.length})
          </TabsTrigger>
        </TabsList>

        {/* Course Files Tab */}
        <TabsContent value="course-files" className="space-y-4 mt-6">
          {courseFiles.length === 0 ? (
            <Alert>
              <AlertDescription className="text-sm text-gray-500">
                No course files available yet.
              </AlertDescription>
            </Alert>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {courseFiles.map((file) => (
                <Card key={file.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="pt-6">
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3 flex-1">
                          <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <FileText className="h-5 w-5 text-blue-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium truncate">{file.fileName}</p>
                            <p className="text-sm text-gray-600">{file.courseName}</p>
                          </div>
                        </div>
                        <Badge className={getStatusColor(file.status)}>
                          {file.status}
                        </Badge>
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <div>
                          <Badge variant="outline">{file.fileType}</Badge>
                          <span className="text-gray-500 ml-2">{file.semester}</span>
                        </div>
                        <span className="text-xs text-gray-500">{file.uploadDate}</span>
                      </div>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewFile(file)}
                        className="w-full"
                      >
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl">{courseFiles.length}</div>
                <p className="text-sm text-gray-500">Total Files</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl">{courseFiles.filter(f => f.status === "Approved").length}</div>
                <p className="text-sm text-gray-500">Approved Files</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl">{courseFiles.filter(f => f.status === "Submitted").length}</div>
                <p className="text-sm text-gray-500">Under Review</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Event Reports Tab */}
        <TabsContent value="event-reports" className="space-y-4 mt-6">
          {eventReports.length === 0 ? (
            <Alert>
              <AlertDescription className="text-sm text-gray-500">
                No event reports available yet.
              </AlertDescription>
            </Alert>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {eventReports.map((report) => (
                <Card key={report.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="pt-6">
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3 flex-1">
                          <div className="h-10 w-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Calendar className="h-5 w-5 text-green-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium line-clamp-1">{report.eventName}</p>
                            <p className="text-sm text-gray-600">{report.location}</p>
                          </div>
                        </div>
                        <Badge className={getStatusColor(report.status)}>
                          {report.status}
                        </Badge>
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{report.eventType}</Badge>
                          <span className="text-gray-500">{report.participants} participants</span>
                        </div>
                      </div>

                      <div className="text-xs text-gray-500">
                        {report.eventDate} • {report.duration}
                      </div>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewReport(report)}
                        className="w-full"
                      >
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl">{eventReports.length}</div>
                <p className="text-sm text-gray-500">Total Reports</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl">{eventReports.filter(r => r.status === "Approved").length}</div>
                <p className="text-sm text-gray-500">Approved Reports</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl">{eventReports.reduce((sum, r) => sum + r.participants, 0)}</div>
                <p className="text-sm text-gray-500">Total Participants</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Course File View Dialog */}
      <Dialog open={isFileViewOpen} onOpenChange={setIsFileViewOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedFile?.fileName}</DialogTitle>
            <DialogDescription>
              <Badge className={getStatusColor(selectedFile?.status || "")}>
                {selectedFile?.status}
              </Badge>
            </DialogDescription>
          </DialogHeader>
          {selectedFile && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">File Type</p>
                  <p>{selectedFile.fileType}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Upload Date</p>
                  <p>{selectedFile.uploadDate}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Course Name</p>
                  <p>{selectedFile.courseName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Semester</p>
                  <p>{selectedFile.semester}</p>
                </div>
              </div>

              <Alert className="bg-blue-50 border-blue-200">
                <AlertDescription className="text-sm">
                  This is a read-only view of the course file. You can review the details but cannot make changes.
                </AlertDescription>
              </Alert>

              <Button variant="outline" className="w-full">
                <Download className="h-4 w-4 mr-2" />
                Download File
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Event Report View Dialog */}
      <Dialog open={isReportViewOpen} onOpenChange={setIsReportViewOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedReport?.eventName}</DialogTitle>
            <DialogDescription>
              <Badge className={getStatusColor(selectedReport?.status || "")}>
                {selectedReport?.status}
              </Badge>
            </DialogDescription>
          </DialogHeader>
          {selectedReport && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Event Type</p>
                  <p>{selectedReport.eventType}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Event Date</p>
                  <p>{selectedReport.eventDate}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p>{selectedReport.location}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Participants</p>
                  <p>{selectedReport.participants}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Duration</p>
                  <p>{selectedReport.duration}</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-500 mb-1">Description</p>
                <p className="text-sm">{selectedReport.description}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500 mb-1">Objectives</p>
                <p className="text-sm">{selectedReport.objectives}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500 mb-1">Outcomes & Impact</p>
                <p className="text-sm">{selectedReport.outcomes}</p>
              </div>

              <Alert className="bg-blue-50 border-blue-200">
                <AlertDescription className="text-sm">
                  This is a read-only view of the event report. You can review the details but cannot make changes.
                </AlertDescription>
              </Alert>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
