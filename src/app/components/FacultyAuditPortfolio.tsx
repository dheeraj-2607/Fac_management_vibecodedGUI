import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ArrowLeft, FileText, Calendar, Shield } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { AuditReviewInterface } from "./AuditReviewInterface";

interface FacultyMember {
  id: string;
  name: string;
  department: string;
  totalFiles: number;
  totalReports: number;
}

interface CourseFile {
  id: string;
  fileName: string;
  fileType: string;
  uploadDate: string;
  courseName: string;
  semester: string;
  status: "Draft" | "Submitted" | "Approved" | "Rejected";
  auditorRemarks?: string;
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
  auditorRemarks?: string;
}

interface FacultyAuditPortfolioProps {
  faculty: FacultyMember;
  onBack: () => void;
}

// Checklist items for course files
const courseFileChecklist = [
  { id: "format", label: "Document format is correct and readable" },
  { id: "content", label: "Content is complete and comprehensive" }
];

// Checklist items for event reports
const eventReportChecklist = [
  { id: "details", label: "Event details are complete and accurate" },
  { id: "objectives", label: "Objectives are clearly stated" }
];

export function FacultyAuditPortfolio({ faculty, onBack }: FacultyAuditPortfolioProps) {
  const [selectedFile, setSelectedFile] = useState<CourseFile | null>(null);
  const [selectedReport, setSelectedReport] = useState<EventReport | null>(null);
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [reviewType, setReviewType] = useState<"file" | "report">("file");

  // Mock data
  const courseFiles: CourseFile[] = [
    {
      id: "1",
      fileName: "CS101_Syllabus_Fall2024.pdf",
      fileType: "Syllabus",
      uploadDate: "2024-11-15",
      courseName: "CS101 - Introduction to Programming",
      semester: "Fall 2024",
      status: "Submitted"
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
      status: "Submitted"
    }
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

  const handleReviewFile = (file: CourseFile) => {
    setSelectedFile(file);
    setReviewType("file");
    setIsReviewOpen(true);
  };

  const handleReviewReport = (report: EventReport) => {
    setSelectedReport(report);
    setReviewType("report");
    setIsReviewOpen(true);
  };

  if (isReviewOpen && (selectedFile || selectedReport)) {
    return (
      <AuditReviewInterface
        type={reviewType}
        item={reviewType === "file" ? selectedFile! : selectedReport!}
        facultyName={faculty.name}
        onBack={() => setIsReviewOpen(false)}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Button variant="outline" onClick={onBack}>
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Faculty List
      </Button>

      {/* Faculty Header */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl">
              {faculty.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <h2>{faculty.name}</h2>
              <p className="text-gray-600">{faculty.department}</p>
              <div className="flex items-center gap-4 mt-2">
                <Badge variant="outline">{faculty.totalFiles} Course Files</Badge>
                <Badge variant="outline">{faculty.totalReports} Event Reports</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs for Files and Reports */}
      <Tabs defaultValue="course-files">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="course-files">
            <FileText className="h-4 w-4 mr-2" />
            Course Files
          </TabsTrigger>
          <TabsTrigger value="event-reports">
            <Calendar className="h-4 w-4 mr-2" />
            Event Reports
          </TabsTrigger>
        </TabsList>

        {/* Course Files Tab */}
        <TabsContent value="course-files" className="space-y-4 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {courseFiles.map((file) => (
              <Card key={file.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="space-y-4">
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

                    {file.auditorRemarks && (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                        <p className="text-xs font-medium text-green-800 mb-1">Auditor Remarks:</p>
                        <p className="text-sm text-green-700">{file.auditorRemarks}</p>
                      </div>
                    )}

                    <Button
                      variant={file.status === "Submitted" ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleReviewFile(file)}
                      className="w-full"
                    >
                      <Shield className="h-4 w-4 mr-2" />
                      {file.status === "Submitted" ? "Review & Audit" : "View Review"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Event Reports Tab */}
        <TabsContent value="event-reports" className="space-y-4 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {eventReports.map((report) => (
              <Card key={report.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="space-y-4">
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

                    {report.auditorRemarks && (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                        <p className="text-xs font-medium text-green-800 mb-1">Auditor Remarks:</p>
                        <p className="text-sm text-green-700">{report.auditorRemarks}</p>
                      </div>
                    )}

                    <Button
                      variant={report.status === "Submitted" ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleReviewReport(report)}
                      className="w-full"
                    >
                      <Shield className="h-4 w-4 mr-2" />
                      {report.status === "Submitted" ? "Review & Audit" : "View Review"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}