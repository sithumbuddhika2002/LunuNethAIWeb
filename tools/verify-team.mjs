import fs from 'node:fs';import path from 'node:path';import http from 'node:http';import assert from 'node:assert/strict';import {createRequire} from 'node:module';
const require=createRequire('C:/Users/rosha/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/package.json'),{chromium}=require('playwright');
const root=path.resolve('university-website/site');const server=http.createServer((req,res)=>{const file=path.resolve(root,'.'+new URL(req.url,'http://local').pathname);if(!file.startsWith(root+path.sep)){res.writeHead(403).end();return;}try{res.setHeader('Content-Type',({'.js':'text/javascript','.html':'text/html','.css':'text/css'})[path.extname(file)]||'application/octet-stream');res.end(fs.readFileSync(file));}catch{res.writeHead(404).end();}});await new Promise(r=>server.listen(4183,'127.0.0.1',r));let browser;
try {
 browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
 const page=await browser.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.addInitScript(()=>sessionStorage.setItem('install-dismissed','true'));
 for(const width of [1440,390])for(const route of ['index.html','project/about.html']){
  await page.setViewportSize({width,height:1000});
  await page.goto('http://127.0.0.1:4183/'+route,{waitUntil:'domcontentloaded'});
  const buttons=page.locator('.team-expand-btn');assert.equal(await buttons.count(),6);
  for(let i=0;i<6;i++){
   const button=buttons.nth(i),drawer=page.locator('#'+await button.getAttribute('aria-controls'));
   assert.equal(await button.getAttribute('aria-expanded'),'false');
   await button.click();await page.waitForTimeout(450);
   assert.equal(await button.getAttribute('aria-expanded'),'true');
   assert.equal(await button.innerText(),'Hide Details');
   assert(await drawer.evaluate(el=>el.getBoundingClientRect().height>30&&getComputedStyle(el).opacity==='1'&&!el.inert));
   assert((await drawer.locator('.team-panel-bio').innerText()).trim().length>10);
   await button.click();await page.waitForTimeout(450);
   assert.equal(await button.getAttribute('aria-expanded'),'false');
   assert(await drawer.evaluate(el=>el.getBoundingClientRect().height<2&&el.inert));
  }
  console.log('PASS',route,width,'all six members expand and collapse');
 }
 await page.emulateMedia({reducedMotion:'reduce'});
 const first=page.locator('.team-expand-btn').first();await first.focus();await page.keyboard.press('Enter');assert.equal(await first.getAttribute('aria-expanded'),'true');await page.keyboard.press('Space');assert.equal(await first.getAttribute('aria-expanded'),'false');
 assert.deepEqual(errors,[]);console.log('PASS keyboard and reduced-motion controls; no browser errors.');
}finally{await browser?.close();server.close();}
