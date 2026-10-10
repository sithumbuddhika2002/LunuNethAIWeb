"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AdminDashboard;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importStar(require("react"));
const react_dom_1 = require("react-dom");
const lucide_react_1 = require("lucide-react");
const logsManager_1 = require("../utils/logsManager");
// Canvas-based image compression helper to keep Base64 strings small (under 60KB) for localStorage
const compressImage = (base64Str, maxWidth = 500, maxHeight = 500) => {
    return new Promise((resolve) => {
        const img = new Image();
        img.src = base64Str;
        img.onload = () => {
            const canvas = document.createElement('canvas');
            let width = img.width;
            let height = img.height;
            if (width > height) {
                if (width > maxWidth) {
                    height = Math.round((height * maxWidth) / width);
                    width = maxWidth;
                }
            }
            else {
                if (height > maxHeight) {
                    width = Math.round((width * maxHeight) / height);
                    height = maxHeight;
                }
            }
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.drawImage(img, 0, 0, width, height);
                // Export as JPEG with 0.7 quality to significantly reduce localStorage byte footprint
                resolve(canvas.toDataURL('image/jpeg', 0.7));
            }
            else {
                resolve(base64Str);
            }
        };
        img.onerror = () => {
            resolve(base64Str);
        };
    });
};
const getCategoryShortLabel = (cat) => {
    if (cat.includes('Purple Blotch'))
        return 'Purple Blotch';
    if (cat.includes('Trilingual Chatbot'))
        return 'Trilingual Chatbot';
    if (cat.includes('Thrips'))
        return 'Thrips Pest';
    if (cat.includes('Nutrient Deficiency'))
        return 'Nutrient Deficiency';
    if (cat.includes('Mobile App'))
        return 'App Screens';
    return cat;
};
function AdminDashboard() {
    // Auth state
    const [isAuthenticated, setIsAuthenticated] = (0, react_1.useState)(Object.prototype.hasOwnProperty.call(globalThis.__states['AdminDashboard'] || {}, 'isAuthenticated') ? globalThis.__states['AdminDashboard']['isAuthenticated'] : (() => {
        if (typeof window === 'undefined')
            return false;
        return sessionStorage.getItem('lununeth_admin_auth') === 'true';
    }));
    const [passwordInput, setPasswordInput] = (0, react_1.useState)(Object.prototype.hasOwnProperty.call(globalThis.__states['AdminDashboard'] || {}, 'passwordInput') ? globalThis.__states['AdminDashboard']['passwordInput'] : (''));
    const [authError, setAuthError] = (0, react_1.useState)(Object.prototype.hasOwnProperty.call(globalThis.__states['AdminDashboard'] || {}, 'authError') ? globalThis.__states['AdminDashboard']['authError'] : (''));
    // Dashboard navigation state
    const [activeTab, setActiveTab] = (0, react_1.useState)(Object.prototype.hasOwnProperty.call(globalThis.__states['AdminDashboard'] || {}, 'activeTab') ? globalThis.__states['AdminDashboard']['activeTab'] : ('overview'));
    // Logs state
    const [logs, setLogs] = (0, react_1.useState)(Object.prototype.hasOwnProperty.call(globalThis.__states['AdminDashboard'] || {}, 'logs') ? globalThis.__states['AdminDashboard']['logs'] : ([]));
    // Table search and filter state
    const [searchQuery, setSearchQuery] = (0, react_1.useState)(Object.prototype.hasOwnProperty.call(globalThis.__states['AdminDashboard'] || {}, 'searchQuery') ? globalThis.__states['AdminDashboard']['searchQuery'] : (''));
    const [typeFilter, setTypeFilter] = (0, react_1.useState)(Object.prototype.hasOwnProperty.call(globalThis.__states['AdminDashboard'] || {}, 'typeFilter') ? globalThis.__states['AdminDashboard']['typeFilter'] : ('all'));
    // Editor Modal state
    const [isModalOpen, setIsModalOpen] = (0, react_1.useState)(Object.prototype.hasOwnProperty.call(globalThis.__states['AdminDashboard'] || {}, 'isModalOpen') ? globalThis.__states['AdminDashboard']['isModalOpen'] : (false));
    const [editingLog, setEditingLog] = (0, react_1.useState)(Object.prototype.hasOwnProperty.call(globalThis.__states['AdminDashboard'] || {}, 'editingLog') ? globalThis.__states['AdminDashboard']['editingLog'] : (null));
    // Form states
    const [formTitle, setFormTitle] = (0, react_1.useState)(Object.prototype.hasOwnProperty.call(globalThis.__states['AdminDashboard'] || {}, 'formTitle') ? globalThis.__states['AdminDashboard']['formTitle'] : (''));
    const [formCategory, setFormCategory] = (0, react_1.useState)(Object.prototype.hasOwnProperty.call(globalThis.__states['AdminDashboard'] || {}, 'formCategory') ? globalThis.__states['AdminDashboard']['formCategory'] : ('Purple Blotch Disease Detection'));
    const [formType, setFormType] = (0, react_1.useState)(Object.prototype.hasOwnProperty.call(globalThis.__states['AdminDashboard'] || {}, 'formType') ? globalThis.__states['AdminDashboard']['formType'] : ('image'));
    const [formBadge, setFormBadge] = (0, react_1.useState)(Object.prototype.hasOwnProperty.call(globalThis.__states['AdminDashboard'] || {}, 'formBadge') ? globalThis.__states['AdminDashboard']['formBadge'] : (''));
    const [formDesc, setFormDesc] = (0, react_1.useState)(Object.prototype.hasOwnProperty.call(globalThis.__states['AdminDashboard'] || {}, 'formDesc') ? globalThis.__states['AdminDashboard']['formDesc'] : (''));
    const [mediaSource, setMediaSource] = (0, react_1.useState)(Object.prototype.hasOwnProperty.call(globalThis.__states['AdminDashboard'] || {}, 'mediaSource') ? globalThis.__states['AdminDashboard']['mediaSource'] : ('path'));
    const [formImagePath, setFormImagePath] = (0, react_1.useState)(Object.prototype.hasOwnProperty.call(globalThis.__states['AdminDashboard'] || {}, 'formImagePath') ? globalThis.__states['AdminDashboard']['formImagePath'] : (''));
    const [formPreset, setFormPreset] = (0, react_1.useState)(Object.prototype.hasOwnProperty.call(globalThis.__states['AdminDashboard'] || {}, 'formPreset') ? globalThis.__states['AdminDashboard']['formPreset'] : ('vision-rcnn'));
    const [formSvgMarkup, setFormSvgMarkup] = (0, react_1.useState)(Object.prototype.hasOwnProperty.call(globalThis.__states['AdminDashboard'] || {}, 'formSvgMarkup') ? globalThis.__states['AdminDashboard']['formSvgMarkup'] : (''));
    const [formSpecs, setFormSpecs] = (0, react_1.useState)(Object.prototype.hasOwnProperty.call(globalThis.__states['AdminDashboard'] || {}, 'formSpecs') ? globalThis.__states['AdminDashboard']['formSpecs'] : ([
        { label: 'Model Architecture', value: '' },
        { label: 'Target Coordinates', value: '' },
        { label: 'Avg Inference Speed', value: '' },
        { label: 'Precision Metric', value: '' }
    ]));
    const [formTelemetry, setFormTelemetry] = (0, react_1.useState)(Object.prototype.hasOwnProperty.call(globalThis.__states['AdminDashboard'] || {}, 'formTelemetry') ? globalThis.__states['AdminDashboard']['formTelemetry'] : (''));
    // Delete confirmation modal state
    const [deletingLogId, setDeletingLogId] = (0, react_1.useState)(Object.prototype.hasOwnProperty.call(globalThis.__states['AdminDashboard'] || {}, 'deletingLogId') ? globalThis.__states['AdminDashboard']['deletingLogId'] : (null));
    // Toast feedback state
    const [toastMessage, setToastMessage] = (0, react_1.useState)(Object.prototype.hasOwnProperty.call(globalThis.__states['AdminDashboard'] || {}, 'toastMessage') ? globalThis.__states['AdminDashboard']['toastMessage'] : (null));
    const [toastVisible, setToastVisible] = (0, react_1.useState)(Object.prototype.hasOwnProperty.call(globalThis.__states['AdminDashboard'] || {}, 'toastVisible') ? globalThis.__states['AdminDashboard']['toastVisible'] : (false));
    // Handle local image file uploading
    const handleFileUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file)
            return;
        if (file.size > 8 * 1024 * 1024) {
            triggerToast('File size too large. Choose an image under 8MB.');
            return;
        }
        const reader = new FileReader();
        reader.onload = async (event) => {
            const base64 = event.target?.result;
            if (base64) {
                triggerToast('Compressing image for database...');
                try {
                    const compressed = await compressImage(base64);
                    setFormImagePath(compressed);
                    triggerToast('Image optimized and loaded successfully!');
                }
                catch (err) {
                    setFormImagePath(base64);
                    triggerToast('Image loaded successfully.');
                }
            }
        };
        reader.readAsDataURL(file);
    };
    // Load logs on mount and handle updates
    (0, react_1.useEffect)(() => {
        setLogs((0, logsManager_1.getLogs)());
        const handleLogsUpdate = () => {
            setLogs((0, logsManager_1.getLogs)());
        };
        window.addEventListener('lununeth_logs_updated', handleLogsUpdate);
        return () => {
            window.removeEventListener('lununeth_logs_updated', handleLogsUpdate);
        };
    }, []);
    // Show toast helper
    const triggerToast = (message) => {
        setToastMessage(message);
        setToastVisible(true);
        setTimeout(() => {
            setToastVisible(false);
        }, 3000);
    };
    // Handle release file upload
    const [uploadingRelease, setUploadingRelease] = (0, react_1.useState)(Object.prototype.hasOwnProperty.call(globalThis.__states['AdminDashboard'] || {}, 'uploadingRelease') ? globalThis.__states['AdminDashboard']['uploadingRelease'] : (null));
    const [uploadProgress, setUploadProgress] = (0, react_1.useState)(Object.prototype.hasOwnProperty.call(globalThis.__states['AdminDashboard'] || {}, 'uploadProgress') ? globalThis.__states['AdminDashboard']['uploadProgress'] : (0));
    const handleReleaseUpload = (platform, file) => {
        if (!file)
            return;
        // Basic validation
        if (platform === 'android' && !file.name.endsWith('.apk')) {
            triggerToast('Invalid file format. Please upload an .apk file for Android.');
            return;
        }
        if (platform === 'windows' && !file.name.endsWith('.exe')) {
            triggerToast('Invalid file format. Please upload an .exe file for Windows.');
            return;
        }
        setUploadingRelease(platform);
        setUploadProgress(0);
        triggerToast(`Uploading ${platform} release...`);
        const formData = new FormData();
        formData.append('file', file);
        formData.append('platform', platform);
        const xhr = new XMLHttpRequest();
        xhr.open('POST', '/upload_release.php', true);
        xhr.upload.onprogress = (event) => {
            if (event.lengthComputable) {
                const percentComplete = Math.round((event.loaded / event.total) * 100);
                setUploadProgress(percentComplete);
            }
        };
        xhr.onload = () => {
            setUploadingRelease(null);
            if (xhr.status === 200) {
                try {
                    const result = JSON.parse(xhr.responseText);
                    if (result.status === 'success') {
                        triggerToast(`${platform.charAt(0).toUpperCase() + platform.slice(1)} app updated successfully!`);
                    }
                    else {
                        triggerToast(`Upload failed: ${result.message}`);
                    }
                }
                catch (e) {
                    triggerToast(`Invalid response from server.`);
                }
            }
            else {
                triggerToast(`Server error during upload.`);
            }
        };
        xhr.onerror = () => {
            setUploadingRelease(null);
            triggerToast(`Network error while uploading ${platform} release.`);
        };
        xhr.send(formData);
    };
    // Auth handler
    const handleLogin = (e) => {
        e.preventDefault();
        if (passwordInput === 'admin123') {
            setIsAuthenticated(true);
            sessionStorage.setItem('lununeth_admin_auth', 'true');
            setAuthError('');
            setPasswordInput('');
            triggerToast('Authenticated successfully. Welcome back!');
        }
        else {
            setAuthError('Invalid admin password code. Please try again.');
        }
    };
    const handleLogout = () => {
        setIsAuthenticated(false);
        sessionStorage.removeItem('lununeth_admin_auth');
        triggerToast('Logged out of Admin Portal');
    };
    // Open editor for adding new log
    const handleAddNew = () => {
        setEditingLog(null);
        setFormTitle('');
        // Pre-populate category based on active tab
        if (activeTab !== 'overview') {
            setFormCategory(activeTab);
        }
        else {
            setFormCategory('Purple Blotch Disease Detection');
        }
        setFormType('image');
        setFormBadge('');
        setFormDesc('');
        setMediaSource('path');
        setFormImagePath('');
        setFormPreset('vision-rcnn');
        setFormSvgMarkup('');
        setFormSpecs([
            { label: 'Model Architecture', value: 'YOLOv8 Edge' },
            { label: 'Target Coordinates', value: 'Bounding boxes [.json]' },
            { label: 'Avg Inference Speed', value: '18.5 ms' },
            { label: 'Precision Metric (mAP50)', value: '93.2%' }
        ]);
        setFormTelemetry(JSON.stringify({
            log_metadata: {
                id: "LUNUNETH-LOG-TEMP",
                timestamp: new Date().toISOString(),
                category: "PURPLE BLOTCH DETECTION",
                log_type: "IMAGE"
            },
            telemetry: {
                node_status: "ACTIVE",
                pipeline_integrity: 1.00
            }
        }, null, 2));
        setIsModalOpen(true);
    };
    // Open editor for editing existing log
    const handleEdit = (log) => {
        setEditingLog(log);
        setFormTitle(log.title);
        setFormCategory(log.category);
        setFormType(log.type);
        setFormBadge(log.badge);
        setFormDesc(log.desc);
        if (log.imagePath) {
            setMediaSource('path');
            setFormImagePath(log.imagePath);
        }
        else if (log.svgMarkup) {
            setMediaSource('markup');
            setFormSvgMarkup(log.svgMarkup);
        }
        else {
            setMediaSource('preset');
            setFormPreset(log.svgPreset || 'vision-rcnn');
        }
        setFormSpecs(log.specs && log.specs.length > 0 ? [...log.specs] : [
            { label: 'Model Architecture', value: '' },
            { label: 'Target Coordinates', value: '' },
            { label: 'Avg Inference Speed', value: '' },
            { label: 'Precision Metric', value: '' }
        ]);
        setFormTelemetry(log.telemetryJson || '');
        setIsModalOpen(true);
    };
    // Save log (Insert or Update)
    const handleSaveLog = (e) => {
        e.preventDefault();
        if (!formTitle.trim()) {
            triggerToast('Title field is required');
            return;
        }
        // Validate JSON
        let cleanTelemetry = formTelemetry;
        if (cleanTelemetry.trim()) {
            try {
                JSON.parse(cleanTelemetry);
            }
            catch (err) {
                triggerToast('Raw Telemetry is not valid JSON!');
                return;
            }
        }
        else {
            cleanTelemetry = '{}';
        }
        const payload = {
            title: formTitle,
            category: formCategory,
            type: formType,
            badge: formBadge,
            desc: formDesc,
            specs: formSpecs.filter(s => s.label.trim() !== ''),
            telemetryJson: cleanTelemetry,
            ...(mediaSource === 'path' ? { imagePath: formImagePath } : {}),
            ...(mediaSource === 'preset' ? { svgPreset: formPreset } : {}),
            ...(mediaSource === 'markup' ? { svgMarkup: formSvgMarkup } : {})
        };
        if (editingLog) {
            const updated = {
                ...editingLog,
                ...payload
            };
            (0, logsManager_1.updateLog)(updated);
            triggerToast(`"${formTitle}" updated successfully!`);
        }
        else {
            (0, logsManager_1.addLog)(payload);
            triggerToast(`"${formTitle}" added to database!`);
        }
        setIsModalOpen(false);
    };
    // Confirm delete
    const handleDeleteConfirm = (id) => {
        setDeletingLogId(id);
    };
    const handleExecuteDelete = () => {
        if (deletingLogId !== null) {
            const logToDelete = logs.find(l => l.id === deletingLogId);
            (0, logsManager_1.deleteLog)(deletingLogId);
            triggerToast(`"${logToDelete?.title}" deleted successfully.`);
            setDeletingLogId(null);
        }
    };
    // Filter logs for table list based on active category tab, search query, and media type
    const filteredLogs = logs.filter(log => {
        const matchesSearch = log.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            log.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
            log.badge.toLowerCase().includes(searchQuery.toLowerCase());
        // Category filter is based directly on the active tab
        const matchesCategory = activeTab === 'overview' ? true : log.category === activeTab;
        const matchesType = typeFilter === 'all' || log.type === typeFilter;
        return matchesSearch && matchesCategory && matchesType;
    });
    // Calculate statistics
    const totalLogsCount = logs.length;
    const imageCount = logs.filter(l => l.type === 'image').length;
    const videoCount = logs.filter(l => l.type === 'video').length;
    const categoryCounts = logsManager_1.CATEGORIES.reduce((acc, cat) => {
        acc[cat] = logs.filter(l => l.category === cat).length;
        return acc;
    }, {});
    // Render Login state
    if (!isAuthenticated) {
        return ((0, jsx_runtime_1.jsx)("div", { className: "admin-login-wrapper flex-center", children: (0, jsx_runtime_1.jsxs)("div", { className: "glass-card login-card", style: { maxWidth: '450px', width: '100%', padding: '2.5rem', textAlign: 'center' }, children: [(0, jsx_runtime_1.jsx)("div", { className: "login-icon-box flex-center mx-auto", children: (0, jsx_runtime_1.jsx)(lucide_react_1.Lock, { className: "w-8 h-8 text-emerald-400" }) }), (0, jsx_runtime_1.jsx)("h2", { style: { fontSize: '1.75rem', marginTop: '1.5rem', marginBottom: '0.5rem', color: 'var(--accent-primary)' }, children: "LunuNeth AI Admin" }), (0, jsx_runtime_1.jsx)("p", { style: { fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '2rem' }, children: "Secured administrator dashboard portal. Enter passkey below to manage database." }), (0, jsx_runtime_1.jsxs)("form", { onSubmit: handleLogin, children: [(0, jsx_runtime_1.jsxs)("div", { className: "form-group", style: { textAlign: 'left', marginBottom: '1.5rem' }, children: [(0, jsx_runtime_1.jsx)("label", { className: "form-label", htmlFor: "password", children: "Administrator Passcode" }), (0, jsx_runtime_1.jsx)("input", { type: "password", id: "password", className: "form-control", placeholder: "Enter admin passcode", value: passwordInput, onChange: (e) => setPasswordInput(e.target.value), style: { textAlign: 'center', letterSpacing: '0.1em', fontSize: '1.1rem' }, required: true }), authError && ((0, jsx_runtime_1.jsx)("div", { style: { color: '#ef4444', fontSize: '0.75rem', marginTop: '0.5rem', textAlign: 'center' }, children: authError }))] }), (0, jsx_runtime_1.jsxs)("button", { type: "submit", className: "solid-btn w-full", style: { padding: '0.75rem' }, children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Unlock, { className: "w-4 h-4 mr-2 inline-block" }), " Unlock Dashboard"] })] }), (0, jsx_runtime_1.jsxs)("div", { style: { marginTop: '2rem', padding: '0.75rem', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '6px', fontSize: '0.75rem', color: 'var(--text-muted)' }, children: [(0, jsx_runtime_1.jsx)("strong", { children: "Default Code:" }), " ", (0, jsx_runtime_1.jsx)("code", { style: { color: 'var(--accent-secondary)', fontSize: '0.8rem', background: 'var(--bg-glass)', padding: '2px 6px', borderRadius: '4px' }, children: "admin123" })] })] }) }));
    }
    return ((0, jsx_runtime_1.jsxs)("div", { className: "admin-dashboard-container", children: [(0, jsx_runtime_1.jsx)("div", { className: "admin-header", children: (0, jsx_runtime_1.jsxs)("div", { className: "admin-title-row", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex-center", style: { gap: '0.75rem' }, children: [(0, jsx_runtime_1.jsx)("div", { className: "admin-badge flex-center", children: (0, jsx_runtime_1.jsx)(lucide_react_1.Database, { size: 16 }) }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h2", { className: "gradient-text", style: { fontSize: '1.75rem', marginBottom: 0 }, children: "LunuNeth AI Console" }), (0, jsx_runtime_1.jsx)("p", { style: { fontSize: '0.8rem', margin: 0 }, children: "Database management & research metrics portal" })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "admin-nav-actions", children: [(0, jsx_runtime_1.jsxs)("button", { "data-action": "() => setActiveTab('overview')", className: `admin-tab-btn ${activeTab === 'overview' ? 'active' : ''}`, children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Layout, { size: 15 }), " Overview"] }), logsManager_1.CATEGORIES.map((cat, i) => ((0, jsx_runtime_1.jsxs)("button", { "data-action": "() => setActiveTab(cat as any)", className: `admin-tab-btn ${activeTab === cat ? 'active' : ''}`, title: `Manage logs under ${cat}`, style: { fontSize: '0.8rem', padding: '0.4rem 0.8rem' }, children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Folder, { size: 13 }), " ", getCategoryShortLabel(cat)] }, i))), (0, jsx_runtime_1.jsxs)("button", { "data-action": "() => setActiveTab('releases')", className: `admin-tab-btn ${activeTab === 'releases' ? 'active' : ''}`, title: "Manage App Releases", style: { fontSize: '0.8rem', padding: '0.4rem 0.8rem' }, children: [(0, jsx_runtime_1.jsx)(lucide_react_1.UploadCloud, { size: 13 }), " App Releases"] }), (0, jsx_runtime_1.jsxs)("button", { "data-action": "handleLogout", className: "admin-logout-btn flex-center", style: { marginLeft: 'auto' }, children: [(0, jsx_runtime_1.jsx)(lucide_react_1.LogOut, { size: 15 }), " Logout"] })] })] }) }), (0, jsx_runtime_1.jsxs)("div", { className: "admin-body", children: [activeTab === 'overview' && ((0, jsx_runtime_1.jsxs)("div", { className: "admin-overview-tab animate-fade-in", children: [(0, jsx_runtime_1.jsxs)("div", { className: "admin-stats-grid", children: [(0, jsx_runtime_1.jsxs)("div", { className: "glass-card stat-item-card", children: [(0, jsx_runtime_1.jsx)("span", { className: "stat-label", children: "Total Logs Dynamic" }), (0, jsx_runtime_1.jsx)("span", { className: "stat-value", children: totalLogsCount }), (0, jsx_runtime_1.jsxs)("div", { className: "stat-footer-bar text-emerald-400", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.FileText, { size: 12, className: "inline mr-1" }), " Dynamic collection"] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "glass-card stat-item-card", children: [(0, jsx_runtime_1.jsx)("span", { className: "stat-label", children: "Visual Image Logs" }), (0, jsx_runtime_1.jsx)("span", { className: "stat-value", children: imageCount }), (0, jsx_runtime_1.jsxs)("div", { className: "stat-footer-bar", style: { color: 'var(--accent-secondary)' }, children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Image, { size: 12, className: "inline mr-1" }), " Scanners & Drone maps"] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "glass-card stat-item-card", children: [(0, jsx_runtime_1.jsx)("span", { className: "stat-label", children: "Inference Video Logs" }), (0, jsx_runtime_1.jsx)("span", { className: "stat-value", children: videoCount }), (0, jsx_runtime_1.jsxs)("div", { className: "stat-footer-bar", style: { color: '#0ea5e9' }, children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Video, { size: 12, className: "inline mr-1" }), " Model tracking stream"] })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "admin-layout-split", children: [(0, jsx_runtime_1.jsxs)("div", { className: "glass-card category-breakdown-card", style: { padding: '2rem' }, children: [(0, jsx_runtime_1.jsxs)("h3", { style: { fontSize: '1.25rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }, children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Folder, { size: 18, className: "text-emerald-400" }), " Research Domain Distribution"] }), (0, jsx_runtime_1.jsx)("div", { className: "category-bars", children: logsManager_1.CATEGORIES.map((cat, i) => {
                                                    const count = categoryCounts[cat] || 0;
                                                    const percent = totalLogsCount > 0 ? (count / totalLogsCount) * 100 : 0;
                                                    return ((0, jsx_runtime_1.jsxs)("div", { className: "category-bar-row", style: { marginBottom: '1.25rem' }, children: [(0, jsx_runtime_1.jsxs)("div", { className: "category-bar-labels", children: [(0, jsx_runtime_1.jsx)("span", { className: "cat-name", children: cat }), (0, jsx_runtime_1.jsxs)("span", { className: "cat-count", children: [(0, jsx_runtime_1.jsx)("strong", { children: count }), " logs"] })] }), (0, jsx_runtime_1.jsx)("div", { className: "cat-progress-bg", children: (0, jsx_runtime_1.jsx)("div", { className: "cat-progress-fill", style: {
                                                                        width: `${percent}%`,
                                                                        background: 'var(--accent-primary)'
                                                                    } }) })] }, i));
                                                }) })] }), (0, jsx_runtime_1.jsxs)("div", { className: "glass-card recent-activity-card", style: { padding: '2rem' }, children: [(0, jsx_runtime_1.jsxs)("h3", { style: { fontSize: '1.25rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }, children: [(0, jsx_runtime_1.jsx)(lucide_react_1.SlidersHorizontal, { size: 18, className: "text-emerald-400" }), " Recent Log Listings"] }), (0, jsx_runtime_1.jsxs)("div", { className: "recent-logs-list", children: [logs.slice(-5).reverse().map((log) => ((0, jsx_runtime_1.jsxs)("div", { className: "recent-log-row flex-center", children: [(0, jsx_runtime_1.jsx)("div", { className: "log-type-indicator", children: log.type === 'video' ? (0, jsx_runtime_1.jsx)(lucide_react_1.Video, { size: 14, className: "text-sky-400" }) : (0, jsx_runtime_1.jsx)(lucide_react_1.Image, { size: 14, className: "text-emerald-400" }) }), (0, jsx_runtime_1.jsxs)("div", { className: "log-row-details", children: [(0, jsx_runtime_1.jsx)("span", { className: "log-row-title", children: log.title }), (0, jsx_runtime_1.jsx)("span", { className: "log-row-category", children: log.category })] }), (0, jsx_runtime_1.jsx)("span", { className: "log-row-date", children: log.date })] }, log.id))), logs.length === 0 && ((0, jsx_runtime_1.jsx)("div", { style: { textAlign: 'center', color: 'var(--text-muted)', padding: '2rem' }, children: "No logs currently defined. Click \"Manage Logs\" to create one." }))] })] })] })] })), activeTab === 'releases' && ((0, jsx_runtime_1.jsxs)("div", { className: "admin-releases-tab animate-fade-in", style: { padding: '2rem' }, children: [(0, jsx_runtime_1.jsxs)("h3", { style: { fontSize: '1.25rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }, children: [(0, jsx_runtime_1.jsx)(lucide_react_1.UploadCloud, { size: 18, className: "text-emerald-400" }), " Manage App Releases"] }), (0, jsx_runtime_1.jsx)("p", { style: { color: 'var(--text-secondary)', marginBottom: '2rem' }, children: "Upload new production releases for the LunuNeth AI applications. These files will be immediately available to users via the Download Section. (Note: Requires PHP backend via /upload_release.php)" }), (0, jsx_runtime_1.jsxs)("div", { className: "admin-stats-grid", children: [(0, jsx_runtime_1.jsxs)("div", { className: "glass-card stat-item-card", style: { display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '2rem', position: 'relative', overflow: 'hidden' }, children: [(0, jsx_runtime_1.jsx)("div", { style: { background: 'rgba(16, 185, 129, 0.1)', padding: '1rem', borderRadius: '50%', color: '#10b981', marginBottom: '1rem', transition: 'all 0.3s ease', transform: uploadingRelease === 'android' ? 'scale(1.1)' : 'scale(1)', animation: uploadingRelease === 'android' ? 'pulse 1.5s infinite' : 'none' }, children: (0, jsx_runtime_1.jsx)(lucide_react_1.Smartphone, { size: 32 }) }), (0, jsx_runtime_1.jsx)("h4", { style: { fontSize: '1.1rem', marginBottom: '0.5rem' }, children: "Android App (APK)" }), (0, jsx_runtime_1.jsxs)("p", { style: { fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }, children: ["Upload the latest Android .apk bundle. Ensure it is named ", (0, jsx_runtime_1.jsx)("code", { children: "LunuNeth_AI.apk" }), "."] }), uploadingRelease === 'android' ? ((0, jsx_runtime_1.jsxs)("div", { style: { width: '100%', marginTop: 'auto' }, children: [(0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '0.5rem', color: '#10b981' }, children: [(0, jsx_runtime_1.jsx)("span", { children: "Uploading..." }), (0, jsx_runtime_1.jsxs)("span", { children: [uploadProgress, "%"] })] }), (0, jsx_runtime_1.jsx)("div", { style: { width: '100%', height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }, children: (0, jsx_runtime_1.jsx)("div", { style: { width: `${uploadProgress}%`, height: '100%', background: '#10b981', transition: 'width 0.3s ease' } }) })] })) : ((0, jsx_runtime_1.jsxs)("label", { className: "gradient-btn", style: { cursor: 'pointer', width: '100%', justifyContent: 'center' }, children: ["Upload Android APK", (0, jsx_runtime_1.jsx)("input", { type: "file", accept: ".apk", style: { display: 'none' }, disabled: uploadingRelease !== null, onChange: (e) => handleReleaseUpload('android', e.target.files?.[0]) })] }))] }), (0, jsx_runtime_1.jsxs)("div", { className: "glass-card stat-item-card", style: { display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '2rem', position: 'relative', overflow: 'hidden' }, children: [(0, jsx_runtime_1.jsx)("div", { style: { background: 'rgba(0, 164, 239, 0.1)', padding: '1rem', borderRadius: '50%', color: '#00a4ef', marginBottom: '1rem', transition: 'all 0.3s ease', transform: uploadingRelease === 'windows' ? 'scale(1.1)' : 'scale(1)', animation: uploadingRelease === 'windows' ? 'pulse 1.5s infinite' : 'none' }, children: (0, jsx_runtime_1.jsx)(lucide_react_1.Monitor, { size: 32 }) }), (0, jsx_runtime_1.jsx)("h4", { style: { fontSize: '1.1rem', marginBottom: '0.5rem' }, children: "Windows Setup (EXE)" }), (0, jsx_runtime_1.jsx)("p", { style: { fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }, children: "Upload the latest Windows .exe installer. Make sure it is compiled." }), uploadingRelease === 'windows' ? ((0, jsx_runtime_1.jsxs)("div", { style: { width: '100%', marginTop: 'auto' }, children: [(0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '0.5rem', color: '#00a4ef' }, children: [(0, jsx_runtime_1.jsx)("span", { children: "Uploading..." }), (0, jsx_runtime_1.jsxs)("span", { children: [uploadProgress, "%"] })] }), (0, jsx_runtime_1.jsx)("div", { style: { width: '100%', height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }, children: (0, jsx_runtime_1.jsx)("div", { style: { width: `${uploadProgress}%`, height: '100%', background: 'var(--accent-primary)', transition: 'width 0.3s ease' } }) })] })) : ((0, jsx_runtime_1.jsxs)("label", { className: "gradient-btn", style: { cursor: 'pointer', width: '100%', justifyContent: 'center', background: 'var(--accent-primary)' }, children: ["Upload Windows EXE", (0, jsx_runtime_1.jsx)("input", { type: "file", accept: ".exe", style: { display: 'none' }, disabled: uploadingRelease !== null, onChange: (e) => handleReleaseUpload('windows', e.target.files?.[0]) })] }))] })] })] })), activeTab !== 'overview' && activeTab !== 'releases' && ((0, jsx_runtime_1.jsxs)("div", { className: "admin-manage-tab animate-fade-in", children: [(0, jsx_runtime_1.jsxs)("div", { className: "admin-search-actions-bar", children: [(0, jsx_runtime_1.jsxs)("div", { className: "search-bar-wrapper", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Search, { className: "search-icon" }), (0, jsx_runtime_1.jsx)("input", { type: "text", placeholder: "Search logs by keyword...", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), className: "search-input" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "admin-filter-group flex-center", style: { gap: '1rem' }, children: [(0, jsx_runtime_1.jsxs)("select", { className: "admin-select-filter", value: typeFilter, onChange: (e) => setTypeFilter(e.target.value), children: [(0, jsx_runtime_1.jsx)("option", { value: "all", children: "All Media Types" }), (0, jsx_runtime_1.jsx)("option", { value: "image", children: "Images" }), (0, jsx_runtime_1.jsx)("option", { value: "video", children: "Videos" })] }), (0, jsx_runtime_1.jsxs)("button", { "data-action": "handleAddNew", className: "solid-btn admin-add-btn", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Plus, { size: 16 }), " Add Log to ", getCategoryShortLabel(activeTab)] })] })] }), (0, jsx_runtime_1.jsx)("div", { className: "admin-table-wrapper glass-card", children: (0, jsx_runtime_1.jsxs)("table", { className: "admin-table", children: [(0, jsx_runtime_1.jsx)("thead", { children: (0, jsx_runtime_1.jsxs)("tr", { children: [(0, jsx_runtime_1.jsx)("th", { children: "Log ID" }), (0, jsx_runtime_1.jsx)("th", { children: "Media Preview" }), (0, jsx_runtime_1.jsx)("th", { children: "Title & Badge" }), (0, jsx_runtime_1.jsx)("th", { children: "Category" }), (0, jsx_runtime_1.jsx)("th", { children: "Type" }), (0, jsx_runtime_1.jsx)("th", { children: "Telemetry Date" }), (0, jsx_runtime_1.jsx)("th", { children: "Actions" })] }) }), (0, jsx_runtime_1.jsxs)("tbody", { children: [filteredLogs.map((log) => ((0, jsx_runtime_1.jsxs)("tr", { children: [(0, jsx_runtime_1.jsxs)("td", { className: "log-td-id", children: ["#", 1000 + log.id] }), (0, jsx_runtime_1.jsx)("td", { children: (0, jsx_runtime_1.jsx)("div", { className: "table-media-preview flex-center", children: log.imagePath ? ((0, jsx_runtime_1.jsx)("img", { src: log.imagePath, alt: log.title, className: "table-img" })) : ((0, jsx_runtime_1.jsx)("div", { className: "table-preset-icon", children: log.type === 'video' ? (0, jsx_runtime_1.jsx)(lucide_react_1.Video, { size: 16 }) : (0, jsx_runtime_1.jsx)(lucide_react_1.Image, { size: 16 }) })) }) }), (0, jsx_runtime_1.jsx)("td", { children: (0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', flexDirection: 'column' }, children: [(0, jsx_runtime_1.jsx)("span", { style: { fontWeight: 600, color: 'var(--text-primary)' }, children: log.title }), (0, jsx_runtime_1.jsx)("span", { className: "table-badge-tag", children: log.badge })] }) }), (0, jsx_runtime_1.jsx)("td", { style: { fontSize: '0.8rem', color: 'var(--text-secondary)', maxWidth: '200px' }, children: log.category }), (0, jsx_runtime_1.jsx)("td", { children: (0, jsx_runtime_1.jsx)("span", { className: `table-type-badge ${log.type}`, children: log.type.toUpperCase() }) }), (0, jsx_runtime_1.jsx)("td", { style: { fontSize: '0.85rem', color: 'var(--text-muted)' }, children: log.date }), (0, jsx_runtime_1.jsx)("td", { children: (0, jsx_runtime_1.jsxs)("div", { className: "table-actions flex-center", style: { gap: '0.5rem' }, children: [(0, jsx_runtime_1.jsx)("button", { "data-action": "() => handleEdit(log)", className: "btn-action-edit flex-center", title: "Edit Log", children: (0, jsx_runtime_1.jsx)(lucide_react_1.Edit3, { size: 14 }) }), (0, jsx_runtime_1.jsx)("button", { "data-action": "() => handleDeleteConfirm(log.id)", className: "btn-action-delete flex-center", title: "Delete Log", children: (0, jsx_runtime_1.jsx)(lucide_react_1.Trash2, { size: 14 }) })] }) })] }, log.id))), filteredLogs.length === 0 && ((0, jsx_runtime_1.jsx)("tr", { children: (0, jsx_runtime_1.jsx)("td", { colSpan: 7, style: { textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }, children: "No logs match your filter/search criteria." }) }))] })] }) })] }))] }), toastVisible && toastMessage && ((0, jsx_runtime_1.jsxs)("div", { className: "admin-toast-alert animate-fade-in", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.CheckCircle, { size: 16 }), toastMessage] })), isModalOpen && (0, react_dom_1.createPortal)((0, jsx_runtime_1.jsx)("div", { className: "modal-backdrop-overlay", "data-action": "() => setIsModalOpen(false)", children: (0, jsx_runtime_1.jsxs)("div", { className: "modal-panel-container admin-modal-panel", "data-action": "e => e.stopPropagation()", style: { maxWidth: '800px' }, children: [(0, jsx_runtime_1.jsxs)("div", { className: "modal-header-row", children: [(0, jsx_runtime_1.jsxs)("div", { className: "modal-title-group", children: [(0, jsx_runtime_1.jsx)("span", { className: "modal-category-badge", children: "LOG EDITOR" }), (0, jsx_runtime_1.jsx)("h3", { children: editingLog ? `Modify Log: #${1000 + editingLog.id}` : 'Create New Research Log' })] }), (0, jsx_runtime_1.jsx)("button", { "data-action": "() => setIsModalOpen(false)", className: "modal-close-btn flex-center", children: (0, jsx_runtime_1.jsx)(lucide_react_1.X, { size: 20 }) })] }), (0, jsx_runtime_1.jsxs)("form", { onSubmit: handleSaveLog, className: "admin-form-modal", children: [(0, jsx_runtime_1.jsx)("div", { className: "modal-body-scrollable", children: (0, jsx_runtime_1.jsxs)("div", { className: "admin-form-grid", children: [(0, jsx_runtime_1.jsxs)("div", { className: "admin-form-col", children: [(0, jsx_runtime_1.jsxs)("div", { className: "form-group", children: [(0, jsx_runtime_1.jsx)("label", { className: "form-label", children: "Log Title *" }), (0, jsx_runtime_1.jsx)("input", { type: "text", className: "form-control", placeholder: "Faster R-CNN Inference Session", value: formTitle, onChange: (e) => setFormTitle(e.target.value), required: true })] }), (0, jsx_runtime_1.jsxs)("div", { className: "form-group", children: [(0, jsx_runtime_1.jsx)("label", { className: "form-label", children: "Research Category *" }), (0, jsx_runtime_1.jsx)("select", { className: "form-control", value: formCategory, onChange: (e) => setFormCategory(e.target.value), required: true, children: logsManager_1.CATEGORIES.map((cat, i) => ((0, jsx_runtime_1.jsx)("option", { value: cat, children: cat }, i))) })] }), (0, jsx_runtime_1.jsxs)("div", { className: "form-group-row", children: [(0, jsx_runtime_1.jsxs)("div", { className: "form-group", children: [(0, jsx_runtime_1.jsx)("label", { className: "form-label", children: "Log Media Type *" }), (0, jsx_runtime_1.jsxs)("select", { className: "form-control", value: formType, onChange: (e) => setFormType(e.target.value), children: [(0, jsx_runtime_1.jsx)("option", { value: "image", children: "Image Log" }), (0, jsx_runtime_1.jsx)("option", { value: "video", children: "Video Log" })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "form-group", children: [(0, jsx_runtime_1.jsx)("label", { className: "form-label", children: "Display Badge *" }), (0, jsx_runtime_1.jsx)("input", { type: "text", className: "form-control", placeholder: "Model Inference Log", value: formBadge, onChange: (e) => setFormBadge(e.target.value), required: true })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "form-group", children: [(0, jsx_runtime_1.jsx)("label", { className: "form-label", children: "Log Description *" }), (0, jsx_runtime_1.jsx)("textarea", { className: "form-control textarea", rows: 3, placeholder: "Detailed description of the telemetry run...", value: formDesc, onChange: (e) => setFormDesc(e.target.value), required: true })] }), (0, jsx_runtime_1.jsxs)("div", { className: "form-group", style: { borderTop: '1px solid var(--border-glass)', paddingTop: '1rem', marginTop: '1rem' }, children: [(0, jsx_runtime_1.jsx)("label", { className: "form-label", children: "Visual Media Source" }), (0, jsx_runtime_1.jsxs)("div", { className: "form-radio-row flex-center", style: { justifyContent: 'flex-start', gap: '1.5rem', marginBottom: '0.75rem' }, children: [(0, jsx_runtime_1.jsxs)("label", { className: "flex-center", style: { gap: '0.5rem', cursor: 'pointer', fontSize: '0.85rem' }, children: [(0, jsx_runtime_1.jsx)("input", { type: "radio", name: "mediaSource", checked: mediaSource === 'path', onChange: () => setMediaSource('path') }), " Image File Path / URL"] }), (0, jsx_runtime_1.jsxs)("label", { className: "flex-center", style: { gap: '0.5rem', cursor: 'pointer', fontSize: '0.85rem' }, children: [(0, jsx_runtime_1.jsx)("input", { type: "radio", name: "mediaSource", checked: mediaSource === 'preset', onChange: () => setMediaSource('preset') }), " Visual Preset (SVG)"] }), (0, jsx_runtime_1.jsxs)("label", { className: "flex-center", style: { gap: '0.5rem', cursor: 'pointer', fontSize: '0.85rem' }, children: [(0, jsx_runtime_1.jsx)("input", { type: "radio", name: "mediaSource", checked: mediaSource === 'markup', onChange: () => setMediaSource('markup') }), " Custom SVG Markup"] })] }), mediaSource === 'path' && ((0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', flexDirection: 'column', gap: '0.75rem' }, children: [(0, jsx_runtime_1.jsx)("input", { type: "text", className: "form-control", placeholder: "./images/1.jpeg or paste custom image URL", value: formImagePath, onChange: (e) => setFormImagePath(e.target.value) }), (0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap', marginTop: '0.25rem' }, children: [(0, jsx_runtime_1.jsxs)("label", { className: "solid-btn", style: { padding: '0.4rem 1rem', fontSize: '0.8rem', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }, children: [(0, jsx_runtime_1.jsx)(lucide_react_1.PlusCircle, { size: 14 }), " Upload Local Image", (0, jsx_runtime_1.jsx)("input", { type: "file", accept: "image/*", onChange: handleFileUpload, style: { display: 'none' } })] }), formImagePath && ((0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', alignItems: 'center', gap: '0.5rem' }, children: [(0, jsx_runtime_1.jsx)("div", { style: { width: '40px', height: '30px', borderRadius: '4px', overflow: 'hidden', border: '1px solid var(--border-glass)', background: '#000' }, children: (0, jsx_runtime_1.jsx)("img", { src: formImagePath, alt: "Preview", style: { width: '100%', height: '100%', objectFit: 'cover' } }) }), (0, jsx_runtime_1.jsx)("span", { style: { fontSize: '0.75rem', color: 'var(--text-secondary)' }, children: formImagePath.startsWith('data:') ? 'Local file uploaded' : 'Path URL specified' })] }))] })] })), mediaSource === 'preset' && ((0, jsx_runtime_1.jsxs)("select", { className: "form-control", value: formPreset, onChange: (e) => setFormPreset(e.target.value), children: [(0, jsx_runtime_1.jsx)("option", { value: "vision-rcnn", children: "Inference Bounding Box Scanner Preset" }), (0, jsx_runtime_1.jsx)("option", { value: "vision-cam", children: "Grad-CAM Heatmap Focus Preset" }), (0, jsx_runtime_1.jsx)("option", { value: "data-bert", children: "BERT Intent Classification Presets" })] })), mediaSource === 'markup' && ((0, jsx_runtime_1.jsx)("textarea", { className: "form-control textarea", rows: 4, placeholder: "Paste raw <svg>...</svg> code here", value: formSvgMarkup, onChange: (e) => setFormSvgMarkup(e.target.value), style: { fontFamily: 'monospace', fontSize: '0.75rem' } }))] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "admin-form-col", style: { display: 'flex', flexDirection: 'column', gap: '1rem' }, children: [(0, jsx_runtime_1.jsx)("label", { className: "form-label", style: { marginBottom: 0 }, children: "Visual Media Preview" }), (0, jsx_runtime_1.jsx)("div", { style: {
                                                            flex: 1,
                                                            minHeight: '280px',
                                                            background: 'var(--bg-glass)',
                                                            border: '1px solid var(--border-glass)',
                                                            borderRadius: '12px',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            overflow: 'hidden',
                                                            position: 'relative'
                                                        }, children: mediaSource === 'path' && formImagePath ? ((0, jsx_runtime_1.jsx)("img", { src: formImagePath, alt: "Preview", style: { width: '100%', height: '100%', objectFit: 'contain' }, onError: (e) => {
                                                                e.target.style.display = 'none';
                                                            } })) : mediaSource === 'preset' ? ((0, jsx_runtime_1.jsxs)("div", { style: { padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }, children: [(0, jsx_runtime_1.jsx)("span", { style: { fontSize: '0.8rem', display: 'block', marginBottom: '0.5rem', color: 'var(--accent-secondary)' }, children: "Selected Visual SVG Preset:" }), (0, jsx_runtime_1.jsx)("span", { style: { fontWeight: 600, fontSize: '0.95rem', color: 'var(--text-primary)' }, children: formPreset === 'vision-rcnn' ? 'Inference Bounding Box Scanner' :
                                                                        formPreset === 'vision-cam' ? 'Grad-CAM Heatmap Focus' :
                                                                            'BERT Intent Classification' }), (0, jsx_runtime_1.jsx)("div", { style: { marginTop: '1rem', opacity: 0.6 }, children: "(Renders dynamically in public gallery details view)" })] })) : mediaSource === 'markup' && formSvgMarkup ? ((0, jsx_runtime_1.jsx)("div", { style: { width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }, dangerouslySetInnerHTML: { __html: formSvgMarkup } })) : ((0, jsx_runtime_1.jsx)("div", { style: { color: 'var(--text-muted)', fontSize: '0.85rem', textAlign: 'center', padding: '2rem' }, children: "No image path specified or local file uploaded yet." })) }), (0, jsx_runtime_1.jsxs)("div", { style: { fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: '1.4' }, children: ["\uD83D\uDCA1 This preview shows how the image will be framed when viewers click the log on the website. Use ", (0, jsx_runtime_1.jsx)("strong", { children: "Upload Local Image" }), " to load a file from your device."] })] })] }) }), (0, jsx_runtime_1.jsxs)("div", { className: "modal-footer-row flex-center", style: { justifyContent: 'flex-end', gap: '1rem', borderTop: '1px solid var(--border-glass)', paddingTop: '1.25rem', marginTop: '1rem' }, children: [(0, jsx_runtime_1.jsx)("button", { type: "button", "data-action": "() => setIsModalOpen(false)", className: "outline-btn", style: { padding: '0.6rem 1.5rem', fontSize: '0.85rem' }, children: "Cancel" }), (0, jsx_runtime_1.jsx)("button", { type: "submit", className: "solid-btn", style: { padding: '0.6rem 2rem', fontSize: '0.85rem' }, children: editingLog ? 'Save Modifications' : 'Create Database Node' })] })] })] }) }), document.body), deletingLogId !== null && (0, react_dom_1.createPortal)((0, jsx_runtime_1.jsx)("div", { className: "modal-backdrop-overlay flex-center", "data-action": "() => setDeletingLogId(null)", children: (0, jsx_runtime_1.jsxs)("div", { className: "glass-card confirmation-card", "data-action": "e => e.stopPropagation()", style: { maxWidth: '400px', width: '100%', padding: '2rem', textAlign: 'center' }, children: [(0, jsx_runtime_1.jsx)("div", { style: { width: '3rem', height: '3rem', borderRadius: '50%', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', margin: '0 auto 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }, children: (0, jsx_runtime_1.jsx)(lucide_react_1.Trash2, { size: 20 }) }), (0, jsx_runtime_1.jsx)("h3", { style: { fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }, children: "Delete Database Node?" }), (0, jsx_runtime_1.jsxs)("p", { style: { fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }, children: ["Are you sure you want to delete log #", 1000 + deletingLogId, "? This action will remove the node from local storage and cannot be undone."] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex-center", style: { gap: '1rem' }, children: [(0, jsx_runtime_1.jsx)("button", { "data-action": "() => setDeletingLogId(null)", className: "outline-btn flex-1", style: { padding: '0.5rem' }, children: "Cancel" }), (0, jsx_runtime_1.jsx)("button", { "data-action": "handleExecuteDelete", className: "solid-btn flex-1", style: { padding: '0.5rem', background: '#ef4444', borderColor: '#ef4444' }, children: "Confirm Delete" })] })] }) }), document.body), (0, jsx_runtime_1.jsxs)("div", { className: `floating-success-toast ${toastVisible ? 'visible' : ''}`, children: [(0, jsx_runtime_1.jsx)(lucide_react_1.CheckCircle, { size: 16, className: "toast-icon text-emerald-400" }), (0, jsx_runtime_1.jsx)("span", { children: toastMessage })] })] }));
}
