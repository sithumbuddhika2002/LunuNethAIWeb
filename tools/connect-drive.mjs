import fs from 'node:fs';
import path from 'node:path';
const root=path.resolve('university-website/site');
export const driveFolders={documents:'1rkH_ZjhUT8vOdDe2AyoqSrTQuTi7mQ6I',presentations:'1VSSjsI7BcvQtZbTvlQAopYsJ3kNj-3cG'};
// Replace the complete old library (including stale pending-file claims), retaining
// the surrounding exported design. Balanced tags avoid depending on minification.
function sectionEnd(html,start){const tags=/<\/?section\b[^>]*>/g;tags.lastIndex=start;let depth=0,match;while((match=tags.exec(html))){depth+=match[0].startsWith('</')?-1:1;if(depth===0)return tags.lastIndex;}throw new Error('Unclosed research library section');}
for(const [name,id] of Object.entries(driveFolders)){
 const file=path.join(root,`research/${name}.html`);let html=fs.readFileSync(file,'utf8');
 const start=html.indexOf('<section id="research-documents"');if(start<0)throw new Error('Missing document library: '+file);
 const end=sectionEnd(html,start),title=name==='documents'?'Project document library':'Presentation slides';
 const folder=`https://drive.google.com/drive/folders/${id}`;
 const content=`<section id="research-documents" tabindex="-1" class="research-documents" aria-labelledby="documents-title">
 <div class="research-documents-header"><div><p class="research-eyebrow">Connected to Google Drive</p><h2 id="documents-title">${title}</h2><p>${name==='documents'?'Browse the project folders to see their current documents.':'Browse the current proposal and progress presentation files.'} Names and availability are supplied directly by Google Drive.</p></div></div>
 <div class="drive-library-actions"><button type="button" class="research-primary" id="refresh-drive">Refresh files</button><a class="research-primary" href="${folder}" target="_blank" rel="noopener noreferrer">Open folder in Google Drive ↗</a></div>
 <p id="drive-status" class="research-result-count" role="status">The live folder loads below. If it is blank or asks you to sign in, use Open folder in Google Drive.</p>
 <div class="drive-library-frame"><iframe id="drive-library" title="${title} — live Google Drive folder" src="https://drive.google.com/embeddedfolderview?id=${id}#list" data-folder-id="${id}" loading="eager" referrerpolicy="strict-origin-when-cross-origin"></iframe></div>
 <p class="research-result-count">Google controls this file view and may briefly cache changes. Refresh files after editing Drive. Visitors can only access files permitted by your Google Drive sharing settings.</p>
 </section>`;
 html=html.slice(0,start)+content+html.slice(end);
 html=html.replace('View the available project files. Future deliverables are listed with their current availability.','Browse the current files directly from the project’s Google Drive folder.');
 if(!html.includes('assets/js/drive-library.js'))html=html.replace('</head>','<link rel="stylesheet" href="assets/css/drive-library.css"><script defer src="assets/js/drive-library.js"></script></head>');
 fs.writeFileSync(file,html);
}
console.log('Connected Documents and Presentations to live Drive folder views.');
