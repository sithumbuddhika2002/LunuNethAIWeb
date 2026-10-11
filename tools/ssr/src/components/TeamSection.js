"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TeamSection;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const lucide_react_1 = require("lucide-react");
// Custom brand icons for consistency and zero dependencies
const GithubIcon = () => ((0, jsx_runtime_1.jsxs)("svg", { style: { width: '16px', height: '16px' }, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [(0, jsx_runtime_1.jsx)("path", { d: "M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" }), (0, jsx_runtime_1.jsx)("path", { d: "M9 18c-4.51 2-5-2-7-2" })] }));
const LinkedinIcon = () => ((0, jsx_runtime_1.jsxs)("svg", { style: { width: '16px', height: '16px' }, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [(0, jsx_runtime_1.jsx)("path", { d: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" }), (0, jsx_runtime_1.jsx)("rect", { width: "4", height: "12", x: "2", y: "9" }), (0, jsx_runtime_1.jsx)("circle", { cx: "4", cy: "4", r: "2" })] }));
// Robust Avatar Image component with remote URL, local asset fallback, and custom SVG fallback
const AvatarImage = ({ member }) => {
    const [currentSrc, setCurrentSrc] = (0, react_1.useState)(Object.prototype.hasOwnProperty.call(globalThis.__states['TeamSection'] || {}, 'currentSrc') ? globalThis.__states['TeamSection']['currentSrc'] : (member.imageUrl || member.localImageUrl));
    const [failed, setFailed] = (0, react_1.useState)(Object.prototype.hasOwnProperty.call(globalThis.__states['TeamSection'] || {}, 'failed') ? globalThis.__states['TeamSection']['failed'] : (false));
    const handleError = () => {
        // If the remote URL fails, fall back to the bundled local image asset
        if (currentSrc === member.imageUrl && member.localImageUrl) {
            setCurrentSrc(member.localImageUrl);
        }
        else {
            setFailed(true);
        }
    };
    return ((0, jsx_runtime_1.jsx)("div", { className: "team-avatar-wrapper", children: !failed && currentSrc ? ((0, jsx_runtime_1.jsx)("img", { src: currentSrc, alt: member.name, referrerPolicy: "no-referrer", loading: "lazy", onError: handleError, className: "team-avatar-img" })) : ((0, jsx_runtime_1.jsx)("div", { className: "team-avatar-fallback", children: member.avatar })) }));
};
function TeamSection() {
    // Expand/collapse state for each member card (default is collapsed)
    const [expandedIds, setExpandedIds] = (0, react_1.useState)(Object.prototype.hasOwnProperty.call(globalThis.__states['TeamSection'] || {}, 'expandedIds') ? globalThis.__states['TeamSection']['expandedIds'] : ({}));
    const toggleExpand = (id) => {
        setExpandedIds((prev) => ({
            ...prev,
            [id]: !prev[id]
        }));
    };
    const supervisor = {
        id: 1,
        name: 'Dr. Kawshalya Diasanayake',
        role: 'Project Supervisor',
        bio: 'Senior Lecturer in the Department of Information Technology at SLIIT. Holds a Ph.D. in Computer Science from Management & Science University, Malaysia. Expert in Cyber Security, Machine Learning, Deep Learning, Image Processing, and Natural Language Processing.',
        skills: ['Cyber Security', 'Machine Learning', 'Deep Learning', 'Image Processing', 'Data Science'],
        socials: { linkedin: '#', email: 'mailto:kaushalya.d@sliit.lk' },
        imageUrl: 'https://webasset.sliit.lk/web/profile_1778220334.jpg',
        localImageUrl: '/images/team/dr_kawshalya.jpg',
        avatar: ((0, jsx_runtime_1.jsxs)("svg", { viewBox: "0 0 100 100", className: "team-avatar-svg", children: [(0, jsx_runtime_1.jsx)("rect", { width: "100", height: "100", fill: "#082218" }), (0, jsx_runtime_1.jsx)("circle", { cx: "50", cy: "42", r: "18", fill: "rgba(16, 185, 129, 0.2)", stroke: "#10b981", strokeWidth: "1.5" }), (0, jsx_runtime_1.jsx)("path", { d: "M 25 80 C 25 62 38 58 50 58 C 62 58 75 62 75 80 Z", fill: "rgba(16, 185, 129, 0.15)", stroke: "#10b981", strokeWidth: "1.5" }), (0, jsx_runtime_1.jsx)("path", { d: "M 50 15 L 72 23 L 50 31 L 28 23 Z", fill: "#10b981" }), (0, jsx_runtime_1.jsx)("path", { d: "M 72 23 L 72 35", stroke: "#10b981", strokeWidth: "1.5" }), (0, jsx_runtime_1.jsx)("path", { d: "M 50 31 L 50 38", stroke: "#10b981", strokeWidth: "1.5" }), (0, jsx_runtime_1.jsx)("circle", { cx: "50", cy: "42", r: "2", fill: "#00ff87" })] }))
    };
    const coSupervisor = {
        id: 6,
        name: 'Dr. Dharshana Kasthurirathna',
        role: 'Project Co-Supervisor',
        bio: 'Assistant Professor in Software Engineering at SLIIT. Holds a Ph.D. in Complex Systems from the University of Sydney. Expert in network science, complex computational systems modeling, evolutionary game theory, and machine learning.',
        skills: ['Complex Systems', 'Network Science', 'Machine Learning', 'Software Architecture', 'Distributed Systems'],
        socials: { linkedin: 'https://www.linkedin.com/in/dharshana-kasthurirathna-a4a3275/', email: 'mailto:dharshana.k@sliit.lk' },
        imageUrl: 'https://csaat.sliit.lk/assets/img/DrDharshana.jpg',
        localImageUrl: '/images/team/dr_dharshana.jpg',
        avatar: ((0, jsx_runtime_1.jsxs)("svg", { viewBox: "0 0 100 100", className: "team-avatar-svg", children: [(0, jsx_runtime_1.jsx)("rect", { width: "100", height: "100", fill: "#081e22" }), (0, jsx_runtime_1.jsx)("circle", { cx: "50", cy: "42", r: "18", fill: "rgba(14, 165, 233, 0.2)", stroke: "#0ea5e9", strokeWidth: "1.5" }), (0, jsx_runtime_1.jsx)("path", { d: "M 25 80 C 25 62 38 58 50 58 C 62 58 75 62 75 80 Z", fill: "rgba(14, 165, 233, 0.15)", stroke: "#0ea5e9", strokeWidth: "1.5" }), (0, jsx_runtime_1.jsx)("path", { d: "M 50 15 L 72 23 L 50 31 L 28 23 Z", fill: "#0ea5e9" }), (0, jsx_runtime_1.jsx)("path", { d: "M 72 23 L 72 35", stroke: "#0ea5e9", strokeWidth: "1.5" }), (0, jsx_runtime_1.jsx)("path", { d: "M 50 31 L 50 38", stroke: "#0ea5e9", strokeWidth: "1.5" }), (0, jsx_runtime_1.jsx)("circle", { cx: "50", cy: "42", r: "2", fill: "#38bdf8" }), (0, jsx_runtime_1.jsx)("circle", { cx: "80", cy: "20", r: "3", fill: "#38bdf8" }), (0, jsx_runtime_1.jsx)("circle", { cx: "20", cy: "30", r: "3", fill: "#38bdf8" }), (0, jsx_runtime_1.jsx)("line", { x1: "50", y1: "42", x2: "80", y2: "20", stroke: "rgba(56, 189, 248, 0.3)", strokeWidth: "1" }), (0, jsx_runtime_1.jsx)("line", { x1: "50", y1: "42", x2: "20", y2: "30", stroke: "rgba(56, 189, 248, 0.3)", strokeWidth: "1" })] }))
    };
    const members = [
        {
            id: 2,
            name: 'Vidura Yasassri',
            regNo: 'IT22054890',
            componentName: 'Purple Blotch Disease Detection',
            bio: 'Directs development sprints, microservice container assemblies, and designs the FastAPI consolidated agent controller routing. Lead researcher on Purple Blotch detection and severity classification.',
            skills: ['Systems Architecture', 'Docker Dev', 'FastAPI Routing', 'MongoDB Integration', 'TinyML Quantization', 'CNNs & ViTs'],
            socials: { github: '#', linkedin: '#', email: 'mailto:vidura@lununeth.ai' },
            imageUrl: 'https://media.licdn.com/dms/image/v2/D5603AQEV-CPKjYdYSg/profile-displayphoto-scale_200_200/B56aC_KkCXGoAc-/0/1789913613900?e=2147483647&v=beta&t=2KSnOe_FknZlKSyEUztJOx8Lg9RV95kfVVJ5yR-Nqpk',
            localImageUrl: '/images/team/vidura.jpg',
            avatar: ((0, jsx_runtime_1.jsxs)("svg", { viewBox: "0 0 100 100", className: "team-avatar-svg", children: [(0, jsx_runtime_1.jsx)("rect", { width: "100", height: "100", fill: "#06181b" }), (0, jsx_runtime_1.jsx)("circle", { cx: "50", cy: "45", r: "16", fill: "rgba(0, 255, 135, 0.15)", stroke: "#00ff87", strokeWidth: "1.5" }), (0, jsx_runtime_1.jsx)("path", { d: "M 28 80 C 28 65 38 61 50 61 C 62 61 72 65 72 80 Z", fill: "rgba(0, 255, 135, 0.1)", stroke: "#00ff87", strokeWidth: "1.5" }), (0, jsx_runtime_1.jsx)("circle", { cx: "50", cy: "45", r: "22", stroke: "rgba(0, 255, 135, 0.25)", strokeWidth: "1", strokeDasharray: "3 3" }), (0, jsx_runtime_1.jsx)("line", { x1: "50", y1: "20", x2: "50", y2: "70", stroke: "rgba(0, 255, 135, 0.2)", strokeWidth: "1" }), (0, jsx_runtime_1.jsx)("line", { x1: "25", y1: "45", x2: "75", y2: "45", stroke: "rgba(0, 255, 135, 0.2)", strokeWidth: "1" })] }))
        },
        {
            id: 3,
            name: 'Sithum Buddhika',
            regNo: 'IT22087256',
            componentName: 'Trilingual Chatbot & Context-Aware Diagnostics',
            bio: 'Architect of the Spatio-Temporal Graph Neural Network. Programs multi-agent forecast probabilities, MongoDB connections, and the trilingual chatbot conversational routing.',
            skills: ['GNN Modeling', 'Spatio-Temporal GNN', 'Database Clustering', 'Bayesian Networks', 'mBERT & Seq2Seq', 'NLP Diagnostics'],
            socials: { github: 'https://github.com/sithumbuddhika2002', linkedin: '#', email: 'mailto:sithum@lununeth.ai' },
            imageUrl: 'https://media.licdn.com/dms/image/v2/D5603AQFi_pjAq1wsTg/profile-displayphoto-scale_200_200/B56Z__u016GQAc-/0/1786701896719?e=2147483647&v=beta&t=77B1if5SeuZLRwmoMRIOK-9bbJlxza9t2BGol8Gvbuc',
            localImageUrl: '/images/team/sithum.jpg',
            avatar: ((0, jsx_runtime_1.jsxs)("svg", { viewBox: "0 0 100 100", className: "team-avatar-svg", children: [(0, jsx_runtime_1.jsx)("rect", { width: "100", height: "100", fill: "#1b1206" }), (0, jsx_runtime_1.jsx)("circle", { cx: "50", cy: "45", r: "16", fill: "rgba(245, 158, 11, 0.15)", stroke: "#f59e0b", strokeWidth: "1.5" }), (0, jsx_runtime_1.jsx)("path", { d: "M 28 80 C 28 65 38 61 50 61 C 62 61 72 65 72 80 Z", fill: "rgba(245, 158, 11, 0.1)", stroke: "#f59e0b", strokeWidth: "1.5" }), (0, jsx_runtime_1.jsx)("circle", { cx: "25", cy: "25", r: "4", fill: "#f59e0b" }), (0, jsx_runtime_1.jsx)("circle", { cx: "75", cy: "30", r: "4", fill: "#f59e0b" }), (0, jsx_runtime_1.jsx)("circle", { cx: "70", cy: "65", r: "4", fill: "#f59e0b" }), (0, jsx_runtime_1.jsx)("line", { x1: "50", y1: "45", x2: "25", y2: "25", stroke: "rgba(245, 158, 11, 0.3)", strokeWidth: "1" }), (0, jsx_runtime_1.jsx)("line", { x1: "50", y1: "45", x2: "75", y2: "30", stroke: "rgba(245, 158, 11, 0.3)", strokeWidth: "1" }), (0, jsx_runtime_1.jsx)("line", { x1: "50", y1: "45", x2: "70", y2: "65", stroke: "rgba(245, 158, 11, 0.3)", strokeWidth: "1" })] }))
        },
        {
            id: 4,
            name: 'Senura Sanketh',
            regNo: 'IT22226464',
            componentName: 'Thrips Pest Detection',
            bio: 'Responsible for PyTorch object detection networks. Trained and validated Faster R-CNN on crop-thrips coordinates, using Sliced Aided Hyper Inference (SAHI) for small pest localization.',
            skills: ['PyTorch DL', 'Object Localization', 'EfficientNet CAM', 'Model Optimization', 'YOLOv8 & SAHI', 'IPM Scaling'],
            socials: { github: '#', linkedin: '#', email: 'mailto:senura@lununeth.ai' },
            imageUrl: 'https://media.licdn.com/dms/image/v2/D5603AQF7qbKa_plifA/profile-displayphoto-scale_200_200/B56ZwFtWFQHIAc-/0/1769622301545?e=2147483647&v=beta&t=hIwUnHL47c8wk5lJBrp_hHwwSY-H-CJ7cJhpAeCP6bE',
            localImageUrl: '/images/team/senura.jpg',
            avatar: ((0, jsx_runtime_1.jsxs)("svg", { viewBox: "0 0 100 100", className: "team-avatar-svg", children: [(0, jsx_runtime_1.jsx)("rect", { width: "100", height: "100", fill: "#140a1b" }), (0, jsx_runtime_1.jsx)("circle", { cx: "50", cy: "45", r: "16", fill: "rgba(167, 139, 250, 0.15)", stroke: "#a78bfa", strokeWidth: "1.5" }), (0, jsx_runtime_1.jsx)("path", { d: "M 28 80 C 28 65 38 61 50 61 C 62 61 72 65 72 80 Z", fill: "rgba(167, 139, 250, 0.1)", stroke: "#a78bfa", strokeWidth: "1.5" }), (0, jsx_runtime_1.jsx)("rect", { x: "25", y: "20", width: "50", height: "50", stroke: "rgba(167, 139, 250, 0.25)", strokeWidth: "1", fill: "none" }), (0, jsx_runtime_1.jsx)("path", { d: "M 25 30 L 25 20 L 35 20 M 65 20 L 75 20 L 75 30 M 75 60 L 75 70 L 65 70 M 35 70 L 25 70 L 25 60", stroke: "#a78bfa", strokeWidth: "1.5", fill: "none" })] }))
        },
        {
            id: 5,
            name: 'Kaveesha Nayanaka',
            regNo: 'IT22142528',
            componentName: 'Nutrient Deficiency Detection',
            bio: 'Builds cross-platform UI features using Flutter. Connects SQLite on-device caches, optimizes local TFLite operations, and designed the leaf nutrient deficiency semantic classifier.',
            skills: ['Flutter/Dart', 'Mobile DB Caching', 'TFLite Integration', 'Offline Inference', 'Feature Fusion', 'SHAP Explainability'],
            socials: { github: '#', linkedin: '#', email: 'mailto:kaveesha@lununeth.ai' },
            imageUrl: 'https://media.licdn.com/dms/image/v2/D4E03AQF5JOIuxeYhsA/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1693420427565?e=2147483647&v=beta&t=Q0d39kxoFG-IS59jMtqxMI-Mx8h5nePRLLxhtQKV4IE',
            localImageUrl: '/images/team/kaveesha.jpg',
            avatar: ((0, jsx_runtime_1.jsxs)("svg", { viewBox: "0 0 100 100", className: "team-avatar-svg", children: [(0, jsx_runtime_1.jsx)("rect", { width: "100", height: "100", fill: "#04121b" }), (0, jsx_runtime_1.jsx)("circle", { cx: "50", cy: "45", r: "16", fill: "rgba(14, 165, 233, 0.15)", stroke: "#0ea5e9", strokeWidth: "1.5" }), (0, jsx_runtime_1.jsx)("path", { d: "M 28 80 C 28 65 38 61 50 61 C 62 61 72 65 72 80 Z", fill: "rgba(14, 165, 233, 0.1)", stroke: "#0ea5e9", strokeWidth: "1.5" }), (0, jsx_runtime_1.jsx)("rect", { x: "36", y: "15", width: "28", height: "60", rx: "3", stroke: "rgba(14, 165, 233, 0.25)", strokeWidth: "1.5", fill: "none" }), (0, jsx_runtime_1.jsx)("circle", { cx: "50", cy: "68", r: "2", fill: "#0ea5e9", opacity: "0.5" })] }))
        }
    ];
    const isSupervisorExpanded = !!expandedIds[supervisor.id];
    const isCoSupervisorExpanded = !!expandedIds[coSupervisor.id];
    return ((0, jsx_runtime_1.jsxs)("div", { className: "team-layout-wrapper", children: [(0, jsx_runtime_1.jsxs)("div", { className: "team-group-section", children: [(0, jsx_runtime_1.jsx)("div", { className: "team-group-header", children: (0, jsx_runtime_1.jsx)("h3", { className: "team-group-title", children: "Project Supervisors" }) }), (0, jsx_runtime_1.jsxs)("div", { className: "supervisor-container", children: [(0, jsx_runtime_1.jsxs)("div", { className: "glass-card team-card supervisor-card", children: [(0, jsx_runtime_1.jsx)(AvatarImage, { member: supervisor }), (0, jsx_runtime_1.jsx)("h3", { className: "team-member-name", children: supervisor.name }), supervisor.role && ((0, jsx_runtime_1.jsx)("div", { className: "team-member-role-title", children: supervisor.role })), (0, jsx_runtime_1.jsxs)("button", { type: "button", "data-action": "() => toggleExpand(supervisor.id)", className: `team-expand-btn ${isSupervisorExpanded ? 'is-active' : ''}`, "aria-expanded": isSupervisorExpanded, children: [(0, jsx_runtime_1.jsx)("span", { children: isSupervisorExpanded ? 'Hide Details' : 'View Details' }), (0, jsx_runtime_1.jsx)(lucide_react_1.ChevronDown, { className: `team-expand-chevron ${isSupervisorExpanded ? 'is-rotated' : ''}` })] }), (0, jsx_runtime_1.jsx)("div", { className: `team-expandable-drawer ${isSupervisorExpanded ? 'is-expanded' : ''}`, children: (0, jsx_runtime_1.jsx)("div", { className: "team-drawer-inner", children: (0, jsx_runtime_1.jsxs)("div", { className: "team-liquid-glass-panel", children: [(0, jsx_runtime_1.jsx)("p", { className: "team-panel-bio", children: supervisor.bio }), (0, jsx_runtime_1.jsx)("span", { className: "team-panel-skills-heading", children: "Key Domains" }), (0, jsx_runtime_1.jsx)("div", { className: "team-panel-skills-tags", children: supervisor.skills.map((skill, index) => ((0, jsx_runtime_1.jsx)("span", { className: "skill-tag", children: skill }, index))) })] }) }) }), (0, jsx_runtime_1.jsxs)("div", { className: "team-social-links", children: [supervisor.socials.linkedin && ((0, jsx_runtime_1.jsx)("a", { href: supervisor.socials.linkedin, target: "_blank", rel: "noopener noreferrer", "aria-label": "LinkedIn Profile", children: (0, jsx_runtime_1.jsx)(LinkedinIcon, {}) })), supervisor.socials.email && ((0, jsx_runtime_1.jsx)("a", { href: supervisor.socials.email, "aria-label": "Send Email", children: (0, jsx_runtime_1.jsx)(lucide_react_1.Mail, { className: "w-4 h-4" }) }))] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "glass-card team-card supervisor-card cosupervisor-card", children: [(0, jsx_runtime_1.jsx)(AvatarImage, { member: coSupervisor }), (0, jsx_runtime_1.jsx)("h3", { className: "team-member-name", children: coSupervisor.name }), coSupervisor.role && ((0, jsx_runtime_1.jsx)("div", { className: "team-member-role-title", children: coSupervisor.role })), (0, jsx_runtime_1.jsxs)("button", { type: "button", "data-action": "() => toggleExpand(coSupervisor.id)", className: `team-expand-btn ${isCoSupervisorExpanded ? 'is-active' : ''}`, "aria-expanded": isCoSupervisorExpanded, children: [(0, jsx_runtime_1.jsx)("span", { children: isCoSupervisorExpanded ? 'Hide Details' : 'View Details' }), (0, jsx_runtime_1.jsx)(lucide_react_1.ChevronDown, { className: `team-expand-chevron ${isCoSupervisorExpanded ? 'is-rotated' : ''}` })] }), (0, jsx_runtime_1.jsx)("div", { className: `team-expandable-drawer ${isCoSupervisorExpanded ? 'is-expanded' : ''}`, children: (0, jsx_runtime_1.jsx)("div", { className: "team-drawer-inner", children: (0, jsx_runtime_1.jsxs)("div", { className: "team-liquid-glass-panel", children: [(0, jsx_runtime_1.jsx)("p", { className: "team-panel-bio", children: coSupervisor.bio }), (0, jsx_runtime_1.jsx)("span", { className: "team-panel-skills-heading", children: "Key Domains" }), (0, jsx_runtime_1.jsx)("div", { className: "team-panel-skills-tags", children: coSupervisor.skills.map((skill, index) => ((0, jsx_runtime_1.jsx)("span", { className: "skill-tag", children: skill }, index))) })] }) }) }), (0, jsx_runtime_1.jsxs)("div", { className: "team-social-links", children: [coSupervisor.socials.linkedin && ((0, jsx_runtime_1.jsx)("a", { href: coSupervisor.socials.linkedin, target: "_blank", rel: "noopener noreferrer", "aria-label": "LinkedIn Profile", children: (0, jsx_runtime_1.jsx)(LinkedinIcon, {}) })), coSupervisor.socials.email && ((0, jsx_runtime_1.jsx)("a", { href: coSupervisor.socials.email, "aria-label": "Send Email", children: (0, jsx_runtime_1.jsx)(lucide_react_1.Mail, { className: "w-4 h-4" }) }))] })] })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "team-section-divider", children: [(0, jsx_runtime_1.jsx)("div", { className: "team-divider-line" }), (0, jsx_runtime_1.jsx)("span", { className: "team-divider-icon", children: (0, jsx_runtime_1.jsx)(lucide_react_1.Sparkles, { className: "w-4 h-4" }) }), (0, jsx_runtime_1.jsx)("div", { className: "team-divider-line" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "team-group-section", children: [(0, jsx_runtime_1.jsx)("div", { className: "team-group-header", children: (0, jsx_runtime_1.jsx)("h3", { className: "team-group-title", children: "Research Team" }) }), (0, jsx_runtime_1.jsx)("div", { className: "members-grid student-grid-4", children: members.map((member) => {
                            const isExpanded = !!expandedIds[member.id];
                            return ((0, jsx_runtime_1.jsxs)("div", { className: "glass-card team-card student-card", children: [(0, jsx_runtime_1.jsx)(AvatarImage, { member: member }), (0, jsx_runtime_1.jsx)("h3", { className: "team-member-name", children: member.name }), member.regNo && ((0, jsx_runtime_1.jsx)("div", { className: "team-reg-no", children: member.regNo })), member.componentName && ((0, jsx_runtime_1.jsx)("div", { className: "team-component-name", children: member.componentName })), (0, jsx_runtime_1.jsxs)("button", { type: "button", "data-action": "() => toggleExpand(member.id)", className: `team-expand-btn ${isExpanded ? 'is-active' : ''}`, "aria-expanded": isExpanded, children: [(0, jsx_runtime_1.jsx)("span", { children: isExpanded ? 'Hide Details' : 'View Details' }), (0, jsx_runtime_1.jsx)(lucide_react_1.ChevronDown, { className: `team-expand-chevron ${isExpanded ? 'is-rotated' : ''}` })] }), (0, jsx_runtime_1.jsx)("div", { className: `team-expandable-drawer ${isExpanded ? 'is-expanded' : ''}`, children: (0, jsx_runtime_1.jsx)("div", { className: "team-drawer-inner", children: (0, jsx_runtime_1.jsxs)("div", { className: "team-liquid-glass-panel", children: [(0, jsx_runtime_1.jsx)("p", { className: "team-panel-bio", children: member.bio }), (0, jsx_runtime_1.jsx)("span", { className: "team-panel-skills-heading", children: "Key Expertise" }), (0, jsx_runtime_1.jsx)("div", { className: "team-panel-skills-tags", children: member.skills.map((skill, index) => ((0, jsx_runtime_1.jsx)("span", { className: "skill-tag", children: skill }, index))) })] }) }) }), (0, jsx_runtime_1.jsxs)("div", { className: "team-social-links", children: [member.socials.github && ((0, jsx_runtime_1.jsx)("a", { href: member.socials.github, target: "_blank", rel: "noopener noreferrer", "aria-label": "GitHub Profile", children: (0, jsx_runtime_1.jsx)(GithubIcon, {}) })), member.socials.linkedin && ((0, jsx_runtime_1.jsx)("a", { href: member.socials.linkedin, target: "_blank", rel: "noopener noreferrer", "aria-label": "LinkedIn Profile", children: (0, jsx_runtime_1.jsx)(LinkedinIcon, {}) })), member.socials.email && ((0, jsx_runtime_1.jsx)("a", { href: member.socials.email, "aria-label": "Send Email", children: (0, jsx_runtime_1.jsx)(lucide_react_1.Mail, { className: "w-4 h-4" }) }))] })] }, member.id));
                        }) })] })] }));
}
