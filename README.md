# LunuNeth AI — HTML, CSS and JavaScript edition

The complete deployable website is in **site/**. The original React/TypeScript project is unchanged. This edition uses static HTML pages and vanilla JavaScript, retaining the original CSS, content, GSAP choreography, Three.js onion scenes, and animated grass. Raster images are optimized as WebP.

## Preview

From this folder, run `python -m http.server 8080 --directory site`, then open http://localhost:8080. VS Code Live Server also works: open `site/index.html` with Live Server. Use HTTP for the 3D models; double-clicking the HTML file can block model loading.

There is no npm install or build step for the delivered site. Upload **only the contents of site/** to the course web directory, preserving the folder hierarchy. Relative links and HTML base paths support hosting inside a student subdirectory.

## Pages

- `index.html`: existing home, features, architecture, team and contact sections.
- `research/domain.html`: literature, research gap, research problem, objectives, methodology and technologies.
- `research/milestones.html`: assessment dropdown, descriptions, status, date and allocated-mark fields.
- `research/documents.html`: original styled file rows with View and Download buttons, category groups and search.
- `research/presentations.html`: original styled presentation rows with direct View and Download actions.
- `project/about.html`, `project/contact.html`: existing team profiles and contact layout.
- `explore/demo.html`, `explore/logs.html`, `explore/downloads.html`: existing sample demonstrations, gallery and installer links.
- `manage/index.html`: browser-local research log editing, deletion and JSON export. Changes are visible in the gallery in the same browser.
- `project/information.html`: privacy and project information.

## University guide and remaining information

The provided guide requires a maximum **20 MB** uploaded site. The deployable directory is approximately **20.76 MB (decimal)**; the packaged ZIP is **17.29 MB**. If the limit applies to extracted files, further asset reduction is needed. Keep installers on an external download host; the existing Android APK alone is approximately 102 MB. Android APK buttons use the supplied Google Drive direct-download link. Drive may display a confirmation screen and requires public file access. Other platform links still require verification. External Google Drive document links were retained from the original site; their permissions and availability are controlled by their owners.

The guide lists WordPress, HTML and CSS as permitted technologies. This implementation includes JavaScript as explicitly requested, including JavaScript animation libraries. Confirm course acceptance of JavaScript before submitting.

Official assessment dates and marks were not supplied. They are marked **Awaiting confirmation** rather than invented. Update `window.ASSESSMENTS` in `site/assets/js/panels.js` and the table in `site/research/milestones.html` when confirmed. Add charter, checklist and final reports to the appropriate Drive folders as they become available.

## Google Drive documents

The original custom document rows, search, category groups, and separate View / Download buttons have been restored. There is no embedded Google Drive folder. The saved list contains 14 files: four proposal reports, four individual theses, one group thesis, one research paper, one evidence report, and three presentations. Proposal Reports, Individual Thesis, and Group Thesis were refreshed from the supplied Drive folder on 11 October 2026.

Automatic future updates require the read-only Apps Script feed in `integration/Code.gs`. Follow `integration/SETUP.md` to deploy it, then set the deployed URL in `site/assets/js/drive-config.js`. Until that is configured, the website explicitly says it is showing a saved list. The code is prepared and refresh behavior has been tested with controlled responses; a live feed has not been deployed or verified.

This applies to the new `university-website/site/` HTML edition only. Upload the revised site or ZIP to update your hosted website. Sharing and download availability remain controlled by Google Drive; large downloads may show Google's confirmation screen.

## Static-host behavior

- Contact opens an email draft; the visitor must send it in their email application. No PHP endpoint is required and no unsent message is reported as delivered.
- The research console is explicitly browser-local, without server authentication or release uploads. Export logs to back them up. To publish updated default logs, update `assets/js/logs-data.js` and the static gallery markup together.
- Sample scans and chatbot replies are demonstrations, matching the original site's saved results and disclosures; no live inference is performed.
- Google Fonts, model-viewer, Drive documents and application downloads need internet access. GSAP, Three.js, website images and both 3D models are included locally.
- The original site's contact details and research claims were retained, not independently verified.

## Editing and provenance

Home now includes a field-visit journal with all 35 images imported from the supplied Drive folder. These are local WebP copies, not an automatically synchronized Drive feed. The original collection link remains available. Filters, a full-screen viewer, thumbnail navigation, keyboard arrows and touch swipes are implemented in `assets/js/field-gallery.js`; the gallery styling is in `assets/css/field-gallery.css`. GSAP handles entrance and image transitions, with reduced-motion support. The desktop featured photograph uses the Three.js surface in `tools/scene-source/field-depth.js`, with a normal image fallback.

`tools/gallery.mjs` installs the Home markup and photo metadata, and is called by the page assembler. Source filenames and Drive IDs are recorded in `tools/field-photo-sources.json`. Originals remain under `tools/field-originals/`; unused copied decorative assets were moved to `tools/unused-images/` to keep the deployed site small. Do not deploy either folder. Gallery browser checks passed at 1440px and 390px, including all 35 image loads, filters, viewer navigation, focus restoration, reduced motion and the desktop Three.js canvas. No ZIP was generated for this change.

Edit the files in `site/` directly. `assets/js/site.js` handles ordinary DOM events; `admin.js` handles local log management; `panels.js` contains pre-rendered chapter and scanner HTML. `scenes.js` contains the bundled original Three.js effects. Readable scene source is kept under `tools/scene-source/`.

`tools/` contains one-time migration and validation utilities. They use development dependencies from the original checkout and are **not part of the deployable website**. React was used only during migration to extract the existing markup; none is shipped in `site/`. `docs/PLAN.md` maps the university guide to the implementation; screenshots document visual checks. Do not upload tools, docs or this README under the 20 MB allocation.

