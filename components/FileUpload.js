'use client';
import { useState } from 'react';
import { useTheme } from '../providers/ThemeProvider';

export default function FileUpload({ onFileUpload, loading }) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleSubmit = async () => {
    if (file) {
      await onFileUpload(file);
    }
  };

  return (
    <div className="mt-8 sm:mt-12 px-2 sm:px-0">
      {loading ? (
        // Loading Animation
        <div 
          className="rounded-2xl sm:rounded-3xl shadow-2xl p-8 sm:p-12 text-center border-4 transition-all duration-300"
          style={{
            backgroundColor: isDark ? '#1f2937' : '#ffffff',
            borderColor: isDark ? '#3b82f6' : '#dbeafe',
          }}
        >
          <div className="mb-6 sm:mb-8">
            <div className="relative w-24 h-24 sm:w-32 sm:h-32 mx-auto">
              {/* Animated Circles */}
              <div className="absolute inset-0 rounded-full border-8 border-blue-200 dark:border-blue-800 animate-ping"></div>
              <div className="absolute inset-0 rounded-full border-8 border-t-blue-600 border-r-purple-600 border-b-blue-400 border-l-purple-400 animate-spin"></div>
              <div className="absolute inset-4 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <svg className="w-10 h-10 sm:w-12 sm:h-12 text-white animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
          
          <h3 
            className="text-2xl sm:text-3xl font-bold mb-4 animate-pulse"
            style={{ color: isDark ? '#f9fafb' : '#111827' }}
          >
            Analyzing Your Document...
          </h3>
          <p 
            className="text-base sm:text-lg mb-4 sm:mb-6"
            style={{ color: isDark ? '#9ca3af' : '#4b5563' }}
          >
            🔍 Searching Wikipedia database
          </p>
          <p 
            className="text-sm"
            style={{ color: isDark ? '#6b7280' : '#9ca3af' }}
          >
            🤖 Using AI-powered semantic analysis
          </p>
          
          {/* Progress Bar */}
          <div className="mt-6 sm:mt-8 max-w-md mx-auto">
            <div 
              className="w-full rounded-full h-3 overflow-hidden"
              style={{ backgroundColor: isDark ? '#374151' : '#e5e7eb' }}
            >
              <div className="h-full bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 animate-progress"></div>
            </div>
          </div>
          
          <p 
            className="text-xs mt-4"
            style={{ color: isDark ? '#6b7280' : '#9ca3af' }}
          >
            This may take 10-30 seconds...
          </p>
        </div>
      ) : (
        // File Upload UI
        <div
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          className={`rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-12 text-center border-4 border-dashed transition-all duration-300 ${
            isDragging ? 'scale-105' : 'hover:scale-[1.02]'
          }`}
          style={{
            backgroundColor: isDragging 
              ? (isDark ? '#1e3a8a' : '#dbeafe')
              : (isDark ? '#1f2937' : '#ffffff'),
            borderColor: isDragging 
              ? '#3b82f6'
              : (isDark ? '#374151' : '#d1d5db'),
          }}
        >
          <div className="mb-6 sm:mb-8">
            <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-4 shadow-lg">
              <svg className="w-10 h-10 sm:w-12 sm:h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
            <h3 
              className="text-2xl sm:text-3xl font-bold mb-2"
              style={{ color: isDark ? '#f9fafb' : '#111827' }}
            >
              Upload Your Document
            </h3>
            <p 
              className="text-sm sm:text-base"
              style={{ color: isDark ? '#9ca3af' : '#4b5563' }}
            >
              Drop your file here or click to browse
            </p>
          </div>

          <input
            type="file"
            id="file-upload"
            accept=".txt,.pdf,.docx,.doc"
            onChange={handleFileChange}
            className="hidden"
          />

          <label
            htmlFor="file-upload"
            className="inline-block px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl hover:from-blue-700 hover:to-purple-700 cursor-pointer transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Choose File
          </label>

          {file && (
            <div 
              className="mt-6 p-4 rounded-xl border-2 transition-colors"
              style={{
                backgroundColor: isDark ? '#1e3a8a' : '#dbeafe',
                borderColor: isDark ? '#3b82f6' : '#93c5fd',
              }}
            >
              <div className="flex items-center justify-center gap-3">
                <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <div className="text-left">
                  <p 
                    className="font-semibold text-sm sm:text-base"
                    style={{ color: isDark ? '#f9fafb' : '#111827' }}
                  >
                    {file.name}
                  </p>
                  <p 
                    className="text-xs sm:text-sm"
                    style={{ color: isDark ? '#9ca3af' : '#4b5563' }}
                  >
                    {(file.size / 1024).toFixed(2)} KB
                  </p>
                </div>
              </div>
            </div>
          )}

          {file && (
            <button
              onClick={handleSubmit}
              className="mt-6 px-8 sm:px-12 py-3 sm:py-4 text-sm sm:text-base bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center gap-3 mx-auto"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Analyze for Plagiarism
            </button>
          )}

          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm">
            <div 
              className="flex items-center gap-2"
              style={{ color: isDark ? '#9ca3af' : '#6b7280' }}
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Supports TXT, PDF, DOCX</span>
            </div>
            <div 
              className="flex items-center gap-2"
              style={{ color: isDark ? '#9ca3af' : '#6b7280' }}
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>AI-Powered Analysis</span>
            </div>
          </div>
        </div>
      )}
      
      <style jsx>{`
        @keyframes progress {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(400%); }
        }
        .animate-progress {
          animation: progress 1.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}