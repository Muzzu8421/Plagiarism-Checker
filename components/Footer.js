'use client';
import { useTheme } from '../providers/ThemeProvider';

export default function Footer() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <footer 
      className="w-full border-t transition-colors duration-300 mt-12 sm:mt-20"
      style={{
        backgroundColor: isDark ? '#111827' : '#ffffff',
        borderColor: isDark ? '#374151' : '#e5e7eb',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-sm sm:text-base">
          <p 
            className="flex items-center gap-2"
            style={{ color: isDark ? '#9ca3af' : '#6b7280' }}
          >
            Made with
            <span className="text-red-500 animate-pulse text-lg">❤️</span>
            by
            <span 
              className="font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text"
            >
              Batch 19
            </span>
          </p>
        </div>
        
        {/* Optional: Add year */}
        <div className="text-center mt-2">
          <p 
            className="text-xs"
            style={{ color: isDark ? '#6b7280' : '#9ca3af' }}
          >
            © 2025 Plagiarism Checker. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
