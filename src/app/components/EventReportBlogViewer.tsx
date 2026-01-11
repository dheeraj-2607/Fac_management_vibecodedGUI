import { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Alert, AlertDescription } from "./ui/alert";
import { ArrowLeft, Calendar, MapPin, Users, Clock, Download, MessageSquare, Reply, User as UserIcon, FileDown } from "lucide-react";
import { ResponseDialog } from "./ResponseDialog";
import { toast } from "sonner";

interface EventReport {
  id: string;
  eventName: string;
  community: string;
  eventDate: string;
  description: string;
  thumbnailUrl?: string;
  location?: string;
  participants?: number;
  duration?: string;
  objectives?: string;
  outcomes?: string;
  galleryImages?: string[];
  status?: "Draft" | "Submitted" | "Approved" | "Rejected";
  submittedDate?: string;
  facultyCoordinator: string;
  adminRemarks?: string;
  reviewedBy?: string;
  reviewedDate?: string;
  facultyResponse?: string;
  responseDate?: string;
  peerReviews?: PeerReview[];
}

interface PeerReview {
  id: string;
  reviewerName: string;
  reviewDate: string;
  comment: string;
  facultyResponse?: string;
  responseDate?: string;
}

interface EventReportBlogViewerProps {
  report: EventReport;
  onBack: () => void;
  onDownload: (report: EventReport) => void;
  onRespondToAdminReview: (response: string) => void;
  currentUser: string;
}

export function EventReportBlogViewer({
  report,
  onBack,
  onDownload,
  onRespondToAdminReview,
  currentUser
}: EventReportBlogViewerProps) {
  const [isResponseOpen, setIsResponseOpen] = useState(false);
  const [selectedGalleryImage, setSelectedGalleryImage] = useState<string | null>(null);

  const handleResponseSubmit = (response: string) => {
    onRespondToAdminReview(response);
    setIsResponseOpen(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved": return "bg-green-100 text-green-800";
      case "Submitted": return "bg-blue-100 text-blue-800";
      case "Draft": return "bg-gray-100 text-gray-800";
      case "Rejected": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button variant="outline" onClick={onBack}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Reports
            </Button>
            <div className="flex items-center gap-3">
              {report.status && (
                <Badge className={getStatusColor(report.status)}>
                  {report.status}
                </Badge>
              )}
              <Button onClick={() => onDownload(report)}>
                <Download className="h-4 w-4 mr-2" />
                Download Report
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Blog Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Hero Image */}
          {report.thumbnailUrl && (
            <div className="rounded-xl overflow-hidden shadow-2xl mb-8">
              <img
                src={report.thumbnailUrl}
                alt={report.eventName}
                className="w-full h-96 object-cover"
              />
            </div>
          )}

          {/* Article Content */}
          <article className="bg-white rounded-xl shadow-lg p-8 md:p-12 space-y-8">
            {/* Title */}
            <header className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                {report.eventName}
              </h1>
              
              {/* Meta Information */}
              <div className="flex flex-wrap items-center gap-6 text-gray-600 border-b pb-6">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-blue-600" />
                  <span>{new Date(report.eventDate).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}</span>
                </div>
                
                {report.location && (
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-red-600" />
                    <span>{report.location}</span>
                  </div>
                )}
                
                {report.participants && (
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-green-600" />
                    <span>{report.participants} Participants</span>
                  </div>
                )}
                
                {report.duration && (
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-purple-600" />
                    <span>{report.duration}</span>
                  </div>
                )}
              </div>

              {/* Community Badge */}
              <div>
                <Badge variant="outline" className="text-base px-4 py-2 bg-blue-50 text-blue-700 border-blue-200">
                  {report.community}
                </Badge>
              </div>
            </header>

            {/* Event Description */}
            <section className="prose prose-lg max-w-none">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Event Overview</h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {report.description}
              </p>
            </section>

            {/* Objectives */}
            {report.objectives && (
              <section className="bg-blue-50 rounded-lg p-6 border border-blue-100">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <div className="h-8 w-1 bg-blue-600 rounded"></div>
                  Objectives
                </h2>
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {report.objectives}
                </p>
              </section>
            )}

            {/* Outcomes */}
            {report.outcomes && (
              <section className="bg-green-50 rounded-lg p-6 border border-green-100">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <div className="h-8 w-1 bg-green-600 rounded"></div>
                  Outcomes & Impact
                </h2>
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {report.outcomes}
                </p>
              </section>
            )}

            {/* Gallery */}
            {report.galleryImages && report.galleryImages.length > 0 && (
              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-900">Event Gallery</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {report.galleryImages.map((image, index) => (
                    <div
                      key={index}
                      className="relative aspect-square rounded-lg overflow-hidden cursor-pointer group shadow-md hover:shadow-xl transition-shadow"
                      onClick={() => setSelectedGalleryImage(image)}
                    >
                      <img
                        src={image}
                        alt={`Gallery ${index + 1}`}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Coordinator */}
            <section className="border-t pt-6">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <UserIcon className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Coordinated by</p>
                  <p className="font-medium text-gray-900">{report.facultyCoordinator}</p>
                </div>
              </div>
            </section>

            {/* Admin Review Section */}
            {report.adminRemarks && (
              <section className="border-t pt-8 space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
                    <MessageSquare className="h-6 w-6 text-gray-600" />
                    Admin Review
                  </h2>
                  {report.status && (
                    <Badge className={getStatusColor(report.status)}>
                      {report.status}
                    </Badge>
                  )}
                </div>
                
                <Alert
                  className={
                    report.status === "Approved"
                      ? "border-green-200 bg-green-50"
                      : report.status === "Rejected"
                      ? "border-red-200 bg-red-50"
                      : "border-blue-200 bg-blue-50"
                  }
                >
                  <AlertDescription>
                    <p className="text-sm mb-3">{report.adminRemarks}</p>
                    {report.reviewedBy && (
                      <div className="text-xs text-gray-600 pt-2 border-t border-gray-200">
                        <p>Reviewed by: {report.reviewedBy}</p>
                        {report.reviewedDate && <p>Date: {report.reviewedDate}</p>}
                      </div>
                    )}
                  </AlertDescription>
                </Alert>

                {/* Faculty Response */}
                {report.facultyResponse ? (
                  <Alert className="border-blue-200 bg-blue-50">
                    <AlertDescription>
                      <p className="text-xs text-blue-800 mb-2">Your Response:</p>
                      <p className="text-sm mb-3">{report.facultyResponse}</p>
                      {report.responseDate && (
                        <div className="text-xs text-gray-600 pt-2 border-t border-gray-200">
                          <p>Response Date: {report.responseDate}</p>
                        </div>
                      )}
                    </AlertDescription>
                  </Alert>
                ) : (
                  <Button
                    variant="outline"
                    onClick={() => setIsResponseOpen(true)}
                    className="w-full"
                  >
                    <Reply className="h-4 w-4 mr-2" />
                    Respond to Admin Review
                  </Button>
                )}
              </section>
            )}

            {/* Download Button */}
            <section className="border-t pt-6">
              <Button onClick={() => onDownload(report)} className="w-full" size="lg">
                <FileDown className="h-5 w-5 mr-2" />
                Download Full Report
              </Button>
            </section>
          </article>
        </div>
      </div>

      {/* Gallery Lightbox */}
      {selectedGalleryImage && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedGalleryImage(null)}
        >
          <img
            src={selectedGalleryImage}
            alt="Gallery"
            className="max-w-full max-h-full object-contain rounded-lg"
          />
          <Button
            variant="outline"
            className="absolute top-4 right-4"
            onClick={() => setSelectedGalleryImage(null)}
          >
            Close
          </Button>
        </div>
      )}

      {/* Response Dialog */}
      <ResponseDialog
        open={isResponseOpen}
        onOpenChange={setIsResponseOpen}
        onSubmit={handleResponseSubmit}
        itemType="event report"
      />
    </div>
  );
}
