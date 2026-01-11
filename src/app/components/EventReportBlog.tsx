import { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Calendar, MapPin, Users, Clock, ArrowLeft, Image as ImageIcon } from "lucide-react";

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
  thumbnail: string;
  gallery: string[];
  facultyName: string;
  department: string;
}

interface EventReportBlogProps {
  report: EventReport;
  onBack: () => void;
}

export function EventReportBlog({ report, onBack }: EventReportBlogProps) {
  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Button variant="outline" onClick={onBack}>
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Reports
      </Button>

      {/* Hero/Thumbnail Section */}
      <Card>
        <CardContent className="p-0">
          <div className="aspect-video bg-gradient-to-r from-blue-500 to-purple-500 rounded-t-lg flex items-center justify-center">
            <div className="text-center text-white p-8">
              <ImageIcon className="h-16 w-16 mx-auto mb-4 opacity-50" />
              <p className="text-sm opacity-75">Event Thumbnail</p>
              <p className="text-xs mt-1">{report.thumbnail}</p>
            </div>
          </div>
          <div className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-3xl mb-2">{report.eventName}</h1>
                <p className="text-gray-600">{report.description}</p>
              </div>
              <Badge
                className={
                  report.status === "Approved"
                    ? "bg-green-100 text-green-800"
                    : report.status === "Submitted"
                    ? "bg-blue-100 text-blue-800"
                    : report.status === "Rejected"
                    ? "bg-red-100 text-red-800"
                    : "bg-gray-100 text-gray-800"
                }
              >
                {report.status}
              </Badge>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              <div className="flex items-center gap-2 text-gray-600">
                <Calendar className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-xs text-gray-500">Date</p>
                  <p className="text-sm">{report.eventDate}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="h-5 w-5 text-green-600" />
                <div>
                  <p className="text-xs text-gray-500">Location</p>
                  <p className="text-sm">{report.location}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Users className="h-5 w-5 text-purple-600" />
                <div>
                  <p className="text-xs text-gray-500">Participants</p>
                  <p className="text-sm">{report.participants}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Clock className="h-5 w-5 text-orange-600" />
                <div>
                  <p className="text-xs text-gray-500">Duration</p>
                  <p className="text-sm">{report.duration}</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Event Details Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Objectives */}
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-xl mb-3 flex items-center gap-2">
                <div className="h-8 w-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-blue-600">🎯</span>
                </div>
                Objectives
              </h2>
              <p className="text-gray-700 leading-relaxed">{report.objectives}</p>
            </CardContent>
          </Card>

          {/* Outcomes & Impact */}
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-xl mb-3 flex items-center gap-2">
                <div className="h-8 w-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <span className="text-green-600">✨</span>
                </div>
                Outcomes & Impact
              </h2>
              <p className="text-gray-700 leading-relaxed">{report.outcomes}</p>
            </CardContent>
          </Card>

          {/* Event Gallery */}
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-xl mb-4 flex items-center gap-2">
                <div className="h-8 w-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  <ImageIcon className="h-4 w-4 text-purple-600" />
                </div>
                Event Gallery
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {report.gallery.map((image, index) => (
                  <div
                    key={index}
                    className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300"
                  >
                    <div className="text-center">
                      <ImageIcon className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-xs text-gray-500">Image {index + 1}</p>
                      <p className="text-xs text-gray-400">{image}</p>
                    </div>
                  </div>
                ))}
              </div>
              {report.gallery.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <ImageIcon className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                  <p>No gallery images available</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Event Info Card */}
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-sm text-gray-500 mb-4">Event Information</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Event Type</p>
                  <Badge variant="outline">{report.eventType}</Badge>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Organized By</p>
                  <p className="text-sm">{report.facultyName}</p>
                  <p className="text-xs text-gray-500">{report.department}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Status</p>
                  <Badge
                    className={
                      report.status === "Approved"
                        ? "bg-green-100 text-green-800"
                        : report.status === "Submitted"
                        ? "bg-blue-100 text-blue-800"
                        : report.status === "Rejected"
                        ? "bg-red-100 text-red-800"
                        : "bg-gray-100 text-gray-800"
                    }
                  >
                    {report.status}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-sm text-gray-500 mb-4">Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Participants</span>
                  <span className="text-sm">{report.participants}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Duration</span>
                  <span className="text-sm">{report.duration}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Gallery Images</span>
                  <span className="text-sm">{report.gallery.length}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <Card>
            <CardContent className="pt-6 space-y-2">
              <Button variant="outline" className="w-full">
                Edit Report
              </Button>
              <Button variant="outline" className="w-full">
                Download Report
              </Button>
              <Button variant="outline" className="w-full">
                Share Report
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
