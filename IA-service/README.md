# TuniHire Backend (IA-service)

This directory contains the backend Flask application for TuniHire, including the machine learning models for salary prediction and candidate evaluation.

## 📚 Technologies

- Flask 2.2.3
- Python 3.8+
- scikit-learn 1.3.2
- NLTK 3.8.1
- pandas 1.5.3
- numpy 1.24.3

## 🏗️ Project Structure

```
IA-service/
├── app.py                # Main Flask application with API endpoints
├── requirements.txt      # Python dependencies
├── train_model.py        # Script to train salary prediction model
├── train_candidate_model.py  # Script to train candidate evaluation model
├── data/                 # Training data
│   └── cvs_data.csv      # Dataset for model training
├── model/                # Trained ML models
│   ├── pipeline.pkl             # Salary prediction model
│   ├── candidate_model.pkl      # Candidate evaluation model
│   ├── candidate_vectorizer.pkl # Text vectorizer for NLP
│   └── candidate_scaler.pkl     # Data scaling for numerical features
└── nltk_data/            # NLTK resources for text processing
```

## 🚀 Getting Started

### Prerequisites

- Python 3.8+
- pip

### Installation

```powershell
# Create and activate virtual environment (optional but recommended)
python -m venv venv
.\venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Start Flask server
python app.py
```

The API server will be available at `http://localhost:5000`.

## 📋 API Endpoints

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

## ⚙️ Machine Learning Models

### Salary Prediction Model

The salary prediction model uses the following features:
- Years of experience
- Number of completed projects
- Number of skills
- Number of languages
- Completeness of profile

The model is trained using regression techniques and saved as a pipeline to ensure consistent preprocessing.

### Candidate Evaluation Algorithm

The candidate evaluation algorithm:
1. Compares candidate experience with job requirements (30% of score)
2. Evaluates projects completed against requirements (20% of score) 
3. Performs skills matching between candidate and job (50% of score)
4. Calculates a final score between 0-100
5. Recommends candidates with scores >= 50

## 🛠️ Development

### Training Models

To retrain models with updated data:

```powershell
# Train salary prediction model
python train_model.py

# Train candidate evaluation model
python train_candidate_model.py
```

### CORS Configuration

The API includes Cross-Origin Resource Sharing (CORS) support to allow requests from the frontend application.

### Deployment

The API is configured to run on port 5000 by default and can be deployed to cloud services like Render.com:

```python
# Bottom of app.py
if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=True)
```

---

© 2025 TuniHire | Built with ❤️ by the TuniHire Team
