import * as THREE from 'three';
// A gently curved photographic surface. The HTML image remains the fallback.
export function initFieldDepth(){
 const host=document.querySelector('.field-main'),reduced=matchMedia('(prefers-reduced-motion: reduce)');
 if(!host||reduced.matches||!matchMedia('(pointer: fine)').matches)return;
 let renderer;try{renderer=new THREE.WebGLRenderer({alpha:true,antialias:true});}catch{return;}
 renderer.setPixelRatio(Math.min(devicePixelRatio,1.5));renderer.domElement.setAttribute('aria-hidden','true');
 const scene=new THREE.Scene(),camera=new THREE.PerspectiveCamera(35,1,.1,20);camera.position.z=3;
 const geometry=new THREE.PlaneGeometry(2,2,24,24),positions=geometry.attributes.position;
 for(let i=0;i<positions.count;i++)positions.setZ(i,-.035*Math.pow(positions.getX(i),2));geometry.computeVertexNormals();
 let mesh,texture,frame=0,visible=false,disposed=false;const target={x:0,y:0};
 function size(){const w=host.clientWidth,h=host.clientHeight;renderer.setSize(w,h);camera.aspect=w/h;camera.updateProjectionMatrix();if(mesh){const height=2*3*Math.tan(THREE.MathUtils.degToRad(17.5));mesh.scale.set(height*camera.aspect/2*1.08,height/2*1.08,1);const ratio=texture.image.width/texture.image.height,view=w/h;texture.repeat.set(Math.min(1,view/ratio),Math.min(1,ratio/view));texture.offset.set((1-texture.repeat.x)/2,(1-texture.repeat.y)/2);renderer.render(scene,camera);}}
 function draw(){frame=0;if(!visible||document.hidden||reduced.matches||!mesh)return;mesh.rotation.y+=(target.x-mesh.rotation.y)*.08;mesh.rotation.x+=(target.y-mesh.rotation.x)*.08;renderer.render(scene,camera);if(Math.abs(target.x-mesh.rotation.y)+Math.abs(target.y-mesh.rotation.x)>.0001)frame=requestAnimationFrame(draw);}
 function queue(){if(!frame)frame=requestAnimationFrame(draw);}
 new THREE.TextureLoader().load(host.querySelector('img').src,t=>{if(disposed){t.dispose();return;}texture=t;t.colorSpace=THREE.SRGBColorSpace;mesh=new THREE.Mesh(geometry,new THREE.MeshBasicMaterial({map:t}));scene.add(mesh);host.append(renderer.domElement);size();queue();},undefined,()=>renderer.dispose());
 const move=e=>{const r=host.getBoundingClientRect();target.x=((e.clientX-r.left)/r.width-.5)*.075;target.y=-((e.clientY-r.top)/r.height-.5)*.06;queue();};const leave=()=>{target.x=target.y=0;queue();};
 host.addEventListener('pointermove',move);host.addEventListener('pointerleave',leave);
 const observer=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;queue();});observer.observe(host);const resize=new ResizeObserver(size);resize.observe(host);
 const change=()=>{renderer.domElement.hidden=reduced.matches;queue();};reduced.addEventListener('change',change);document.addEventListener('visibilitychange',queue);
 return()=>{disposed=true;cancelAnimationFrame(frame);observer.disconnect();resize.disconnect();host.removeEventListener('pointermove',move);host.removeEventListener('pointerleave',leave);document.removeEventListener('visibilitychange',queue);reduced.removeEventListener('change',change);geometry.dispose();texture?.dispose();mesh?.material.dispose();renderer.dispose();renderer.domElement.remove();};
}
