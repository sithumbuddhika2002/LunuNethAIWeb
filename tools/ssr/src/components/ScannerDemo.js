"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ScannerDemo;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const gsap_1 = require("gsap");
const react_2 = require("@gsap/react");
const lucide_react_1 = require("lucide-react");
const DemoAppImage_1 = require("./DemoAppImage");
gsap_1.gsap.registerPlugin(react_2.useGSAP);
// Values transcribed from the supplied app captures, not model accuracy claims.
const probabilities = [
    ['Purple Blotch Severe', '38.4%'], ['Anthracnose Severe', '29.9%'],
    ['Purple Blotch Early', '18.5%'], ['Healthy', '7.0%'], ['Anthracnose Early', '6.2%'],
];
const nutrients = {
    N: { name: 'Nitrogen', score: 26, note: 'The app sample recommends monitoring and re-checking in 2 weeks.', fertilizer: 'Urea (46% N)' },
    P: { name: 'Phosphorus', score: 13, note: 'The app sample reports adequate levels and suggests re-checking in 3 weeks.', fertilizer: 'Triple Super Phosphate (TSP)' },
    K: { name: 'Potassium', score: 22, note: 'The app sample marks this stress score as adequate. A potassium recommendation is not visible in this capture.', fertilizer: 'Potassium status' },
};
function ScannerDemo() {
    const [mode, setMode] = (0, react_1.useState)(Object.prototype.hasOwnProperty.call(globalThis.__states['ScannerDemo'] || {}, 'mode') ? globalThis.__states['ScannerDemo']['mode'] : ('disease'));
    const [scanning, setScanning] = (0, react_1.useState)(Object.prototype.hasOwnProperty.call(globalThis.__states['ScannerDemo'] || {}, 'scanning') ? globalThis.__states['ScannerDemo']['scanning'] : (false));
    const [complete, setComplete] = (0, react_1.useState)(Object.prototype.hasOwnProperty.call(globalThis.__states['ScannerDemo'] || {}, 'complete') ? globalThis.__states['ScannerDemo']['complete'] : (false));
    const [nutrient, setNutrient] = (0, react_1.useState)(Object.prototype.hasOwnProperty.call(globalThis.__states['ScannerDemo'] || {}, 'nutrient') ? globalThis.__states['ScannerDemo']['nutrient'] : ('N'));
    const root = (0, react_1.useRef)(null);
    const line = (0, react_1.useRef)(null);
    const { contextSafe } = (0, react_2.useGSAP)({ scope: root });
    const scan = () => contextSafe(() => {
        if (scanning)
            return;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            setComplete(true);
            return;
        }
        setScanning(true);
        setComplete(false);
        gsap_1.gsap.fromTo(line.current, { scaleY: 0, opacity: 1 }, {
            scaleY: 1, duration: 1.1, ease: 'power1.inOut',
            onComplete: () => {
                gsap_1.gsap.set(line.current, { opacity: 0 });
                setScanning(false);
                setComplete(true);
            },
        });
    })();
    const selected = nutrients[nutrient];
    return ((0, jsx_runtime_1.jsxs)("div", { className: "ld-app-demo", ref: root, children: [(0, jsx_runtime_1.jsxs)("div", { className: "ld-mode-switch", role: "group", "aria-label": "Choose an analysis", children: [(0, jsx_runtime_1.jsxs)("button", { "aria-pressed": mode === 'disease', disabled: scanning, "data-action": "() => { setMode('disease'); setComplete(false); }", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Leaf, { size: 17 }), " Disease"] }), (0, jsx_runtime_1.jsxs)("button", { "aria-pressed": mode === 'nutrient', disabled: scanning, "data-action": "() => { setMode('nutrient'); setComplete(false); }", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.FlaskConical, { size: 17 }), " Nutrients"] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "ld-app-panel", children: [(0, jsx_runtime_1.jsxs)("header", { className: "ld-panel-header", children: [(0, jsx_runtime_1.jsx)("span", { children: mode === 'disease' ? 'Leaf disease check' : 'Nutrient health check' }), (0, jsx_runtime_1.jsx)("span", { className: "ld-preview-label", children: "Sample preview" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "ld-photo-stage", children: [(0, jsx_runtime_1.jsx)(DemoAppImage_1.DemoAppImage, { screen: mode }, mode), (0, jsx_runtime_1.jsx)("div", { className: "ld-scan-sweep", ref: line, "aria-hidden": "true" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "ld-panel-content", children: [(0, jsx_runtime_1.jsxs)("button", { className: "ld-button ld-scan-button", "data-action": "scan", disabled: scanning, children: [complete ? (0, jsx_runtime_1.jsx)(lucide_react_1.RotateCcw, { size: 17 }) : (0, jsx_runtime_1.jsx)(lucide_react_1.ScanLine, { size: 17 }), scanning ? 'Replaying analysis...' : complete ? 'Replay sample scan' : 'Analyze this sample'] }), (0, jsx_runtime_1.jsx)("div", { "aria-live": "polite", "aria-busy": scanning, children: !complete ? (0, jsx_runtime_1.jsx)("p", { className: "ld-help-text", children: scanning ? 'Revealing the saved app result.' : 'Try the crop photo from our mobile app. No camera or upload needed.' }) : (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("p", { className: "ld-complete", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Check, { size: 15 }), " Sample analysis complete"] }), (0, jsx_runtime_1.jsxs)("div", { className: "ld-result-heading", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("span", { children: mode === 'disease' ? 'Diagnosis result' : 'Primary deficiency detected' }), (0, jsx_runtime_1.jsx)("h3", { children: mode === 'disease' ? 'Purple Blotch (Severe)' : 'N-Deficiency' })] }), (0, jsx_runtime_1.jsxs)("div", { className: "ld-confidence", children: [(0, jsx_runtime_1.jsx)("strong", { children: mode === 'disease' ? '38.4%' : '31.1%' }), (0, jsx_runtime_1.jsx)("span", { children: "confidence" })] })] }), mode === 'disease' ? (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("p", { className: "ld-help-text", children: "Mid stage \u00B7 This supplied app capture uses mock mode. Scores below are example class probabilities." }), (0, jsx_runtime_1.jsxs)("details", { className: "ld-result-details", open: true, children: [(0, jsx_runtime_1.jsx)("summary", { children: "Compare classifications" }), (0, jsx_runtime_1.jsx)("dl", { className: "ld-probabilities", children: probabilities.map(([label, value], index) => (0, jsx_runtime_1.jsxs)("div", { className: index === 0 ? 'is-leading' : '', children: [(0, jsx_runtime_1.jsx)("dt", { children: label }), (0, jsx_runtime_1.jsx)("dd", { children: value })] }, label)) })] })] }) : (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("dl", { className: "ld-nutrient-classes", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("dt", { children: "Healthy" }), (0, jsx_runtime_1.jsx)("dd", { children: "27.6%" })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("dt", { children: "K-Deficiency" }), (0, jsx_runtime_1.jsx)("dd", { children: "25.7%" })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("dt", { children: "N-Deficiency" }), (0, jsx_runtime_1.jsx)("dd", { children: "31.1%" })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("dt", { children: "P-Deficiency" }), (0, jsx_runtime_1.jsx)("dd", { children: "15.6%" })] })] }), (0, jsx_runtime_1.jsx)("h4", { className: "ld-small-heading", children: "Explore NPK stress scores" }), (0, jsx_runtime_1.jsx)("div", { className: "ld-npk", role: "group", "aria-label": "Select a nutrient", children: Object.keys(nutrients).map((key) => (0, jsx_runtime_1.jsxs)("button", { "data-action": "() => setNutrient(key)", "aria-pressed": nutrient === key, "aria-label": `${nutrients[key].name}, ${nutrients[key].score}% stress, adequate`, children: [(0, jsx_runtime_1.jsx)("span", { children: key }), (0, jsx_runtime_1.jsxs)("strong", { children: [nutrients[key].score, "%"] }), (0, jsx_runtime_1.jsx)("small", { children: "Adequate" })] }, key)) }), (0, jsx_runtime_1.jsxs)("div", { className: "ld-nutrient-note", children: [(0, jsx_runtime_1.jsx)("strong", { children: selected.fertilizer }), (0, jsx_runtime_1.jsx)("p", { children: selected.note })] })] })] }) })] })] }), (0, jsx_runtime_1.jsx)(DemoAppImage_1.DemoScreenReference, { screen: mode }, mode)] }));
}
