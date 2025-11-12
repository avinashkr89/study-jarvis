# StudyJARVIS - AI Video Study Assistant

## Overview
StudyJARVIS is an AI-powered study assistant that helps students generate study materials from various sources. The app uses Google's Gemini AI to create summaries, quizzes, flashcards, key terms, and mnemonics from text, videos, and other study materials.

## Project Architecture

### Tech Stack
- **Frontend Framework**: React 18.2.0 with TypeScript
- **Build Tool**: Vite 6.2.0
- **AI Service**: Google Gemini AI (@google/genai)
- **UI Features**: File upload (react-dropzone), dark mode support
- **Styling**: Inline styles with theme support

### Project Structure
- `/components/` - Reusable UI components (FileUpload, Navbar, Header, Footer, etc.)
  - `/icons/` - SVG icon components
- `/pages/` - Main application pages (Landing, Dashboard, Generator, Admin, etc.)
- `/services/` - External service integrations (geminiService.ts)
- `/utils/` - Utility functions (YouTube helpers, etc.)
- `/hooks/` - Custom React hooks (useLocalStorage)

### Key Features
1. **Study Pack Generation**: Generate comprehensive study materials
2. **Multiple Input Methods**: Support for text, files, and YouTube URLs
3. **AI-Powered Content**: Summaries, quizzes, flashcards, key terms, mnemonics
4. **User Authentication**: Login/signup functionality
5. **Credit System**: Payment integration for premium features
6. **Admin Panel**: User and content management
7. **Dark Mode**: Theme switching support

## Configuration

### Environment Variables
- `GEMINI_API_KEY`: Required - Google Gemini API key for AI functionality

### Development Server
- **Port**: 5000
- **Host**: 0.0.0.0 (configured for Replit proxy)
- **HMR**: Configured for Replit's secure proxy (clientPort: 443)

### Deployment
- **Target**: Autoscale (stateless web app)
- **Build**: `npm run build`
- **Run**: Vite preview server on port 5000

## Recent Changes
- **2025-11-12**: Initial Replit setup and migration
  - Migrated from browser-based module loading (importmap + Babel) to Vite bundling
  - Created proper `index.tsx` entry point for Vite
  - Configured Vite to use port 5000 for Replit compatibility
  - Added `allowedHosts: true` to Vite config for Replit proxy support
  - Added HMR client port configuration for Replit proxy (clientPort: 443)
  - Installed React TypeScript definitions (@types/react, @types/react-dom)
  - Set up workflow for development server
  - Configured deployment settings for autoscale deployment
  - Added GEMINI_API_KEY secret management

## Development

### Running Locally
```bash
npm install
npm run dev
```

### Building for Production
```bash
npm run build
npm run preview
```

## Notes
- The app is frontend-only with no backend server
- All AI processing is done through Google's Gemini API
- Project was originally built for AI Studio deployment
- Configured for Replit's proxy environment with proper host settings
