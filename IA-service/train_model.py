import pandas as pd
import numpy as np
import joblib
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import Pipeline

df = pd.read_csv("data/cvs_data.csv")
df['cv_complet'] = df.apply(lambda row: int(
    pd.notnull(row['specialité']) and
    pd.notnull(row['competences']) and
    pd.notnull(row['diplome']) and
    pd.notnull(row['langues'])
), axis=1)

df['nb_competences'] = df['competences'].apply(lambda x: len(str(x).split(',')))
df['nb_langues'] = df['langues'].apply(lambda x: len(str(x).split(',')))

np.random.seed(42)
df['salaire_estime'] = (
    400 * df['annees_experience'] +
    250 * df['projets_realises'] +
    100 * df['nb_competences'] +
    80 * df['nb_langues'] +
    np.random.normal(0, 1000, size=len(df)) + 20000
).clip(2000, 100000)

features = ['annees_experience', 'projets_realises', 'nb_competences', 'nb_langues', 'cv_complet']
target = 'salaire_estime'
X = df[features]
y = df[target]

pipeline = Pipeline([
    ('imputer', SimpleImputer(strategy='median')),
    ('scaler', StandardScaler()),
    ('model', LinearRegression())
])

pipeline.fit(X, y)

# 🔒 Sauvegarder le modèle
joblib.dump(pipeline, "model/pipeline.pkl")
print("✅ Modèle sauvegardé")
