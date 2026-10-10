"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePageSeo = updatePageSeo;
const seo = { "origin": "https://lunu-neth-ai-website.vercel.app", "pages": { "home": { "path": "/", "title": "LunuNeth AI | AI for Onion Crop Health in Sri Lanka", "description": "Meet LunuNeth AI, a crop advisory research platform for Sri Lankan onion farmers. Explore disease detection, thrips monitoring, nutrient analysis and AI advice." }, "overview": { "path": "/overview", "title": "Project Overview | LunuNeth AI", "description": "Explore the LunuNeth AI research project and its approach to onion disease detection, pest monitoring, nutrient analysis and crop advice for Sri Lankan farmers." }, "simulators": { "path": "/simulators", "title": "Interactive Crop Health Demo | LunuNeth AI", "description": "Explore interactive LunuNeth AI demonstrations of onion crop health tools, including disease scanning, pest detection and conversational crop advice." }, "gallery": { "path": "/gallery", "title": "Research Logs and Documents | LunuNeth AI", "description": "Browse LunuNeth AI research logs, project documents and progress across onion disease detection, pest monitoring, nutrient analysis and AI crop advice." }, "beta": { "path": "/beta", "title": "Download the Beta App | LunuNeth AI", "description": "Explore LunuNeth AI beta app downloads and installation instructions for the onion crop health research platform." }, "admin": { "path": "/admin", "title": "Administration | LunuNeth AI", "description": "LunuNeth AI project administration." } } };
function updatePageSeo(page) {
    const metadata = seo.pages[page];
    document.title = metadata.title;
    const values = {
        'meta[name="description"]': metadata.description,
        'meta[name="robots"]': page === 'admin' ? 'noindex, nofollow' : 'index, follow',
        'meta[property="og:title"]': metadata.title,
        'meta[property="og:description"]': metadata.description,
        'meta[property="og:url"]': seo.origin + metadata.path,
        'meta[name="twitter:title"]': metadata.title,
        'meta[name="twitter:description"]': metadata.description,
    };
    for (const [selector, value] of Object.entries(values)) {
        document.querySelector(selector)?.setAttribute('content', value);
    }
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', seo.origin + metadata.path);
}
