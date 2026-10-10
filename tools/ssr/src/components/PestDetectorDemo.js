"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = PestDetectorDemo;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const gsap_1 = require("gsap");
const react_2 = require("@gsap/react");
const lucide_react_1 = require("lucide-react");
const DemoAppImage_1 = require("./DemoAppImage");
gsap_1.gsap.registerPlugin(react_2.useGSAP);
const metrics = [
    { value: '5', label: 'Detections', detail: 'Five bounding boxes are reported in this app capture. Each box marks a possible thrips location on the leaf.' },
    { value: '91.9%', label: 'Confidence', detail: 'The app reports 91.9% confidence for this sample. This is a result for one image, not the overall accuracy of the model.' },
    { value: 'Low', label: 'Severity', detail: 'This saved result is classified as low severity. The preview does not assess a new crop or make a treatment decision.' },
];
function PestDetectorDemo() {
    const [selected, setSelected] = (0, react_1.useState)(Object.prototype.hasOwnProperty.call(globalThis.__states['PestDetectorDemo'] || {}, 'selected') ? globalThis.__states['PestDetectorDemo']['selected'] : (0));
    const [scanning, setScanning] = (0, react_1.useState)(Object.prototype.hasOwnProperty.call(globalThis.__states['PestDetectorDemo'] || {}, 'scanning') ? globalThis.__states['PestDetectorDemo']['scanning'] : (false));
    const root = (0, react_1.useRef)(null);
    const sweep = (0, react_1.useRef)(null);
    const { contextSafe } = (0, react_2.useGSAP)({ scope: root });
    const replay = () => contextSafe(() => {
        if (scanning)
            return;
        setSelected(0);
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches)
            return;
        setScanning(true);
        gsap_1.gsap.fromTo(sweep.current, { opacity: 1, scaleY: 0 }, { scaleY: 1, duration: 1.1, ease: 'power1.inOut', onComplete: () => { gsap_1.gsap.set(sweep.current, { opacity: 0 }); setScanning(false); } });
    })();
    return ((0, jsx_runtime_1.jsxs)("div", { className: "ld-app-demo", ref: root, children: [(0, jsx_runtime_1.jsxs)("div", { className: "ld-app-panel", children: [(0, jsx_runtime_1.jsxs)("header", { className: "ld-panel-header", children: [(0, jsx_runtime_1.jsxs)("span", { children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Bug, { size: 18 }), " Pest detection"] }), (0, jsx_runtime_1.jsx)("span", { className: "ld-preview-label", children: "Faster R-CNN" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "ld-photo-stage", children: [(0, jsx_runtime_1.jsx)(DemoAppImage_1.DemoAppImage, { screen: "pest" }), (0, jsx_runtime_1.jsx)("div", { className: "ld-scan-sweep", ref: sweep, "aria-hidden": "true" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "ld-panel-content", children: [(0, jsx_runtime_1.jsxs)("div", { className: "ld-pest-heading", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h3", { children: "Thrips detected" }), (0, jsx_runtime_1.jsx)("p", { className: "ld-help-text", children: "Saved result from the mobile app" })] }), (0, jsx_runtime_1.jsx)("button", { className: "ld-icon-button", disabled: scanning, "data-action": "replay", "aria-label": "Replay sample pest scan", children: (0, jsx_runtime_1.jsx)(lucide_react_1.RotateCcw, { size: 18 }) })] }), (0, jsx_runtime_1.jsx)("div", { className: "ld-metrics", role: "group", "aria-label": "Explore detection results", children: metrics.map((metric, index) => (0, jsx_runtime_1.jsxs)("button", { "aria-pressed": selected === index, "data-action": "() => setSelected(index)", children: [(0, jsx_runtime_1.jsx)("strong", { children: metric.value }), (0, jsx_runtime_1.jsx)("span", { children: metric.label })] }, metric.label)) }), (0, jsx_runtime_1.jsx)("p", { className: "ld-metric-detail", "aria-live": "polite", children: scanning ? 'Replaying the saved detection. No new image is being analyzed.' : metrics[selected].detail }), (0, jsx_runtime_1.jsxs)("details", { className: "ld-climate-details", children: [(0, jsx_runtime_1.jsxs)("summary", { children: [(0, jsx_runtime_1.jsx)(lucide_react_1.CloudSun, { size: 21 }), (0, jsx_runtime_1.jsx)("span", { children: "What is thrips climate risk?" }), (0, jsx_runtime_1.jsx)(lucide_react_1.ChevronDown, { size: 16 })] }), (0, jsx_runtime_1.jsx)("p", { children: "The mobile app also offers a climate-risk view using weather and crop data. This web preview shows only the supplied image result; no live weather or location is collected." })] })] })] }), (0, jsx_runtime_1.jsx)(DemoAppImage_1.DemoScreenReference, { screen: "pest" })] }));
}
