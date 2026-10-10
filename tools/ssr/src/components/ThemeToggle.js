"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ThemeToggle;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const lucide_react_1 = require("lucide-react");
function ThemeToggle() {
    const [theme, setTheme] = (0, react_1.useState)(Object.prototype.hasOwnProperty.call(globalThis.__states['ThemeToggle'] || {}, 'theme') ? globalThis.__states['ThemeToggle']['theme'] : (() => {
        if (typeof document !== 'undefined') {
            const current = document.documentElement.dataset.theme;
            if (current === 'light' || current === 'dark')
                return current;
            try {
                const stored = localStorage.getItem('lununeth-theme');
                if (stored === 'light' || stored === 'dark')
                    return stored;
            }
            catch {
                // ignore storage errors
            }
        }
        return 'light';
    }));
    (0, react_1.useEffect)(() => {
        document.documentElement.dataset.theme = theme;
        const handleStorage = (e) => {
            if (e.key === 'lununeth-theme' && (e.newValue === 'light' || e.newValue === 'dark')) {
                setTheme(e.newValue);
            }
        };
        window.addEventListener('storage', handleStorage);
        return () => window.removeEventListener('storage', handleStorage);
    }, [theme]);
    const toggleTheme = () => {
        const nextTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(nextTheme);
        document.documentElement.dataset.theme = nextTheme;
        try {
            localStorage.setItem('lununeth-theme', nextTheme);
        }
        catch {
            // ignore storage errors
        }
    };
    return ((0, jsx_runtime_1.jsx)("button", { type: "button", className: "theme-toggle-btn", "data-action": "toggleTheme", "aria-label": `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`, title: `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`, children: theme === 'dark' ? ((0, jsx_runtime_1.jsx)(lucide_react_1.Sun, { className: "w-5 h-5 theme-icon-sun", "aria-hidden": "true" })) : ((0, jsx_runtime_1.jsx)(lucide_react_1.Moon, { className: "w-5 h-5 theme-icon-moon", "aria-hidden": "true" })) }));
}
