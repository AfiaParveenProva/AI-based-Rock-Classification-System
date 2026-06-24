# AI-Based Rock Classification System

![Python](https://img.shields.io/badge/Python-3.10-blue) ![TensorFlow](https://img.shields.io/badge/TensorFlow-2.x-orange) ![FastAPI](https://img.shields.io/badge/FastAPI-0.100+-green) ![React](https://img.shields.io/badge/React-18-61DAFB)

An end-to-end rock classification system combining a custom CNN, a FastAPI REST backend, and a React web interface — enabling rapid, automated identification of rock types from uploaded images without any geological expertise.

Built as a final-year BSc Computer Science dissertation at **Brunel University London** (Grade: A), developed solo using Agile Scrum across 12 sprints.

---

## How It Works

A user uploads a rock image through the web interface. The image is sent to the FastAPI backend, resized to 256×256 pixels, normalised, and passed to the trained CNN model. The model returns the predicted class, confidence score, mineral composition, hardness, and a brief geological description — instantly, without a page reload. A low-confidence warning is triggered when certainty falls below 50%.

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

The dataset was rebuilt from scratch — invalid images removed, scope reduced to 5 visually distinct classes, and re-split with stratified sampling. **600 clean, balanced images** (120 per class). On the first training run accuracy jumped to 61% — eventually reaching **99.48%**.

**Supported classes:** Basalt · Chert · Clay · Gypsum · Olivine-basalt

---

## Tech Stack

| Layer | Technology |
|---|---|
| Model | Python, TensorFlow, Keras — custom 4-block CNN (32→64→128→256 filters) |
| Backend | FastAPI, Uvicorn |
| Frontend | React, Material UI |
| Training | Google Colab (T4 GPU) |
| Tools | GitHub, Postman, VS Code |

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

- Supports 5 rock classes only — expansion planned
- Local deployment only — cloud deployment (AWS/GCP) planned
- No rejection class for out-of-scope inputs yet
- Formal usability evaluation with real users pending

---

## Acknowledgements

Supervised by **Dr Monica Pereira** (PhD, FHEA, CPsychol), Lecturer in Human-Computer Interaction, Brunel University London.

*BSc Computer Science · Brunel University London · 2026*
