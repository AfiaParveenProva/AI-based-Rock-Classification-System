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
