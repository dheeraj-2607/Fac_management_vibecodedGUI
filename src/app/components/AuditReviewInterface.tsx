import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Checkbox } from "./ui/checkbox";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { ArrowLeft, Download, CheckCircle, XCircle, FileText, Calendar } from "lucide-react";
import { toast } from "sonner";

interface CourseFile {
  id: string;
  fileName: string;
  fileType: string;
  uploadDate: string;
  courseName: string;
  semester: string;
  status: "Draft" | "Submitted" | "Approved" | "Rejected";
  documentUrl?: string;
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

interface AuditReviewInterfaceProps {
  type: "file" | "report";
  item: CourseFile | EventReport;
  facultyName: string;
  onBack: () => void;
}

const courseFileChecklist = [
  { id: "format", label: "Document format is correct and readable" }
];

const eventReportChecklist = [
  { id: "details", label: "Event details are complete and accurate" }
];

export function AuditReviewInterface({ type, item, facultyName, onBack }: AuditReviewInterfaceProps) {
  const [checkedItems, setCheckedItems] = useState<Record<string, "yes" | "no" | "pending">>({});
  const [auditorRemarks, setAuditorRemarks] = useState("");
  const [reviewDecision, setReviewDecision] = useState<"approve" | "reject" | null>(null);

  const checklist = type === "file" ? courseFileChecklist : eventReportChecklist;

  const handleChecklistChange = (itemId: string, value: "yes" | "no" | "pending") => {
    setCheckedItems({
      ...checkedItems,
      [itemId]: value
    });
  };

  const handleSubmitReview = () => {
    if (!reviewDecision) {
      toast.error("Please select approve or reject");
      return;
    }

    const allChecked = checklist.every(item => checkedItems[item.id]);
    if (!allChecked) {
      toast.error("Please complete all checklist items");
      return;
    }

    if (!auditorRemarks.trim()) {
      toast.error("Please provide auditor remarks");
      return;
    }

    toast.success(`${type === "file" ? "Course file" : "Event report"} ${reviewDecision}d successfully`);
    onBack();
  };

  const handleDownloadSheet = () => {
    // Create CSV content
    let csvContent = "Checklist Item,Status\n";
    checklist.forEach(item => {
      const status = checkedItems[item.id] || "pending";
      csvContent += `"${item.label}",${status}\n`;
    });
    csvContent += `\nRemarks,"${auditorRemarks}"\n`;
    csvContent += `Decision,${reviewDecision || "pending"}\n`;

    // Create download link
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `audit-${facultyName.replace(/ /g, "_")}-${type === "file" ? (item as CourseFile).fileName : (item as EventReport).eventName.replace(/ /g, "_")}.csv`;
    link.click();
    window.URL.revokeObjectURL(url);
    toast.success("Audit sheet downloaded successfully");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "yes": return "bg-green-100 text-green-800 border-green-300";
      case "no": return "bg-red-100 text-red-800 border-red-300";
      case "pending": return "bg-orange-100 text-orange-800 border-orange-300";
      default: return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Faculty List
        </Button>
        <Button variant="outline" onClick={handleDownloadSheet}>
          <Download className="h-4 w-4 mr-2" />
          Download Audit Sheet
        </Button>
      </div>

      {/* Faculty Info */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium">{facultyName}</h3>
              <p className="text-sm text-gray-600">
                {type === "file" ? "Course File Review" : "Event Report Review"}
              </p>
            </div>
            <div className="flex gap-2">
              <Badge 
                className={reviewDecision === "approve" ? "bg-green-100 text-green-800" : ""}
                variant={reviewDecision === "approve" ? "default" : "outline"}
              >
                {reviewDecision === "approve" ? "Approved" : "Not Approved"}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Checklist Sidebar - Left Side */}
        <div className="lg:col-span-1">
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle className="text-base">Audit Checklist</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {checklist.map((checkItem) => {
                  const status = checkedItems[checkItem.id] || "pending";
                  return (
                    <div key={checkItem.id} className="space-y-2">
                      <Label className="text-sm leading-tight">
                        {checkItem.label}
                      </Label>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant={status === "yes" ? "default" : "outline"}
                          onClick={() => handleChecklistChange(checkItem.id, "yes")}
                          className="flex-1 text-xs"
                        >
                          Yes
                        </Button>
                        <Button
                          size="sm"
                          variant={status === "no" ? "destructive" : "outline"}
                          onClick={() => handleChecklistChange(checkItem.id, "no")}
                          className="flex-1 text-xs"
                        >
                          No
                        </Button>
                        <Button
                          size="sm"
                          variant={status === "pending" ? "default" : "outline"}
                          onClick={() => handleChecklistChange(checkItem.id, "pending")}
                          className="flex-1 text-xs"
                        >
                          Pending
                        </Button>
                      </div>
                    </div>
                  );
                })}

                {/* Checklist Summary */}
                <div className="pt-4 border-t">
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span>Yes:</span>
                      <span className="font-medium">
                        {Object.values(checkedItems).filter(v => v === "yes").length}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>No:</span>
                      <span className="font-medium">
                        {Object.values(checkedItems).filter(v => v === "no").length}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Pending:</span>
                      <span className="font-medium">
                        {checklist.length - Object.keys(checkedItems).length + 
                         Object.values(checkedItems).filter(v => v === "pending").length}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Document Viewer & Details - Right Side */}
        <div className="lg:col-span-3 space-y-6">
          {/* Document Viewer */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {type === "file" ? <FileText className="h-5 w-5" /> : <Calendar className="h-5 w-5" />}
                Document Viewer
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-[16/10] bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                <div className="text-center">
                  <FileText className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">
                    {type === "file" 
                      ? `Document: ${(item as CourseFile).fileName}`
                      : `Report: ${(item as EventReport).eventName}`}
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    Live document preview would appear here
                  </p>
                  <Button variant="outline" size="sm" className="mt-4">
                    <Download className="h-4 w-4 mr-2" />
                    Download Document
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Document Details */}
          <Card>
            <CardHeader>
              <CardTitle>Document Details</CardTitle>
            </CardHeader>
            <CardContent>
              {type === "file" ? (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">File Type</p>
                    <p>{(item as CourseFile).fileType}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Upload Date</p>
                    <p>{(item as CourseFile).uploadDate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Course Name</p>
                    <p>{(item as CourseFile).courseName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Semester</p>
                    <p>{(item as CourseFile).semester}</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Event Type</p>
                      <p>{(item as EventReport).eventType}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Event Date</p>
                      <p>{(item as EventReport).eventDate}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Location</p>
                      <p>{(item as EventReport).location}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Participants</p>
                      <p>{(item as EventReport).participants}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500 mb-1">Description</p>
                    <p className="text-sm">{(item as EventReport).description}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500 mb-1">Objectives</p>
                    <p className="text-sm">{(item as EventReport).objectives}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500 mb-1">Outcomes & Impact</p>
                    <p className="text-sm">{(item as EventReport).outcomes}</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Auditor Remarks */}
          <Card>
            <CardHeader>
              <CardTitle>Auditor Remarks</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Provide detailed feedback and remarks..."
                value={auditorRemarks}
                onChange={(e) => setAuditorRemarks(e.target.value)}
                rows={6}
              />

              {/* Decision Buttons */}
              <div className="flex gap-4">
                <Button
                  variant={reviewDecision === "approve" ? "default" : "outline"}
                  onClick={() => setReviewDecision("approve")}
                  className="flex-1"
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Approve
                </Button>
                <Button
                  variant={reviewDecision === "reject" ? "destructive" : "outline"}
                  onClick={() => setReviewDecision("reject")}
                  className="flex-1"
                >
                  <XCircle className="h-4 w-4 mr-2" />
                  Reject
                </Button>
              </div>

              <Button onClick={handleSubmitReview} className="w-full" size="lg">
                Submit Review
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
