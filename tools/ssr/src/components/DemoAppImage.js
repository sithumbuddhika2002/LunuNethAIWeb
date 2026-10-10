"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DemoAppImage = DemoAppImage;
exports.DemoScreenReference = DemoScreenReference;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const lucide_react_1 = require("lucide-react");
const screens = {
    disease: { src: '/images/5.jpeg', alt: 'Onion leaf with a purple lesion from the LunuNeth disease screen' },
    nutrient: { src: '/images/17.jpeg', alt: 'Pale onion leaves held for nutrient analysis in the LunuNeth app' },
    pest: { src: '/images/11.jpeg', alt: 'Thrips on an onion leaf with five detection boxes from the LunuNeth app' },
    chat: { src: '/images/6.jpeg', alt: 'LunuNeth mobile chatbot showing a Sinhala follow-up question' },
};
function DemoAppImage({ screen }) {
    const [failed, setFailed] = (0, react_1.useState)(Object.prototype.hasOwnProperty.call(globalThis.__states['DemoAppImage'] || {}, 'failed') ? globalThis.__states['DemoAppImage']['failed'] : (false));
    return ((0, jsx_runtime_1.jsx)("div", { className: `ld-crop-image ld-crop-${screen}`, children: failed ? (0, jsx_runtime_1.jsxs)("p", { className: "ld-image-error", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.ImageOff, { size: 24 }), " Sample image unavailable. You can still explore the example results."] }) :
            (0, jsx_runtime_1.jsx)("img", { src: screens[screen].src, alt: screens[screen].alt, width: "738", height: "1600", loading: "lazy", decoding: "async", onError: () => setFailed(true) }) }));
}
function DemoScreenReference({ screen }) {
    const [open, setOpen] = (0, react_1.useState)(Object.prototype.hasOwnProperty.call(globalThis.__states['DemoAppImage'] || {}, 'open') ? globalThis.__states['DemoAppImage']['open'] : (false));
    return ((0, jsx_runtime_1.jsxs)("details", { className: "ld-screen-reference", onToggle: (event) => setOpen(event.currentTarget.open), children: [(0, jsx_runtime_1.jsx)("summary", { children: "See the original app screen" }), open && (0, jsx_runtime_1.jsx)("img", { src: screens[screen].src, alt: screens[screen].alt, width: "738", height: "1600", loading: "lazy" }), (0, jsx_runtime_1.jsx)("p", { children: "Actual app capture. The interactive example above reproduces this sample, not a new analysis." })] }));
}
