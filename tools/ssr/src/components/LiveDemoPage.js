"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = LiveDemoPage;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const gsap_1 = require("gsap");
const ScrollTrigger_1 = require("gsap/ScrollTrigger");
const lucide_react_1 = require("lucide-react");
const ScannerDemo_1 = __importDefault(require("./ScannerDemo"));
const PestDetectorDemo_1 = __importDefault(require("./PestDetectorDemo"));
const AgriBotDemo_1 = __importDefault(require("./AgriBotDemo"));
gsap_1.gsap.registerPlugin(ScrollTrigger_1.ScrollTrigger);
const chapters = [
    { id: 'demo-leaf', label: 'Inspect the leaf', icon: lucide_react_1.ScanLine },
    { id: 'demo-pests', label: 'Look closer', icon: lucide_react_1.Bug },
    { id: 'demo-advice', label: 'Find a next step', icon: lucide_react_1.MessagesSquare },
];
function LiveDemoPage() {
    const root = (0, react_1.useRef)(null);
    const [activeChapter, setActiveChapter] = (0, react_1.useState)(Object.prototype.hasOwnProperty.call(globalThis.__states['LiveDemoPage'] || {}, 'activeChapter') ? globalThis.__states['LiveDemoPage']['activeChapter'] : (0));
    (0, react_1.useEffect)(() => {
        const page = root.current;
        if (!page)
            return;
        const media = gsap_1.gsap.matchMedia();
        const context = gsap_1.gsap.context(() => {
            // Chapter changes are discrete; scroll animation never updates React per frame.
            chapters.forEach((chapter, index) => {
                ScrollTrigger_1.ScrollTrigger.create({
                    trigger: `#${chapter.id}`,
                    start: 'top 55%',
                    end: 'bottom 55%',
                    onEnter: () => setActiveChapter(index),
                    onEnterBack: () => setActiveChapter(index),
                });
            });
            media.add('(prefers-reduced-motion: no-preference)', () => {
                gsap_1.gsap.from('.ld-hero-copy > *', { y: 20, opacity: 0, stagger: 0.08, duration: 0.7, ease: 'power2.out' });
                gsap_1.gsap.utils.toArray('.ld-reveal', page).forEach((element) => {
                    gsap_1.gsap.from(element, {
                        y: 24, opacity: 0, duration: 0.65, ease: 'power2.out',
                        scrollTrigger: { trigger: element, start: 'top 94%', once: true },
                    });
                });
            });
            media.add('(prefers-reduced-motion: no-preference) and (min-width: 900px) and (pointer: fine)', () => {
                gsap_1.gsap.to('.ld-plant', {
                    y: 65, rotation: 4, ease: 'none',
                    scrollTrigger: { trigger: '.ld-hero', start: 'top top', end: 'bottom top', scrub: 0.7 },
                });
                gsap_1.gsap.utils.toArray('.ld-chapter-copy', page).forEach((element) => {
                    gsap_1.gsap.fromTo(element, { y: 16 }, {
                        y: -16, ease: 'none',
                        scrollTrigger: { trigger: element.closest('.ld-chapter'), start: 'top bottom', end: 'bottom top', scrub: 0.6 },
                    });
                });
            });
        }, page);
        // Results can expand without leaving stale chapter positions.
        const observer = new ResizeObserver(() => ScrollTrigger_1.ScrollTrigger.refresh());
        observer.observe(page);
        return () => { observer.disconnect(); media.revert(); context.revert(); };
    }, []);
    const goTo = (id) => {
        const target = root.current?.querySelector(`#${id}`);
        target?.focus({ preventScroll: true });
        target?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'start' });
    };
    return ((0, jsx_runtime_1.jsx)("main", { id: "demo", className: "live-demo", ref: root, children: (0, jsx_runtime_1.jsxs)("div", { className: "ld-shell", children: [(0, jsx_runtime_1.jsxs)("header", { className: "ld-hero", children: [(0, jsx_runtime_1.jsxs)("div", { className: "ld-hero-copy", children: [(0, jsx_runtime_1.jsx)("p", { className: "ld-eyebrow", children: "LunuNeth AI / Interactive demo" }), (0, jsx_runtime_1.jsxs)("h1", { children: ["A closer look.", (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)("span", { children: "A clearer next step." })] }), (0, jsx_runtime_1.jsx)("p", { children: "Follow an onion crop from the first sign of trouble to a more informed decision." }), (0, jsx_runtime_1.jsxs)("button", { className: "ld-button", "data-action": "() => goTo('demo-leaf')", children: ["Explore the demo ", (0, jsx_runtime_1.jsx)(lucide_react_1.ArrowDown, { size: 18 })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "ld-hero-art", "aria-hidden": "true", children: [(0, jsx_runtime_1.jsx)("div", { className: "ld-orbit" }), (0, jsx_runtime_1.jsx)("img", { className: "ld-plant", src: "/images/real_3d_plant.png", alt: "", width: "1194", height: "711", fetchPriority: "high" }), (0, jsx_runtime_1.jsxs)("div", { className: "ld-art-caption", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.ScanLine, { size: 20 }), (0, jsx_runtime_1.jsxs)("span", { children: ["Small signs.", (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)("strong", { children: "Useful insights." })] })] })] })] }), (0, jsx_runtime_1.jsx)("nav", { className: "ld-chapters", "aria-label": "Demo chapters", children: chapters.map(({ id, label, icon: Icon }, index) => ((0, jsx_runtime_1.jsxs)("button", { "data-action": "() => goTo(id)", "aria-current": activeChapter === index ? 'step' : undefined, children: [(0, jsx_runtime_1.jsx)(Icon, { size: 19, "aria-hidden": "true" }), (0, jsx_runtime_1.jsx)("span", { children: label }), (0, jsx_runtime_1.jsx)(lucide_react_1.ArrowRight, { size: 16, className: "ld-nav-arrow" })] }, id))) }), (0, jsx_runtime_1.jsxs)("section", { id: "demo-leaf", className: "ld-chapter ld-leaf", tabIndex: -1, "aria-labelledby": "ld-leaf-title", children: [(0, jsx_runtime_1.jsx)("div", { className: "ld-chapter-copy", children: (0, jsx_runtime_1.jsxs)("div", { className: "ld-reveal", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.ScanLine, { className: "ld-chapter-icon", size: 30, "aria-hidden": "true" }), (0, jsx_runtime_1.jsxs)("h2", { id: "ld-leaf-title", children: ["Every leaf", (0, jsx_runtime_1.jsx)("br", {}), "tells a story."] }), (0, jsx_runtime_1.jsx)("p", { children: "A change in colour. A mark that wasn\u2019t there yesterday. Start by exploring what a leaf can reveal." }), (0, jsx_runtime_1.jsxs)("div", { className: "ld-instruction", children: [(0, jsx_runtime_1.jsx)("strong", { children: "Your turn" }), (0, jsx_runtime_1.jsx)("p", { children: "Choose disease or nutrient mode, then analyze the sample leaf to reveal its example result." })] }), (0, jsx_runtime_1.jsxs)("ul", { className: "ld-features", children: [(0, jsx_runtime_1.jsxs)("li", { children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Check, { size: 17 }), " Compare disease classifications"] }), (0, jsx_runtime_1.jsxs)("li", { children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Check, { size: 17 }), " Explore nitrogen, phosphorus and potassium"] })] }), (0, jsx_runtime_1.jsxs)("button", { className: "ld-text-button", "data-action": "() => goTo('demo-pests')", children: ["Next, look for pests ", (0, jsx_runtime_1.jsx)(lucide_react_1.ArrowRight, { size: 17 })] })] }) }), (0, jsx_runtime_1.jsxs)("div", { className: "ld-demo-surface ld-reveal", children: [(0, jsx_runtime_1.jsx)(ScannerDemo_1.default, {}), (0, jsx_runtime_1.jsx)("p", { className: "ld-sample-note", children: "Your app\u2019s crop images \u2022 Saved sample results" })] })] }), (0, jsx_runtime_1.jsxs)("section", { id: "demo-pests", className: "ld-chapter ld-pests", tabIndex: -1, "aria-labelledby": "ld-pest-title", children: [(0, jsx_runtime_1.jsx)("div", { className: "ld-chapter-copy", children: (0, jsx_runtime_1.jsxs)("div", { className: "ld-reveal", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Bug, { className: "ld-chapter-icon", size: 30, "aria-hidden": "true" }), (0, jsx_runtime_1.jsxs)("h2", { id: "ld-pest-title", children: ["The smallest clues", (0, jsx_runtime_1.jsx)("br", {}), "deserve attention."] }), (0, jsx_runtime_1.jsx)("p", { children: "Not every crop concern starts with disease. Look between the leaves to explore how pest detection locates thrips." }), (0, jsx_runtime_1.jsxs)("div", { className: "ld-instruction", children: [(0, jsx_runtime_1.jsx)("strong", { children: "Take a closer look" }), (0, jsx_runtime_1.jsx)("p", { children: "Explore the five detections from the app. Tap a result to understand its count, confidence or severity." })] }), (0, jsx_runtime_1.jsxs)("button", { className: "ld-text-button", "data-action": "() => goTo('demo-advice')", children: ["Now, ask a question ", (0, jsx_runtime_1.jsx)(lucide_react_1.ArrowRight, { size: 17 })] })] }) }), (0, jsx_runtime_1.jsxs)("div", { className: "ld-demo-surface ld-reveal", children: [(0, jsx_runtime_1.jsx)(PestDetectorDemo_1.default, {}), (0, jsx_runtime_1.jsx)("p", { className: "ld-sample-note", children: "Example detections \u2022 No live camera required" })] })] }), (0, jsx_runtime_1.jsxs)("section", { id: "demo-advice", className: "ld-chapter ld-advice", tabIndex: -1, "aria-labelledby": "ld-advice-title", children: [(0, jsx_runtime_1.jsx)("div", { className: "ld-chapter-copy", children: (0, jsx_runtime_1.jsxs)("div", { className: "ld-reveal", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.MessagesSquare, { className: "ld-chapter-icon", size: 30, "aria-hidden": "true" }), (0, jsx_runtime_1.jsxs)("h2", { id: "ld-advice-title", children: ["Turn a concern", (0, jsx_runtime_1.jsx)("br", {}), "into a conversation."] }), (0, jsx_runtime_1.jsx)("p", { children: "You\u2019ve inspected the leaf and looked for pests. Explore what to ask next with AgriBot." }), (0, jsx_runtime_1.jsxs)("div", { className: "ld-instruction", children: [(0, jsx_runtime_1.jsx)("strong", { children: "A conversation in your language" }), (0, jsx_runtime_1.jsx)("p", { children: "Choose English, Sinhala or Singlish. Share a crop concern, then answer the follow-up questions using the easy reply buttons." })] }), (0, jsx_runtime_1.jsx)("p", { className: "ld-sample-note", children: "This guided preview uses scripted replies, not a live AI service." })] }) }), (0, jsx_runtime_1.jsx)("div", { className: "ld-demo-surface ld-reveal", children: (0, jsx_runtime_1.jsx)(AgriBotDemo_1.default, {}) })] }), (0, jsx_runtime_1.jsxs)("section", { className: "ld-ending ld-reveal", "aria-labelledby": "ld-ending-title", children: [(0, jsx_runtime_1.jsx)("h2", { id: "ld-ending-title", children: "Observe. Understand. Act." }), (0, jsx_runtime_1.jsx)("p", { children: "Three perspectives on one crop. Revisit a demo to explore a different question." }), (0, jsx_runtime_1.jsxs)("button", { className: "ld-text-button", "data-action": "() => goTo('demo-leaf')", children: ["Try another leaf scan ", (0, jsx_runtime_1.jsx)(lucide_react_1.ArrowRight, { size: 18 })] })] })] }) }));
}
