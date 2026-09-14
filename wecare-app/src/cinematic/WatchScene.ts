import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

/** An illustrative real-time product model; dimensions are not manufacturing specifications. */
export function mountWatch(host: HTMLElement, motion: { progress: number; paused: boolean }) {
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.6));
  renderer.setClearColor(0x000000, 0);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.5;
  host.appendChild(renderer.domElement);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(32, 1, .1, 100);
  camera.position.set(0, .15, 8.8);
  const environment = new RoomEnvironment();
  const pmrem = new THREE.PMREMGenerator(renderer);
  const env = pmrem.fromScene(environment, .04);
  scene.environment = env.texture;
  environment.dispose();
  const key = new THREE.DirectionalLight(0xfff5df, 4); key.position.set(3, 4, 5); scene.add(key);
  const rim = new THREE.DirectionalLight(0x9ddbb6, 4); rim.position.set(-4, 1, -2); scene.add(rim);
  scene.add(new THREE.AmbientLight(0xffffff, .8));
  const watch = new THREE.Group(); scene.add(watch);
  const metal = new THREE.MeshStandardMaterial({ color: 0xbec4bc, metalness: .95, roughness: .23 });
  const ivory = new THREE.MeshStandardMaterial({ color: 0xd9d5c7, roughness: .72, metalness: .05 });
  const dark = new THREE.MeshStandardMaterial({ color: 0x081911, roughness: .16, metalness: .35 });
  const bandShape = new THREE.Shape(); bandShape.absellipse(0, 0, 1.36, .96, 0, Math.PI * 2, false, 0);
  const hole = new THREE.Path(); hole.absellipse(0, 0, 1.23, .83, 0, Math.PI * 2, true, 0); bandShape.holes.push(hole);
  const bandGeo = new THREE.ExtrudeGeometry(bandShape, { depth: .66, bevelEnabled: true, bevelSegments: 3, steps: 1, bevelSize: .025, bevelThickness: .025, curveSegments: 64 });
  bandGeo.center();
  const band = new THREE.Mesh(bandGeo, ivory); band.rotation.y = Math.PI / 2; band.rotation.x = Math.PI / 2; watch.add(band);
  const caseMesh = new THREE.Mesh(new RoundedBoxGeometry(1.02, 1.3, .25, 5, .18), metal); caseMesh.position.z = 1.25; watch.add(caseMesh);
  const bezel = new THREE.Mesh(new RoundedBoxGeometry(.93, 1.2, .07, 5, .17), dark); bezel.position.z = 1.395; watch.add(bezel);
  const screen = document.createElement('canvas'); screen.width = 512; screen.height = 640;
  const ctx = screen.getContext('2d')!;
  ctx.fillStyle = '#091b15'; ctx.fillRect(0, 0, 512, 640);
  ctx.textAlign = 'center'; ctx.fillStyle = '#e8eee0'; ctx.font = '32px sans-serif'; ctx.fillText('WeCare', 256, 108);
  ctx.strokeStyle = '#b9e9c2'; ctx.lineWidth = 6; ctx.beginPath(); ctx.arc(256, 302, 114, -.5 * Math.PI, 1.3 * Math.PI); ctx.stroke();
  ctx.fillStyle = '#dcefd9'; ctx.font = '65px sans-serif'; ctx.fillText('84', 256, 322);
  ctx.fillStyle = '#93b3a0'; ctx.font = '20px sans-serif'; ctx.fillText('NHỊP SỐNG', 256, 365);
  ctx.strokeStyle = '#bdd4a9'; ctx.lineWidth = 2; ctx.beginPath();
  for(let i = 0; i < 380; i++) { const y = 485 + Math.sin(i * .07) * 13 + Math.sin(i * .12) * 7; if(i===0) ctx.moveTo(66+i,y); else ctx.lineTo(66+i,y); } ctx.stroke();
  const texture = new THREE.CanvasTexture(screen); texture.colorSpace = THREE.SRGBColorSpace;
  const display = new THREE.Mesh(new THREE.PlaneGeometry(.79, .99), new THREE.MeshBasicMaterial({ map: texture })); display.position.z = 1.436; watch.add(display);
  const crown = new THREE.Mesh(new THREE.CylinderGeometry(.09, .09, .1, 32), metal); crown.rotation.z = Math.PI/2; crown.position.set(.55,.19,1.25); watch.add(crown);
  const nodes = new THREE.Group(); scene.add(nodes);
  const pointGeo = new THREE.BufferGeometry(); const positions = new Float32Array(180 * 3);
  for(let i=0;i<180;i++){const t=i*.34; const r=2.0+Math.sin(i*4.1)*.25; positions[i*3]=Math.cos(t)*r;positions[i*3+1]=Math.sin(t)*r*.6;positions[i*3+2]=Math.sin(i*2.9)*1.1;}
  pointGeo.setAttribute('position',new THREE.BufferAttribute(positions,3)); nodes.add(new THREE.Points(pointGeo,new THREE.PointsMaterial({color:0xaccba1,size:.022,transparent:true,opacity:.6})));
  let visible = false, frame = 0, stopped = false;
  const resize = new ResizeObserver(() => { const {width,height}=host.getBoundingClientRect(); if(width && height){ renderer.setSize(width,height);camera.aspect=width/height;camera.position.z=Math.max(8.8,6.3/camera.aspect);camera.updateProjectionMatrix(); } }); resize.observe(host);
  const render = (time: number) => {
    frame = 0; if(stopped || !visible || document.hidden) return;
    const p=motion.progress;
    watch.rotation.set(.18 + p*.2, -.72 + p * Math.PI * 2, -.22 + p*.35);
    watch.position.y=motion.paused?0:Math.sin(time*.0007)*.065;
    nodes.rotation.y=motion.paused?0:time*.000055;
    renderer.render(scene,camera); frame=requestAnimationFrame(render);
  };
  const resume=()=>{if(!frame && visible && !document.hidden) frame=requestAnimationFrame(render);};
  const observer=new IntersectionObserver(([entry])=>{visible=!!entry?.isIntersecting;resume();},{rootMargin:'100px'}); observer.observe(host);
  document.addEventListener('visibilitychange',resume);
  return () => { stopped=true;cancelAnimationFrame(frame);observer.disconnect();resize.disconnect();document.removeEventListener('visibilitychange',resume);scene.traverse(o=>{if(o instanceof THREE.Mesh || o instanceof THREE.Points){o.geometry.dispose();const mats=Array.isArray(o.material)?o.material:[o.material];mats.forEach(m=>m.dispose());}});texture.dispose();env.dispose();pmrem.dispose();renderer.dispose();renderer.domElement.remove(); };
}
