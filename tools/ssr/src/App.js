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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = App;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importStar(require("react"));
const gsap_1 = require("gsap");
const ScrollTrigger_1 = require("gsap/ScrollTrigger");
const react_2 = require("@gsap/react");
const lucide_react_1 = require("lucide-react");
const leafIcon = "/assets/icons/leaf-fill.svg";
const pestIcon = "/assets/icons/bug-fill.svg";
const nutrientIcon = "/assets/icons/droplet-fill.svg";
const chatIcon = "/assets/icons/chat-dots-fill.svg";
const forecastIcon = "/assets/icons/globe-americas.svg";
const backendIcon = "/assets/icons/hdd-rack-fill.svg";
// Import custom components
const LiveDemoPage_1 = __importDefault(require("./components/LiveDemoPage"));
const DownloadSection_1 = __importDefault(require("./components/DownloadSection"));
const ResearchGallery_1 = __importDefault(require("./components/ResearchGallery"));
const TeamSection_1 = __importDefault(require("./components/TeamSection"));
const ProjectOverview_1 = __importDefault(require("./components/ProjectOverview"));
const ThemeToggle_1 = __importDefault(require("./components/ThemeToggle"));
const AdminDashboard_1 = __importDefault(require("./components/AdminDashboard"));
const AndroidInstallPopup_1 = __importDefault(require("./components/AndroidInstallPopup"));
const WindowsInstallPopup_1 = __importDefault(require("./components/WindowsInstallPopup"));
const FloatingOnionsScene_1 = __importDefault(require("./components/FloatingOnionsScene"));
const SiteFooter_1 = __importDefault(require("./components/SiteFooter"));
const useScrollAnimations_1 = require("./hooks/useScrollAnimations");
const pageSeo_1 = require("./utils/pageSeo");
gsap_1.gsap.registerPlugin(ScrollTrigger_1.ScrollTrigger, react_2.useGSAP);
function App() {
    const [currentPage, setCurrentPage] = (0, react_1.useState)(Object.prototype.hasOwnProperty.call(globalThis.__states['App'] || {}, 'currentPage') ? globalThis.__states['App']['currentPage'] : ('home'));
    (0, react_1.useEffect)(() => { (0, pageSeo_1.updatePageSeo)(currentPage); }, [currentPage]);
    const [mobileMenuOpen, setMobileMenuOpen] = (0, react_1.useState)(Object.prototype.hasOwnProperty.call(globalThis.__states['App'] || {}, 'mobileMenuOpen') ? globalThis.__states['App']['mobileMenuOpen'] : (false));
    const [navigationFeedback, setNavigationFeedback] = (0, react_1.useState)(Object.prototype.hasOwnProperty.call(globalThis.__states['App'] || {}, 'navigationFeedback') ? globalThis.__states['App']['navigationFeedback'] : (0));
    const navigationSequence = (0, react_1.useRef)(0);
    const [scrolled, setScrolled] = (0, react_1.useState)(Object.prototype.hasOwnProperty.call(globalThis.__states['App'] || {}, 'scrolled') ? globalThis.__states['App']['scrolled'] : (false));
    const [activeSection, setActiveSection] = (0, react_1.useState)(Object.prototype.hasOwnProperty.call(globalThis.__states['App'] || {}, 'activeSection') ? globalThis.__states['App']['activeSection'] : (''));
    const [activeFlavor, setActiveFlavor] = (0, react_1.useState)(Object.prototype.hasOwnProperty.call(globalThis.__states['App'] || {}, 'activeFlavor') ? globalThis.__states['App']['activeFlavor'] : ('yellow'));
    // Register GSAP ScrollTrigger animations across homepage sections
    (0, useScrollAnimations_1.useScrollAnimations)(currentPage === 'home');
    // Refs for 3D elements
    const modelViewerRef = (0, react_1.useRef)(null);
    const isSwitching = (0, react_1.useRef)(false);
    const switchSpinRef = (0, react_1.useRef)(0);
    const isUserInteractingRef = (0, react_1.useRef)(false);
    // Form states
    const [formData, setFormData] = (0, react_1.useState)(Object.prototype.hasOwnProperty.call(globalThis.__states['App'] || {}, 'formData') ? globalThis.__states['App']['formData'] : ({ name: '', email: '', role: 'Farmer', message: '' }));
    const [formStatus, setFormStatus] = (0, react_1.useState)(Object.prototype.hasOwnProperty.call(globalThis.__states['App'] || {}, 'formStatus') ? globalThis.__states['App']['formStatus'] : (null));
    const [submitting, setSubmitting] = (0, react_1.useState)(Object.prototype.hasOwnProperty.call(globalThis.__states['App'] || {}, 'submitting') ? globalThis.__states['App']['submitting'] : (false));
    const containerRef = (0, react_1.useRef)(null);
    const heroRef = (0, react_1.useRef)(null);
    const isClickNavigating = (0, react_1.useRef)(false);
    const clickNavTimeoutRef = (0, react_1.useRef)(null);
    const pendingHashRef = (0, react_1.useRef)(null);
    // Clean up timeouts
    (0, react_1.useEffect)(() => {
        return () => {
            if (clickNavTimeoutRef.current) {
                window.clearTimeout(clickNavTimeoutRef.current);
            }
        };
    }, []);
    // Handle URL changes & popstate routing dynamically (e.g. visiting /admin directly)
    (0, react_1.useEffect)(() => {
        const handleUrlRouting = () => {
            const path = window.location.pathname;
            const hash = window.location.hash;
            const search = window.location.search;
            if (path === '/admin' || hash === '#admin' || hash === '#/admin' || search.includes('admin')) {
                setCurrentPage('admin');
            }
            else if (path === '/overview' || hash === '#overview' || hash === '#/overview' || search.includes('overview')) {
                setCurrentPage('overview');
            }
            else if (path === '/simulators' || hash === '#simulators' || hash === '#/simulators' || search.includes('simulators')) {
                setCurrentPage('simulators');
            }
            else if (path === '/gallery' || hash === '#gallery' || hash === '#/gallery' || search.includes('gallery')) {
                setCurrentPage('gallery');
            }
            else if (path === '/beta' || hash === '#beta' || hash === '#/beta' || search.includes('beta')) {
                setCurrentPage('beta');
            }
            else {
                setCurrentPage('home');
            }
        };
        handleUrlRouting();
        window.addEventListener('hashchange', handleUrlRouting);
        window.addEventListener('popstate', handleUrlRouting);
        return () => {
            window.removeEventListener('hashchange', handleUrlRouting);
            window.removeEventListener('popstate', handleUrlRouting);
        };
    }, []);
    // Handle pending scroll targets when transitioning back to the homepage
    (0, react_1.useEffect)(() => {
        if (currentPage === 'home' && pendingHashRef.current) {
            const hash = pendingHashRef.current;
            pendingHashRef.current = null;
            // Delay slightly to allow the home page components to mount and stabilize in the DOM
            const timer = setTimeout(() => {
                const element = document.getElementById(hash);
                if (element) {
                    element.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
                }
            }, 250);
            return () => clearTimeout(timer);
        }
    }, [currentPage]);
    // Router-like function
    const navigateTo = (page, hash) => {
        setNavigationFeedback(++navigationSequence.current);
        pendingHashRef.current = null;
        setCurrentPage(page);
        setMobileMenuOpen(false);
        // Update URL history pathname dynamically (pushState)
        const newPath = page === 'home' ? '/' : `/${page}`;
        window.history.pushState({}, '', newPath);
        // Set click navigating to true to disable scroll-spy temporarily during transition
        isClickNavigating.current = true;
        if (clickNavTimeoutRef.current) {
            window.clearTimeout(clickNavTimeoutRef.current);
        }
        if (page === 'home') {
            if (hash) {
                setActiveSection(hash);
                if (currentPage === 'home') {
                    // If already on the home page, scroll immediately
                    const element = document.getElementById(hash);
                    if (element) {
                        element.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
                    }
                }
                else {
                    // Save the hash to be scrolled to after page transition mounts the home page elements
                    pendingHashRef.current = hash;
                }
            }
            else {
                setActiveSection('');
                window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
            }
        }
        else {
            setActiveSection('');
            window.scrollTo({ top: 0, behavior: 'instant' });
        }
        // Re-enable scroll spy after scroll animation finishes (~1000ms)
        clickNavTimeoutRef.current = window.setTimeout(() => {
            isClickNavigating.current = false;
        }, 1000);
    };
    // Handle navbar scroll background change and active section tracking
    (0, react_1.useEffect)(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            }
            else {
                setScrolled(false);
            }
            // If a click navigation is active, don't update activeSection based on scroll events
            if (isClickNavigating.current)
                return;
            if (currentPage === 'home') {
                const teamEl = document.getElementById('team');
                const contactEl = document.getElementById('contact');
                const scrollPosition = window.scrollY + 250; // offset for nav height
                if (contactEl && scrollPosition >= contactEl.offsetTop) {
                    setActiveSection('contact');
                }
                else if (teamEl && scrollPosition >= teamEl.offsetTop) {
                    setActiveSection('team');
                }
                else {
                    setActiveSection('');
                }
            }
        };
        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [currentPage]);
    // switchColorway function for flavor changes
    const switchColorway = (flavor) => {
        if (isSwitching.current)
            return;
        isSwitching.current = true;
        setActiveFlavor(flavor);
        const modelViewer = modelViewerRef.current;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            if (modelViewer)
                modelViewer.src = flavor === 'purple' ? '/model/purple_onion.glb' : '/model/onion.glb';
            isSwitching.current = false;
            return;
        }
        // 3D Model spin animation (360 spin + blur with back settle)
        const spinObj = { val: 0, blur: 0 };
        gsap_1.gsap.to(spinObj, {
            val: 360,
            blur: 15,
            duration: 0.6,
            ease: "power2.in",
            onUpdate: () => {
                switchSpinRef.current = spinObj.val;
                if (modelViewer) {
                    modelViewer.style.filter = `blur(${spinObj.blur}px)`;
                }
            },
            onComplete: () => {
                // Swap model at the peak of the spin
                if (flavor === 'purple') {
                    if (modelViewer) {
                        modelViewer.src = "/model/purple_onion.glb";
                    }
                }
                else {
                    if (modelViewer) {
                        modelViewer.src = "/model/onion.glb";
                    }
                }
                gsap_1.gsap.to(spinObj, {
                    val: 720,
                    blur: 0,
                    duration: 1.5,
                    ease: "back.out(0.7)",
                    onUpdate: () => {
                        switchSpinRef.current = spinObj.val;
                        if (modelViewer) {
                            modelViewer.style.filter = `blur(${spinObj.blur}px)`;
                        }
                    },
                    onComplete: () => {
                        switchSpinRef.current = 0;
                        isSwitching.current = false;
                        if (modelViewer) {
                            modelViewer.style.filter = 'none';
                        }
                    }
                });
            }
        });
    };
    const handleFlavorChange = (flavor) => {
        if (flavor === activeFlavor)
            return;
        switchColorway(flavor);
    };
    const toggleFlavor = () => {
        const nextFlavor = activeFlavor === 'yellow' ? 'purple' : 'yellow';
        switchColorway(nextFlavor);
    };
    // Mouse tracking and animation frame loop
    (0, react_1.useEffect)(() => {
        if (currentPage !== 'home' || window.matchMedia('(prefers-reduced-motion: reduce)').matches)
            return;
        const mouse = { x: 0, y: 0, px: 0, py: 0 };
        const currentMouse = { x: 0, y: 0 };
        const handleMouseMove = (e) => {
            mouse.x = (e.clientX / window.innerWidth) - 0.5;
            mouse.y = (e.clientY / window.innerHeight) - 0.5;
            mouse.px = e.clientX;
            mouse.py = e.clientY;
        };
        window.addEventListener('mousemove', handleMouseMove);
        let heroVisible = true;
        const observer = new IntersectionObserver(([entry]) => { heroVisible = entry.isIntersecting; });
        if (heroRef.current)
            observer.observe(heroRef.current);
        let animationFrameId;
        let animatedTheta = 0;
        let animatedPhi = 90;
        const animate = () => {
            animationFrameId = requestAnimationFrame(animate);
            if (!heroVisible || document.hidden)
                return;
            currentMouse.x += (mouse.x - currentMouse.x) * 0.05;
            currentMouse.y += (mouse.y - currentMouse.y) * 0.05;
            const modelViewer = modelViewerRef.current;
            if (modelViewer) {
                if (isUserInteractingRef.current) {
                    try {
                        const orbit = modelViewer.getCameraOrbit();
                        animatedTheta = (orbit.theta * 180) / Math.PI;
                        animatedPhi = (orbit.phi * 180) / Math.PI;
                    }
                    catch (e) {
                        // Ignore error if model-viewer is not fully initialized
                    }
                }
                else {
                    const now = performance.now();
                    const floatTheta = Math.sin(now * 0.0012) * 2.5;
                    const floatPhi = Math.cos(now * 0.001) * 2.0;
                    const targetTheta = (currentMouse.x * 35) + switchSpinRef.current + floatTheta;
                    const targetPhi = 90 + (currentMouse.y * 18) + floatPhi;
                    animatedTheta += (targetTheta - animatedTheta) * 0.08;
                    animatedPhi += (targetPhi - animatedPhi) * 0.08;
                    modelViewer.cameraOrbit = `${animatedTheta}deg ${animatedPhi}deg 380%`;
                }
            }
        };
        animate();
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
            observer.disconnect();
        };
    }, [currentPage]);
    // GSAP Entrance Animations
    (0, react_2.useGSAP)(() => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches)
            return;
        if (currentPage === 'home') {
            // Hero Entrance Timeline
            const heroTl = gsap_1.gsap.timeline();
            heroTl.from('.main-title', { opacity: 0, y: 30, duration: 0.8, ease: 'power3.out' })
                .from('.hero-subheading', { opacity: 0, y: 20, duration: 0.6, ease: 'power2.out' }, '-=0.5')
                .from('.hero-left .description', { opacity: 0, y: 20, duration: 0.6, ease: 'power2.out' }, '-=0.4')
                .from('.cta-group', { opacity: 0, y: 20, duration: 0.6, ease: 'power2.out' }, '-=0.4')
                .from('.hero-mini-badges', { opacity: 0, y: 20, duration: 0.6, ease: 'power2.out' }, '-=0.4')
                .from('.hero-center', { opacity: 0, scale: 0.95, duration: 1, ease: 'power3.out' }, '-=0.8')
                .from('.product-carousel', { opacity: 0, x: 20, duration: 0.6, ease: 'power2.out' }, '-=0.6');
        }
        else if (currentPage === 'gallery') {
            gsap_1.gsap.fromTo('.section-header', { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' });
            if (document.querySelector('.gallery-trigger')) {
                gsap_1.gsap.fromTo('.gallery-trigger', { opacity: 0, y: 40 }, {
                    scrollTrigger: {
                        trigger: '#gallery',
                        start: 'top 85%',
                    },
                    opacity: 1,
                    y: 0,
                    duration: 0.9,
                    ease: 'power3.out'
                });
            }
        }
        else if (currentPage === 'overview') {
            gsap_1.gsap.fromTo('.section-header', { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' });
        }
        else if (currentPage === 'beta') {
            gsap_1.gsap.fromTo('.section-header', { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' });
        }
        // Refresh ScrollTriggers
        setTimeout(() => {
            ScrollTrigger_1.ScrollTrigger.refresh();
        }, 100);
    }, { dependencies: [currentPage], scope: containerRef });
    // Handle Form Submit (connect to public/contact.php)
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setFormStatus(null);
        try {
            const response = await fetch('contact.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            if (response.ok && data.status === 'success') {
                setFormStatus({ type: 'success', message: data.message });
                setFormData({ name: '', email: '', role: 'Farmer', message: '' });
            }
            else {
                setFormStatus({ type: 'error', message: data.message || 'Something went wrong.' });
            }
        }
        catch (err) {
            setFormStatus({
                type: 'error',
                message: 'Could not connect to the server. Your submission was logged locally (if running PHP).'
            });
        }
        finally {
            setSubmitting(false);
        }
    };
    return ((0, jsx_runtime_1.jsxs)("div", { ref: containerRef, style: { background: 'var(--bg-dark)', color: 'var(--text-primary)' }, children: [navigationFeedback !== 0 && ((0, jsx_runtime_1.jsx)("div", { className: "navigation-loading", role: "status", "aria-label": "Opening page", onAnimationEnd: () => setNavigationFeedback(0) }, navigationFeedback)), (0, jsx_runtime_1.jsxs)("nav", { className: `navbar ${scrolled ? 'scrolled' : ''}`, children: [(0, jsx_runtime_1.jsxs)("div", { className: "container nav-container", children: [(0, jsx_runtime_1.jsxs)("a", { href: "/", className: "logo", "data-action": "(e) => { e.preventDefault(); navigateTo('home'); }", style: { display: 'flex', alignItems: 'center', gap: '0.75rem', whiteSpace: 'nowrap' }, children: [(0, jsx_runtime_1.jsx)("img", { src: "/logo.jpeg", alt: "LunuNeth AI Logo", style: { width: '2.5rem', height: '2.5rem', borderRadius: '50%', objectFit: 'cover', border: '1.5px solid var(--accent-primary)' } }), (0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', flexDirection: 'column', lineHeight: 1.1, whiteSpace: 'nowrap' }, children: [(0, jsx_runtime_1.jsx)("span", { style: { fontSize: '1.25rem', fontWeight: 800, color: 'var(--accent-primary)', whiteSpace: 'nowrap' }, children: "LunuNeth AI" }), (0, jsx_runtime_1.jsx)("span", { style: { fontSize: '0.65rem', color: 'var(--text-secondary)', fontWeight: 500, letterSpacing: '0.05em', whiteSpace: 'nowrap' }, children: "CROP INTELLIGENCE" })] })] }), (0, jsx_runtime_1.jsxs)("ul", { className: "nav-links", children: [(0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsx)("a", { href: "/", className: currentPage === 'home' && activeSection === '' ? 'active' : '', "data-action": "(e) => { e.preventDefault(); navigateTo('home'); }", children: "Home" }) }), (0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsx)("a", { href: "/overview", className: currentPage === 'overview' ? 'active' : '', "data-action": "(e) => { e.preventDefault(); navigateTo('overview'); }", children: "Overview" }) }), (0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsx)("a", { href: "/simulators", className: currentPage === 'simulators' ? 'active' : '', "data-action": "(e) => { e.preventDefault(); navigateTo('simulators'); }", children: "Live Demo" }) }), (0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsx)("a", { href: "/gallery", className: currentPage === 'gallery' ? 'active' : '', "data-action": "(e) => { e.preventDefault(); navigateTo('gallery'); }", children: "Research Logs" }) }), (0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsx)("a", { href: "#", className: currentPage === 'home' && activeSection === 'team' ? 'active' : '', "data-action": "(e) => { e.preventDefault(); navigateTo('home', 'team'); }", children: "Our Team" }) })] }), (0, jsx_runtime_1.jsxs)("div", { className: "nav-actions", children: [(0, jsx_runtime_1.jsx)(ThemeToggle_1.default, {}), (0, jsx_runtime_1.jsx)("a", { href: "/beta", "data-action": "(e) => { e.preventDefault(); navigateTo('beta'); }", className: "solid-btn", style: { padding: '0.5rem 1.25rem', fontSize: '0.85rem' }, children: "Install App" }), (0, jsx_runtime_1.jsx)("button", { "aria-label": "Toggle navigation", "aria-expanded": mobileMenuOpen, className: "mobile-menu-btn flex-center", "data-action": "() => setMobileMenuOpen(!mobileMenuOpen)", children: mobileMenuOpen ? (0, jsx_runtime_1.jsx)(lucide_react_1.X, {}) : (0, jsx_runtime_1.jsx)(lucide_react_1.Menu, {}) })] })] }), mobileMenuOpen && ((0, jsx_runtime_1.jsxs)("div", { className: "mobile-dropdown", children: [(0, jsx_runtime_1.jsx)("a", { href: "/", className: currentPage === 'home' && activeSection === '' ? 'active' : '', "data-action": "(e) => { e.preventDefault(); navigateTo('home'); }", children: "Home" }), (0, jsx_runtime_1.jsx)("a", { href: "/overview", className: currentPage === 'overview' ? 'active' : '', "data-action": "(e) => { e.preventDefault(); navigateTo('overview'); }", children: "Overview" }), (0, jsx_runtime_1.jsx)("a", { href: "/simulators", className: currentPage === 'simulators' ? 'active' : '', "data-action": "(e) => { e.preventDefault(); navigateTo('simulators'); }", children: "Live Demo" }), (0, jsx_runtime_1.jsx)("a", { href: "/gallery", className: currentPage === 'gallery' ? 'active' : '', "data-action": "(e) => { e.preventDefault(); navigateTo('gallery'); }", children: "Research Logs" }), (0, jsx_runtime_1.jsx)("a", { href: "#", className: currentPage === 'home' && activeSection === 'team' ? 'active' : '', "data-action": "(e) => { e.preventDefault(); navigateTo('home', 'team'); }", children: "Our Team" }), (0, jsx_runtime_1.jsxs)("div", { className: "mobile-theme-row", children: [(0, jsx_runtime_1.jsx)("span", { children: "Theme Mode" }), (0, jsx_runtime_1.jsx)(ThemeToggle_1.default, {})] })] }))] }), currentPage === 'home' && (0, jsx_runtime_1.jsx)(FloatingOnionsScene_1.default, {}), currentPage === 'home' && ((0, jsx_runtime_1.jsx)("header", { className: "hero-main-container", ref: heroRef, children: (0, jsx_runtime_1.jsxs)("main", { className: "hero", children: [(0, jsx_runtime_1.jsx)("div", { className: "grass-decor-hero-left", "aria-hidden": "true", children: (0, jsx_runtime_1.jsx)("img", { src: "/images/grass_hero_left_hd.png", alt: "", className: "grass-img grass-hero-blades-left" }) }), (0, jsx_runtime_1.jsx)("div", { className: "grass-decor-hero-right", "aria-hidden": "true", children: (0, jsx_runtime_1.jsx)("img", { src: "/images/grass_hero_right_hd.png", alt: "", className: "grass-img grass-hero-blades-right" }) }), (0, jsx_runtime_1.jsxs)("div", { className: "hero-3d-content", children: [(0, jsx_runtime_1.jsxs)("div", { className: "hero-left", children: [(0, jsx_runtime_1.jsxs)("h1", { className: "main-title large-animation-1", children: [(0, jsx_runtime_1.jsx)("span", { className: "outline", children: "Lunu" }), "Neth AI"] }), (0, jsx_runtime_1.jsx)("div", { className: "hero-subheading", children: "Crop Intelligence" }), (0, jsx_runtime_1.jsx)("p", { className: "description", children: "LunuNeth AI empowers Sri Lankan onion farmers and researchers with deep learning. Diagnose diseases, track thrips pests, identify nutrient deficiencies, and predict regional outbreaks." }), (0, jsx_runtime_1.jsxs)("div", { className: "cta-group", children: [(0, jsx_runtime_1.jsxs)("a", { href: "/beta", "data-action": "(e) => { e.preventDefault(); navigateTo('beta'); }", className: "primary-btn download-cta-btn", children: ["Download App", (0, jsx_runtime_1.jsx)("span", { className: "plus-icon", children: (0, jsx_runtime_1.jsx)(lucide_react_1.Download, { className: "w-4 h-4" }) })] }), (0, jsx_runtime_1.jsxs)("a", { href: "/simulators", "data-action": "(e) => { e.preventDefault(); navigateTo('simulators'); }", className: "primary-btn demo-cta-btn", children: ["Try Live Demo", (0, jsx_runtime_1.jsx)("span", { className: "plus-icon", children: (0, jsx_runtime_1.jsx)(lucide_react_1.ArrowRight, { className: "w-4 h-4" }) })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "hero-mini-badges", children: [(0, jsx_runtime_1.jsxs)("div", { className: "hero-mini-badge", children: [(0, jsx_runtime_1.jsx)("div", { className: "mini-badge-icon flex-center", children: (0, jsx_runtime_1.jsx)(lucide_react_1.Sprout, { className: "w-3.5 h-3.5" }) }), (0, jsx_runtime_1.jsxs)("div", { className: "mini-badge-text", children: [(0, jsx_runtime_1.jsx)("span", { className: "badge-line-1", children: "AI-Powered" }), (0, jsx_runtime_1.jsx)("span", { className: "badge-line-2", children: "Diagnosis" })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "hero-mini-badge", children: [(0, jsx_runtime_1.jsx)("div", { className: "mini-badge-icon flex-center", children: (0, jsx_runtime_1.jsx)(lucide_react_1.Target, { className: "w-3.5 h-3.5" }) }), (0, jsx_runtime_1.jsxs)("div", { className: "mini-badge-text", children: [(0, jsx_runtime_1.jsx)("span", { className: "badge-line-1", children: "Real-time" }), (0, jsx_runtime_1.jsx)("span", { className: "badge-line-2", children: "Pest Detection" })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "hero-mini-badge", children: [(0, jsx_runtime_1.jsx)("div", { className: "mini-badge-icon flex-center", children: (0, jsx_runtime_1.jsx)(lucide_react_1.Leaf, { className: "w-3.5 h-3.5" }) }), (0, jsx_runtime_1.jsxs)("div", { className: "mini-badge-text", children: [(0, jsx_runtime_1.jsx)("span", { className: "badge-line-1", children: "Sustainable" }), (0, jsx_runtime_1.jsx)("span", { className: "badge-line-2", children: "Onion Farming" })] })] })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "hero-center", children: [(0, jsx_runtime_1.jsx)("div", { className: "floating-leaf floating-leaf-left", "aria-hidden": "true", children: (0, jsx_runtime_1.jsx)(lucide_react_1.Leaf, { className: "w-6 h-6" }) }), (0, jsx_runtime_1.jsx)("div", { className: "floating-leaf floating-leaf-right", "aria-hidden": "true", children: (0, jsx_runtime_1.jsx)(lucide_react_1.Leaf, { className: "w-5 h-5" }) }), (0, jsx_runtime_1.jsx)("model-viewer", { id: "product-model", ref: modelViewerRef, src: "/model/onion.glb", alt: "LunuNeth AI Onion 3D Model", "camera-controls": true, "disable-zoom": true, "shadow-intensity": "0", "environment-image": "neutral", exposure: "1.5", "interaction-prompt": "none", "camera-orbit": "0deg 90deg 380%", "field-of-view": "30deg", className: "main-product-3d", onPointerDown: () => { isUserInteractingRef.current = true; }, onPointerUp: () => { isUserInteractingRef.current = false; }, onPointerLeave: () => { isUserInteractingRef.current = false; }, onTouchStart: () => { isUserInteractingRef.current = true; }, onTouchEnd: () => { isUserInteractingRef.current = false; } }), (0, jsx_runtime_1.jsxs)("div", { className: "hero-callout-script", "aria-hidden": "true", children: [(0, jsx_runtime_1.jsx)("div", { className: "callout-line-1", children: "Precision" }), (0, jsx_runtime_1.jsx)("div", { className: "callout-line-2", children: "Farming" }), (0, jsx_runtime_1.jsx)("div", { className: "callout-line-3", children: "for a Healthier" }), (0, jsx_runtime_1.jsxs)("div", { className: "callout-line-4", children: ["Tomorrow", (0, jsx_runtime_1.jsx)("span", { className: "callout-underline" })] })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "hero-right", children: [(0, jsx_runtime_1.jsxs)("div", { className: "product-carousel", children: [(0, jsx_runtime_1.jsxs)("div", { className: "carousel-cards", children: [(0, jsx_runtime_1.jsxs)("button", { type: "button", className: `card ${activeFlavor === 'yellow' ? 'active' : ''}`, "aria-pressed": activeFlavor === 'yellow', "data-action": "() => handleFlavorChange('yellow')", children: [(0, jsx_runtime_1.jsx)("img", { src: "/images/yellow_onion_card.png", alt: "Yellow Spanish Onion", className: "variety-thumb-img" }), (0, jsx_runtime_1.jsx)("div", { className: "card-info", children: (0, jsx_runtime_1.jsx)("span", { children: "Yellow Spanish" }) })] }), (0, jsx_runtime_1.jsxs)("button", { type: "button", className: `card ${activeFlavor === 'purple' ? 'active' : ''}`, "aria-pressed": activeFlavor === 'purple', "data-action": "() => handleFlavorChange('purple')", children: [(0, jsx_runtime_1.jsx)("img", { src: "/images/purple_onion_card.png", alt: "Red Baron Onion", className: "variety-thumb-img" }), (0, jsx_runtime_1.jsx)("div", { className: "card-info", children: (0, jsx_runtime_1.jsx)("span", { children: "Red Baron" }) })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "carousel-nav", children: [(0, jsx_runtime_1.jsx)("button", { className: "nav-arrow", "aria-label": "Previous onion variety", "data-action": "toggleFlavor", children: "\u2190" }), (0, jsx_runtime_1.jsx)("button", { className: "nav-arrow", "aria-label": "Next onion variety", "data-action": "toggleFlavor", children: "\u2192" })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "glass-card hero-highlight-card", children: [(0, jsx_runtime_1.jsxs)("div", { className: "highlight-item", children: [(0, jsx_runtime_1.jsx)("div", { className: "highlight-icon flex-center", children: (0, jsx_runtime_1.jsx)(lucide_react_1.TrendingUp, { className: "w-4 h-4 text-emerald-400" }) }), (0, jsx_runtime_1.jsx)("span", { children: "Higher Yield with AI Insights" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "highlight-item", children: [(0, jsx_runtime_1.jsx)("div", { className: "highlight-icon flex-center", children: (0, jsx_runtime_1.jsx)(lucide_react_1.Activity, { className: "w-4 h-4 text-emerald-400" }) }), (0, jsx_runtime_1.jsx)("span", { children: "Early Disease Detection" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "highlight-item", children: [(0, jsx_runtime_1.jsx)("div", { className: "highlight-icon flex-center", children: (0, jsx_runtime_1.jsx)(lucide_react_1.Sprout, { className: "w-4 h-4 text-emerald-400" }) }), (0, jsx_runtime_1.jsx)("span", { children: "Data-Driven Farming Decisions" })] })] })] })] })] }) })), currentPage === 'home' && ((0, jsx_runtime_1.jsx)("section", { id: "features", className: "section", style: { background: 'var(--bg-glass)' }, children: (0, jsx_runtime_1.jsxs)("div", { className: "container", children: [(0, jsx_runtime_1.jsxs)("div", { className: "section-header", children: [(0, jsx_runtime_1.jsx)("h2", { className: "gradient-text", children: "Intelligent Crop Protection Modules" }), (0, jsx_runtime_1.jsx)("p", { children: "Our unified platform hosts advanced deep learning pipelines to keep onion farms healthy, productive, and sustainable." })] }), (0, jsx_runtime_1.jsxs)("div", { className: "features-grid", children: [(0, jsx_runtime_1.jsxs)("div", { className: "glass-card feature-card", children: [(0, jsx_runtime_1.jsx)("div", { className: "feature-icon-wrapper flex-center", children: (0, jsx_runtime_1.jsx)("span", { className: "feature-standard-icon", "aria-hidden": "true", style: { maskImage: `url(${leafIcon})`, WebkitMaskImage: `url(${leafIcon})` } }) }), (0, jsx_runtime_1.jsx)("h3", { className: "feature-title", children: "Onion Leaf Classifier" }), (0, jsx_runtime_1.jsx)("p", { className: "feature-desc", children: "Diagnoses severe diseases like Purple Blotch and Leaf Twist Disease (LTD) using quantized MobileNet/TFLite models directly on-device." })] }), (0, jsx_runtime_1.jsxs)("div", { className: "glass-card feature-card", children: [(0, jsx_runtime_1.jsx)("div", { className: "feature-icon-wrapper flex-center", style: { color: '#ef4444', borderColor: 'rgba(239, 68, 68, 0.2)', background: 'rgba(239, 68, 68, 0.05)' }, children: (0, jsx_runtime_1.jsx)("span", { className: "feature-standard-icon", "aria-hidden": "true", style: { maskImage: `url(${pestIcon})`, WebkitMaskImage: `url(${pestIcon})` } }) }), (0, jsx_runtime_1.jsx)("h3", { className: "feature-title", children: "Thrips Pest Detector" }), (0, jsx_runtime_1.jsx)("p", { className: "feature-desc", children: "Detects and labels onion thrips pests in real-time. Uses PyTorch Faster R-CNN target localization with visual bounding boxes." })] }), (0, jsx_runtime_1.jsxs)("div", { className: "glass-card feature-card", children: [(0, jsx_runtime_1.jsx)("div", { className: "feature-icon-wrapper flex-center", style: { color: 'var(--accent-secondary)', borderColor: 'rgba(0, 255, 135, 0.2)', background: 'rgba(0, 255, 135, 0.05)' }, children: (0, jsx_runtime_1.jsx)("span", { className: "feature-standard-icon", "aria-hidden": "true", style: { maskImage: `url(${nutrientIcon})`, WebkitMaskImage: `url(${nutrientIcon})` } }) }), (0, jsx_runtime_1.jsx)("h3", { className: "feature-title", children: "Nutrient deficiency" }), (0, jsx_runtime_1.jsx)("p", { className: "feature-desc", children: "Identifies Nitrogen (N), Phosphorus (P), and Potassium (K) deficiencies, projecting Grad-CAM heatmaps showing exact symptom focus." })] }), (0, jsx_runtime_1.jsxs)("div", { className: "glass-card feature-card", children: [(0, jsx_runtime_1.jsx)("div", { className: "feature-icon-wrapper flex-center", style: { color: '#a78bfa', borderColor: 'rgba(167, 139, 250, 0.2)', background: 'rgba(167, 139, 250, 0.05)' }, children: (0, jsx_runtime_1.jsx)("span", { className: "feature-standard-icon", "aria-hidden": "true", style: { maskImage: `url(${chatIcon})`, WebkitMaskImage: `url(${chatIcon})` } }) }), (0, jsx_runtime_1.jsx)("h3", { className: "feature-title", children: "AgriBot Chat Advisor" }), (0, jsx_runtime_1.jsx)("p", { className: "feature-desc", children: "Combines NLP BERT classification and Bayesian decision trees to interview users, delivering crop remedy recommendations." })] }), (0, jsx_runtime_1.jsxs)("div", { className: "glass-card feature-card", children: [(0, jsx_runtime_1.jsx)("div", { className: "feature-icon-wrapper flex-center", style: { color: '#f59e0b', borderColor: 'rgba(245, 158, 11, 0.2)', background: 'rgba(245, 158, 11, 0.05)' }, children: (0, jsx_runtime_1.jsx)("span", { className: "feature-standard-icon", "aria-hidden": "true", style: { maskImage: `url(${forecastIcon})`, WebkitMaskImage: `url(${forecastIcon})` } }) }), (0, jsx_runtime_1.jsx)("h3", { className: "feature-title", children: "ST-GNN Outbreak Forecast" }), (0, jsx_runtime_1.jsx)("p", { className: "feature-desc", children: "A Spatio-Temporal Graph Neural Network predicting region-wide disease spread by modeling spatial relations between adjacent farms." })] }), (0, jsx_runtime_1.jsxs)("div", { className: "glass-card feature-card", children: [(0, jsx_runtime_1.jsx)("div", { className: "feature-icon-wrapper flex-center", style: { color: '#10b981', borderColor: 'rgba(16, 185, 129, 0.2)', background: 'rgba(16, 185, 129, 0.05)' }, children: (0, jsx_runtime_1.jsx)("span", { className: "feature-standard-icon", "aria-hidden": "true", style: { maskImage: `url(${backendIcon})`, WebkitMaskImage: `url(${backendIcon})` } }) }), (0, jsx_runtime_1.jsx)("h3", { className: "feature-title", children: "Multi-Agent Backend" }), (0, jsx_runtime_1.jsx)("p", { className: "feature-desc", children: "FastAPI asynchronous backend with isolated microservices, Docker Hugging Face Space deployments, and unified MongoDB clustering." })] })] })] }) })), currentPage === 'simulators' && ((0, jsx_runtime_1.jsx)(react_1.Suspense, { fallback: (0, jsx_runtime_1.jsx)("div", { role: "status", style: { minHeight: '70vh', padding: '10rem 2rem', textAlign: 'center' }, children: "Loading the interactive demo..." }), children: (0, jsx_runtime_1.jsx)(LiveDemoPage_1.default, {}) })), currentPage === 'overview' && ((0, jsx_runtime_1.jsx)("section", { id: "overview", className: "section", style: { paddingTop: '8rem', borderTop: '1px solid var(--border-glass)', background: 'var(--bg-glass)' }, children: (0, jsx_runtime_1.jsx)("div", { className: "container", children: (0, jsx_runtime_1.jsx)(ProjectOverview_1.default, {}) }) })), currentPage === 'gallery' && ((0, jsx_runtime_1.jsx)("section", { id: "gallery", className: "section", style: { paddingTop: '8rem', borderTop: '1px solid var(--border-glass)', background: 'var(--bg-glass)' }, children: (0, jsx_runtime_1.jsxs)("div", { className: "container gallery-trigger", children: [(0, jsx_runtime_1.jsxs)("div", { className: "section-header", children: [(0, jsx_runtime_1.jsx)("h2", { className: "gradient-text", children: "Research Gallery & Video Logs" }), (0, jsx_runtime_1.jsx)("p", { children: "Explore visual maps, drone surveys, microscopy data, and model validation runs compiled during our research cycles." })] }), (0, jsx_runtime_1.jsx)(ResearchGallery_1.default, {})] }) })), currentPage === 'admin' && ((0, jsx_runtime_1.jsx)("section", { id: "admin", className: "section", style: { paddingTop: '8rem', borderTop: '1px solid var(--border-glass)', background: 'var(--bg-glass)' }, children: (0, jsx_runtime_1.jsx)("div", { className: "container", children: (0, jsx_runtime_1.jsx)(react_1.Suspense, { fallback: (0, jsx_runtime_1.jsx)("div", { className: "page-loading glass-card", role: "status", children: "Loading dashboard\u2026" }), children: (0, jsx_runtime_1.jsx)(AdminDashboard_1.default, {}) }) }) })), currentPage === 'home' && ((0, jsx_runtime_1.jsxs)("section", { id: "architecture", className: "section architecture-section", style: { background: 'var(--bg-glass)', borderTop: '1px solid var(--border-glass)', borderBottom: '1px solid var(--border-glass)', position: 'relative', overflow: 'hidden' }, children: [(0, jsx_runtime_1.jsx)("div", { className: "grass-decor-arch-left", "aria-hidden": "true", children: (0, jsx_runtime_1.jsx)("img", { src: "/images/grass_hero_left_hd.png", alt: "", className: "grass-img grass-arch-blades-left" }) }), (0, jsx_runtime_1.jsx)("div", { className: "grass-decor-arch-right", "aria-hidden": "true", children: (0, jsx_runtime_1.jsx)("img", { src: "/images/grass_hero_right_hd.png", alt: "", className: "grass-img grass-arch-blades-right" }) }), (0, jsx_runtime_1.jsxs)("div", { className: "container", style: { textAlign: 'center', position: 'relative', zIndex: 2 }, children: [(0, jsx_runtime_1.jsxs)("div", { className: "section-header", style: { marginBottom: '4rem' }, children: [(0, jsx_runtime_1.jsx)("h2", { className: "gradient-text", children: "Unified Platform Architecture" }), (0, jsx_runtime_1.jsx)("p", { children: "A decoupled multi-agent architecture bridging mobile clients and scalable cloud deep learning services." })] }), (0, jsx_runtime_1.jsxs)("div", { className: "architecture-grid", children: [(0, jsx_runtime_1.jsxs)("div", { className: "glass-card architecture-card", children: [(0, jsx_runtime_1.jsx)("div", { className: "architecture-icon-wrap", style: { color: '#10b981' }, children: (0, jsx_runtime_1.jsx)(lucide_react_1.Globe, { className: "w-10 h-10 mx-auto" }) }), (0, jsx_runtime_1.jsx)("h4", { style: { marginBottom: '0.5rem' }, children: "Flutter Client App" }), (0, jsx_runtime_1.jsx)("p", { style: { fontSize: '0.85rem' }, children: "Cross-platform UI (iOS/Android), offline sqlite caching, camera scan interfaces, and light TFLite classification." })] }), (0, jsx_runtime_1.jsxs)("div", { className: "architecture-connector", "aria-hidden": "true", children: [(0, jsx_runtime_1.jsx)("span", { className: "connector-node" }), (0, jsx_runtime_1.jsx)("span", { className: "connector-line" }), (0, jsx_runtime_1.jsx)("span", { className: "connector-node" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "glass-card architecture-card", style: { borderColor: 'var(--border-glass-accent)' }, children: [(0, jsx_runtime_1.jsx)("div", { className: "architecture-icon-wrap", style: { color: 'var(--accent-secondary)' }, children: (0, jsx_runtime_1.jsx)(lucide_react_1.GitMerge, { className: "w-10 h-10 mx-auto" }) }), (0, jsx_runtime_1.jsx)("h4", { style: { marginBottom: '0.5rem' }, children: "FastAPI Router Server" }), (0, jsx_runtime_1.jsx)("p", { style: { fontSize: '0.85rem' }, children: "Docker container hosting on Hugging Face Spaces. Multi-agent coordination, database clustering, and async processing." })] }), (0, jsx_runtime_1.jsxs)("div", { className: "architecture-connector", "aria-hidden": "true", children: [(0, jsx_runtime_1.jsx)("span", { className: "connector-node" }), (0, jsx_runtime_1.jsx)("span", { className: "connector-line" }), (0, jsx_runtime_1.jsx)("span", { className: "connector-node" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "glass-card architecture-card", children: [(0, jsx_runtime_1.jsx)("div", { className: "architecture-icon-wrap", style: { color: '#a78bfa' }, children: (0, jsx_runtime_1.jsx)(lucide_react_1.Bot, { className: "w-10 h-10 mx-auto" }) }), (0, jsx_runtime_1.jsx)("h4", { style: { marginBottom: '0.5rem' }, children: "DL Inference Pipelines" }), (0, jsx_runtime_1.jsx)("p", { style: { fontSize: '0.85rem' }, children: "PyTorch object detectors, EfficientNet Grad-CAM, BERT classification engines, and ST-GNN crop spread forecasting." })] })] })] })] })), currentPage === 'home' && ((0, jsx_runtime_1.jsx)("section", { id: "team", className: "section", style: { background: 'var(--bg-glass)', borderTop: '1px solid var(--border-glass)' }, children: (0, jsx_runtime_1.jsxs)("div", { className: "container team-trigger", children: [(0, jsx_runtime_1.jsxs)("div", { className: "section-header", children: [(0, jsx_runtime_1.jsx)("h2", { className: "gradient-text", children: "Meet Our Research Team" }), (0, jsx_runtime_1.jsx)("p", { children: "The academic supervisor, team leader, and developers behind the design and modeling of LunuNeth AI." })] }), (0, jsx_runtime_1.jsx)(TeamSection_1.default, {})] }) })), currentPage === 'beta' && ((0, jsx_runtime_1.jsx)("section", { id: "download", className: "section", style: { paddingTop: '8rem' }, children: (0, jsx_runtime_1.jsxs)("div", { className: "container", children: [(0, jsx_runtime_1.jsxs)("div", { className: "section-header", children: [(0, jsx_runtime_1.jsx)("h2", { className: "gradient-text", children: "Join the LunuNeth AI Beta Program" }), (0, jsx_runtime_1.jsx)("p", { children: "Download our mobile app to start testing crop diagnostic intelligence directly on your fields today." })] }), (0, jsx_runtime_1.jsx)(DownloadSection_1.default, {})] }) })), currentPage === 'home' && ((0, jsx_runtime_1.jsxs)("section", { id: "contact", className: "section contact-section", style: { background: 'var(--bg-glass)', borderTop: '1px solid var(--border-glass)', position: 'relative', overflow: 'hidden' }, children: [(0, jsx_runtime_1.jsx)("div", { className: "grass-decor-contact-left", "aria-hidden": "true", children: (0, jsx_runtime_1.jsx)("img", { src: "/images/grass_hero_left_hd.png", alt: "", className: "grass-img grass-contact-tuft" }) }), (0, jsx_runtime_1.jsx)("div", { className: "container", style: { position: 'relative', zIndex: 2 }, children: (0, jsx_runtime_1.jsxs)("div", { className: "contact-wrapper", children: [(0, jsx_runtime_1.jsxs)("div", { className: "contact-info", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsxs)("div", { className: "hero-tag", style: { width: 'fit-content', marginBottom: '1.25rem' }, children: [(0, jsx_runtime_1.jsx)("span", {}), " GET IN TOUCH"] }), (0, jsx_runtime_1.jsx)("h2", { className: "gradient-text", children: "Let's Connect" }), (0, jsx_runtime_1.jsx)("p", { children: "Have questions about deployment, neural networks, or using LunuNeth AI in your region? Get in touch with our team." })] }), (0, jsx_runtime_1.jsxs)("div", { className: "contact-details", children: [(0, jsx_runtime_1.jsxs)("div", { className: "contact-item", children: [(0, jsx_runtime_1.jsx)("div", { className: "contact-icon-box flex-center", children: (0, jsx_runtime_1.jsx)(lucide_react_1.Mail, { className: "w-5 h-5" }) }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("div", { className: "contact-item-title", children: "Send Email" }), (0, jsx_runtime_1.jsx)("a", { href: "mailto:info@lununeth.ai", className: "contact-item-value", children: "info@lununeth.ai" })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "contact-item", children: [(0, jsx_runtime_1.jsx)("div", { className: "contact-icon-box flex-center", children: (0, jsx_runtime_1.jsx)(lucide_react_1.Phone, { className: "w-5 h-5" }) }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("div", { className: "contact-item-title", children: "Call Helpline" }), (0, jsx_runtime_1.jsx)("span", { className: "contact-item-value", children: "+94 77 123 4567" })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "contact-item", children: [(0, jsx_runtime_1.jsx)("div", { className: "contact-icon-box flex-center", children: (0, jsx_runtime_1.jsx)(lucide_react_1.MapPin, { className: "w-5 h-5" }) }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("div", { className: "contact-item-title", children: "Helpline Location" }), (0, jsx_runtime_1.jsx)("span", { className: "contact-item-value", children: "Colombo, Sri Lanka" })] })] })] }), (0, jsx_runtime_1.jsx)("div", { style: { fontSize: '0.8rem', color: 'var(--text-muted)' }, children: "Powered by BERT NLP + PyTorch models. All rights reserved." })] }), (0, jsx_runtime_1.jsx)("div", { className: "glass-card", children: (0, jsx_runtime_1.jsxs)("form", { onSubmit: handleSubmit, children: [(0, jsx_runtime_1.jsx)("div", { style: { fontSize: '1.25rem', fontWeight: 600, marginBottom: '1.5rem' }, children: "Send Us a Message" }), formStatus && ((0, jsx_runtime_1.jsx)("div", { className: `form-status ${formStatus.type}`, children: formStatus.message })), (0, jsx_runtime_1.jsxs)("div", { className: "form-row", children: [(0, jsx_runtime_1.jsxs)("div", { className: "form-group", children: [(0, jsx_runtime_1.jsx)("label", { className: "form-label", children: "Name" }), (0, jsx_runtime_1.jsx)("input", { type: "text", required: true, value: formData.name, onChange: (e) => setFormData({ ...formData, name: e.target.value }), placeholder: "Your name", className: "form-input" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "form-group", children: [(0, jsx_runtime_1.jsx)("label", { className: "form-label", children: "Email" }), (0, jsx_runtime_1.jsx)("input", { type: "email", required: true, value: formData.email, onChange: (e) => setFormData({ ...formData, email: e.target.value }), placeholder: "Your email", className: "form-input" })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "form-group", children: [(0, jsx_runtime_1.jsx)("label", { className: "form-label", children: "I am a..." }), (0, jsx_runtime_1.jsxs)("select", { value: formData.role, onChange: (e) => setFormData({ ...formData, role: e.target.value }), className: "form-select", children: [(0, jsx_runtime_1.jsx)("option", { value: "Farmer", children: "Farmer / Grower" }), (0, jsx_runtime_1.jsx)("option", { value: "Researcher", children: "Agricultural Researcher" }), (0, jsx_runtime_1.jsx)("option", { value: "Developer", children: "Software Developer" }), (0, jsx_runtime_1.jsx)("option", { value: "Other", children: "Other Interested Party" })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "form-group", style: { marginBottom: '2rem' }, children: [(0, jsx_runtime_1.jsx)("label", { className: "form-label", children: "Message" }), (0, jsx_runtime_1.jsx)("textarea", { required: true, value: formData.message, onChange: (e) => setFormData({ ...formData, message: e.target.value }), placeholder: "Describe your question or partnership proposal...", className: "form-textarea" })] }), (0, jsx_runtime_1.jsxs)("button", { type: "submit", className: "solid-btn", style: { width: '100%', justifyContent: 'center' }, disabled: submitting, children: [submitting ? 'Submitting...' : 'Send Inquiry Message', " ", (0, jsx_runtime_1.jsx)(lucide_react_1.Send, { className: "w-4 h-4" })] })] }) })] }) })] })), (0, jsx_runtime_1.jsx)(SiteFooter_1.default, { navigateTo: navigateTo }), (0, jsx_runtime_1.jsx)(AndroidInstallPopup_1.default, {}), (0, jsx_runtime_1.jsx)(WindowsInstallPopup_1.default, {})] }));
}
