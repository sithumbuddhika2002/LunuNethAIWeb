import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
const require=createRequire('C:/Users/rosha/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/package.json');
const {chromium}=require('playwright');
const root=path.resolve('university-website/site');
const server=http.createServer((req,res)=>{const file=path.resolve(root,'.'+decodeURIComponent(new URL(req.url,'http://local').pathname));if(!file.startsWith(root+path.sep)){res.writeHead(403).end();return;}try{const data=fs.readFileSync(file);res.setHeader('Content-Type',({'.html':'text/html','.css':'text/css','.js':'text/javascript','.webp':'image/webp','.glb':'model/gltf-binary'})[path.extname(file)]||'application/octet-stream');res.end(data);}catch{res.writeHead(404).end();}});
await new Promise(resolve=>server.listen(4182,'127.0.0.1',resolve));
let browser;
try{
 browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
 const page=await browser.newPage({viewport:{width:1440,height:1000}});const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.addInitScript(()=>sessionStorage.setItem('install-dismissed','true'));
 for(const [name,id] of [['documents','1rkH_ZjhUT8vOdDe2AyoqSrTQuTi7mQ6I'],['presentations','1VSSjsI7BcvQtZbTvlQAopYsJ3kNj-3cG']]){
  await page.goto(`http://127.0.0.1:4182/research/${name}.html`,{waitUntil:'domcontentloaded'});
  const frame=page.locator('#drive-library');assert.equal(await frame.getAttribute('data-folder-id'),id);
  await page.waitForTimeout(5000);
  const remote=page.frames().find(f=>f.url().includes('embeddedfolderview'));
  console.log(name,'Remote view:',remote?await remote.locator('body').innerText().catch(()=>'(unreadable)'):'Not available');
  await page.locator('#research-documents').scrollIntoViewIfNeeded();await page.screenshot({path:`university-website/docs/${name}-drive.png`});
  await page.locator('#refresh-drive').waitFor({state:'visible'});
  await page.waitForFunction(()=>!document.getElementById('refresh-drive').disabled,{},{timeout:18000});
  const before=await frame.getAttribute('src');await page.locator('#refresh-drive').click();assert.notEqual(await frame.getAttribute('src'),before);
  assert.equal(await page.locator('.research-pdf-row').count(),0);
  await page.setViewportSize({width:390,height:844});assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+2));await page.setViewportSize({width:1440,height:1000});
 }
 assert.deepEqual(errors,[]);console.log('Drive page controls, stale-list removal, mobile layout and browser error checks passed.');
}finally{await browser?.close();server.close();}
