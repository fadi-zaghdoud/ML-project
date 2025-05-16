# TuniHire Frontend

This directory contains the frontend application for TuniHire, built with React, TailwindCSS, and Vite.

![TuniHire Logo](./public/images/logo.png)

## 📚 Technologies

- React 19
- TailwindCSS 3.3.3
- Vite 6.3.5
- Axios 1.9.0

## 🏗️ Project Structure

```
Front/
├── public/            # Static assets
│   └── images/        # Images and profile pictures
├── src/
│   ├── components/    # React components
│   │   ├── CandidateRecommender.jsx  # Candidate evaluation component
│   │   ├── Header.jsx                # Navigation header
│   │   ├── SalaryPredictor.jsx       # Salary prediction component
│   │   └── TeamPage.jsx              # Team showcase page
│   ├── App.jsx        # Main application component
│   └── main.jsx       # Entry point
├── eslint.config.js   # ESLint configuration
├── package.json       # NPM dependencies and scripts
├── postcss.config.js  # PostCSS configuration
├── tailwind.config.js # TailwindCSS configuration
└── vite.config.js     # Vite configuration
```

## 🚀 Getting Started

### Prerequisites

- Node.js 16+
- npm

### Installation

```powershell
# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`.

### Building for Production

```powershell
# Create production build
npm run build

# Preview production build
npm run preview
```

## 📋 Components

### SalaryPredictor

The Salary Prediction component allows users to input candidate information and receive a predicted salary range:

- Experience years
- Completed projects
- Skills
- Languages
- Specialization
- Education

### CandidateRecommender

The Candidate Recommender component evaluates candidates against job requirements:

- Takes candidate profile and job offer details as inputs
- Calculates matching score
- Identifies candidate strengths and weaknesses
- Provides overall recommendation

### TeamPage

The Team Page component showcases:

- Team members information
- Project details
- Technologies used

## ⚙️ API Integration

The application is configured to communicate with the backend API at:

- Local development: `http://localhost:5000`
- Production: `https://ml-project-xfbb.onrender.com`

The frontend implements an automatic fallback between local and cloud environments.

## 🧩 How to Add a New Component

1. Create a new file in `src/components/`
2. Import and add it to `App.jsx`
3. Update the Header component if navigation is required

## 📱 Responsive Design

The UI is fully responsive using TailwindCSS utility classes:

- Mobile-first approach
- Responsive spacing and typography
- Flexible layouts with CSS Grid and Flexbox

## 📦 Dependencies

Key dependencies include:

- `axios` for HTTP requests
- `tailwindcss` for styling
- `react` and `react-dom` for UI components

---

© 2025 TuniHire | Built with ❤️ by the TuniHire Team
