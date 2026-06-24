# AI-Based Rock Classification System

![Python](https://img.shields.io/badge/Python-3.10-blue) ![TensorFlow](https://img.shields.io/badge/TensorFlow-2.x-orange) ![FastAPI](https://img.shields.io/badge/FastAPI-0.100+-green) ![React](https://img.shields.io/badge/React-18-61DAFB)

An end-to-end AI system that classifies geological rock specimens from uploaded images through a simple web interface — no lab equipment or specialist knowledge needed.

Built as a final-year BSc Computer Science dissertation at **Brunel University London** (Grade: A).

---

## Key Results

| Metric | Value |
|---|---|
| Training accuracy | 99.48% |
| Test accuracy | 98.96% |
| Macro F1-score | 0.99 |
| Response time | ~2–3 seconds |
| Test cases | 70 — 94% pass rate, zero hard failures |

---

## The Dataset Journey

The first dataset (4,212 images, 9 classes from Kaggle) had severe class imbalance, incorrect train/test splits, and invalid images mixed in. Despite weeks of tuning, the best accuracy reached was **52.74%**. The data was the problem, not the architecture.

The dataset was rebuilt from scratch — invalid images removed, scope reduced to 5 visually distinct classes, and re-split with stratified sampling. **600 clean, balanced images** (120 per class). On the first training run, accuracy jumped to 61% — eventually reaching **99.48%**.

**Supported classes:** Basalt · Chert · Clay · Gypsum · Olivine-basalt

---

## Tech Stack

- **Model:** Python, TensorFlow, Keras — custom 4-block CNN (32→64→128→256 filters)
- **Backend:** FastAPI, Uvicorn
- **Frontend:** React, Material UI
- **Training:** Google Colab (T4 GPU)
- **Tools:** GitHub, Postman, VS Code

---

## Getting Started

```bash
# Clone the repo
git clone https://github.com/AfiaParveenProva/AI-based-Rock-Classification-System.git

# Backend
cd backend
pip install -r requirements.txt
uvicorn main:app --reload

# Frontend (new terminal)
cd frontend
npm install
npm start
```

Open `http://localhost:3000`, upload a rock image, and get an instant classification.

---

## Limitations & Future Work

- Currently supports 5 rock classes — expansion planned
- Local deployment only — cloud deployment (AWS/GCP) planned
- No rejection class for out-of-scope inputs yet

---

## Acknowledgements

Supervised by **Dr Monica Pereira** (PhD, FHEA, CPsychol), Lecturer in Human-Computer Interaction, Brunel University London.

*BSc Computer Science · Brunel University London · 2026*





**AI-Based Rock Classification System**

An end-to-end rock classification system that combines a custom Convolutional Neural Network (CNN), a FastAPI REST backend, and a React web interface to enable rapid, automated identification of rock types from uploaded images — without requiring any geological expertise.

**Overview**

Traditional rock identification methods such as visual inspection and thin-section petrography are slow, subjective, and heavily dependent on specialist knowledge. This project addresses those limitations by delivering a fully integrated prototype that classifies rock images in approximately 2–3 seconds with 98.96% test accuracy and a macro-averaged F1-score of 0.99.

The system was developed as a final-year BSc Computer Science dissertation at Brunel University London, following an Agile Scrum methodology across twelve development sprints.

**How It Works**

A user uploads a rock image through the web interface. The image is sent via HTTP POST to the FastAPI backend, where it is decoded, resized to 256×256 pixels, normalised, and passed to the trained CNN model. The model returns a softmax probability vector over five rock classes — Basalt, Chert, Clay, Gypsum, and Olivine-basalt — along with a confidence score. Results are displayed instantly without a page reload, including the predicted class, confidence percentage, mineral composition, hardness, and a brief geological description. A low-confidence warning is triggered when the model's certainty falls below 50%.

**Tech Stack**

- Python, TensorFlow, Keras — model training and inference
- FastAPI, Uvicorn — REST API backend
- React, Material UI — frontend interface
- Google Colab (T4 GPU) — model training environment
- GitHub — version control

**Key Results**

- Test accuracy: 98.96% on a held-out set of 96 images
- Macro F1-score: 0.99 across all five classes
- End-to-end response time: ~2–3 seconds
- 94% pass rate across 70 test cases (model, API, frontend, and integration testing)

**Limitations & Future Work**

The current prototype supports five rock classes and is deployed locally. Planned improvements include expanding to additional rock types, adding a rejection class for out-of-scope inputs, cloud deployment, and a structured usability evaluation with real users.
