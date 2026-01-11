import { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Alert, AlertDescription } from "./ui/alert";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { ArrowLeft, FileText, Download, MessageSquare, Reply, User } from "lucide-react";
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

interface DocumentViewerInterfaceProps {
  file: CourseFile;
  onBack: () => void;
  onDownload: (file: CourseFile) => void;
  onPeerReview: (review: string) => void;
  onRespondToReview: (response: string) => void;
  currentUser: string;
}

export function DocumentViewerInterface({
  file,
  onBack,
  onDownload,
  onPeerReview,
  onRespondToReview,
  currentUser
}: DocumentViewerInterfaceProps) {
  const [isPeerReviewOpen, setIsPeerReviewOpen] = useState(false);
  const [isResponseOpen, setIsResponseOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState<PeerReview | null>(null);

  const handlePeerReviewSubmit = (review: string) => {
    onPeerReview(review);
    setIsPeerReviewOpen(false);
  };

  const handleResponseSubmit = (response: string) => {
    onRespondToReview(response);
    setIsResponseOpen(false);
    setSelectedReview(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="outline" onClick={onBack}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Files
              </Button>
              <div>
                <h1 className="text-xl font-semibold">{file.fileName}</h1>
                <p className="text-sm text-gray-600">
                  {file.courseCode} - {file.courseName}
                </p>
              </div>
            </div>
            <Button onClick={() => onDownload(file)}>
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Document Viewer - Main Area */}
          <div className="lg:col-span-3">
            <Card className="shadow-lg">
              <div className="bg-gray-800 text-white px-6 py-3 flex items-center justify-between rounded-t-lg">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  <span className="font-medium">Document Preview</span>
                </div>
                <div className="flex items-center gap-4">
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
                  <span className="text-sm text-gray-300">{file.size}</span>
                </div>
              </div>
              
              {/* Document Display Area */}
              <div className="bg-white p-8" style={{ minHeight: "calc(100vh - 250px)" }}>
                <div className="max-w-4xl mx-auto">
                  {/* Document Preview Container */}
                  <div className="bg-white shadow-2xl rounded-lg border-2 border-gray-200 p-12" style={{ minHeight: "800px" }}>
                    <div className="flex flex-col items-center justify-center h-full">
                      <FileText className="h-24 w-24 text-gray-300 mb-6" />
                      <h3 className="text-2xl font-medium text-gray-700 mb-2">Live Document Preview</h3>
                      <p className="text-gray-500 mb-6 text-center max-w-md">
                        In production, this area would display the actual document content using a PDF viewer, 
                        Office document renderer, or other appropriate viewer based on file type.
                      </p>
                      <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 w-full max-w-md">
                        <div className="space-y-3 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">File Name:</span>
                            <span className="font-medium">{file.fileName}</span>
                          </div>
                          <div className="flex justify-between border-t pt-2">
                            <span className="text-gray-600">Type:</span>
                            <span className="font-medium">{file.fileType}</span>
                          </div>
                          <div className="flex justify-between border-t pt-2">
                            <span className="text-gray-600">Size:</span>
                            <span className="font-medium">{file.size}</span>
                          </div>
                          <div className="flex justify-between border-t pt-2">
                            <span className="text-gray-600">Uploaded:</span>
                            <span className="font-medium">{file.uploadDate}</span>
                          </div>
                        </div>
                      </div>
                      <Button 
                        variant="outline" 
                        className="mt-6"
                        onClick={() => onDownload(file)}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download to View Locally
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar - File Info & Reviews */}
          <div className="lg:col-span-1 space-y-6">
            {/* File Information */}
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-4">File Information</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Faculty</p>
                    <p className="font-medium">{file.facultyName}</p>
                    <p className="text-xs text-gray-500">{file.department}</p>
                  </div>
                  <div className="border-t pt-3">
                    <p className="text-xs text-gray-500 mb-1">Course</p>
                    <p className="font-medium">{file.courseCode}</p>
                    <p className="text-xs">{file.courseName}</p>
                  </div>
                  <div className="border-t pt-3">
                    <p className="text-xs text-gray-500 mb-1">File Type</p>
                    <p>{file.fileType}</p>
                  </div>
                  <div className="border-t pt-3">
                    <p className="text-xs text-gray-500 mb-1">Semester</p>
                    <p>{file.semester} {file.academicYear}</p>
                  </div>
                  <div className="border-t pt-3">
                    <p className="text-xs text-gray-500 mb-1">Upload Date</p>
                    <p>{file.uploadDate}</p>
                  </div>
                  <div className="border-t pt-3">
                    <p className="text-xs text-gray-500 mb-1">Status</p>
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
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Admin Review */}
            {file.adminRemarks && (
              <Card>
                <CardContent className="pt-6">
                  <h3 className="flex items-center gap-2 font-semibold mb-3 text-sm">
                    <MessageSquare className="h-4 w-4 text-gray-600" />
                    Admin Review
                  </h3>
                  <Alert
                    className={
                      file.status === "Approved"
                        ? "border-green-200 bg-green-50"
                        : file.status === "Rejected"
                        ? "border-red-200 bg-red-50"
                        : "border-yellow-200 bg-yellow-50"
                    }
                  >
                    <AlertDescription>
                      <p className="text-sm mb-3">{file.adminRemarks}</p>
                      {file.reviewedBy && (
                        <div className="text-xs text-gray-600 pt-2 border-t border-gray-200">
                          <p>Reviewed by: {file.reviewedBy}</p>
                          <p>Date: {file.reviewedDate}</p>
                        </div>
                      )}
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            )}

            {/* Peer Reviews */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="flex items-center gap-2 font-semibold text-sm">
                    <MessageSquare className="h-4 w-4 text-gray-600" />
                    Peer Reviews ({file.peerReviews?.length || 0})
                  </h3>
                  <Button size="sm" onClick={() => setIsPeerReviewOpen(true)}>
                    Add
                  </Button>
                </div>

                <div className="space-y-3 max-h-[500px] overflow-y-auto">
                  {file.peerReviews && file.peerReviews.length > 0 ? (
                    <Accordion type="single" collapsible className="w-full">
                      {file.peerReviews.map((review) => (
                        <AccordionItem
                          key={review.id}
                          value={review.id}
                          className="border rounded-lg mb-2"
                        >
                          <AccordionTrigger className="px-3 py-2 hover:no-underline">
                            <div className="flex items-start gap-2 w-full">
                              <div className="h-6 w-6 rounded-full bg-purple-100 flex items-center justify-center shrink-0">
                                <User className="h-3 w-3 text-purple-600" />
                              </div>
                              <div className="text-left flex-1">
                                <p className="text-xs font-medium">{review.reviewerName}</p>
                                <p className="text-xs text-gray-500">{review.reviewDate}</p>
                              </div>
                              {review.facultyResponse && (
                                <Badge className="bg-blue-100 text-blue-800 text-xs">✓</Badge>
                              )}
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="px-3 pb-3">
                            <div className="space-y-2">
                              {/* Review Comment */}
                              <Alert className="border-purple-200 bg-purple-50">
                                <AlertDescription>
                                  <p className="text-xs text-purple-800 mb-1">Review:</p>
                                  <p className="text-xs">{review.comment}</p>
                                </AlertDescription>
                              </Alert>

                              {/* Faculty Response */}
                              {review.facultyResponse ? (
                                <Alert className="border-blue-200 bg-blue-50">
                                  <AlertDescription>
                                    <p className="text-xs text-blue-800 mb-1">Response:</p>
                                    <p className="text-xs">{review.facultyResponse}</p>
                                    <p className="text-xs text-gray-500 mt-1">
                                      {review.responseDate}
                                    </p>
                                  </AlertDescription>
                                </Alert>
                              ) : (
                                <div>
                                  {review.reviewerName === currentUser ? (
                                    <Alert>
                                      <AlertDescription className="text-xs text-gray-500 italic">
                                        Awaiting response...
                                      </AlertDescription>
                                    </Alert>
                                  ) : file.facultyName === currentUser ? (
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => {
                                        setSelectedReview(review);
                                        setIsResponseOpen(true);
                                      }}
                                      className="w-full text-xs"
                                    >
                                      <Reply className="h-3 w-3 mr-1" />
                                      Respond
                                    </Button>
                                  ) : null}
                                </div>
                              )}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  ) : (
                    <Alert>
                      <AlertDescription className="text-xs text-gray-500">
                        No peer reviews yet. Be the first to provide feedback!
                      </AlertDescription>
                    </Alert>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardContent className="pt-6 space-y-2">
                <Button onClick={() => onDownload(file)} className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Download File
                </Button>
                <Button variant="outline" onClick={onBack} className="w-full">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to List
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Peer Review Dialog */}
      <PeerReviewDialog
        open={isPeerReviewOpen}
        onOpenChange={setIsPeerReviewOpen}
        onSubmit={handlePeerReviewSubmit}
        itemType="file"
        itemName={file.fileName}
      />

      {/* Response Dialog */}
      <ResponseDialog
        open={isResponseOpen}
        onOpenChange={(open) => {
          setIsResponseOpen(open);
          if (!open) setSelectedReview(null);
        }}
        onSubmit={handleResponseSubmit}
        itemType="file"
      />
    </div>
  );
}
