# University website migration plan

Source: the existing LunuNeth AI website and the supplied 16-page university website planning guide.

## Goals and design
Explain the onion crop research, its evidence, team, assessment progress, and deliverables. Preserve the existing typography, colours, responsive layouts, artwork, 3D models, and motion. Only the implementation technology and university navigation structure change.

## Structure and navigation
Home → Domain → Milestones → Documents → Presentations → About Us → Contact Us. Keep Live Demo, Research Logs and App Downloads as additional destinations. Every page has the same header and footer, active navigation, and a route back home. Group research, project information, and interactive pages in folders. Use ordinary HTML links that work on static hosting and in subdirectories.

## Asset and technology plan
Use static HTML, external CSS and plain JavaScript. Retain GSAP and Three.js as JavaScript animation libraries, with no React, JSX, TypeScript or build step required by the delivered website. Retain existing linked research files. Optimize raster images, preserving transparency, and keep large application installers as external links so the site fits the university's 20 MB hosting allocation.

## Source limitations
The supplied guide lists WordPress, HTML and CSS as allowed technologies; JavaScript is requested explicitly by the user and required for existing interactions. Confirm course acceptance of JavaScript before submission. Assessment dates, allocated marks, the viva schedule and missing final documents are not supplied: display pending confirmation rather than inventing them. Existing external document and app links require network access and their owners' sharing permissions. Static hosting cannot run the existing PHP contact or release-upload services; contact opens an email draft, and admin changes remain browser-local.

## Validation
Check every local link and asset, the uncompressed site size, absence of React dependencies, mobile overflow, navigation, chapter switching, document search, milestone selection, theme controls, demos and reduced-motion behavior. Compare rendered pages against the existing styles and markup.
