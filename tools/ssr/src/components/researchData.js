"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.components = void 0;
const purpleBlotchProposal = "# Research Proposal: Purple Blotch Disease Detection & Severity Classification\r\n**Student Registration Number:** IT22054890  \r\n**Research Domain:** Computer Vision & TinyML  \r\n**Target Pathogen:** *Alternaria porri* (Purple Blotch Fungal Disease in Onions)\r\n\r\n---\r\n\r\n## 1. Introduction & Research Problem\r\nPurple Blotch, caused by the fungal pathogen *Alternaria porri*, is one of the most destructive leaf diseases affecting onion cultivation in Sri Lanka, often causing crop losses up to 30-50% in favorable microclimates. Traditional visual inspection by farmers is subjective, error-prone, and usually occurs at late stages when the damage is irreversible. Early, local, offline visual diagnostics are critical to mitigating crop loss.\r\n\r\n## 2. Research Objectives\r\n- Design a lightweight deep learning classifier capable of execution on mid-range agricultural edge devices.\r\n- Categorize leaf infection into 4 distinct severity stages (Healthy, Early, Mid, Severe).\r\n- Compute a continuous quantitative stress score (0–100%) reflecting lesion surface coverage.\r\n- Provide explainable highlight regions (Grad-CAM maps) to prevent black-box model mistrust.\r\n\r\n## 3. Methodology & Deep Learning Architecture\r\n- **Base Classifier:** MobileNetV3-Small / EfficientNet-B0 fine-tuned on custom high-resolution Sri Lankan field datasets.\r\n- **Model Compression (TinyML):** Post-training 8-bit Integer Quantization (INT8) and weight pruning, reducing the footprint to <5MB.\r\n- **Explainability Layer:** Grad-CAM activation mapping hooked into the final convolutional layer to output bounding overlays representing lesion coordinates.\r\n- **AutoML (FLAML/Optuna):** Optimized for hyperparameter grid tuning (learning rates, batch sizes, and weight decay).\r\n\r\n## 4. Verification & Validation Metrics\r\n- **Performance targets:** mAP50 > 93%, inference latency <120ms on ARM-based smartphones.\r\n- **Accuracy baseline:** Compared against annotations signed off by the Field Crops Research and Development Institute (FCRDI).\r\n";
const pestProposal = "# Research Proposal: Small-Object Detection & Bounding Localization for Onion Thrips\r\n**Student Registration Number:** IT22226464  \r\n**Research Domain:** Object Detection & Edge Diagnostics  \r\n**Target Pest:** *Thysanoptera* (Onion Thrips)\r\n\r\n---\r\n\r\n## 1. Introduction & Research Problem\r\nOnion Thrips (*Thysanoptera*) are highly mobile, small insects that feed on leaf surfaces, causing silvering, curling, and eventually leaf death. Due to their minute size (<2mm) and tendency to hide within inner leaf sheaths, standard object detection models suffer from extreme false-negative rates. This research develops a highly precise small-object detection pipeline that localizes and quantifies thrips under varying field lighting conditions.\r\n\r\n## 2. Research Objectives\r\n- Localize and draw boundary boxes around individual thrips insects.\r\n- Implement Sliced Aided Hyper Inference (SAHI) to handle sub-visual objects in large drone-scale images.\r\n- Define a 3-level infestation severity heatmap (Low, Medium, High) based on spatial pest density.\r\n- Trigger Integrated Pest Management (IPM) thresholds to advise precise insecticide spraying schedules.\r\n\r\n## 3. Technology Stack & Edge Optimization\r\n- **Detection Architectures:** YOLOv8 (Ultralytics) and Faster R-CNN (ResNet50).\r\n- **Optimization Layers:** Bounding box anchor tuning optimized with K-Means clustering, focal loss to handle extreme background-class imbalance.\r\n- **TinyML Compression:** Magnitude-based weight pruning and TensorFlow Lite float16/int8 post-training quantization.\r\n- **Model Size Target:** <10MB storage footprint, enabling offline execution.\r\n\r\n## 4. Verification & Validation Metrics\r\n- **Accuracy baseline:** Mean Average Precision (mAP50) target > 90%.\r\n- **Validation dataset:** Field-collected high-macro images annotated using Roboflow/LabelStudio and validated by senior entomologists.\r\n";
const chatbotProposal = "# Research Proposal: Spatio-Temporal Graph Neural Networks & Trilingual Chatbot Advisory\r\n**Student Registration Number:** IT22087256  \r\n**Research Domain:** Natural Language Processing (NLP) & Graph Machine Learning  \r\n**Target Core:** Spatio-Temporal Graph Inference and Multilingual Symptom Dialogue\r\n\r\n---\r\n\r\n## 1. Introduction & Research Problem\r\nAgricultural diagnostic models often evaluate images in isolation, ignoring critical contextual dimensions like weather (e.g., high humidity triggers fungus) and spatial adjacency (e.g., infected neighbor farms). Additionally, language barriers prevent local smallholder farmers from adopting high-tech models. This component introduces an ST-GNN framework connected to a trilingual chatbot interface supporting English, Sinhala, and Singlish code-switching dialogue.\r\n\r\n## 2. Research Objectives\r\n- Build a multilingual sequence-to-sequence model capable of processing mixed-code inputs (Singlish).\r\n- Design a Spatio-Temporal Graph Neural Network (ST-GNN) that links temperature/humidity curves, GPS locations, and observed symptoms into a graph.\r\n- Construct a Bayesian Belief Network (pgmpy) for reasoning through uncertainty.\r\n- Integrate inference outputs from vision sub-systems as evidence nodes to guide interactive multi-turn diagnostic interviews.\r\n\r\n## 3. Technology Stack & Inference Routing\r\n- **NLP Models:** mBERT for multilingual sentence embedding, fine-tuned mT5/mBART for advice generation.\r\n- **Graph Framework:** PyTorch & PyTorch Geometric (GAT/GraphSAGE architectures) utilizing spatio-temporal nodes.\r\n- **Context API:** Central backend querying OpenWeatherMap API for 5-day temperature/humidity trends.\r\n- **Backend Core:** Central FastAPI asynchronous controller.\r\n\r\n## 4. Verification & Validation Metrics\r\n- **Language metrics:** BLEU / ROUGE score > 0.82 on Sinhala/Singlish agronomic corpus.\r\n- **Reasoning Accuracy:** Outperform standard rule-based diagnostic frameworks by >20% in complex multi-disease edge scenarios.\r\n";
const nutrientProposal = "# Research Proposal: Feature-Fusion Classification & SHAP explainability for Nutrient Deficiencies\r\n**Student Registration Number:** IT22142528  \r\n**Research Domain:** Hybrid Computer Vision & Model Interpretability  \r\n**Target Nutrients:** Nitrogen (N), Phosphorus (P), Potassium (K), Magnesium (Mg), Calcium (Ca)\r\n\r\n---\r\n\r\n## 1. Introduction & Research Problem\r\nNutrient deficiencies represent a silent yield killer, often manifesting as subtle leaf discoloration (chlorosis, necrosis) that is difficult to visually isolate from pest or disease lesions. Lab-based tissue tests are expensive and logistically impractical for local farmers. This research aims to develop a feature-fusion model that maps leaf color and texture variations to precise soil fertilizer requirements.\r\n\r\n## 2. Research Objectives\r\n- Identify and classify N, P, K, Mg, Ca deficiencies from raw mobile leaf images.\r\n- Combine deep learning convolutional features with engineered physical color/texture indices.\r\n- Map deficiencies to localized, smallholder-calibrated fertilizer volumes (FCRDI guidelines).\r\n- Use SHAP (SHapley Additive exPlanations) and Grad-CAM to highlight exactly what pixel clusters (discoloration vs structural leaf shape) drove the model's prediction.\r\n\r\n## 3. Technology Stack & Fusion Architecture\r\n- **Deep Feature Extractor:** MobileNetV3 / ResNet.\r\n- **Engineered Feature Extractors:** OpenCV leaf segmentation, RGB/HSV color moments, and Gray-Level Co-occurrence Matrix (GLCM) texture metrics.\r\n- **Explainability:** SHAP values for global feature attribution, Grad-CAM overlays for local explainability.\r\n- **Quantization:** TFLite float16 conversion to fit edge devices.\r\n\r\n## 4. Verification & Validation Metrics\r\n- **Performance Targets:** F1-score > 92% on test validation datasets.\r\n- **Explainability Validation:** Coherence overlap test comparing SHAP highlights to agronomic ground-truth damage boundaries.\r\n";
exports.components = [
    {
        id: 1,
        title: 'Foliar Disease Analysis & Progression Modeling (Component 1)',
        regNo: 'IT22054890',
        developer: 'Vidura Yasassri',
        objective: 'To develop a multi-stage deep convolutional neural network (EfficientNet-B0/B3) for foliar fungal disease diagnosis (Purple Blotch & Anthracnose across early and severe stages), integrated with a real-time weather-driven epidemiological infection-risk forecaster, a botanical image validator, an on-device TinyML offline fallback, and longitudinal field progression tracking.',
        tech: [
            'EfficientNet-B0 / B3',
            'TinyML (Quantized TFLite)',
            'Botanical Image Validator',
            'Weather Infection Forecaster',
            'Longitudinal Field Tracker',
            'Grad-CAM Saliency Mapping'
        ],
        features: [
            'Multi-stage deep CNN classification for Purple Blotch & Anthracnose across early and severe stages',
            'Real-time weather-driven epidemiological infection-risk forecaster',
            'Botanical image validator to detect out-of-distribution inputs',
            'On-device TinyML offline fallback for zero-connectivity environments',
            'Longitudinal field progression tracking'
        ],
        proposalFile: 'Proposal_Report_PurpleBlotch.md',
        proposalContent: purpleBlotchProposal
    },
    {
        id: 2,
        title: 'Intelligent Pest Detection & Continual Learning (Component 2)',
        regNo: 'IT22226464',
        developer: 'Senura Jayasinghe',
        objective: 'To engineer an automated insect pest detection and damage quantification system utilizing YOLOv8 and Faster R-CNN augmented with Slicing Aided Hyper Inference (SAHI) for small pest identification (Thrips, Caterpillars, Stem Borers), backed by Continual Incremental Learning (CIL) to adapt to emerging agricultural pests without catastrophic forgetting.',
        tech: [
            'YOLOv8 & Faster R-CNN',
            'SAHI (Slicing Aided Hyper Inference)',
            'Continual Incremental Learning (CIL)',
            'Exemplar Memory Replay',
            'TensorFlow Lite / TinyML'
        ],
        features: [
            'Automated insect pest detection and damage quantification',
            'SAHI augmentation for small microscopic pests (Thrips, Caterpillars, Stem Borers)',
            'Continual Incremental Learning (CIL) to recognize novel pests in the wild without catastrophic forgetting',
            'Dynamic bounding box localization and infestation scoring',
            'Sub-second inference optimized for mobile and field conditions'
        ],
        proposalFile: 'Proposal_Report_PestDetection.md',
        proposalContent: pestProposal
    },
    {
        id: 3,
        title: 'Conversational AgriBot & Spatio-Temporal Disease Forecasting (Component 3)',
        regNo: 'IT22087256',
        developer: 'Sithum Buddika',
        objective: 'To establish an interactive multilingual conversational advisory agent supporting Sinhala, Singlish, and English via natural language processing, integrated with a Heterogeneous Spatio-Temporal Graph Neural Network (ST-GNN using SAGEConv) to model regional cross-farm disease spread patterns and assess seed quality.',
        tech: [
            'Heterogeneous ST-GNN',
            'SAGEConv Graph Neural Core',
            'Multilingual NLP (Sinhala, Singlish, English)',
            'Open-Meteo & Nominatim Geocoding',
            'Interactive Voice & Audio Interface',
            'Seed Quality Assessment'
        ],
        features: [
            'Interactive multilingual advisory agent supporting Sinhala, Singlish, and English via NLP',
            'Heterogeneous Spatio-Temporal Graph Neural Network (ST-GNN using SAGEConv)',
            'Regional cross-farm disease spread patterns modeling',
            'Micro-climatic environmental trigger integration',
            'Onion seed quality assessment and agronomic advisory'
        ],
        proposalFile: 'Proposal_Report_Chatbot.md',
        proposalContent: chatbotProposal
    },
    {
        id: 4,
        title: 'Foliar Nutrient Deficiency & Bulb Quality Assessment (Component 4)',
        regNo: 'IT22142528',
        developer: 'Kaveesha Silva',
        objective: 'To implement an explainable deep learning pipeline with Grad-CAM visual attention mapping for identifying Nitrogen (N), Phosphorus (P), and Potassium (K) foliar deficiencies, combined with computer vision-based post-harvest onion bulb quality classification and grading (Export, Domestic, Reject) to maximize market value.',
        tech: [
            'Grad-CAM Visual Saliency Heatmaps',
            'N-P-K Foliar Deficiency Classification',
            'Bulb Quality Computer Vision Classifier',
            'Export, Domestic, Reject Grading',
            'FCRDI Agronomic Standards Alignment',
            'TFLite Quantized Edge Model'
        ],
        features: [
            'Explainable deep learning pipeline with Grad-CAM visual attention mapping',
            'Identification of Nitrogen (N), Phosphorus (P), and Potassium (K) foliar deficiencies',
            'Computer vision-based post-harvest onion bulb quality classification and grading (Export, Domestic, Reject)',
            'Direct alignment with official FCRDI agricultural agronomic standards',
            'Optimization of harvest market value for smallholder farmers'
        ],
        proposalFile: 'Proposal_Report_NutrientDeficiency.md',
        proposalContent: nutrientProposal
    }
];
