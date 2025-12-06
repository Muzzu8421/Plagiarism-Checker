'use client';
import { useState, useEffect } from 'react';
import { useTheme } from '../providers/ThemeProvider';

export default function ResultsDisplay({ results, onReset }) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [activeTab, setActiveTab] = useState('overview');
  const [shareMenuOpen, setShareMenuOpen] = useState(false);
  const [animatedScores, setAnimatedScores] = useState({ plagiarism: 0, originality: 0 });

  const { plagiarismScore = 0, originalityScore = 0, matches = [], text = '' } = results || {};

  // Animate scores on mount
  useEffect(() => {
    const duration = 1500;
    const steps = 60;
    const increment = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      setAnimatedScores({
        plagiarism: Math.round(plagiarismScore * progress),
        originality: Math.round(originalityScore * progress),
      });

      if (step >= steps) clearInterval(timer);
    }, increment);

    return () => clearInterval(timer);
  }, [plagiarismScore, originalityScore]);

  const getStatusMessage = (score) => {
    if (score < 10) return { text: 'Excellent! Very low plagiarism detected', emoji: '🎉', color: '#10b981', bgLight: '#d1fae5', bgDark: '#064e3b' };
    if (score < 30) return { text: 'Good. Minor plagiarism detected', emoji: '✅', color: '#f59e0b', bgLight: '#fef3c7', bgDark: '#78350f' };
    if (score < 50) return { text: 'Moderate plagiarism detected', emoji: '⚠️', color: '#f97316', bgLight: '#ffedd5', bgDark: '#7c2d12' };
    return { text: 'High plagiarism detected. Review required', emoji: '❌', color: '#ef4444', bgLight: '#fee2e2', bgDark: '#7f1d1d' };
  };

  const status = getStatusMessage(plagiarismScore);

  // Download Function
  const handleDownloadPDF = () => {
    const reportContent = `
PLAGIARISM REPORT
=================
Generated: ${new Date().toLocaleString()}

SUMMARY
-------
Plagiarism Score: ${plagiarismScore}%
Originality Score: ${originalityScore}%
Sources Found: ${matches.length}
Total Words: ${text.split(' ').length}

MATCHES FOUND
-------------
${matches.map((match, idx) => `
${idx + 1}. Match: ${match.similarity}%
   Text: ${match.matchedText}
   Source: ${match.source}
`).join('\n')}

DOCUMENT TEXT
-------------
${text}
    `.trim();

    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `plagiarism-report-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Share Functions
  const handleShare = (platform) => {
    const shareText = `I just checked my document for plagiarism! Originality Score: ${originalityScore}% 📝`;
    const shareUrl = window.location.href;

    const shareLinks = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`,
      email: `mailto:?subject=Plagiarism Report&body=${encodeURIComponent(shareText + '\n\n' + shareUrl)}`
    };

    if (platform === 'copy') {
      navigator.clipboard.writeText(shareUrl);
      alert('Link copied to clipboard!');
    } else {
      window.open(shareLinks[platform], '_blank');
    }
    
    setShareMenuOpen(false);
  };

  // Enhanced Circular Progress
  const CircularProgress = ({ percentage, animatedPercentage, label, sublabel, gradientColors }) => {
    const radius = 70;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (animatedPercentage / 100) * circumference;

    return (
      <div className="flex flex-col items-center">
        <p 
          className="text-sm font-semibold mb-4"
          style={{ color: isDark ? '#9ca3af' : '#6b7280' }}
        >
          {label}
        </p>
        <div className="relative w-44 h-44 sm:w-52 sm:h-52">
          {/* Glow effect */}
          <div 
            className="absolute inset-0 rounded-full blur-2xl opacity-30"
            style={{
              background: `linear-gradient(135deg, ${gradientColors[0]}, ${gradientColors[1]})`
            }}
          />
          
          {/* SVG Circle */}
          <svg className="transform -rotate-90 w-full h-full relative z-10">
            {/* Background circle */}
            <circle 
              cx="50%" 
              cy="50%" 
              r={radius}
              stroke={isDark ? '#374151' : '#e5e7eb'}
              strokeWidth="12" 
              fill="none" 
            />
            
            {/* Gradient definition */}
            <defs>
              <linearGradient id={`gradient-${label}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={gradientColors[0]} />
                <stop offset="100%" stopColor={gradientColors[1]} />
              </linearGradient>
            </defs>
            
            {/* Progress circle */}
            <circle
              cx="50%" 
              cy="50%" 
              r={radius}
              stroke={`url(#gradient-${label})`}
              strokeWidth="12" 
              fill="none" 
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              style={{ 
                transition: 'stroke-dashoffset 1.5s cubic-bezier(0.4, 0, 0.2, 1)',
                filter: 'drop-shadow(0 0 8px rgba(99, 102, 241, 0.5))'
              }}
            />
          </svg>
          
          {/* Center content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span 
              className="text-5xl sm:text-6xl font-bold"
              style={{ 
                background: `linear-gradient(135deg, ${gradientColors[0]}, ${gradientColors[1]})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              {animatedPercentage}%
            </span>
            <span 
              className="text-xs mt-2 font-medium"
              style={{ color: isDark ? '#6b7280' : '#9ca3af' }}
            >
              {sublabel}
            </span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6 px-2 sm:px-0 animate-fadeIn">
      {/* Header */}
      <div 
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-2xl p-6 shadow-xl border-2 transition-all duration-300"
        style={{
          backgroundColor: isDark ? '#1f2937' : '#ffffff',
          borderColor: isDark ? '#374151' : '#e5e7eb',
        }}
      >
        <div className="w-full sm:w-auto">
          <h2 
            className="text-3xl font-bold mb-2"
            style={{ color: isDark ? '#f9fafb' : '#111827' }}
          >
            📊 Plagiarism Report
          </h2>
          <p 
            className="text-sm flex items-center gap-2"
            style={{ color: isDark ? '#9ca3af' : '#6b7280' }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}
          </p>
        </div>
        <button 
          onClick={onReset}
          className="w-full cursor-pointer sm:w-auto px-6 py-3 text-sm font-semibold rounded-xl border-2 transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          style={{
            backgroundColor: isDark ? '#374151' : '#ffffff',
            borderColor: isDark ? '#4b5563' : '#d1d5db',
            color: isDark ? '#f9fafb' : '#374151',
          }}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Check Another
        </button>
      </div>

      {/* Status Banner */}
      <div 
        className="rounded-2xl p-6 flex items-center gap-4 shadow-lg border-2 transition-all duration-300"
        style={{
          backgroundColor: isDark ? status.bgDark : status.bgLight,
          borderColor: status.color,
        }}
      >
        <span className="text-4xl">{status.emoji}</span>
        <div className="flex-1">
          <p 
            className="text-lg font-bold"
            style={{ color: status.color }}
          >
            {status.text}
          </p>
          <p 
            className="text-sm mt-1"
            style={{ color: isDark ? '#9ca3af' : '#6b7280' }}
          >
            {matches.length} source(s) found
          </p>
        </div>
      </div>

      {/* Score Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Plagiarism Card */}
        <div 
          className="rounded-2xl shadow-2xl p-8 transition-all duration-300 hover:scale-105 border-2"
          style={{
            backgroundColor: isDark ? '#1f2937' : '#ffffff',
            borderColor: isDark ? '#374151' : '#e5e7eb',
          }}
        >
          <CircularProgress 
            percentage={plagiarismScore} 
            animatedPercentage={animatedScores.plagiarism}
            label="Plagiarism Detected" 
            sublabel="Similarity"
            gradientColors={['#ef4444', '#f97316']}
          />
          <div 
            className="mt-8 pt-6 border-t"
            style={{ borderColor: isDark ? '#374151' : '#e5e7eb' }}
          >
            <div className="flex items-center justify-between text-sm">
              <span style={{ color: isDark ? '#9ca3af' : '#6b7280' }}>Matched Content:</span>
              <span 
                className="font-bold text-lg"
                style={{ color: isDark ? '#f9fafb' : '#111827' }}
              >
                {matches.length} sources
              </span>
            </div>
          </div>
        </div>

        {/* Originality Card */}
        <div 
          className="rounded-2xl shadow-2xl p-8 transition-all duration-300 hover:scale-105 border-2"
          style={{
            backgroundColor: isDark ? '#1f2937' : '#ffffff',
            borderColor: isDark ? '#374151' : '#e5e7eb',
          }}
        >
          <CircularProgress 
            percentage={originalityScore}
            animatedPercentage={animatedScores.originality}
            label="Original Content" 
            sublabel="Unique"
            gradientColors={['#10b981', '#3b82f6']}
          />
          <div 
            className="mt-8 pt-6 border-t"
            style={{ borderColor: isDark ? '#374151' : '#e5e7eb' }}
          >
            <div className="flex items-center justify-between text-sm">
              <span style={{ color: isDark ? '#9ca3af' : '#6b7280' }}>Unique Words:</span>
              <span 
                className="font-bold text-lg"
                style={{ color: isDark ? '#f9fafb' : '#111827' }}
              >
                {text ? text.split(' ').length : 0}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div 
        className="rounded-2xl shadow-xl border-2 overflow-hidden transition-colors duration-300"
        style={{
          backgroundColor: isDark ? '#1f2937' : '#ffffff',
          borderColor: isDark ? '#374151' : '#e5e7eb',
        }}
      >
        <div 
          className="border-b overflow-x-auto"
          style={{
            backgroundColor: isDark ? '#111827' : '#f9fafb',
            borderColor: isDark ? '#374151' : '#e5e7eb',
          }}
        >
          <div className="flex min-w-max">
            {['overview', 'matches', 'document'].map((tab) => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 px-6 py-4 font-semibold text-base transition-all duration-200 whitespace-nowrap relative ${
                  activeTab === tab ? 'border-b-4 border-blue-600' : ''
                }`}
                style={{
                  color: activeTab === tab 
                    ? '#3b82f6'
                    : (isDark ? '#9ca3af' : '#6b7280'),
                  backgroundColor: activeTab === tab 
                    ? (isDark ? '#1f2937' : '#ffffff')
                    : 'transparent',
                }}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                {tab === 'matches' && matches.length > 0 && (
                  <span className="ml-2 px-2 py-0.5 bg-red-500 text-white text-xs rounded-full">
                    {matches.length}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="p-8">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <h3 
                className="text-2xl font-bold mb-6"
                style={{ color: isDark ? '#f9fafb' : '#111827' }}
              >
                📈 Analysis Summary
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { value: plagiarismScore, label: 'Plagiarized', gradient: 'from-red-500 to-orange-500', icon: '⚠️' },
                  { value: originalityScore, label: 'Original', gradient: 'from-green-500 to-emerald-500', icon: '✅' },
                  { value: matches.length, label: 'Sources Found', gradient: 'from-purple-500 to-pink-500', icon: '🔍' }
                ].map((item, idx) => (
                  <div 
                    key={idx}
                    className={`rounded-xl p-6 border-2 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105`}
                    style={{
                      backgroundColor: isDark ? '#111827' : '#ffffff',
                      borderColor: isDark ? '#374151' : '#e5e7eb',
                    }}
                  >
                    <div className="text-3xl mb-2">{item.icon}</div>
                    <div className={`text-4xl font-bold mb-2 bg-gradient-to-r ${item.gradient} text-transparent bg-clip-text`}>
                      {item.value}{idx < 2 ? '%' : ''}
                    </div>
                    <div 
                      className="text-sm font-medium"
                      style={{ color: isDark ? '#9ca3af' : '#6b7280' }}
                    >
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'matches' && (
            <div className="space-y-4">
              <h3 
                className="text-2xl font-bold mb-4"
                style={{ color: isDark ? '#f9fafb' : '#111827' }}
              >
                🔗 Matching Sources ({matches.length})
              </h3>
              {matches.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🎉</div>
                  <p 
                    className="text-xl font-bold mb-2"
                    style={{ color: isDark ? '#f9fafb' : '#111827' }}
                  >
                    No Plagiarism Detected!
                  </p>
                  <p style={{ color: isDark ? '#9ca3af' : '#6b7280' }}>
                    Your document appears to be 100% original
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {matches.map((match, index) => (
                    <div 
                      key={index}
                      className="border-l-4 border-red-500 rounded-r-xl p-6 shadow-lg transition-all duration-300 hover:shadow-xl"
                      style={{
                        backgroundColor: isDark ? '#1f2937' : '#fee2e2',
                      }}
                    >
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-3">
                        <span className="px-4 py-2 bg-gradient-to-r from-red-600 to-orange-600 text-white text-sm font-bold rounded-lg shadow-md">
                          {match.similarity}% Match
                        </span>
                        <span 
                          className="text-sm font-medium"
                          style={{ color: isDark ? '#9ca3af' : '#6b7280' }}
                        >
                          Source #{index + 1}
                        </span>
                      </div>
                      <div 
                        className="rounded-lg p-4 border-2 mb-3"
                        style={{
                          backgroundColor: isDark ? '#111827' : '#ffffff',
                          borderColor: isDark ? '#374151' : '#fecaca',
                        }}
                      >
                        <p 
                          className="text-base font-medium break-words"
                          style={{ color: isDark ? '#f9fafb' : '#111827' }}
                        >
                          {match.matchedText}
                        </p>
                      </div>
                      {match.source && (
                        <a 
                          href={match.source} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-sm text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-2 hover:underline"
                        >
                          View Original Source
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'document' && (
            <div className="space-y-4">
              <h3 
                className="text-2xl font-bold mb-4"
                style={{ color: isDark ? '#f9fafb' : '#111827' }}
              >
                📄 Document Preview
              </h3>
              <div 
                className="rounded-xl p-8 border-2 max-h-[600px] overflow-y-auto"
                style={{
                  backgroundColor: isDark ? '#111827' : '#f9fafb',
                  borderColor: isDark ? '#374151' : '#e5e7eb',
                }}
              >
                <p 
                  className="text-base whitespace-pre-wrap leading-relaxed break-words font-mono"
                  style={{ color: isDark ? '#d1d5db' : '#374151' }}
                >
                  {text || "No document text available"}
                </p>
              </div>
              <p 
                className="text-sm flex items-center gap-4"
                style={{ color: isDark ? '#9ca3af' : '#6b7280' }}
              >
                <span>📝 Words: {text ? text.split(' ').length : 0}</span>
                <span>•</span>
                <span>🔤 Characters: {text ? text.length : 0}</span>
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Export Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button 
          onClick={handleDownloadPDF}
          className="px-8 cursor-pointer py-4 font-bold rounded-xl transition-all duration-200 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform hover:-translate-y-1 border-2"
          style={{
            backgroundColor: isDark ? '#374151' : '#ffffff',
            borderColor: isDark ? '#4b5563' : '#d1d5db',
            color: isDark ? '#f9fafb' : '#374151',
          }}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Download Report
        </button>
        
        <div className="relative">
          <button 
            onClick={() => setShareMenuOpen(!shareMenuOpen)}
            className="w-full cursor-pointer px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
            Share Report
          </button>
          
          {shareMenuOpen && (
            <div 
              className="absolute bottom-full mb-2 left-0 right-0 sm:left-auto sm:right-0 sm:w-64 rounded-xl shadow-2xl border-2 p-3 z-50"
              style={{
                backgroundColor: isDark ? '#1f2937' : '#ffffff',
                borderColor: isDark ? '#374151' : '#e5e7eb',
              }}
            >
              <div className="space-y-2">
                {[
                  { name: 'Twitter', icon: 'M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z', color: '#1DA1F2', action: 'twitter' },
                  { name: 'WhatsApp', icon: 'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z', color: '#25D366', action: 'whatsapp' },
                  { name: 'Copy Link', icon: 'M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z', color: '#6b7280', action: 'copy', stroke: true }
                ].map((item) => (
                  <button 
                    key={item.action}
                    onClick={() => handleShare(item.action)}
                    className="w-full px-4 py-2 text-left rounded-lg flex items-center gap-3 transition-colors"
                    style={{
                      backgroundColor: 'transparent',
                      color: isDark ? '#f9fafb' : '#111827',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = isDark ? '#374151' : '#f3f4f6'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    <svg className="w-5 h-5" fill={item.stroke ? "none" : "currentColor"} stroke={item.stroke ? "currentColor" : "none"} viewBox="0 0 24 24" style={{ color: item.color }}>
                      <path strokeLinecap={item.stroke ? "round" : undefined} strokeLinejoin={item.stroke ? "round" : undefined} strokeWidth={item.stroke ? 2 : undefined} d={item.icon} />
                    </svg>
                    <span className="text-sm font-medium">{item.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }
      `}</style>
    </div>
  );
}