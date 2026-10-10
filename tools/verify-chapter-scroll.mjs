import fs from 'node:fs';import path from 'node:path';import http from 'node:http';import assert from 'node:assert/strict';import {createRequire} from 'node:module';
const require=createRequire('C:/Users/rosha/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/package.json'),{chromium}=require('playwright');
const root=path.resolve('university-website/site');const server=http.createServer((req,res)=>{const file=path.resolve(root,'.'+new URL(req.url,'http://local').pathname);if(!file.startsWith(root+path.sep)){res.writeHead(403).end();return;}try{res.setHeader('Content-Type',({'.js':'text/javascript','.html':'text/html','.css':'text/css'})[path.extname(file)]||'application/octet-stream');res.end(fs.readFileSync(file));}catch{res.writeHead(404).end();}});await new Promise(r=>server.listen(4183,'127.0.0.1',r));let browser;
try{
 browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
 const page=await browser.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));await page.addInitScript(()=>sessionStorage.setItem('install-dismissed','true'));
 for(const width of [1440,390])for(const motion of ['no-preference','reduce']){
  await page.setViewportSize({width,height:900});await page.emulateMedia({reducedMotion:motion});await page.goto('http://127.0.0.1:4183/research/domain.html',{waitUntil:'domcontentloaded'});
  for(let i=0;i<5;i++){
   await page.locator('.research-panel-footer button').click();
   await page.waitForFunction(()=>{const p=document.querySelector('#research-panel').getBoundingClientRect(),n=document.querySelector('.navbar').getBoundingClientRect();return p.top>=n.bottom+12&&p.top<=n.bottom+60;},{},{timeout:5000}).catch(async error=>{console.log(await page.evaluate(()=>({scroll:scrollY,panel:document.querySelector("#research-panel").getBoundingClientRect().top,nav:document.querySelector(".navbar").getBoundingClientRect().bottom,active:document.activeElement.id})));throw error;});
   await page.waitForTimeout(500);assert.equal(await page.locator('#research-panel').getAttribute('aria-labelledby'),'chapter-'+((i+1)%5));
   assert(await page.locator('#research-panel').evaluate(el=>document.activeElement===el));
  }
  console.log('PASS',width,motion,'all chapters including wraparound align below navbar');
 }
 assert.deepEqual(errors,[]);
}finally{await browser?.close();server.close();}



