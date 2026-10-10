"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ProjectOverview;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const lucide_react_1 = require("lucide-react");
const ResearchChapterContent_1 = __importDefault(require("./ResearchChapterContent"));
const documentCategories_1 = require("../documentCategories");
// Shared Drive files: add new file IDs here when the library grows.
const pdfDocuments = [
    {
        "filename": "Proposal_Report_Chatbot.pdf",
        "category": "Proposal_Report",
        "id": "1tyc0kAX2G4yXZh67ypgDqJy-gSJ9uWIo"
    },
    {
        "filename": "Proposal_Report_NutrientDeficiency.pdf",
        "category": "Proposal_Report",
        "id": "1x7cRCzKOT-WVzMtEnuL102adVuDy0_lQ"
    },
    {
        "filename": "Proposal_Report_PestDetection.pdf",
        "category": "Proposal_Report",
        "id": "1ULuUPPtT-x6RK7g3YCa4tXqmuVitdMYv"
    },
    {
        "filename": "Proposal_Report_PurpleBlotch.pdf",
        "category": "Proposal_Report",
        "id": "1m54nfIYee1cOdRqLmxeE5hPPnMwlDciu"
    },
    {
        "filename": "Progress Presentation 1.pptx",
        "category": "Presentations",
        "id": "1jSXjZCnUwlP-0nh9qNgy5Jd-1jzfBZjq"
    },
    {
        "filename": "Progress Presentation 2.pptx",
        "category": "Presentations",
        "id": "16YrKbcL6E5imNAnoITRy-DljIuulK9ca"
    },
    {
        "filename": "Research Article.pdf",
        "category": "Research_paper",
        "id": "1EJp3N10PP9yu7wIdOto7_a8n3tU7ARRX"
    }
].map(item => ({
    ...item,
    title: item.filename.replace(/\.[^.]+$/, '').replace(/[_-]+/g, ' '),
    format: item.filename.split('.').pop()?.toUpperCase(),
    url: `https://drive.google.com/file/d/${item.id}/view`,
    downloadUrl: `https://drive.google.com/uc?export=download&id=${item.id}`,
}));
const chapters = [
    { title: 'Literature Survey', icon: lucide_react_1.BookOpen, label: 'The foundation' },
    { title: 'Research Gap', icon: lucide_react_1.Search, label: 'The opportunity' },
    { title: 'Research Objectives', icon: lucide_react_1.Target, label: 'Our direction' },
    { title: 'Methodology & Technologies', icon: lucide_react_1.Network, label: 'The approach & tools' },
];
const assessments = [
    { name: 'Project Charter', completed: true },
    { name: 'Project Proposal', completed: true },
    { name: 'Progress Presentation I', completed: true },
    { name: 'Progress Presentation II', completed: true },
    { name: 'Final Assessment', completed: false },
];
const completedAssessments = assessments.filter(assessment => assessment.completed).length;
function scrollToResearch(event) {
    event.preventDefault();
    const target = document.getElementById(event.currentTarget.hash.slice(1));
    target?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
    target?.focus({ preventScroll: true });
}
function ProjectOverview() {
    const [chapter, setChapter] = (0, react_1.useState)(Object.prototype.hasOwnProperty.call(globalThis.__states['ProjectOverview'] || {}, 'chapter') ? globalThis.__states['ProjectOverview']['chapter'] : (0));
    const [query, setQuery] = (0, react_1.useState)(Object.prototype.hasOwnProperty.call(globalThis.__states['ProjectOverview'] || {}, 'query') ? globalThis.__states['ProjectOverview']['query'] : (''));
    const search = query.trim().toLowerCase();
    const visiblePdfs = pdfDocuments.filter(item => `${item.title} ${item.filename} ${(0, documentCategories_1.documentCategoryLabel)(item.category)}`.toLowerCase().includes(search));
    const categories = documentCategories_1.documentCategories.filter(category => category.id !== 'Other' || pdfDocuments.some(item => item.category === 'Other'));
    return ((0, jsx_runtime_1.jsxs)("div", { className: "research-overview", children: [(0, jsx_runtime_1.jsxs)("header", { className: "research-hero research-status-hero", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsxs)("p", { className: "research-eyebrow", children: [(0, jsx_runtime_1.jsx)("span", {}), " LunuNeth AI / Research overview"] }), (0, jsx_runtime_1.jsxs)("h1", { children: ["Our research.", (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)("span", { children: "Progress & milestones." })] }), (0, jsx_runtime_1.jsx)("p", { className: "research-intro", children: "Follow the progress of LunuNeth AI, from the project charter to the final assessment." }), (0, jsx_runtime_1.jsxs)("div", { className: "research-assessment-progress", children: [(0, jsx_runtime_1.jsxs)("label", { htmlFor: "assessment-progress", children: [(0, jsx_runtime_1.jsxs)("strong", { children: [completedAssessments, " of ", assessments.length] }), " assessments completed"] }), (0, jsx_runtime_1.jsx)("progress", { id: "assessment-progress", value: completedAssessments, max: assessments.length }), (0, jsx_runtime_1.jsxs)("p", { children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Clock3, { size: 16, "aria-hidden": "true" }), " Up next: Final Assessment"] })] }), (0, jsx_runtime_1.jsxs)("a", { className: "research-primary", href: "#research-chapters", "data-action": "scrollToResearch", children: ["Explore the research ", (0, jsx_runtime_1.jsx)(lucide_react_1.ArrowDown, { size: 16 })] })] }), (0, jsx_runtime_1.jsx)("div", { className: "research-assessment-card", children: (0, jsx_runtime_1.jsxs)("table", { className: "research-assessment-table", children: [(0, jsx_runtime_1.jsx)("caption", { children: "Research assessment status" }), (0, jsx_runtime_1.jsx)("thead", { children: (0, jsx_runtime_1.jsxs)("tr", { children: [(0, jsx_runtime_1.jsx)("th", { scope: "col", children: "Assessment name" }), (0, jsx_runtime_1.jsx)("th", { scope: "col", children: "Status" })] }) }), (0, jsx_runtime_1.jsx)("tbody", { children: assessments.map(assessment => ((0, jsx_runtime_1.jsxs)("tr", { children: [(0, jsx_runtime_1.jsx)("th", { scope: "row", children: assessment.name }), (0, jsx_runtime_1.jsx)("td", { children: (0, jsx_runtime_1.jsxs)("span", { className: `research-assessment-status ${assessment.completed ? 'is-completed' : 'is-upcoming'}`, children: [assessment.completed ? (0, jsx_runtime_1.jsx)(lucide_react_1.CheckCircle2, { size: 16, "aria-hidden": "true" }) : (0, jsx_runtime_1.jsx)(lucide_react_1.Clock3, { size: 16, "aria-hidden": "true" }), assessment.completed ? 'Completed' : 'Upcoming'] }) })] }, assessment.name))) })] }) })] }), (0, jsx_runtime_1.jsxs)("div", { className: "research-facts", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("strong", { children: "04" }), (0, jsx_runtime_1.jsx)("span", { children: "Research components" })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("strong", { children: "03" }), (0, jsx_runtime_1.jsx)("span", { children: "Language modes" })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Layers, { size: 24 }), (0, jsx_runtime_1.jsx)("span", { children: "Mobile-first approach" })] }), (0, jsx_runtime_1.jsxs)("a", { href: "#research-documents", "data-action": "scrollToResearch", children: ["Project documents ", (0, jsx_runtime_1.jsx)(lucide_react_1.ArrowDown, { size: 16 })] })] }), (0, jsx_runtime_1.jsxs)("section", { id: "research-chapters", tabIndex: -1, className: "research-workspace", "aria-label": "Research chapters", children: [(0, jsx_runtime_1.jsxs)("nav", { className: "research-chapters", "aria-label": "Choose a research section", children: [(0, jsx_runtime_1.jsx)("p", { className: "research-eyebrow", children: "Inside the research" }), chapters.map((item, index) => (0, jsx_runtime_1.jsxs)("button", { id: `chapter-${index}`, "aria-controls": "research-panel", "aria-current": chapter === index ? 'true' : undefined, className: chapter === index ? 'is-selected' : '', "data-action": "() => setChapter(index)", children: [(0, jsx_runtime_1.jsxs)("span", { className: "research-chapter-number", children: ["0", index + 1] }), (0, jsx_runtime_1.jsxs)("span", { children: [item.title, (0, jsx_runtime_1.jsx)("small", { children: item.label })] }), (0, jsx_runtime_1.jsx)(lucide_react_1.ArrowRight, { size: 16 })] }, item.title)), (0, jsx_runtime_1.jsxs)("a", { href: "#research-documents", "data-action": "scrollToResearch", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.FileText, { size: 16 }), " Browse proposal documents"] })] }), (0, jsx_runtime_1.jsxs)("article", { id: "research-panel", className: "research-panel", "aria-labelledby": `chapter-${chapter}`, children: [(0, jsx_runtime_1.jsxs)("div", { className: "research-panel-content", children: [(0, jsx_runtime_1.jsx)("h2", { children: chapters[chapter].title }), (0, jsx_runtime_1.jsx)(ResearchChapterContent_1.default, { chapter: chapter })] }, chapter), (0, jsx_runtime_1.jsxs)("footer", { className: "research-panel-footer", children: [(0, jsx_runtime_1.jsxs)("span", { children: ["0", chapter + 1, " ", (0, jsx_runtime_1.jsx)("span", { children: "/ 04 chapters" })] }), (0, jsx_runtime_1.jsxs)("button", { "data-action": "() => setChapter((chapter + 1) % chapters.length)", children: [chapter === chapters.length - 1 ? 'Back to Literature Survey' : `Next: ${chapters[chapter + 1].title}`, (0, jsx_runtime_1.jsx)(lucide_react_1.ArrowRight, { size: 16 })] })] })] })] }), (0, jsx_runtime_1.jsxs)("section", { id: "research-documents", tabIndex: -1, className: "research-documents", "aria-labelledby": "documents-title", children: [(0, jsx_runtime_1.jsxs)("div", { className: "research-documents-header", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("p", { className: "research-eyebrow", children: "The project library" }), (0, jsx_runtime_1.jsx)("h2", { id: "documents-title", children: "Research documents" }), (0, jsx_runtime_1.jsx)("p", { children: "Browse research documents by category. View or download individual files from Google Drive." })] }), (0, jsx_runtime_1.jsxs)("label", { className: "research-search", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Search, { size: 18 }), (0, jsx_runtime_1.jsx)("input", { "aria-label": "Search research documents", value: query, onChange: event => setQuery(event.target.value), placeholder: "Find a document or category\u2026", type: "search" })] })] }), (0, jsx_runtime_1.jsxs)("p", { className: "research-result-count", role: "status", children: [visiblePdfs.length, " of ", pdfDocuments.length, " documents"] }), (0, jsx_runtime_1.jsx)("div", { className: "research-category-sections", children: categories.map(category => {
                            const documents = visiblePdfs.filter(item => item.category === category.id);
                            const total = pdfDocuments.filter(item => item.category === category.id).length;
                            return ((0, jsx_runtime_1.jsxs)("section", { className: "research-document-category", "aria-labelledby": `documents-${category.id}`, children: [(0, jsx_runtime_1.jsxs)("header", { className: "research-category-heading", children: [(0, jsx_runtime_1.jsx)("h3", { id: `documents-${category.id}`, children: category.label }), (0, jsx_runtime_1.jsxs)("span", { children: [search ? `${documents.length} of ${total}` : total, " ", total === 1 ? 'document' : 'documents'] })] }), documents.length > 0 ? (0, jsx_runtime_1.jsx)("div", { className: "research-pdf-list", children: documents.map(item => (0, jsx_runtime_1.jsxs)("article", { className: "research-pdf-row", children: [(0, jsx_runtime_1.jsx)("span", { className: "research-document-icon research-file-type-icon", "aria-hidden": "true", children: item.format === 'PPTX' ? ((0, jsx_runtime_1.jsxs)("svg", { width: "40", height: "44", viewBox: "0 0 48 48", focusable: "false", children: [(0, jsx_runtime_1.jsx)("circle", { cx: "29", cy: "24", r: "18", fill: "#D35230" }), (0, jsx_runtime_1.jsx)("path", { d: "M29 6a18 18 0 0 1 18 18H29Z", fill: "#FF8F6B" }), (0, jsx_runtime_1.jsx)("path", { d: "M29 24h18a18 18 0 0 1-18 18Z", fill: "#ED6C47" }), (0, jsx_runtime_1.jsx)("rect", { x: "1", y: "11", width: "26", height: "26", rx: "3", fill: "#B7472A" }), (0, jsx_runtime_1.jsx)("path", { d: "M10 16h6a5 5 0 0 1 0 10h-3v6h-3Zm3 3v4h3a2 2 0 0 0 0-4Z", fill: "#FFF" })] })) : ((0, jsx_runtime_1.jsxs)("svg", { width: "36", height: "44", viewBox: "0 0 36 44", focusable: "false", children: [(0, jsx_runtime_1.jsx)("path", { d: "M4 1h19l9 9v30a3 3 0 0 1-3 3H4a3 3 0 0 1-3-3V4a3 3 0 0 1 3-3Z", fill: "#FFF", stroke: "#D6D6D6" }), (0, jsx_runtime_1.jsx)("path", { d: "M23 1v9h9", fill: "#F2F2F2", stroke: "#D6D6D6" }), (0, jsx_runtime_1.jsx)("path", { d: "M9 28c4-5 9-16 8-19-2-4-5 7 4 14 8 5 10-1 4-1-7-1-19 4-18 7 1 2 4-1 5-3", fill: "none", stroke: "#E5252A", strokeWidth: "1.7", strokeLinecap: "round", strokeLinejoin: "round" }), (0, jsx_runtime_1.jsx)("rect", { x: "0", y: "32", width: "33", height: "12", rx: "2", fill: "#E5252A" }), (0, jsx_runtime_1.jsx)("text", { x: "16.5", y: "41", textAnchor: "middle", fontFamily: "Arial, sans-serif", fontSize: "9", fontWeight: "700", fill: "#FFF", children: "PDF" })] })) }), (0, jsx_runtime_1.jsxs)("div", { className: "research-pdf-title", children: [(0, jsx_runtime_1.jsx)("h4", { children: item.title }), (0, jsx_runtime_1.jsxs)("p", { children: [item.format, " \u00B7 ", item.filename] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "research-pdf-actions", children: [(0, jsx_runtime_1.jsxs)("a", { href: item.url, target: "_blank", rel: "noopener noreferrer", "aria-label": `View ${item.title} on Google Drive in a new tab`, children: ["View ", (0, jsx_runtime_1.jsx)(lucide_react_1.ArrowRight, { size: 16 })] }), (0, jsx_runtime_1.jsxs)("a", { href: item.downloadUrl, target: "_blank", rel: "noopener noreferrer", "aria-label": `Download ${item.title}`, children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Download, { size: 16 }), " Download"] })] })] }, item.url)) }) : (0, jsx_runtime_1.jsx)("p", { className: "research-category-empty", children: total > 0 ? 'No documents match your search in this category.' : 'No documents available yet.' })] }, category.id));
                        }) }), search && (0, jsx_runtime_1.jsx)("div", { className: "research-empty", children: (0, jsx_runtime_1.jsx)("button", { "data-action": "() => setQuery('')", children: "Clear search" }) })] })] }));
}
