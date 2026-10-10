// One-time migration tool. The delivered site does not execute React or this tool.
import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';
import {createRequire} from 'node:module';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
const out = path.resolve('university-website');
const write = (file, value) => { fs.mkdirSync(path.dirname(path.join(out,file)),{recursive:true}); fs.writeFileSync(path.join(out,file),value); };
globalThis.window = { matchMedia: () => ({matches:false}) };
globalThis.localStorage = globalThis.sessionStorage = { getItem:()=>null, setItem:()=>{} };
globalThis.__states = {};
function transform(code,id){
    code=code.replace(/import\s+['"][^'"]+\.css['"];?/g,'');
    code=code.replace(/import\s+(\w+)\s+from\s+['"]([^'"]+\.(?:svg|png|json|md\?raw))['"];?/g,(_,name,asset)=>`const ${name}=${JSON.stringify(asset.endsWith('?raw')?fs.readFileSync(path.resolve(path.dirname(id),asset.replace('?raw','')),'utf8'):asset.endsWith('.json')?JSON.parse(fs.readFileSync(path.resolve(path.dirname(id),asset),'utf8')):'/assets/icons/'+path.basename(asset))};`);
    const component = path.basename(id).replace(/\.tsx?$/,'');
    if(component==='App') code=code.replace(/const (\w+) = lazy\(\(\) => import\('([^']+)'\)\);/g,"import $1 from '$2';");
    const source=ts.createSourceFile(id,code,ts.ScriptTarget.Latest,true,id.endsWith('tsx')?ts.ScriptKind.TSX:ts.ScriptKind.TS);
    const transformer=context=>root=>ts.visitNode(root,function visit(node){
      if(ts.isVariableDeclaration(node)&&ts.isArrayBindingPattern(node.name)&&node.initializer&&ts.isCallExpression(node.initializer)&&node.initializer.expression.getText(source)==='useState'){
        const name=node.name.elements[0].name.getText(source);
        const init=node.initializer.arguments[0]?.getText(source)||'undefined';
        const expression=ts.createSourceFile('x.ts',`const x=useState(Object.prototype.hasOwnProperty.call(globalThis.__states['${component}']||{},'${name}') ? globalThis.__states['${component}']['${name}'] : (${init}));`,ts.ScriptTarget.Latest,true).statements[0].declarationList.declarations[0].initializer;
        return ts.factory.updateVariableDeclaration(node,node.name,node.exclamationToken,node.type,ts.factory.createIdentifier(ts.createPrinter().printNode(ts.EmitHint.Expression,expression,expression.getSourceFile())));
      }
      if(ts.isJsxAttribute(node)&&node.name.getText(source)==='onClick'&&node.initializer&&ts.isJsxExpression(node.initializer)){
        return ts.factory.createJsxAttribute(ts.factory.createIdentifier('data-action'),ts.factory.createStringLiteral(node.initializer.expression.getText(source)));
      }
      return ts.visitEachChild(node,visit,context);
    });
    const result=ts.transform(source,[transformer]);
    const printed=ts.createPrinter().printFile(result.transformed[0]);result.dispose();
    return ts.transpileModule(printed,{compilerOptions:{module:ts.ModuleKind.CommonJS,jsx:ts.JsxEmit.ReactJSX,target:ts.ScriptTarget.ES2022,esModuleInterop:true}}).outputText;
}
write('tools/ssr/package.json','{"type":"commonjs"}');
function walk(dir){for(const entry of fs.readdirSync(dir,{withFileTypes:true})){const p=path.join(dir,entry.name);if(entry.isDirectory())walk(p);else if(/\.tsx?$/.test(p)&&!p.endsWith('.d.ts'))write('tools/ssr/'+p.replaceAll('\\','/').replace(/\.tsx?$/,'.js'),transform(fs.readFileSync(p,'utf8'),path.resolve(p)));}}
walk('src');
const require=createRequire(import.meta.url);
const server={ssrLoadModule:async p=>require('./ssr'+p.replace(/\.tsx?$/,'.js')),close:async()=>{}};
try {
  const app = (await server.ssrLoadModule('/src/App.tsx')).default;
  const render=(component,props={},states={})=>{globalThis.__states=states;return renderToStaticMarkup(React.createElement(component,props));};
  for(const page of ['home','overview','simulators','gallery','beta','admin']) write(`tools/snapshots/${page}.html`,render(app,{}, {App:{currentPage:page},DemoScreenReference:{open:true}}));
  const overview=(await server.ssrLoadModule('/src/components/ProjectOverview.tsx')).default;
  for(let chapter=0;chapter<4;chapter++)write(`tools/snapshots/chapter-${chapter}.html`,render(overview,{}, {ProjectOverview:{chapter}}));
  write('tools/snapshots/technology-cards.html',render(overview,{}, {ProjectOverview:{chapter:3},ResearchChapterContent:{techView:'cards'}}));
  const scanner=(await server.ssrLoadModule('/src/components/ScannerDemo.tsx')).default;
  for(const mode of ['disease','nutrient'])for(const complete of [false,true])for(const nutrient of ['N','P','K'])write(`tools/snapshots/scan-${mode}-${complete}-${nutrient}.html`,render(scanner,{}, {ScannerDemo:{mode,complete,nutrient},DemoAppImage:{open:true}}));
  const logs=(await server.ssrLoadModule('/src/utils/logsManager.ts')).getLogs();
  write('assets/js/logs.json',JSON.stringify(logs));
  write('tools/snapshots/admin-ready.html',render(app,{}, {App:{currentPage:'admin'},AdminDashboard:{isAuthenticated:true,logs}}));
  write('tools/snapshots/admin-table.html',render(app,{}, {App:{currentPage:'admin'},AdminDashboard:{isAuthenticated:true,logs,activeTab:'Purple Blotch Disease Detection'}}));
  const gallery=(await server.ssrLoadModule('/src/components/ResearchGallery.tsx')).default;
  write('tools/snapshots/logs.html',render(gallery,{}, {ResearchGallery:{galleryItems:logs,visibleCount:999}}));
  for(const name of ['WindowsInstallPopup','AndroidInstallPopup'])write('tools/snapshots/'+name+'.html',render((await server.ssrLoadModule('/src/components/'+name+'.tsx')).default,{}, {[name]:{isVisible:true}}));
  console.log('Exported all pages and interactive panel states.');
} finally {await server.close();}


