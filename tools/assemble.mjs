import fs from 'node:fs';
import path from 'node:path';
import {createRequire} from 'node:module';
const require=createRequire('C:/Users/rosha/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/package.json');
const {chromium}=require('playwright');
const root=path.resolve('university-website');
const site=path.join(root,'site');
export function write(file,value){const p=path.join(site,file);fs.mkdirSync(path.dirname(p),{recursive:true});fs.writeFileSync(p,value);}
const snapshots=Object.fromEntries(fs.readdirSync(path.join(root,'tools/snapshots')).map(f=>[f.replace('.html',''),fs.readFileSync(path.join(root,'tools/snapshots',f),'utf8')]));
const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
const page=await browser.newPage();
const result=await page.evaluate(({snapshots})=>{
 const parse=s=>new DOMParser().parseFromString(s,'text/html');
 const home=parse(snapshots.home), overview=parse(snapshots.overview);
 const nav=home.querySelector('.navbar').outerHTML,footer=home.querySelector('.site-footer').outerHTML;
 const routes={home:'index.html',overview:'research/domain.html',simulators:'explore/demo.html',gallery:'explore/logs.html',beta:'explore/downloads.html',admin:'manage/index.html'};
 const top=[['Home','index.html'],['Domain','research/domain.html'],['Documents','research/documents.html'],['Presentations','research/presentations.html'],['About Us','project/about.html'],['Contact Us','project/contact.html']];
 const extra=[['Live Demo',routes.simulators],['Research Logs',routes.gallery],['Install App',routes.beta]];
 function normalize(doc,file){
   for(const el of doc.querySelectorAll('[src],[href]'))for(const attr of ['src','href']){
     let val=el.getAttribute(attr);if(!val)continue;
     if(/^(?:\/|\.\/)?images\//.test(val))val=val.replace(/^(?:\/|\.\/)?images\//,'assets/images/').replace(/\.(png|jpe?g)$/i,'.webp');
     else if(val.startsWith('/model/'))val=val.slice(1);
     else if(val.startsWith('/assets/'))val=val.slice(1);
     else if(val==='/logo.jpeg')val='assets/images/logo.webp';
     else if(val.startsWith('/downloads/'))val='https://lununethai.com'+val;
     else if(val.startsWith('/')){const [p,hash]=val.slice(1).split('#');val=(routes[p||'home']||'index.html')+(hash?'#'+hash:'');}
     else if(val.startsWith('#'))val=file+val;
     else if(val.startsWith('javascript:'))val='project/contact.html';
     el.setAttribute(attr,val);
   }
   for(const a of doc.querySelectorAll('a[data-action]')){const m=a.dataset.action.match(/navigateTo\('([^']+)'(?:,\s*'([^']+)')?/);if(m)a.href=(routes[m[1]]||'index.html')+(m[2]?'#'+m[2]:'');}
   const teamImages=['dr_kawshalya','dr_dharshana','vidura','sithum','senura','kaveesha'];
   [...doc.querySelectorAll('.supervisor-card img,.student-card img')].forEach((img,i)=>{if(teamImages[i])img.src='assets/images/team/'+teamImages[i]+'.webp';});
 }
 function wrap(file,title,body){
   const doc=parse(nav+body+footer);
   const links=top.map(([name,url])=>`<li><a href="${url}" ${url===file?'class="active" aria-current="page"':''}>${name}</a></li>`).join('');
   doc.querySelector('.nav-links').innerHTML=links;
   doc.querySelector('.navbar').insertAdjacentHTML('beforeend',`<div class="mobile-dropdown" id="mobile-navigation" hidden>${[...top,...extra].map(([name,url])=>`<a href="${url}" ${url===file?'aria-current="page" class="active"':''}>${name}</a>`).join('')}</div>`);
   doc.querySelector('.mobile-menu-btn').setAttribute('aria-controls','mobile-navigation');
   const pf=doc.querySelector('#footer-platform-links');pf.innerHTML=[...top,...extra.filter(([,url])=>url!==routes.simulators&&url!==routes.gallery)].map(([name,url])=>`<li><a href="${url}">${name}</a></li>`).join('');
   for(const a of doc.querySelectorAll('.site-footer-group a'))if(a.getAttribute('href')==='#')a.setAttribute('href','project/information.html#'+(a.textContent.includes('Privacy')?'privacy':'terms'));
   normalize(doc,file);
   doc.querySelectorAll('link[rel="preload"]').forEach(n=>n.remove());
   for(const el of doc.querySelectorAll('[data-action]')){
     if(el.dataset.action.includes('goTo(')){const m=el.dataset.action.match(/goTo\('([^']+)'/);if(m)el.dataset.scroll=m[1];}
     if(el.dataset.action.includes('handleFlavorChange'))el.dataset.flavor=el.dataset.action.includes('purple')?'purple':'yellow';
     if(el.dataset.action==='toggleFlavor')el.dataset.flavor='toggle';
     el.removeAttribute('data-action');
   }
   for(const [i,el] of [...doc.querySelectorAll('#contact input,#contact select,#contact textarea')].entries()){el.id=['contact-name','contact-email','contact-role','contact-message'][i];el.name=['name','email','role','message'][i];el.parentElement.querySelector('label')?.setAttribute('for',el.id);}
   const form=doc.querySelector('#contact form');if(form){form.id='contact-form';form.insertAdjacentHTML('beforeend','<p class="form-status" role="status" id="contact-status">Opens a draft in your email app. No message is sent automatically.</p>');}
   const base=file.includes('/')?'../':'./';
   return `<!doctype html>\n<html lang="en" data-theme="light"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><base href="${base}"><title>${title} | LunuNeth AI</title><meta name="description" content="LunuNeth AI onion crop research: ${title}. University research project, evidence, team and interactive demonstrations."><link rel="icon" href="assets/images/logo.webp"><link rel="stylesheet" href="assets/css/site.css"><link href="https://fonts.googleapis.com/css2?family=Caveat:wght@500;600;700&family=Inter:wght@300;400;500;600;700&family=Outfit:wght@400;500;600;700;800&family=Galada&display=swap" rel="stylesheet"><script src="assets/js/theme.js"></script><script defer src="assets/vendor/gsap.min.js"></script><script defer src="assets/vendor/ScrollTrigger.min.js"></script><script defer src="assets/js/panels.js"></script><script defer src="assets/js/site.js"></script><script type="module" src="assets/js/scenes.js"></script>${file==='index.html'?'<script type="module" src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js"></script>':''}</head><body data-page="${file}"><a class="skip-link" href="${file}#content">Skip to content</a><div id="content" tabindex="-1">${doc.body.innerHTML}</div></body></html>`;
 }
 function shell(title,intro,content){return `<main class="research-overview university-page container"><header class="research-hero"><div><p class="research-eyebrow">LunuNeth AI / Research project</p><h1>${title}</h1><p class="research-intro">${intro}</p></div></header>${content}</main>`;}
 const pages={};
 const admin=parse(snapshots['admin-ready']).querySelector('#admin');
 admin.querySelector('.admin-title-row p').textContent='Browser-local research log management. Changes stay on this device.';
 const logout=admin.querySelector('.admin-logout-btn');logout.textContent='Back to website';logout.id='admin-exit';
 admin.querySelector('.admin-body').insertAdjacentHTML('beforebegin','<p class="form-status">This static console has no server authentication or release uploads. Export your changes to keep a backup.</p>');
 pages['manage/index.html']=wrap('manage/index.html','Research Console',admin.outerHTML);
 const homeBody=home.body.firstElementChild.cloneNode(true);homeBody.querySelector('.navbar').remove();homeBody.querySelector('.site-footer').remove();
 pages['index.html']=wrap('index.html','Crop Intelligence',homeBody.innerHTML);
 let domain=overview.querySelector('.research-overview').cloneNode(true);domain.classList.add('university-page','container');domain.querySelector('.research-documents').remove();domain.querySelector('.research-hero h1').innerHTML='Our research.<br><span>The domain & approach.</span>';
 domain.querySelector('.research-intro').textContent='Explore the literature, research gap, objectives, methodology and technologies behind LunuNeth AI.';
 domain.querySelector('.research-facts a').setAttribute('href',routes.overview.replace('domain','documents'));
 domain.querySelector('.research-chapters a').setAttribute('href',routes.overview.replace('domain','documents'));
 pages['research/domain.html']=wrap('research/domain.html','Domain',domain.outerHTML);
 const assessments=[['Project Proposal','Completed','Introduce the research problem, objectives, proposed methodology and individual components.'],['Progress Presentation 1','Completed','Present initial implementation, research progress and evidence.'],['Progress Presentation 2','Completed','Demonstrate integrated components, progress and evaluation evidence.'],['Final Assessment','Pending','Submit and demonstrate the complete project and final documentation.'],['Viva','Pending confirmation','Discuss individual contributions, research decisions and findings with the panel.']];
 const milestones=`<section class="research-reading-card"><label class="form-label" for="milestone-select">Choose an assessment</label><select id="milestone-select" class="form-select">${assessments.map(([n],i)=>`<option value="${i}">${n}</option>`).join('')}</select><div id="milestone-detail" aria-live="polite"></div></section><div class="research-assessment-card"><table class="research-assessment-table"><caption>Project assessments</caption><thead><tr><th>Assessment</th><th>Status</th><th>Date</th><th>Marks allocated</th></tr></thead><tbody>${assessments.map(([n,s])=>`<tr><th scope="row">${n}</th><td>${s}</td><td>Awaiting confirmation</td><td>Awaiting confirmation</td></tr>`).join('')}</tbody></table></div>`;
 pages['research/milestones.html']=wrap('research/milestones.html','Milestones',shell('Progress & milestones.','Assessment status follows the existing project website. Official dates and allocated marks are awaiting confirmation.',milestones));
 for(const slides of [false,true]){
  const docs=overview.querySelector('.research-documents').cloneNode(true);
  docs.querySelectorAll('.research-document-category').forEach(section=>{const isSlides=section.querySelector('h3').textContent.includes('Presentation');if(slides!==isSlides)section.remove();});
  const pending=slides?['Proposal presentation','Final presentation']:['Project Charter','Consolidated Proposal Document','Check List documents','Final main document','Final report — Foliar Disease','Final report — Pest Detection','Final report — Chatbot','Final report — Nutrient Deficiency'];
  docs.insertAdjacentHTML('beforeend',`<section class="research-document-category"><header class="research-category-heading"><h3>Pending deliverables</h3></header><ul class="pending-list">${pending.map(n=>`<li><span>${n}</span><span>Not supplied yet</span></li>`).join('')}</ul></section>`);
  docs.querySelector('h2').textContent=slides?'Presentation slides':'Research documents';
  const file=`research/${slides?'presentations':'documents'}.html`;
  pages[file]=wrap(file,slides?'Presentations':'Documents',shell(slides?'Presentations.':'Project documents.','View the available project files. Future deliverables are listed with their current availability.',docs.outerHTML));
 }
 for(const [name,id] of [['about','team'],['contact','contact']])pages[`project/${name}.html`]=wrap(`project/${name}.html`,name==='about'?'About Us':'Contact Us',`<main class="university-page">${home.querySelector('#'+id).outerHTML}</main>`);
 for(const [key,file,selector] of [['simulators','explore/demo.html','.live-demo'],['beta','explore/downloads.html','#download']])pages[file]=wrap(file,key==='beta'?'Download App':'Live Demo',parse(snapshots[key]).querySelector(selector).outerHTML);
 const gallery=parse(snapshots.gallery);gallery.querySelector('.gallery-grid').parentElement.innerHTML=parse(snapshots.logs).body.innerHTML;
 pages['explore/logs.html']=wrap('explore/logs.html','Research Logs',gallery.querySelector('#gallery').outerHTML);
 pages['project/information.html']=wrap('project/information.html','Site Information',shell('Site information.','About this university project website.',`<section class="research-reading-card" id="privacy"><h2>Privacy</h2><p>Your theme preference and any locally managed research logs are saved in this browser. The contact form opens your email application. Guided demos use sample data and do not upload crop images. External Google Fonts, model-viewer, document and download services receive normal browser requests when used.</p></section><section class="research-reading-card" id="terms"><h2>Project information</h2><p>This is a university research showcase. Demonstrations reproduce saved examples and scripted conversations. Research documents and software downloads remain subject to the availability and terms of their respective hosts.</p></section>`));
 const panels={};
 panels['admin-table']=parse(snapshots['admin-table']).querySelector('.admin-manage-tab').outerHTML;
 panels['admin-overview']=admin.querySelector('.admin-body').innerHTML;
 for(let i=0;i<4;i++)panels['chapter-'+i]=parse(snapshots['chapter-'+i]).querySelector('.research-panel-content').outerHTML;
 panels['chapter-4']='<div class="research-panel-content"><h2>Research Problem</h2><div class="research-reading-card"><p class="research-body-text">How can an integrated, accessible crop advisory system help Sri Lankan onion farmers distinguish foliar diseases, pest damage and nutrient deficiencies, while providing context-aware guidance and forecasting disease risk?</p><p class="research-body-text">The project addresses fragmented diagnostic tools, limited field connectivity, changing pest populations and language barriers through four connected research components.</p></div></div>';
 for(const name of ['WindowsInstallPopup','AndroidInstallPopup'])panels[name]=snapshots[name];
 panels['technology-cards']=parse(snapshots['technology-cards']).querySelector('.research-panel-content').outerHTML;
 for(const key of Object.keys(snapshots).filter(k=>k.startsWith('scan-')))panels[key]=snapshots[key];
 for(const key of Object.keys(panels)){const doc=parse(panels[key]);normalize(doc,'research/domain.html');doc.querySelectorAll('[data-action]').forEach(e=>e.removeAttribute('data-action'));panels[key]=doc.body.innerHTML;}
 return {pages,panels,assessments};
},{snapshots});
await browser.close();
 for(const [file,html] of Object.entries(result.pages))write(file,html.replace('<script defer src="assets/js/site.js">','<script defer src="assets/js/scroll.js"></script><script defer src="assets/js/chat-copy.js"></script><script defer src="assets/js/logs-data.js"></script><script defer src="assets/js/site.js">').replace('</body>',(file==='manage/index.html'?'<script defer src="assets/js/admin.js"></script>':'')+'</body>'));
write('assets/js/panels.js','window.SITE_PANELS='+JSON.stringify(result.panels)+';\nwindow.ASSESSMENTS='+JSON.stringify(result.assessments)+';');
write('assets/js/logs.json',fs.readFileSync(path.join(root,'assets/js/logs.json')));
write('assets/js/logs-data.js','window.RESEARCH_LOGS='+fs.readFileSync(path.join(root,'assets/js/logs.json'),'utf8')+';\ntry { const saved = JSON.parse(localStorage.getItem("lununeth-static-logs")); if (Array.isArray(saved)) window.LOCAL_RESEARCH_LOGS = saved; } catch {}');
let css=['src/index.css','src/components/ProjectOverview.css','src/components/LiveDemoPage.css','src/components/SiteFooter.css','src/components/FooterGrass.css'].map(f=>fs.readFileSync(f,'utf8')).join('\n');
css=css.replace(/url\(['"]?\/images\/([^)'".]+)\.(?:png|jpe?g)['"]?\)/g,'url("../images/$1.webp")');
write('assets/css/site.css',css+'\n'+fs.readFileSync(path.join(root,'tools/additions.css'),'utf8'));
for(const name of ['gsap','ScrollTrigger'])write(`assets/vendor/${name}.min.js`,fs.readFileSync(`node_modules/gsap/dist/${name}.min.js`));
for(const f of fs.readdirSync('src/assets/feature-icons'))write('assets/icons/'+f,fs.readFileSync('src/assets/feature-icons/'+f));
for(const f of fs.readdirSync('public/model'))write('model/'+f,fs.readFileSync('public/model/'+f));
write('assets/vendor/GSAP-LICENSE.txt','GSAP '+JSON.parse(fs.readFileSync('node_modules/gsap/package.json')).version+' — license: https://gsap.com/standard-license/\nOriginal distribution license headers are retained.');
write('assets/vendor/THREE-LICENSE.txt',fs.readFileSync('node_modules/three/LICENSE'));
console.log('Assembled',Object.keys(result.pages).length,'static pages.');
// Keep the live folder integration when regenerating the exported pages.
await import('./custom-drive.mjs');

await import('./gallery.mjs');
