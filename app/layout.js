import { ThemeProvider } from '@/providers/ThemeProvider';
import './globals.css';

export const metadata = {
  title: 'Plagiarism Checker',
  description: 'AI-Powered Plagiarism Detection',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}