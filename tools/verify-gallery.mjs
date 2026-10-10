import fs from 'node:fs';import path from 'node:path';import http from 'node:http';import assert from 'node:assert/strict';import {createRequire} from 'node:module';
const require=createRequire('C:/Users/rosha/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/package.json'),{chromium}=require('playwright');
const root=path.resolve('university-website/site');const server=http.createServer((req,res)=>{const file=path.resolve(root,'.'+new URL(req.url,'http://local').pathname);if(!file.startsWith(root+path.sep)){res.writeHead(403).end();return;}try{res.setHeader('Content-Type',({'.js':'text/javascript','.html':'text/html','.css':'text/css'})[path.extname(file)]||'application/octet-stream');res.end(fs.readFileSync(file));}catch{res.writeHead(404).end();}});await new Promise(r=>server.listen(4183,'127.0.0.1',r));let browser;
try{
 browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
 const page=await browser.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));await page.addInitScript(()=>sessionStorage.setItem('install-dismissed','true'));
 for(const width of [1440,390]){
 await page.setViewportSize({width,height:1000});await page.goto('http://127.0.0.1:4183/index.html',{waitUntil:'domcontentloaded'});
 await page.locator('#field-gallery').scrollIntoViewIfNeeded();await page.waitForTimeout(1500);
 assert.equal(await page.locator('.field-tile').count(),6);assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
 await page.evaluate(()=>window.scrollTo(0,document.querySelector('#field-gallery').offsetTop-85));await page.waitForTimeout(1500);await page.screenshot({path:`university-website/gallery-${width}.png`});
 if(width===1440)assert.equal(await page.locator('.field-main canvas').count(),1);
 assert(await page.evaluate(async()=>{const results=await Promise.all(window.FIELD_PHOTOS.map(p=>new Promise(resolve=>{const i=new Image();i.onload=()=>resolve(i.naturalWidth>0);i.onerror=()=>resolve(false);i.src=p.src;})));return results.every(Boolean);}));
 await page.locator('.field-main').click();assert(await page.locator('.field-viewer').evaluate(e=>e.open));
 await page.waitForFunction(()=>document.querySelector('.field-full').naturalWidth>0);await page.keyboard.press('ArrowRight');await page.keyboard.press('ArrowLeft');
 assert((await page.locator('.field-position').textContent()).startsWith('31 /'));
 await page.waitForTimeout(400);await page.screenshot({path:`university-website/gallery-viewer-${width}.png`});await page.keyboard.press('Escape');assert(await page.locator('.field-main').evaluate(e=>e===document.activeElement));
 await page.locator('.field-more').click();assert.equal(await page.locator('.field-tile').count(),35);
 await page.locator('[data-filter="Crops"]').click();assert.equal(await page.locator('.field-tile').count(),6);await page.locator('.field-more').click();assert.equal(await page.locator('.field-tile').count(),7);
 console.log('PASS gallery, filters, all photos, viewer controls, focus and layout:',width);
 }
 await page.emulateMedia({reducedMotion:'reduce'});await page.reload({waitUntil:'domcontentloaded'});await page.locator('#field-gallery').scrollIntoViewIfNeeded();assert.equal(await page.locator('.field-main canvas').count(),0);
 await page.evaluate(()=>document.documentElement.dataset.theme='dark');await page.screenshot({path:'university-website/gallery-dark-mobile.png'});
 assert.deepEqual(errors,[]);console.log('PASS reduced motion and no page errors');
}finally{await browser?.close();server.close();}
