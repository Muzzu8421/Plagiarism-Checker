'use client';
import { useTheme } from '../providers/ThemeProvider';

export default function Hero() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className="text-center py-12 sm:py-16 px-4 sm:px-6">
      {/* Main Heading */}
      <h2 
        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-1 sm:mb-2 leading-tight"
        style={{ color: isDark ? '#f9fafb' : '#111827' }}
      >
        Check Your Content for
      </h2>
      <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 mb-6 sm:mb-8 leading-tight">
        Plagiarism Instantly
      </h2>
      
      {/* Description */}
      <p 
        className="text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed"
        style={{ color: isDark ? '#9ca3af' : '#4b5563' }}
      >
        Upload your document and get instant plagiarism detection using advanced AI algorithms. 
        Supports{' '}
        <span 
          className="font-bold"
          style={{ color: isDark ? '#f9fafb' : '#111827' }}
        >
          PDF
        </span>
        ,{' '}
        <span 
          className="font-bold"
          style={{ color: isDark ? '#f9fafb' : '#111827' }}
        >
          DOCX
        </span>
        , and{' '}
        <span 
          className="font-bold"
          style={{ color: isDark ? '#f9fafb' : '#111827' }}
        >
          TXT
        </span>
        {' '}formats with accurate results.
      </p>
    </div>
  );
}