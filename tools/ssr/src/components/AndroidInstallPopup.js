"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AndroidInstallPopup;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const lucide_react_1 = require("lucide-react");
function AndroidInstallPopup() {
    const [isVisible, setIsVisible] = (0, react_1.useState)(Object.prototype.hasOwnProperty.call(globalThis.__states['AndroidInstallPopup'] || {}, 'isVisible') ? globalThis.__states['AndroidInstallPopup']['isVisible'] : (false));
    (0, react_1.useEffect)(() => {
        // 1. Detect if the user is on an Android device
        const isAndroid = /Android/i.test(navigator.userAgent);
        // Future platforms support hooks (not active for prompt display yet)
        // const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
        // const isWindows = /Windows/i.test(navigator.userAgent);
        // 2. Check if the user already downloaded the app
        const hasDownloaded = localStorage.getItem('lununeth_android_app_downloaded');
        // Only show if the user is on Android and has not downloaded it yet
        if (isAndroid && !hasDownloaded) {
            const timer = setTimeout(() => {
                setIsVisible(true);
            }, 1500); // 1.5 second delay for smooth appearance
            return () => clearTimeout(timer);
        }
    }, []);
    const handleDismiss = () => {
        // Just close the popup for the current session/page view
        setIsVisible(false);
    };
    const handleInstallClick = () => {
        // Hide the popup and mark as downloaded in localStorage
        setIsVisible(false);
        localStorage.setItem('lununeth_android_app_downloaded', 'true');
    };
    if (!isVisible)
        return null;
    return ((0, jsx_runtime_1.jsx)("div", { className: `install-popup-backdrop ${isVisible ? 'visible' : ''}`, children: (0, jsx_runtime_1.jsxs)("div", { className: "install-popup-container", "data-action": "(e) => e.stopPropagation()", children: [(0, jsx_runtime_1.jsx)("button", { "data-action": "handleDismiss", className: "install-popup-close", "aria-label": "Close installation prompt", children: (0, jsx_runtime_1.jsx)(lucide_react_1.X, { className: "w-5 h-5" }) }), (0, jsx_runtime_1.jsxs)("div", { className: "install-popup-header", children: [(0, jsx_runtime_1.jsx)("div", { className: "install-popup-icon-wrapper", style: { padding: '2px', overflow: 'hidden' }, children: (0, jsx_runtime_1.jsx)("img", { src: "/logo.jpeg", alt: "LunuNeth AI Logo", style: { width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' } }) }), (0, jsx_runtime_1.jsx)("h3", { className: "gradient-text install-popup-title", children: "LunuNeth AI for Android" }), (0, jsx_runtime_1.jsx)("p", { className: "install-popup-description", children: "Diagnose onion crop diseases and nutrient deficiencies offline using real-time edge intelligence." })] }), (0, jsx_runtime_1.jsxs)("div", { className: "install-popup-features", children: [(0, jsx_runtime_1.jsxs)("div", { className: "install-popup-feature-item", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.ShieldCheck, { className: "w-5 h-5" }), (0, jsx_runtime_1.jsx)("span", { children: "Direct secure APK installation" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "install-popup-feature-item", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Cpu, { className: "w-5 h-5" }), (0, jsx_runtime_1.jsx)("span", { children: "Local TFLite offline inference models" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "install-popup-feature-item", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Zap, { className: "w-5 h-5" }), (0, jsx_runtime_1.jsx)("span", { children: "Real-time scanner with instant results" })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "install-popup-actions", children: [(0, jsx_runtime_1.jsxs)("a", { href: "/downloads/android/LunuNeth_AI.apk", className: "gradient-btn install-popup-btn-primary", "data-action": "handleInstallClick", download: "LunuNeth_AI.apk", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Download, { className: "w-5 h-5" }), "Install Android App"] }), (0, jsx_runtime_1.jsx)("button", { "data-action": "handleDismiss", className: "install-popup-btn-secondary", children: "Maybe Later" })] })] }) }));
}
