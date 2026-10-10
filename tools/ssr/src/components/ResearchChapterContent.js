"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ResearchChapterContent;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const lucide_react_1 = require("lucide-react");
const researchData_1 = require("./researchData");
const references = [
    {
        id: 1,
        authors: 'S. M. Hassan and A. K. Maji',
        title: 'Plant disease identification using a novel convolutional neural network',
        venue: 'IEEE Access, vol. 10, pp. 5390–5401, 2022',
        source: 'IEEE Xplore',
        url: 'https://doi.org/10.1109/ACCESS.2022.3141371',
    },
    {
        id: 2,
        authors: 'M. Amondkar et al.',
        title: 'Machine learning approach for onion leaf disease detection: A case study in Maharashtra, India',
        venue: 'in Proc. Int. Conf. on Advances in Science, Engineering and Technology (ICASET), 2024',
        source: 'Grenze Scientific',
        url: 'https://doi.org/10.1109/ICASET.2024.10724835',
    },
    {
        id: 3,
        authors: 'I. J. Samia, K. Fatema, M. A. H. Rony, and M. Jahan',
        title: 'An efficient and high-accuracy based automated onion leaf disease diagnosis approach using Mask R-CNN framework',
        venue: 'in Proc. 15th Int. Conf. Comput., Commun. Netw. Technol. (ICCCNT), 2024',
        source: 'IEEE Xplore',
        url: 'https://doi.org/10.1109/ICCCNT61001.2024.10724835',
    },
    {
        id: 4,
        authors: 'M. Tan and Q. V. Le',
        title: 'EfficientNet: Rethinking model scaling for convolutional neural networks',
        venue: 'in Proc. 36th Int. Conf. Mach. Learn. (ICML), vol. 97, 2019, pp. 6105–6114',
        source: 'PMLR',
        url: 'http://proceedings.mlr.press/v97/tan19a.html',
    },
    {
        id: 5,
        authors: 'C. R. Qi, H. Su, K. Mo, and L. J. Guibas',
        title: 'PointNet: Deep learning on point sets for 3D classification and segmentation',
        venue: 'in Proc. IEEE CVPR, 2017',
        source: 'IEEE Xplore',
        url: 'https://doi.org/10.1109/CVPR.2017.77',
    },
    {
        id: 6,
        authors: 'F. C. Akyon, S. O. Altinuc, and A. Temizel',
        title: 'Slicing Aided Hyper Inference and fine-tuning for small object detection',
        venue: 'in Proc. IEEE ICIP, 2022, pp. 966–970',
        source: 'IEEE Xplore SAHI',
        url: 'https://doi.org/10.1109/ICIP46576.2022.9897365',
    },
    {
        id: 7,
        authors: 'W. Hamilton, Z. Ying, and J. Leskovec',
        title: 'Inductive representation learning on large graphs (GraphSAGE)',
        venue: 'in Advances in Neural Information Processing Systems (NeurIPS), vol. 30, 2017',
        source: 'NeurIPS',
        url: 'https://proceedings.neurips.cc/paper/2017/hash/5dd9db5e033da9c6fb5ba83c7a7ebea9-Abstract.html',
    },
    {
        id: 8,
        authors: 'R. R. Selvaraju, M. Cogswell, A. Das, R. Vedantam, D. Parikh, and D. Batra',
        title: 'Grad-CAM: Visual explanations from deep networks via gradient-based localization',
        venue: 'Int. J. Comput. Vis., vol. 128, pp. 336–359, 2020',
        source: 'Springer Link',
        url: 'https://doi.org/10.1007/s11263-019-01228-7',
    },
    {
        id: 9,
        authors: 'B. Dey, M. M. U. Haque, R. Khatun, and R. Ahmed',
        title: 'Comparative performance of four CNN-based deep learning variants in detecting hispa pest, two fungal diseases, and NPK deficiency symptoms of rice',
        venue: 'Comput. Electron. Agric., vol. 202, Art. no. 107340, 2022',
        source: 'Elsevier',
        url: 'https://doi.org/10.1016/j.compag.2022.107340',
    },
    {
        id: 10,
        authors: 'S. Sunitha, B. Uma, S. Channakeshava, and S. Babu',
        title: 'PND-Net: Plant nutrition deficiency and disease classification using graph convolutional network',
        venue: 'Sci. Rep., vol. 14, 2024',
        source: 'Nature Scientific Reports',
        url: 'https://doi.org/10.1038/s41598-024-66543-7',
    },
    {
        id: 11,
        authors: 'V. Piyathilake et al.',
        title: 'Towards a conversational AI chatbot to assist farmers in disease detection',
        venue: 'in Proc. 25th Int. Conf. on Artificial Intelligence in Agriculture, Springer LNCS, 2024',
        source: 'Springer',
        url: 'https://doi.org/10.1007/978-3-031-73497-7_17',
    },
    {
        id: 12,
        authors: 'M. Kansal, P. Singh, M. Srivastava, and P. Chaurasia',
        title: 'Empowering agriculture with conversational AI: An application for farmer advisory and communication',
        venue: 'in Convergence of Cloud Computing, AI, and Agricultural Science, IGI Global, 2023, pp. 210–227',
        source: 'IGI Global',
        url: 'https://doi.org/10.4018/979-8-3693-0200-2.ch011',
    },
    {
        id: 13,
        authors: 'D. Hendrycks and K. Gimpel',
        title: 'A baseline for detecting misclassified and out-of-distribution examples in neural networks',
        venue: 'in Proc. ICLR, 2017',
        source: 'arXiv',
        url: 'https://arxiv.org/abs/1610.02136',
    },
    {
        id: 14,
        authors: 'C. Guo, G. Pleiss, Y. Sun, and K. Q. Weinberger',
        title: 'On calibration of modern neural networks',
        venue: 'in Proc. 34th Int. Conf. Mach. Learn. (ICML), vol. 70, 2017, pp. 1321–1330',
        source: 'PMLR',
        url: 'http://proceedings.mlr.press/v70/guo17a.html',
    },
    {
        id: 15,
        authors: 'Field Crops Research and Development Institute (FCRDI)',
        title: 'Integrated Management Guidelines for Onion Pests and Diseases',
        venue: 'Technical Advisory Bulletin No. 4, Department of Agriculture, Mahailluppallama, Sri Lanka, 2026',
        source: 'DOA Sri Lanka',
        url: 'https://doa.gov.lk',
    },
];
const methodologyTable = [
    {
        aiModel: 'EfficientNet-B0 / B3',
        aiRole: 'Disease Multi-Stage Classification',
        backend: 'FastAPI',
        backendRole: 'Python 3.10 Asynchronous ASGI',
        mobile: 'Flutter Framework',
        mobileRole: 'Dart Cross-Platform Engine',
    },
    {
        aiModel: 'YOLOv8 & Faster R-CNN',
        aiRole: 'Pest Detection & Localization',
        backend: 'Uvicorn',
        backendRole: 'High-Performance ASGI Server',
        mobile: 'Riverpod',
        mobileRole: 'Reactive State Management',
    },
    {
        aiModel: 'SAHI',
        aiRole: 'Slicing Aided Hyper Inference for Tiny Pests',
        backend: 'PyTorch & PyTorch Geometric',
        backendRole: 'Deep Learning Core',
        mobile: 'fl_chart',
        mobileRole: 'Longitudinal Dual-Line Analytics',
    },
    {
        aiModel: 'Heterogeneous ST-GNN',
        aiRole: 'SAGEConv Regional Spread Model',
        backend: 'TensorFlow & Keras',
        backendRole: 'CNN Models & TFLite Conversion',
        mobile: 'Trilingual Engine',
        mobileRole: 'Sinhala, Tamil, English',
    },
    {
        aiModel: 'Grad-CAM',
        aiRole: 'Visual Saliency & Agronomic Explainability',
        backend: 'MongoDB Atlas',
        backendRole: 'Motor Driver for Longitudinal History',
        mobile: 'Camera & Gallery UI',
        mobileRole: 'Real-Time Image Ingestion',
    },
    {
        aiModel: 'TinyML / TFLite',
        aiRole: 'Quantized On-Device Edge Inference',
        backend: 'Open-Meteo & Nominatim',
        backendRole: 'Micro-Climate Geocoding',
        mobile: 'PDF Document Generator',
        mobileRole: 'Field Advisory Reports',
    },
    {
        aiModel: 'Continual Incremental Learning (CIL)',
        aiRole: 'Exemplar Memory',
        backend: 'Firebase Firestore',
        backendRole: 'Audit Logs & Diagnostic History',
        mobile: 'Interactive Audio & Speech',
        mobileRole: 'Voice AgriBot Interface',
    },
];
function ResearchChapterContent({ chapter }) {
    const [refSearch, setRefSearch] = (0, react_1.useState)(Object.prototype.hasOwnProperty.call(globalThis.__states['ResearchChapterContent'] || {}, 'refSearch') ? globalThis.__states['ResearchChapterContent']['refSearch'] : (''));
    const [techView, setTechView] = (0, react_1.useState)(Object.prototype.hasOwnProperty.call(globalThis.__states['ResearchChapterContent'] || {}, 'techView') ? globalThis.__states['ResearchChapterContent']['techView'] : ('table'));
    const filteredReferences = (0, react_1.useMemo)(() => {
        const term = refSearch.trim().toLowerCase();
        if (!term)
            return references;
        return references.filter(r => r.authors.toLowerCase().includes(term) ||
            r.title.toLowerCase().includes(term) ||
            r.venue.toLowerCase().includes(term) ||
            r.source.toLowerCase().includes(term) ||
            `[${r.id}]`.includes(term));
    }, [refSearch]);
    // Chapter 0: Literature Survey
    if (chapter === 0) {
        return ((0, jsx_runtime_1.jsxs)("div", { className: "research-chapter-container", children: [(0, jsx_runtime_1.jsxs)("div", { className: "research-reading-card", children: [(0, jsx_runtime_1.jsxs)("p", { className: "research-body-text", children: ["Extensive research has explored the application of artificial intelligence and computer vision in precision agriculture, demonstrating impressive benchmark results in laboratory environments. However, current literature reveals significant limitations when applied to the complete agronomic lifecycle of onion (", (0, jsx_runtime_1.jsx)("em", { children: "Allium cepa" }), ") cultivation. Existing systems primarily operate as isolated, single-task prototypes\u2014treating foliar fungal diseases (Purple Blotch and Anthracnose), microscopic insect pest infestations (Thrips and Stem Borers), foliar macronutrient deficiencies (Nitrogen, Phosphorus, Potassium), and post-harvest bulb grading as entirely disconnected challenges. Furthermore, state-of-the-art agricultural models are typically trained on sterile, clean-background benchmarks such as PlantVillage, resulting in catastrophic accuracy degradation when subjected to dynamic field conditions with natural occlusion, varying sunlight, and out-of-distribution inputs. Conventional diagnostic tools also neglect spatial-temporal disease transmission patterns across adjacent farms, overlook micro-climatic environmental triggers (leaf wetness and humidity thresholds), lack visual explainability (such as Grad-CAM saliency heatmaps), and fail to provide multilingual conversational interfaces in vernacular languages (Sinhala and Tamil) required by rural smallholder farmers in developing nations."] }), (0, jsx_runtime_1.jsxs)("div", { className: "research-takeaway-grid", children: [(0, jsx_runtime_1.jsxs)("div", { className: "research-takeaway-item", children: [(0, jsx_runtime_1.jsx)("span", { className: "research-takeaway-icon", children: (0, jsx_runtime_1.jsx)(lucide_react_1.AlertCircle, { size: 18 }) }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("strong", { children: "Isolated Single-Task Models" }), (0, jsx_runtime_1.jsx)("p", { children: "Prior work evaluates fungal diseases, microscopic pests, macronutrients, and bulb grading in separate silos rather than a cohesive lifecycle." })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "research-takeaway-item", children: [(0, jsx_runtime_1.jsx)("span", { className: "research-takeaway-icon", children: (0, jsx_runtime_1.jsx)(lucide_react_1.AlertCircle, { size: 18 }) }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("strong", { children: "Sterile Benchmark Vulnerability" }), (0, jsx_runtime_1.jsx)("p", { children: "Models trained on clean backgrounds degrade heavily under dynamic sunlight, canopy occlusion, and out-of-distribution farm images." })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "research-takeaway-item", children: [(0, jsx_runtime_1.jsx)("span", { className: "research-takeaway-icon", children: (0, jsx_runtime_1.jsx)(lucide_react_1.AlertCircle, { size: 18 }) }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("strong", { children: "Neglected Regional Dynamics" }), (0, jsx_runtime_1.jsx)("p", { children: "Conventional systems lack spatio-temporal transmission modeling across neighboring fields and miss micro-climatic weather triggers." })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "research-takeaway-item", children: [(0, jsx_runtime_1.jsx)("span", { className: "research-takeaway-icon", children: (0, jsx_runtime_1.jsx)(lucide_react_1.AlertCircle, { size: 18 }) }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("strong", { children: "Linguistic & Explainability Gaps" }), (0, jsx_runtime_1.jsx)("p", { children: "Existing mobile tools lack Grad-CAM agronomic validation and fail to offer vernacular Sinhala and Tamil natural language interaction." })] })] })] })] }), (0, jsx_runtime_1.jsxs)("section", { className: "research-references-section", "aria-label": "Literature references", children: [(0, jsx_runtime_1.jsxs)("div", { className: "research-references-header", children: [(0, jsx_runtime_1.jsxs)("div", { className: "research-references-title-wrap", children: [(0, jsx_runtime_1.jsx)("h3", { children: "References" }), (0, jsx_runtime_1.jsxs)("span", { className: "research-count-badge", children: [filteredReferences.length, " of ", references.length, " citations"] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "research-ref-search-wrap", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Search, { size: 16, "aria-hidden": "true" }), (0, jsx_runtime_1.jsx)("input", { type: "search", value: refSearch, onChange: e => setRefSearch(e.target.value), placeholder: "Filter references by author, keyword, or venue\u2026", "aria-label": "Filter references", className: "research-ref-search-input" }), refSearch && ((0, jsx_runtime_1.jsx)("button", { type: "button", "data-action": "() => setRefSearch('')", "aria-label": "Clear reference search", className: "research-ref-clear-btn", children: (0, jsx_runtime_1.jsx)(lucide_react_1.X, { size: 14 }) }))] })] }), (0, jsx_runtime_1.jsx)("ol", { className: "research-references-list", children: filteredReferences.map(ref => ((0, jsx_runtime_1.jsxs)("li", { className: "research-reference-item", children: [(0, jsx_runtime_1.jsxs)("span", { className: "research-ref-badge", children: ["[", ref.id, "]"] }), (0, jsx_runtime_1.jsxs)("div", { className: "research-ref-body", children: [(0, jsx_runtime_1.jsxs)("p", { className: "research-ref-citation", children: [(0, jsx_runtime_1.jsx)("strong", { children: ref.authors }), ", \u201C", ref.title, ",\u201D ", (0, jsx_runtime_1.jsx)("em", { children: ref.venue }), "."] }), (0, jsx_runtime_1.jsxs)("div", { className: "research-ref-actions", children: [(0, jsx_runtime_1.jsx)("span", { className: "research-ref-label", children: "Available at:" }), (0, jsx_runtime_1.jsxs)("a", { href: ref.url, target: "_blank", rel: "noopener noreferrer", className: "research-ref-link", "aria-label": `Open reference [${ref.id}] on ${ref.source} in new tab`, children: [(0, jsx_runtime_1.jsx)("span", { children: ref.source }), (0, jsx_runtime_1.jsx)(lucide_react_1.ExternalLink, { size: 14, "aria-hidden": "true" })] })] })] })] }, ref.id))) }), filteredReferences.length === 0 && ((0, jsx_runtime_1.jsxs)("div", { className: "research-ref-empty", children: [(0, jsx_runtime_1.jsxs)("p", { children: ["No references match \u201C", refSearch, "\u201D."] }), (0, jsx_runtime_1.jsx)("button", { type: "button", "data-action": "() => setRefSearch('')", className: "research-pill-btn", children: "Clear reference filter" })] }))] })] }));
    }
    // Chapter 1: Research Gap
    if (chapter === 1) {
        return ((0, jsx_runtime_1.jsxs)("div", { className: "research-chapter-container", children: [(0, jsx_runtime_1.jsx)("div", { className: "research-reading-card research-gap-card", children: (0, jsx_runtime_1.jsxs)("p", { className: "research-body-text", children: ["Existing agricultural decision-support systems are critically fragmented, operating in isolated functional silos that fail to reflect real-world farm complexity. While contemporary solutions offer piecemeal tools for either basic disease classification or generic weather forecasts, they lack an interconnected, multi-agent framework capable of unifying foliar fungal pathology, microscopic pest infestation, soil macronutrient health, and post-harvest bulb quality into a single actionable pipeline. Current diagnostic models operate reactively rather than proactively, identifying damage only after economic threshold limits are exceeded without leveraging micro-climatic environmental risk forecasting or regional spatial-temporal disease transmission modeling. Furthermore, most systems suffer from severe out-of-distribution vulnerability (confidently misclassifying non-leaf images), lack continual learning mechanisms to recognize novel pests in the wild, offer no visual explainability to validate AI predictions to agronomists, and ignore vernacular linguistic accessibility (Sinhala and Tamil) and offline edge-computing constraints of rural smallholder farming communities. ", (0, jsx_runtime_1.jsx)("strong", { children: "LunuNeth AI" }), " resolves this research gap by introducing a unified, multi-agent AI ecosystem that synergizes multi-stage disease diagnosis with longitudinal tracking, micro-pest detection with continual incremental learning, spatio-temporal graph neural forecasting with a trilingual conversational agent, and explainable nutrient-bulb grading aligned with official FCRDI agricultural agronomic standards."] }) }), (0, jsx_runtime_1.jsxs)("div", { className: "research-gap-breakdown", children: [(0, jsx_runtime_1.jsx)("h3", { className: "research-breakdown-title", children: "Critical Limitations vs. The LunuNeth AI Solution" }), (0, jsx_runtime_1.jsxs)("div", { className: "research-gap-grid", children: [(0, jsx_runtime_1.jsxs)("div", { className: "research-gap-item", children: [(0, jsx_runtime_1.jsxs)("div", { className: "research-gap-col status-quo", children: [(0, jsx_runtime_1.jsx)("span", { className: "gap-tag current", children: "Conventional Fragmentation" }), (0, jsx_runtime_1.jsx)("h4", { children: "Isolated Single-Task Prototypes" }), (0, jsx_runtime_1.jsx)("p", { children: "Treat foliar fungal diseases, microscopic pests, macronutrients, and post-harvest grading as disjointed problems with separate tools." })] }), (0, jsx_runtime_1.jsx)("div", { className: "research-gap-arrow", "aria-hidden": "true", children: (0, jsx_runtime_1.jsx)(lucide_react_1.ArrowRight, { size: 18 }) }), (0, jsx_runtime_1.jsxs)("div", { className: "research-gap-col solution", children: [(0, jsx_runtime_1.jsx)("span", { className: "gap-tag resolved", children: "LunuNeth AI Resolution" }), (0, jsx_runtime_1.jsx)("h4", { children: "Unified Multi-Agent Ecosystem" }), (0, jsx_runtime_1.jsx)("p", { children: "An integrated, multi-agent pipeline spanning the entire onion crop lifecycle with shared diagnostic state and longitudinal tracking." })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "research-gap-item", children: [(0, jsx_runtime_1.jsxs)("div", { className: "research-gap-col status-quo", children: [(0, jsx_runtime_1.jsx)("span", { className: "gap-tag current", children: "Conventional Fragmentation" }), (0, jsx_runtime_1.jsx)("h4", { children: "Reactive Post-Threshold Diagnosis" }), (0, jsx_runtime_1.jsx)("p", { children: "Identifies crop damage only after visible symptoms breach economic thresholds, missing micro-climatic triggers." })] }), (0, jsx_runtime_1.jsx)("div", { className: "research-gap-arrow", "aria-hidden": "true", children: (0, jsx_runtime_1.jsx)(lucide_react_1.ArrowRight, { size: 18 }) }), (0, jsx_runtime_1.jsxs)("div", { className: "research-gap-col solution", children: [(0, jsx_runtime_1.jsx)("span", { className: "gap-tag resolved", children: "LunuNeth AI Resolution" }), (0, jsx_runtime_1.jsx)("h4", { children: "Proactive Spatio-Temporal Forecasting" }), (0, jsx_runtime_1.jsx)("p", { children: "Heterogeneous ST-GNN with SAGEConv models cross-farm transmission while weather APIs predict epidemiological risk before outbreak." })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "research-gap-item", children: [(0, jsx_runtime_1.jsxs)("div", { className: "research-gap-col status-quo", children: [(0, jsx_runtime_1.jsx)("span", { className: "gap-tag current", children: "Conventional Fragmentation" }), (0, jsx_runtime_1.jsx)("h4", { children: "Out-of-Distribution Vulnerability" }), (0, jsx_runtime_1.jsx)("p", { children: "High confidence misclassifications on non-crop images and inability to learn emerging agricultural pests in dynamic fields." })] }), (0, jsx_runtime_1.jsx)("div", { className: "research-gap-arrow", "aria-hidden": "true", children: (0, jsx_runtime_1.jsx)(lucide_react_1.ArrowRight, { size: 18 }) }), (0, jsx_runtime_1.jsxs)("div", { className: "research-gap-col solution", children: [(0, jsx_runtime_1.jsx)("span", { className: "gap-tag resolved", children: "LunuNeth AI Resolution" }), (0, jsx_runtime_1.jsx)("h4", { children: "Continual Incremental Learning & OOD Filter" }), (0, jsx_runtime_1.jsx)("p", { children: "Botanical image validator flags non-foliar inputs, while CIL with exemplar memory continuously incorporates novel pests without catastrophic forgetting." })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "research-gap-item", children: [(0, jsx_runtime_1.jsxs)("div", { className: "research-gap-col status-quo", children: [(0, jsx_runtime_1.jsx)("span", { className: "gap-tag current", children: "Conventional Fragmentation" }), (0, jsx_runtime_1.jsx)("h4", { children: "Linguistic & Offline Constraints" }), (0, jsx_runtime_1.jsx)("p", { children: "English-exclusive cloud-dependent interfaces inaccessible to smallholder farmers lacking high-bandwidth connectivity." })] }), (0, jsx_runtime_1.jsx)("div", { className: "research-gap-arrow", "aria-hidden": "true", children: (0, jsx_runtime_1.jsx)(lucide_react_1.ArrowRight, { size: 18 }) }), (0, jsx_runtime_1.jsxs)("div", { className: "research-gap-col solution", children: [(0, jsx_runtime_1.jsx)("span", { className: "gap-tag resolved", children: "LunuNeth AI Resolution" }), (0, jsx_runtime_1.jsx)("h4", { children: "Trilingual Voice Agent & Edge TinyML" }), (0, jsx_runtime_1.jsx)("p", { children: "Native conversational advisory in Sinhala, Singlish, and English paired with on-device quantized TFLite inference for zero-connectivity field use." })] })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "research-gap-fcrdi-badge", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.ShieldCheck, { size: 20, className: "fcrdi-icon" }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("strong", { children: "Agronomic Standards Alignment:" }), " Fully compliant with official Field Crops Research and Development Institute (FCRDI) pest, pathology, and nutrient management guidelines (Department of Agriculture, Mahailluppallama, Sri Lanka, 2026)."] })] })] })] }));
    }
    // Chapter 2: Research Objectives
    if (chapter === 2) {
        return ((0, jsx_runtime_1.jsx)("div", { className: "research-chapter-container", children: (0, jsx_runtime_1.jsx)("div", { className: "research-objectives-grid", children: researchData_1.components.map(obj => ((0, jsx_runtime_1.jsxs)("article", { className: "research-objective-card", children: [(0, jsx_runtime_1.jsxs)("header", { className: "objective-card-header", children: [(0, jsx_runtime_1.jsxs)("div", { className: "objective-badge-row", children: [(0, jsx_runtime_1.jsxs)("span", { className: "objective-component-pill", children: ["Component ", obj.id] }), (0, jsx_runtime_1.jsxs)("span", { className: "objective-lead-pill", children: [obj.developer, " \u00B7 ", obj.regNo] })] }), (0, jsx_runtime_1.jsx)("h3", { children: obj.title })] }), (0, jsx_runtime_1.jsx)("p", { className: "objective-desc", children: obj.objective }), (0, jsx_runtime_1.jsx)("div", { className: "objective-tags-wrap", children: obj.tech.map(tag => ((0, jsx_runtime_1.jsx)("span", { className: "objective-tag", children: tag }, tag))) }), (0, jsx_runtime_1.jsxs)("details", { className: "objective-details-accordion", children: [(0, jsx_runtime_1.jsx)("summary", { children: (0, jsx_runtime_1.jsx)("span", { children: "Explore component capabilities" }) }), (0, jsx_runtime_1.jsx)("ul", { className: "objective-capabilities-list", children: obj.features.map((item, idx) => ((0, jsx_runtime_1.jsxs)("li", { children: [(0, jsx_runtime_1.jsx)(lucide_react_1.CheckCircle2, { size: 15, "aria-hidden": "true" }), (0, jsx_runtime_1.jsx)("span", { children: item })] }, idx))) })] })] }, obj.id))) }) }));
    }
    // Chapter 3: Methodology & Technologies
    return ((0, jsx_runtime_1.jsx)("div", { className: "research-chapter-container", children: (0, jsx_runtime_1.jsxs)("div", { className: "research-methodology-card", children: [(0, jsx_runtime_1.jsx)("p", { className: "research-body-text", children: "The LunuNeth AI platform follows an Iterative Developmental Life Cycle (Agile Methodology), architected as a modular, consolidated microservices framework for high scalability and sub-second inference. Each specialized agricultural AI module operates independently while communicating seamlessly through an asynchronous RESTful API layer and centralized cloud data persistence." }), (0, jsx_runtime_1.jsxs)("div", { className: "methodology-pillars-grid", children: [(0, jsx_runtime_1.jsxs)("div", { className: "methodology-pillar-item", children: [(0, jsx_runtime_1.jsx)("span", { className: "pillar-icon", children: (0, jsx_runtime_1.jsx)(lucide_react_1.Sparkles, { size: 18 }) }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("strong", { children: "Iterative Agile Cycle" }), (0, jsx_runtime_1.jsx)("p", { children: "Continuous bi-weekly sprints, field data annotation loops, and direct feedback from Mahailluppallama agricultural extension officers." })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "methodology-pillar-item", children: [(0, jsx_runtime_1.jsx)("span", { className: "pillar-icon", children: (0, jsx_runtime_1.jsx)(lucide_react_1.Server, { size: 18 }) }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("strong", { children: "Consolidated Microservices" }), (0, jsx_runtime_1.jsx)("p", { children: "Independent containerized FastAPI endpoints coordinating PyTorch, TensorFlow, and GraphSAGE backends asynchronously." })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "methodology-pillar-item", children: [(0, jsx_runtime_1.jsx)("span", { className: "pillar-icon", children: (0, jsx_runtime_1.jsx)(lucide_react_1.Smartphone, { size: 18 }) }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("strong", { children: "Edge & Cloud Hybrid Resilience" }), (0, jsx_runtime_1.jsx)("p", { children: "On-device quantized TinyML for instant field feedback alongside cloud ST-GNN forecasting and MongoDB Atlas history synchronization." })] })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "methodology-toolbar", children: [(0, jsx_runtime_1.jsxs)("div", { className: "methodology-toolbar-left", children: [(0, jsx_runtime_1.jsx)("h3", { children: "Architectural Technology Stack" }), (0, jsx_runtime_1.jsx)("span", { className: "methodology-badge", children: "7 Specialized AI & Software Modules" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "methodology-view-toggle", role: "group", "aria-label": "Change technology stack view", children: [(0, jsx_runtime_1.jsxs)("button", { type: "button", className: techView === 'table' ? 'is-active' : '', "data-action": "() => setTechView('table')", "aria-label": "Table View", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Table, { size: 16 }), " ", (0, jsx_runtime_1.jsx)("span", { children: "Table" })] }), (0, jsx_runtime_1.jsxs)("button", { type: "button", className: techView === 'cards' ? 'is-active' : '', "data-action": "() => setTechView('cards')", "aria-label": "Card View", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.LayoutGrid, { size: 16 }), " ", (0, jsx_runtime_1.jsx)("span", { children: "Cards" })] })] })] }), techView === 'table' && ((0, jsx_runtime_1.jsx)("div", { className: "research-methodology-table-wrapper", tabIndex: 0, "aria-label": "Methodology and technologies table", children: (0, jsx_runtime_1.jsxs)("table", { className: "research-methodology-table", children: [(0, jsx_runtime_1.jsx)("thead", { children: (0, jsx_runtime_1.jsxs)("tr", { children: [(0, jsx_runtime_1.jsx)("th", { scope: "col", children: (0, jsx_runtime_1.jsxs)("span", { className: "table-header-content", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Cpu, { size: 16, "aria-hidden": "true" }), (0, jsx_runtime_1.jsx)("span", { children: "Data Science & AI Models" })] }) }), (0, jsx_runtime_1.jsx)("th", { scope: "col", children: (0, jsx_runtime_1.jsxs)("span", { className: "table-header-content", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Server, { size: 16, "aria-hidden": "true" }), (0, jsx_runtime_1.jsx)("span", { children: "Backend Stack" })] }) }), (0, jsx_runtime_1.jsx)("th", { scope: "col", children: (0, jsx_runtime_1.jsxs)("span", { className: "table-header-content", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Smartphone, { size: 16, "aria-hidden": "true" }), (0, jsx_runtime_1.jsx)("span", { children: "Mobile Interface & Frontend" })] }) })] }) }), (0, jsx_runtime_1.jsx)("tbody", { children: methodologyTable.map((row, idx) => ((0, jsx_runtime_1.jsxs)("tr", { children: [(0, jsx_runtime_1.jsx)("td", { "data-label": "Data Science & AI Models", children: (0, jsx_runtime_1.jsxs)("div", { className: "tech-cell-content", children: [(0, jsx_runtime_1.jsx)("strong", { className: "tech-primary-name", children: row.aiModel }), (0, jsx_runtime_1.jsxs)("span", { className: "tech-role-desc", children: ["(", row.aiRole, ")"] })] }) }), (0, jsx_runtime_1.jsx)("td", { "data-label": "Backend Stack", children: (0, jsx_runtime_1.jsxs)("div", { className: "tech-cell-content", children: [(0, jsx_runtime_1.jsx)("strong", { className: "tech-primary-name", children: row.backend }), (0, jsx_runtime_1.jsxs)("span", { className: "tech-role-desc", children: ["(", row.backendRole, ")"] })] }) }), (0, jsx_runtime_1.jsx)("td", { "data-label": "Mobile Interface & Frontend", children: (0, jsx_runtime_1.jsxs)("div", { className: "tech-cell-content", children: [(0, jsx_runtime_1.jsx)("strong", { className: "tech-primary-name", children: row.mobile }), (0, jsx_runtime_1.jsxs)("span", { className: "tech-role-desc", children: ["(", row.mobileRole, ")"] })] }) })] }, idx))) })] }) })), techView === 'cards' && ((0, jsx_runtime_1.jsx)("div", { className: "methodology-cards-grid", children: methodologyTable.map((row, idx) => ((0, jsx_runtime_1.jsxs)("div", { className: "methodology-card-row", children: [(0, jsx_runtime_1.jsxs)("div", { className: "methodology-card-tier ai-tier", children: [(0, jsx_runtime_1.jsxs)("div", { className: "tier-badge", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Cpu, { size: 14 }), " ", (0, jsx_runtime_1.jsx)("span", { children: "Data Science & AI Models" })] }), (0, jsx_runtime_1.jsx)("strong", { children: row.aiModel }), (0, jsx_runtime_1.jsxs)("span", { className: "tier-role", children: ["(", row.aiRole, ")"] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "methodology-card-tier backend-tier", children: [(0, jsx_runtime_1.jsxs)("div", { className: "tier-badge", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Server, { size: 14 }), " ", (0, jsx_runtime_1.jsx)("span", { children: "Backend Stack" })] }), (0, jsx_runtime_1.jsx)("strong", { children: row.backend }), (0, jsx_runtime_1.jsxs)("span", { className: "tier-role", children: ["(", row.backendRole, ")"] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "methodology-card-tier mobile-tier", children: [(0, jsx_runtime_1.jsxs)("div", { className: "tier-badge", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Smartphone, { size: 14 }), " ", (0, jsx_runtime_1.jsx)("span", { children: "Mobile Interface & Frontend" })] }), (0, jsx_runtime_1.jsx)("strong", { children: row.mobile }), (0, jsx_runtime_1.jsxs)("span", { className: "tier-role", children: ["(", row.mobileRole, ")"] })] })] }, idx))) })), (0, jsx_runtime_1.jsxs)("footer", { className: "methodology-footer-note", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Layers, { size: 16, "aria-hidden": "true" }), (0, jsx_runtime_1.jsx)("span", { children: "Iterative Developmental Life Cycle (Agile Methodology) with asynchronous RESTful API layer and centralized cloud data persistence." })] })] }) }));
}
