import fs from 'node:fs/promises';
const dir='university-website/tools/field-originals';
const refs=JSON.parse(await fs.readFile(dir+'/download-refs.json','utf8'));
for(const p of refs){const r=await fetch(p.url);if(!r.ok)throw Error('Download failed: '+r.status);await fs.writeFile(dir+'/'+String(p.i+1).padStart(2,'0')+'.jpg',Buffer.from(await r.arrayBuffer()));}
await fs.unlink(dir+'/download-refs.json');
console.log('Downloaded '+refs.length+' photographs.');
