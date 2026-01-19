import { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { FileText, Download, Search, Filter, Eye, MessageSquare } from "lucide-react";
import { Badge } from "./ui/badge";
import { toast } from "sonner";
import { DocumentViewerInterface } from "./DocumentViewerInterface";
import { PeerReviewDialog } from "./PeerReviewDialog";
import { ResponseDialog } from "./ResponseDialog";

interface PeerReview {
  id: string;
  reviewerName: string;
  reviewDate: string;
  comment: string;
  facultyResponse?: string;
  responseDate?: string;
}

interface CourseFile {
  id: string;
  fileName: string;
  courseCode: string;
  courseName: string;
  fileType: string;
  uploadDate: string;
  semester: string;
  academicYear: string;
  size: string;
  status?: "Pending" | "Approved" | "Rejected";
  adminRemarks?: string;
  reviewedBy?: string;
  reviewedDate?: string;
  facultyResponse?: string;
  responseDate?: string;
  facultyName: string;
  department: string;
  peerReviews?: PeerReview[];
}

const CURRENT_USER = "Dr. Sarah Johnson"; // Logged in user

export function AllFacultyFiles() {
  const [files, setFiles] = useState<CourseFile[]>([
    {
      id: "1",
      fileName: "CS101_Syllabus_Fall2024.pdf",
      courseCode: "CS101",
      courseName: "Introduction to Computer Science",
      fileType: "Syllabus",
      uploadDate: "2024-08-15",
      semester: "Fall",
      academicYear: "2024-2025",
      size: "1.2 MB",
      status: "Approved",
      adminRemarks: "Excellent syllabus with comprehensive learning objectives.",
      reviewedBy: "Dr. Michael Chen (Department Head)",
      reviewedDate: "2024-08-16",
      facultyName: "Dr. Jane Smith",
      department: "Computer Science",
      peerReviews: [
        {
          id: "pr1",
          reviewerName: "Dr. Robert Brown",
          reviewDate: "2024-08-17",
          comment: "Very well-structured syllabus. The learning outcomes are clearly defined and measurable."
        }
      ]
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterYear, setFilterYear] = useState("all");
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<CourseFile | null>(null);
  const [isPeerReviewOpen, setIsPeerReviewOpen] = useState(false);
  const [isResponseOpen, setIsResponseOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState<PeerReview | null>(null);

  const handleView = (file: CourseFile) => {
    setSelectedFile(file);
    setIsViewOpen(true);
  };

  const handleDownload = (file: CourseFile) => {
    // TODO: Replace with actual API call
    toast.success(`Downloading ${file.fileName}`);
  };

  const handlePeerReview = (review: string) => {
    if (!selectedFile) return;

    // TODO: Replace with actual API call
    // POST /api/course-files/${selectedFile.id}/peer-reviews

    const newReview: PeerReview = {
      id: `pr${Date.now()}`,
      reviewerName: CURRENT_USER,
      reviewDate: new Date().toISOString().split('T')[0],
      comment: review
    };

    const updatedFiles = files.map(f =>
      f.id === selectedFile.id
        ? { ...f, peerReviews: [...(f.peerReviews || []), newReview] }
        : f
    );
    setFiles(updatedFiles);

    setSelectedFile({
      ...selectedFile,
      peerReviews: [...(selectedFile.peerReviews || []), newReview]
    });
  };

  const handleRespondToReview = (response: string) => {
    if (!selectedFile || !selectedReview) return;

    // TODO: Replace with actual API call
    // POST /api/peer-reviews/${selectedReview.id}/respond

    const updatedFiles = files.map(f => {
      if (f.id === selectedFile.id) {
        return {
          ...f,
          peerReviews: f.peerReviews?.map(pr =>
            pr.id === selectedReview.id
              ? { ...pr, facultyResponse: response, responseDate: new Date().toISOString().split('T')[0] }
              : pr
          )
        };
      }
      return f;
    });
    setFiles(updatedFiles);

    setSelectedFile({
      ...selectedFile,
      peerReviews: selectedFile.peerReviews?.map(pr =>
        pr.id === selectedReview.id
          ? { ...pr, facultyResponse: response, responseDate: new Date().toISOString().split('T')[0] }
          : pr
      )
    });

    setSelectedReview(null);
  };

  const filteredFiles = files.filter(file => {
    const matchesSearch = file.fileName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         file.courseCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         file.facultyName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = filterDepartment === "all" || file.department === filterDepartment;
    const matchesStatus = filterStatus === "all" || file.status === filterStatus;
    const matchesYear = filterYear === "all" || file.academicYear === filterYear;
    
    return matchesSearch && matchesDepartment && matchesStatus && matchesYear;
  });

  const uniqueDepartments = Array.from(new Set(files.map(f => f.department)));
  const uniqueYears = Array.from(new Set(files.map(f => f.academicYear)));

  // If viewing a file, show full-screen viewer
  if (isViewOpen && selectedFile) {
    return (
      <DocumentViewerInterface
        file={selectedFile}
        onBack={() => setIsViewOpen(false)}
        onDownload={handleDownload}
        onPeerReview={handlePeerReview}
        onRespondToReview={handleRespondToReview}
        currentUser={CURRENT_USER}
      />
    );
  }

  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        {/* Search and Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search by file name, course, or faculty..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={filterDepartment} onValueChange={setFilterDepartment}>
            <SelectTrigger className="w-full md:w-48">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              {uniqueDepartments.map(dept => (
                <SelectItem key={dept} value={dept}>{dept}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-full md:w-48">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="Approved">Approved</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filterYear} onValueChange={setFilterYear}>
            <SelectTrigger className="w-full md:w-48">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Academic Year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Years</SelectItem>
              {uniqueYears.map(year => (
                <SelectItem key={year} value={year}>{year}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Files Table */}
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>File Name</TableHead>
                <TableHead>Faculty</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Peer Reviews</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredFiles.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-gray-500 py-8">
                    No files found matching your criteria.
                  </TableCell>
                </TableRow>
              ) : (
                filteredFiles.map((file) => (
                  <TableRow key={file.id}>
                    <TableCell className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-blue-600" />
                      <div>
                        <div>{file.fileName}</div>
                        <div className="text-sm text-gray-500">{file.fileType}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div>{file.facultyName}</div>
                        <div className="text-sm text-gray-500">{file.department}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>{file.courseCode}</div>
                      <div className="text-sm text-gray-500">{file.courseName}</div>
                    </TableCell>
                    <TableCell>
                      {file.status && (
                        <Badge 
                          className={
                            file.status === "Approved" 
                              ? "bg-green-100 text-green-800" 
                              : file.status === "Rejected"
                              ? "bg-red-100 text-red-800"
                              : "bg-yellow-100 text-yellow-800"
                          }
                        >
                          {file.status}
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <MessageSquare className="h-4 w-4 text-gray-400" />
                        <span className="text-sm">{file.peerReviews?.length || 0}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDownload(file)}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleView(file)}
                        >
                          <Eye className="h-4 w-4 text-blue-600" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Peer Review Dialog */}
        <PeerReviewDialog
          open={isPeerReviewOpen}
          onOpenChange={setIsPeerReviewOpen}
          onSubmit={handlePeerReview}
          itemType="file"
          itemName={selectedFile?.fileName || ""}
        />

        {/* Response to Peer Review Dialog */}
        <ResponseDialog
          open={isResponseOpen}
          onOpenChange={(open) => {
            setIsResponseOpen(open);
            if (!open) setSelectedReview(null);
          }}
          onSubmit={handleRespondToReview}
          itemType="file"
        />
      </CardContent>
    </Card>
  );
}