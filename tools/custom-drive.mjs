import fs from 'node:fs';
const base='university-website/site/';
function sectionEnd(html,start){const tags=/<\/?section\b[^>]*>/g;tags.lastIndex=start;let depth=0,m;while((m=tags.exec(html))){depth+=m[0].startsWith('</')?-1:1;if(depth===0)return tags.lastIndex;}throw Error('Unclosed section');}
for(const name of ['documents','presentations']){
 const file=base+`research/${name}.html`;let html=fs.readFileSync(file,'utf8');const start=html.indexOf('<section id="research-documents"'),end=sectionEnd(html,start);
 const title=name==='documents'?'Research documents':'Presentation slides';
 html=html.slice(0,start)+`<section id="research-documents" tabindex="-1" class="research-documents" aria-label="${title}" data-drive-kind="${name}"><div class="research-documents-header"><label class="research-search"><input id="drive-search" type="search" aria-label="Search research documents" placeholder="Find a document or category…"></label></div><div class="drive-library-actions"><button type="button" class="research-primary" id="refresh-drive">Refresh files</button><p id="drive-status" role="status"></p></div><p class="research-result-count" role="status"></p><div class="research-category-sections" id="drive-rows"></div><noscript><p>Enable JavaScript to view the file list or <a href="https://drive.google.com/drive/folders/1rkH_ZjhUT8vOdDe2AyoqSrTQuTi7mQ6I">open the project folder</a>.</p></noscript></section>`+html.slice(end);
 html=html.replace('Browse the current files directly from the project’s Google Drive folder.','View and download the project’s research files.');
 html=html.replace(/<script defer src="assets\/js\/(drive-library|drive-config|drive-snapshot|custom-drive)\.js"><\/script>/g,'');
 html=html.replace('</head>','<script defer src="assets/js/drive-config.js"></script><script defer src="assets/js/drive-snapshot.js"></script><script defer src="assets/js/custom-drive.js"></script></head>');
 fs.writeFileSync(file,html);
}
console.log('Restored custom document rows and direct actions.');
