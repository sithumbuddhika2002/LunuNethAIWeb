"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = WindowsInstallPopup;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const lucide_react_1 = require("lucide-react");
function WindowsInstallPopup() {
    const [isVisible, setIsVisible] = (0, react_1.useState)(Object.prototype.hasOwnProperty.call(globalThis.__states['WindowsInstallPopup'] || {}, 'isVisible') ? globalThis.__states['WindowsInstallPopup']['isVisible'] : (false));
    (0, react_1.useEffect)(() => {
        // 1. Detect if the user is on a Windows device
        const isWindows = /Windows/i.test(navigator.userAgent);
        // 2. Check if the user already downloaded the app
        const hasDownloaded = localStorage.getItem('lununeth_windows_app_downloaded');
        // Only show if the user is on Windows and has not downloaded it yet
        if (isWindows && !hasDownloaded) {
            const timer = setTimeout(() => {
                setIsVisible(true);
            }, 1500); // 1.5 second delay for smooth appearance
            return () => clearTimeout(timer);
        }
    }, []);
    const handleDismiss = () => {
        // Close the popup for the current session
        setIsVisible(false);
    };
    const handleInstallClick = () => {
        // Hide the popup and mark as downloaded in localStorage
        setIsVisible(false);
        localStorage.setItem('lununeth_windows_app_downloaded', 'true');
    };
    if (!isVisible)
        return null;
    return ((0, jsx_runtime_1.jsx)("div", { className: `install-popup-backdrop ${isVisible ? 'visible' : ''}`, "data-action": "handleDismiss", children: (0, jsx_runtime_1.jsxs)("div", { className: "install-popup-container", "data-action": "(e) => e.stopPropagation()", children: [(0, jsx_runtime_1.jsx)("button", { "data-action": "handleDismiss", className: "install-popup-close", "aria-label": "Close installation prompt", children: (0, jsx_runtime_1.jsx)(lucide_react_1.X, { className: "w-5 h-5" }) }), (0, jsx_runtime_1.jsxs)("div", { className: "install-popup-header", children: [(0, jsx_runtime_1.jsx)("div", { className: "install-popup-icon-wrapper", style: { padding: '2px', overflow: 'hidden' }, children: (0, jsx_runtime_1.jsx)("img", { src: "/logo.jpeg", alt: "LunuNeth AI Logo", style: { width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' } }) }), (0, jsx_runtime_1.jsx)("h3", { className: "gradient-text install-popup-title", children: "LunuNeth AI for Windows" }), (0, jsx_runtime_1.jsx)("p", { className: "install-popup-description", children: "Diagnose onion crop diseases and nutrient deficiencies offline using native desktop intelligence on your PC." })] }), (0, jsx_runtime_1.jsxs)("div", { className: "install-popup-features", children: [(0, jsx_runtime_1.jsxs)("div", { className: "install-popup-feature-item", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Monitor, { className: "w-5 h-5" }), (0, jsx_runtime_1.jsx)("span", { children: "Native desktop performance & local execution" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "install-popup-feature-item", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.ShieldCheck, { className: "w-5 h-5" }), (0, jsx_runtime_1.jsx)("span", { children: "Secure offline processing" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "install-popup-feature-item", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Cpu, { className: "w-5 h-5" }), (0, jsx_runtime_1.jsx)("span", { children: "GPU acceleration for instant diagnostics" })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "install-popup-actions", children: [(0, jsx_runtime_1.jsxs)("a", { href: "https://github.com/sithumbuddhika2002/LunuNethAI-Website/releases/download/v1.0.0/LunuNeth_AI_Setup.exe", className: "gradient-btn install-popup-btn-primary", "data-action": "handleInstallClick", download: "LunuNeth_AI_Setup.exe", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Download, { className: "w-5 h-5" }), "Download Windows App"] }), (0, jsx_runtime_1.jsx)("button", { "data-action": "handleDismiss", className: "install-popup-btn-secondary", children: "Maybe Later" })] })] }) }));
}
