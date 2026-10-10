import fs from 'node:fs';
import ts from 'typescript';
import {rolldown} from 'rolldown';
const dest='university-website/tools/scene-source';fs.mkdirSync(dest,{recursive:true});
const read=f=>fs.readFileSync('src/'+f,'utf8');
const compile=s=>ts.transpileModule(s,{compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.ESNext}}).outputText;
function effects(text){const ast=ts.createSourceFile('x.tsx',text,ts.ScriptTarget.Latest,true,ts.ScriptKind.TSX), list=[];function walk(node){if(ts.isCallExpression(node)&&node.expression.getText(ast)==='useEffect')list.push(node.arguments[0].body.getText(ast).slice(1,-1));ts.forEachChild(node,walk);}walk(ast);return list;}
const floating=read('components/FloatingOnionsScene.tsx');
const prefix=floating.slice(floating.indexOf('interface OnionConfig'),floating.indexOf('const FloatingOnionsScene'));
const grass=read('components/FooterGrass.tsx');
const shaders=grass.slice(grass.indexOf('const vertexShader'),grass.indexOf('export default function'));
let scene=`import {initFieldDepth} from './field-depth.js';\nimport * as THREE from 'three';\nimport {loadOnionAssets,createOnionInstance} from './onion3dLoader.js';\nimport {createFooterOnions} from './footerOnion.js';\n${prefix}\n${shaders}\nfunction floatingScene(){const canvasRef={current:document.querySelector('.floating-onions-canvas')};${effects(floating)[0]}}\nfunction footerScene(){const hostRef={current:document.querySelector('.footer-meadow-canvas')};const actions={current:{breeze:()=>{},refresh:()=>{}}};const pausedRef={current:false};const meadow=document.querySelector('.footer-meadow');if(!meadow)return;const controls=document.createElement('div');controls.className='footer-meadow-controls';controls.innerHTML='<button type="button">Send a breeze</button><button type="button" aria-label="Pause grass animation" aria-pressed="false">Pause</button>';document.querySelector('.site-footer-animation-controls')?.append(controls);const [breeze,pause]=controls.children;breeze.onclick=()=>{actions.current.breeze();breeze.textContent='Breeze flowing';setTimeout(()=>breeze.textContent='Send a breeze',2400);};pause.onclick=()=>{pausedRef.current=!pausedRef.current;pause.textContent=pausedRef.current?'Play':'Pause';pause.setAttribute('aria-label',pausedRef.current?'Resume grass animation':'Pause grass animation');pause.setAttribute('aria-pressed',pausedRef.current);breeze.disabled=pausedRef.current;actions.current.refresh();};const setReady=v=>meadow.classList.toggle('is-ready',v);const setReduced=v=>controls.hidden=v;${effects(grass)[1]}}\nconst cleanups=[];try{cleanups.push(initFieldDepth());}catch(error){console.warn('Gallery depth unavailable',error);}try{cleanups.push(floatingScene());}catch(error){console.warn('Floating scene unavailable',error);}try{cleanups.push(footerScene());}catch(error){console.warn('Meadow unavailable',error);}window.addEventListener('pagehide',()=>cleanups.forEach(fn=>fn?.()));`;
fs.writeFileSync(dest+'/scenes.js',compile(scene));
for(const name of ['onion3dLoader','footerOnion'])fs.writeFileSync(dest+'/'+name+'.js',compile(read('utils/'+name+'.ts')).replace(/(['"])\/model\/([^'"]+)\1/g,'new URL("model/$2",document.baseURI).href'));
const bundle=await rolldown({input:dest+'/scenes.js'});await bundle.write({file:'university-website/site/assets/js/scenes.js',format:'es',minify:true});await bundle.close();
// Preserve the original GSAP scroll choreography without the React lifecycle wrapper.
const scroll=effects(read('hooks/useScrollAnimations.ts'))[0].replace('if (!enabled) return;','');
fs.writeFileSync('university-website/site/assets/js/scroll.js',compile(`window.initScrollAnimations=function(){${scroll}};`));
const chat=read('components/AgriBotDemo.tsx');const copy=chat.slice(chat.indexOf('const copy ='),chat.indexOf('type Language'));
fs.writeFileSync('university-website/site/assets/js/chat-copy.js',compile(copy).replace('const copy =','window.CHAT_COPY ='));
console.log('Ported original Three.js scenes and GSAP scroll animations.');

