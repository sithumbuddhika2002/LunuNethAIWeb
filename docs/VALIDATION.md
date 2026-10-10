# Validation

## Team detail buttons

Restored plain JavaScript handlers for the six existing team drawers on Home and About Us. Verified every profile expands and collapses at 1440px and 390px, with visible biography content and the original CSS transition. Button labels, chevrons and aria-expanded stay synchronized; collapsed drawers are inert and aria-hidden. Enter/Space work with reduced motion. No browser errors occurred. The upload ZIP includes the fix.

## Custom file rows restored — current implementation

The embedded Drive folder approach below is superseded. The current pages restore the custom file rows, document icons, categories, search and separate View / Download links. Nine files were read from the supplied Drive folder: six documents and three presentations. A signed-out Chrome check verified row counts, direct URL structure, search and mobile overflow. Mocked feed responses verified renamed/replaced files, deleted files, an empty folder and feed errors. No page errors occurred.

The Apps Script source and deployment guide are prepared under integration/. The deployed endpoint is not configured yet, so automatic updates are NOT active. The UI labels its saved snapshot explicitly. Live activation requires the user's deployed /exec URL; no Google permissions or files were changed.

## Live Drive update — 11 October 2026

Verified the Documents root folder and Presentations subfolder in a fresh signed-out Chrome session. The root listed Individual_Thesis, Presentations, Proposal_Report and Research_paper. The presentations view showed Progress Presentation 1.pptx, Progress Presentation 2.pptx and the newly added Project Proposal.pptx. No sharing permissions were changed.

Refresh controls request a new embedded URL. Both pages passed mobile width and browser error checks. Old cached file rows, local file search and obsolete pending-file claims were removed. The main site's layout is retained around Google's native embedded list. This is a live remote view, not a background synchronization of local files. The original React project is unchanged. The upload ZIP has been refreshed; hosting still needs the new files uploaded.

## Initial migration checks

- 12 HTML pages served successfully in Chrome.
- No JavaScript page errors and no broken local assets or page links in the final browser run.
- Verified chapter changes, technology view switching, document filtering, milestone dropdown, disease/nutrient sample scans, scripted chatbot, gallery detail dialog, theme switching and mobile navigation.
- Verified browser-local log creation and persistence into the gallery.
- Checked all pages at 390px wide: no document-level horizontal overflow.
- Verified reduced-motion sample interactions and WebGL footer initialization. Inspected desktop home, mobile domain and desktop footer screenshots. Fixed the reduced-motion hero containing block so the onion remains inside its section.
- Deployment files: 88 files, 19,715,328 bytes, below 20,000,000 bytes.
- JavaScript syntax checks passed for site.js and admin.js.
- No React, JSX, TypeScript, PHP or package installation is required in the deployable site directory.
- Git status shows only the new university-website directory; existing tracked files are unchanged.

External Drive sharing permissions, installer availability, course acceptance of JavaScript and missing assessment information remain owner/course checks. Contact opens a mail draft; no live message was sent during verification.
