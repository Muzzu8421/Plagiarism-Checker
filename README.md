```markdown
# 🔍 Plagiarism Checker - Frontend

A modern, AI-powered plagiarism detection web application built with Next.js 14. Upload documents and get instant plagiarism analysis with beautiful visualizations and dark mode support.

![Plagiarism Checker](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38bdf8?style=for-the-badge&logo=tailwind-css)
![React](https://img.shields.io/badge/React-18-61dafb?style=for-the-badge&logo=react)

## ✨ Features

- 📄 **Multi-format Support** - Upload TXT, PDF, DOCX, and DOC files
- 🤖 **AI-Powered Detection** - Advanced semantic analysis using Wikipedia database
- 🎨 **Beautiful UI** - Modern, gradient-rich design with smooth animations
- 🌓 **Dark Mode** - Full dark theme support with persistent preferences
- 📊 **Visual Reports** - Animated circular progress indicators with gradients
- 📱 **Fully Responsive** - Works seamlessly on mobile, tablet, and desktop
- ⚡ **Real-time Analysis** - Instant plagiarism detection with loading animations
- 💾 **Export Reports** - Download detailed analysis as text files
- 🔗 **Share Results** - Share on Twitter, WhatsApp, LinkedIn, or copy link
- 🎯 **Source Tracking** - View all matched sources with similarity percentages

## 🚀 Tech Stack

- **Framework:** [Next.js 14](https://nextjs.org/) (App Router)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Language:** JavaScript (ES6+)
- **State Management:** React Hooks (useState, useEffect, useContext)
- **Theme:** Context API for dark mode
- **Icons:** Heroicons (SVG)

## 📦 Installation

### Prerequisites

- Node.js 18+ and npm/yarn
- Backend API running on `http://localhost:8000`

### Clone & Install

```
# Clone the repository
git clone <your-repo-url>
cd plagiarism-checker-frontend

# Install dependencies
npm install
# or
yarn install

# Run development server
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🛠️ Configuration

### Backend API

Update the API endpoint in `app/page.js`:

```
const response = await fetch('http://localhost:8000/check', {
  method: 'POST',
  body: formData,
});
```

Replace `http://localhost:8000` with your backend URL.

### Environment Variables (Optional)

Create a `.env.local` file:

```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

Then update the fetch URL:

```
const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/check`, {
  method: 'POST',
  body: formData,
});
```

## 📁 Project Structure

```
plagiarism-checker-frontend/
├── app/
│   ├── components/
│   │   ├── Header.js           # Header with dark mode toggle
│   │   ├── Hero.js             # Hero section
│   │   ├── Features.js         # Features section
│   │   ├── FileUpload.js       # File upload component
│   │   ├── ResultsDisplay.js   # Results with circular charts
│   │   └── Footer.js           # Footer with credits
│   ├── providers/
│   │   └── ThemeProvider.js    # Dark mode context
│   ├── layout.js               # Root layout
│   ├── page.js                 # Main page
│   └── globals.css             # Global styles
├── public/
│   └── favicon.ico             # Favicon
├── package.json
├── tailwind.config.js          # Tailwind configuration (if needed)
└── README.md
```

## 🎨 Components Overview

### Header
- Logo and branding
- Dark mode toggle button
- Responsive navigation
- Persistent theme storage

### Hero
- Main heading with gradient text
- Description of features
- Responsive typography

### FileUpload
- Drag & drop file upload
- File type validation
- Loading animation during analysis
- Progress bar with animations

### ResultsDisplay
- **Circular Progress Charts** - Animated percentage indicators with gradients
- **Tabbed Interface** - Overview, Matches, Document tabs
- **Source Detection** - Detailed list of plagiarized sources
- **Export Options** - Download report as TXT
- **Share Functionality** - Social media sharing

### Footer
- Simple credits: "Made with ❤️ by Batch 19"
- Animated heart icon
- Responsive layout

## 🌓 Dark Mode

The app includes a fully functional dark mode:

- Toggle via sun/moon button in header
- Saves preference to localStorage
- Smooth color transitions
- All components themed
- No flash on page load

### How It Works

```
// ThemeProvider context
<ThemeProvider>
  <App />
</ThemeProvider>

// Use in components
const { theme, toggleTheme } = useTheme();
const isDark = theme === 'dark';
```

## 📊 API Integration

### Request Format

```
POST /check
Content-Type: multipart/form-data

Body:
- file: <uploaded file>
```

### Expected Response

```
{
  "plagiarismScore": 25,
  "originalityScore": 75,
  "text": "Full document text...",
  "matches": [
    {
      "matchedText": "This text matches a source",
      "similarity": 85,
      "source": "https://en.wikipedia.org/wiki/Example"
    }
  ]
}
```

## 🎯 Usage

1. **Upload Document**
   - Click "Choose File" or drag & drop
   - Supports: TXT, PDF, DOCX, DOC

2. **Analyze**
   - Click "Analyze for Plagiarism"
   - Wait for AI analysis (10-30 seconds)

3. **View Results**
   - See plagiarism and originality scores
   - Check matched sources
   - View document preview

4. **Export/Share**
   - Download detailed report
   - Share on social media
   - Copy shareable link

## 🎨 Customization

### Change Colors

Update gradient colors in components:

```
// Blue to Purple (current)
className="bg-gradient-to-r from-blue-600 to-purple-600"

// Custom gradient
className="bg-gradient-to-r from-emerald-600 to-teal-600"
```

### Modify Animations

Adjust animation durations:

```
// Loading animation speed
<div className="animate-spin"></div>

// Custom duration
<div className="transition-all duration-500"></div>
```

## 🏗️ Build for Production

```
# Build
npm run build

# Start production server
npm start
```

### Deploy Options

- **Vercel** (Recommended for Next.js)
  ```
  vercel deploy
  ```

- **Netlify**
  ```
  netlify deploy --prod
  ```

- **Docker**
  ```
  FROM node:18-alpine
  WORKDIR /app
  COPY package*.json ./
  RUN npm install
  COPY . .
  RUN npm run build
  CMD ["npm", "start"]
  EXPOSE 3000
  ```

## 🐛 Troubleshooting

### Dark mode not working
- Clear browser cache and localStorage
- Check if `ThemeProvider` wraps the app in `layout.js`
- Restart development server

### File upload fails
- Verify backend is running on correct port
- Check CORS settings on backend
- Ensure file size is within limits

### Circular progress not animating
- Check if `useEffect` is running
- Verify score values are numbers
- Clear browser cache

## 📝 License

This project is created by **Batch 19** with ❤️

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📧 Support

For issues or questions, please open an issue on GitHub.

---

**Made with ❤️ by Batch 19**
```

***

## **Additional Files to Create:**

### **.gitignore**
```
# dependencies
/node_modules
/.pnp
.pnp.js

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# local env files
.env*.local

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts
```

### **LICENSE** (MIT)
```
MIT License

Copyright (c) 2025 Batch 19

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

***

**Your frontend documentation is complete!** 📚✨

This README includes everything needed to understand, install, configure, and deploy your plagiarism checker! 🚀