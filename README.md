# TuniHire - AI-Powered Recruitment Platform

TuniHire is an intelligent recruitment platform that leverages machine learning to streamline the hiring process. This application helps match job candidates with positions based on their skills and experience, while providing valuable insights like salary prediction.

![TuniHire Logo](/Front/public/images/logo.png)

## 🚀 Features

- **Salary Prediction**: Predict competitive salary ranges based on candidate experience, skills, education, and other factors
- **Candidate Evaluation**: Assess candidate suitability for specific positions with an intelligent matching algorithm
- **Team Showcase**: Meet the talented team behind this innovative project
- **Responsive UI**: A modern, responsive interface built with TailwindCSS
- **Automatic API Fallback**: Smart handling between local development and cloud-deployed environments

## 🛠️ Technologies Used

### Frontend
- React 19
- TailwindCSS 3.3
- Axios
- Vite 6

### Backend
- Flask 2.2.3
- Python 3.8+
- Machine Learning Libraries:
  - scikit-learn 1.3.2
  - NLTK 3.8.1
  - pandas 1.5.3
  - numpy 1.24.3

## 🏗️ Project Structure

```
ML-project/
├── Front/                 # Frontend React application
│   ├── public/            # Static assets
│   │   └── images/        # Images and profile pictures
│   └── src/               # React source code
│       ├── components/    # React components
│       │   ├── CandidateRecommender.jsx
│       │   ├── Header.jsx
│       │   ├── SalaryPredictor.jsx
│       │   └── TeamPage.jsx
│       └── App.jsx        # Main application component
└── IA-service/            # Flask backend service
    ├── app.py             # Main Flask application
    ├── model/             # Trained ML models
    │   ├── pipeline.pkl              # Salary prediction model
    │   ├── candidate_model.pkl       # Candidate evaluation model
    │   ├── candidate_vectorizer.pkl  # Text vectorizer
    │   └── candidate_scaler.pkl      # Data scaler
    ├── data/              # Training data
    └── nltk_data/         # NLP resources
```

## 📋 Features in Detail

### 1. Salary Prediction
The salary predictor takes into account:
- Years of experience
- Number of completed projects
- Skills
- Languages
- Education
- Specialization

Using this data, our ML model predicts an appropriate salary range for the candidate.

### 2. Candidate Evaluation
The candidate evaluator matches candidate profiles against job requirements by analyzing:
- Experience level (30% of scoring)
- Projects completed (20% of scoring)
- Skills matching (50% of scoring)
- Specialization relevance

The system provides:
- Matching score (0-100%)
- Strengths analysis (points_forts)
- Weaknesses identification (points_faibles)
- Final recommendation (recommende)

## 👥 Team

- **Fadi Zaghdoud** - Full Stack Developer (ESPRIT Software Engineering student)
- **Khairi Hleli** - Full Stack Developer (ESPRIT Software Engineering student)
- **Haythem Raggad** - Full Stack Developer (ESPRIT Software Engineering student)
- **Nihed Abdennour** - Full Stack Developer (ESPRIT Software Engineering student)
- **Maram Naderi** - Full Stack Developer (ESPRIT Software Engineering student)

## 🚀 Getting Started

### Prerequisites
- Node.js (v16+)
- Python (v3.8+)
- pip

### Installation

#### Frontend
```powershell
# Navigate to frontend directory
cd .\ML-project\Front\

# Install dependencies
npm install

# Start development server
npm run dev
```

#### Backend
```powershell
# Navigate to backend directory
cd .\ML-project\IA-service\

# Create and activate virtual environment (optional but recommended)
python -m venv venv
.\venv\Scripts\activate  # On Windows

# Install dependencies
pip install -r requirements.txt

# Start Flask server
python app.py
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

## 🌐 Deployment

The application is deployed at:
- Frontend: [TuniHire Frontend](https://tunihire.netlify.app) (placeholder URL)
- Backend API: https://ml-project-xfbb.onrender.com

## 🔄 API Endpoints

### Salary Prediction
```
POST /predict
```
Predicts salary based on candidate information.

**Request Body:**
```json
{
  "annees_experience": 3,
  "projets_realises": 4,
  "competences": "javascript,react,python",
  "langues": "french,english",
  "specialité": "web development",
  "diplome": "bachelor"
}
```

**Response:**
```json
{
  "salaire_pred": 65000
}
```

### Candidate Evaluation
```
POST /evaluate_candidate
```
Evaluates a candidate against job requirements.

**Request Body:**
```json
{
  "candidat": {
    "annees_experience": 2,
    "projets_realises": 3,
    "competences": "python flask react"
  },
  "offre": {
    "annees_experience": 3,
    "projets_realises": 4,
    "competences": "python django react"
  }
}
```

**Response:**
```json
{
  "points_forts": "Compétences",
  "points_faibles": "Expérience, Projets réalisés",
  "score": 68.5,
  "recommende": true
}
```

## 📄 License

This project is licensed under the MIT License - see the LICENSE.md file for details.

## 🔍 Technical Implementation Highlights

### Frontend
- Smart URL handling with automatic fallback between localhost and cloud deployment
- Responsive design with TailwindCSS
- Component-based architecture with React
- Clean separation of concerns between UI components

### Backend
- RESTful API design with Flask
- Machine learning integration
- CORS configuration for cross-origin requests
- Error handling with try/except blocks

### Machine Learning
- Trained models for salary prediction
- Candidate-job matching algorithm
- Score calculation based on multiple factors:
  - Experience (30%)
  - Projects completed (20%)
  - Skills matching (50%)

---

© 2025 TuniHire | Built with ❤️ by the TuniHire Team
