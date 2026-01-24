import { GraduationCap } from "lucide-react";

export function AuthBranding() {
  return (
    <div className="hidden md:flex flex-col justify-center items-start space-y-8">
      <div className="space-y-4">
        <div className="h-16 w-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center">
          <GraduationCap className="h-10 w-10 text-white" />
        </div>
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Faculty Management System
          </h1>
          <p className="text-gray-600 mt-2">
            Streamline your academic administration with our comprehensive platform
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
            <span className="text-blue-600 font-bold">✓</span>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Easy Management</h3>
            <p className="text-sm text-gray-600">Manage faculty files and reports efficiently</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
            <span className="text-purple-600 font-bold">✓</span>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Secure Access</h3>
            <p className="text-sm text-gray-600">Role-based access control and authentication</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
            <span className="text-green-600 font-bold">✓</span>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Detailed Analytics</h3>
            <p className="text-sm text-gray-600">Track submissions and monitor progress</p>
          </div>
        </div>
      </div>
    </div>
  );
}
