'use client';
import { useState } from 'react';
import { useTheme } from '@/providers/ThemeProvider';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import FileUpload from '@/components/FileUpload';
import ResultsDisplay from '@/components/ResultsDisplay';
import Footer from '@/components/Footer';

export default function Home() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 🔥 UPDATE THIS LINE WITH YOUR HUGGING FACE URL
  const API_URL = 'https://Azar8421-plagiarism-checker.hf.space';

  const handleFileUpload = async (file) => {
    setLoading(true);
    setError(null);
    
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch(`${API_URL}/check`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to check plagiarism');
      }

      const data = await response.json();
      setResults(data);
    } catch (err) {
      setError(err.message);
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setResults(null);
    setError(null);
  };

  return (
    <div 
      className="min-h-screen transition-colors duration-300"
      style={{
        background: isDark 
          ? 'linear-gradient(to bottom right, #111827, #1f2937, #111827)'
          : 'linear-gradient(to bottom right, #eff6ff, #ffffff, #faf5ff)'
      }}
    >
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {!results ? (
          <div className="max-w-4xl mx-auto">
            <Hero />
            <FileUpload onFileUpload={handleFileUpload} loading={loading} />
            
            {error && (
              <div 
                className="mt-6 border-2 rounded-xl p-4 transition-colors"
                style={{
                  backgroundColor: isDark ? 'rgba(239, 68, 68, 0.1)' : '#fef2f2',
                  borderColor: isDark ? '#991b1b' : '#fecaca',
                }}
              >
                <div className="flex items-center gap-3">
                  <svg className="w-6 h-6 text-red-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p style={{ color: isDark ? '#fca5a5' : '#991b1b' }} className="font-medium">{error}</p>
                </div>
              </div>
            )}
          </div>
        ) : (
          <ResultsDisplay results={results} onReset={handleReset} />
        )}
      </main>

      <Footer />
    </div>
  );
}
