import { initFieldDepth } from './field-depth.js';
import * as THREE from 'three';
import { loadOnionAssets, createOnionInstance } from './onion3dLoader.js';
import { createFooterOnions } from './footerOnion.js';
const ONION_CONFIGS = [
    // 1. Hero Section Onions
    {
        id: 'hero-top-right',
        type: 'purple',
        section: 'hero',
        targetScrollProgress: 0.04,
        baseX: 4.8,
        baseY: 2.1,
        baseZ: -0.6,
        scale: 0.44,
        baseRot: [0.3, 0.4, -0.2],
        rotSpeed: [0.002, 0.003, 0.001],
        floatFreq: 1.1,
        floatAmp: 0.12,
        parallaxSpeed: 1.2,
        minDevice: 'desktop'
    },
    {
        id: 'hero-mid-left',
        type: 'yellow',
        section: 'hero',
        targetScrollProgress: 0.08,
        baseX: -5.4,
        baseY: -1.2,
        baseZ: 0.1,
        scale: 0.40,
        baseRot: [-0.2, 0.6, 0.1],
        rotSpeed: [-0.0015, 0.0025, 0.001],
        floatFreq: 0.9,
        floatAmp: 0.15,
        parallaxSpeed: 1.0,
        minDevice: 'tablet'
    },
    // 2. Crop Protection Modules (#features)
    {
        id: 'features-left',
        type: 'purple',
        section: 'features',
        targetScrollProgress: 0.28,
        baseX: -5.7,
        baseY: 0.8,
        baseZ: -0.2,
        scale: 0.48,
        baseRot: [0.5, -0.4, 0.2],
        rotSpeed: [0.002, 0.002, -0.001],
        floatFreq: 1.2,
        floatAmp: 0.14,
        parallaxSpeed: 1.1,
        minDevice: 'mobile'
    },
    {
        id: 'features-right',
        type: 'yellow',
        section: 'features',
        targetScrollProgress: 0.35,
        baseX: 5.6,
        baseY: -0.5,
        baseZ: 0.0,
        scale: 0.42,
        baseRot: [-0.4, 0.8, -0.3],
        rotSpeed: [-0.001, 0.002, 0.0015],
        floatFreq: 1.0,
        floatAmp: 0.13,
        parallaxSpeed: 1.0,
        minDevice: 'tablet'
    },
    {
        id: 'features-depth-bg',
        type: 'purple',
        section: 'features',
        targetScrollProgress: 0.39,
        baseX: -4.4,
        baseY: -2.0,
        baseZ: -2.2,
        scale: 0.28,
        baseRot: [0.2, 0.2, 0.5],
        rotSpeed: [0.001, 0.0015, 0.0008],
        floatFreq: 0.7,
        floatAmp: 0.08,
        parallaxSpeed: 0.55,
        minDevice: 'desktop'
    },
    // 3. Platform Architecture (#architecture)
    {
        id: 'arch-left',
        type: 'yellow',
        section: 'architecture',
        targetScrollProgress: 0.54,
        baseX: -5.6,
        baseY: 0.5,
        baseZ: 0.2,
        scale: 0.45,
        baseRot: [0.6, -0.5, 0.3],
        rotSpeed: [0.0018, 0.0022, -0.001],
        floatFreq: 1.1,
        floatAmp: 0.14,
        parallaxSpeed: 1.15,
        minDevice: 'tablet'
    },
    {
        id: 'arch-right',
        type: 'purple',
        section: 'architecture',
        targetScrollProgress: 0.61,
        baseX: 5.7,
        baseY: -0.6,
        baseZ: -0.4,
        scale: 0.41,
        baseRot: [-0.3, 0.7, 0.4],
        rotSpeed: [-0.0012, 0.0024, 0.0012],
        floatFreq: 0.95,
        floatAmp: 0.12,
        parallaxSpeed: 0.95,
        minDevice: 'desktop'
    },
    // 4. Research Team (#team)
    {
        id: 'team-left',
        type: 'purple',
        section: 'team',
        targetScrollProgress: 0.75,
        baseX: -5.8,
        baseY: 0.6,
        baseZ: -0.1,
        scale: 0.42,
        baseRot: [0.4, 0.3, -0.3],
        rotSpeed: [0.0015, 0.002, 0.001],
        floatFreq: 1.0,
        floatAmp: 0.12,
        parallaxSpeed: 1.05,
        minDevice: 'desktop'
    },
    {
        id: 'team-right',
        type: 'yellow',
        section: 'team',
        targetScrollProgress: 0.81,
        baseX: 5.8,
        baseY: -0.5,
        baseZ: -0.4,
        scale: 0.38,
        baseRot: [-0.5, 0.6, 0.2],
        rotSpeed: [-0.001, 0.0018, 0.0014],
        floatFreq: 0.85,
        floatAmp: 0.11,
        parallaxSpeed: 0.9,
        minDevice: 'tablet'
    },
    // 5. Contact Section (#contact)
    {
        id: 'contact-right',
        type: 'purple',
        section: 'contact',
        targetScrollProgress: 0.93,
        baseX: 5.4,
        baseY: 0.3,
        baseZ: 0.1,
        scale: 0.46,
        baseRot: [0.2, -0.4, 0.3],
        rotSpeed: [0.002, 0.0022, -0.001],
        floatFreq: 1.05,
        floatAmp: 0.14,
        parallaxSpeed: 1.1,
        minDevice: 'mobile'
    }
];
export const vertexShader = `
  attribute vec4 blade;
  attribute float angle;
  uniform float time;
  uniform float gust;
  uniform float spread;
  uniform float radius;
  uniform vec3 ripple;
  uniform vec3 pointer;
  uniform vec3 onionClearings[4];
  varying float height;
  varying float depth;
  varying float shade;
  void main() {
    float t = position.y;
    height = t;
    depth = (blade.y + 5.0) / 10.0;
    shade = blade.w;
    // Match the camera's widening field of view instead of spreading blades
    // across an oversized rectangle (which wasted most instances on mobile).
    float x = blade.x * spread * (9.0 - blade.y) / 9.0;
    float clearance = 1.0;
    for (int i = 0; i < 4; i++) {
      vec3 bulb = onionClearings[i];
      vec2 offset = (vec2(x, blade.y) - bulb.xy) / vec2(bulb.z, bulb.z * 2.0);
      clearance = min(clearance, mix(0.16, 1.0, smoothstep(0.6, 1.35, length(offset))));
    }
    float bladeHeight = blade.z * clearance;
    float wind = sin(time * 1.45 + x * 0.6 + blade.y * 0.8) * 0.28;
    wind += sin(time * 2.3 + blade.y * 1.4) * 0.10;
    float wave = sin(x * 0.5 - time * 3.0 + blade.y * 0.3) * gust;
    vec2 delta = vec2(x, blade.y) - pointer.xy;
    float touch = exp(-dot(delta, delta) / (radius * radius)) * pointer.z;
    float age = time - ripple.z;
    float ring = exp(-pow((length(vec2(x, blade.y) - ripple.xy) - age * 5.0) * 1.1, 2.0)) * exp(-age * 0.8);
    vec2 bend = vec2(wind + wave + sin(angle) * 0.18, cos(angle) * 0.18);
    bend += normalize(delta + vec2(0.001)) * touch * 1.65;
    bend += normalize(vec2(x, blade.y) - ripple.xy + vec2(0.001)) * ring * 1.1;
    float width = position.x * (1.0 - pow(t, 1.5)) * (0.075 + blade.w * 0.065);
    vec3 p = vec3(x + cos(angle) * width, t * bladeHeight, blade.y + sin(angle) * width);
    p.xz += bend * t * t * bladeHeight;
    p.y -= (abs(wind + wave) * 0.16 + touch * 0.18) * t * t * clearance;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  }
`;
const fragmentShader = `
  uniform float lightMode;
  varying float height;
  varying float depth;
  varying float shade;
  void main() {
    vec3 root = mix(vec3(0.025, 0.09, 0.045), vec3(0.075, 0.19, 0.055), lightMode);
    vec3 tip = mix(vec3(0.27, 0.49, 0.14), vec3(0.38, 0.57, 0.16), lightMode);
    tip = mix(tip, vec3(0.65, 0.69, 0.30), pow(shade, 5.0) * 0.65);
    vec3 color = mix(root, tip, pow(height, 0.85)) * (0.65 + shade * 0.55);
    color += vec3(0.13, 0.18, 0.055) * pow(height, 5.0);
    float haze = (1.0 - smoothstep(0.0, 0.7, depth)) * 0.55;
    color = mix(color, mix(vec3(0.08, 0.16, 0.12), vec3(0.65, 0.77, 0.61), lightMode), haze);
    gl_FragColor = vec4(color, smoothstep(0.0, 0.22, depth));
  }
`;
function floatingScene() {
    const canvasRef = { current: document.querySelector('.floating-onions-canvas') };
    const canvas = canvasRef.current;
    if (!canvas)
        return;
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 0, 10);
    // 2. High-Performance WebGL Renderer
    let renderer;
    try {
        renderer = new THREE.WebGLRenderer({
            canvas,
            alpha: true,
            antialias: true,
            powerPreference: 'high-performance'
        });
    }
    catch (e) {
        console.warn('[FloatingOnionsScene] WebGL initialization error:', e);
        return;
    }
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    // 3. Environmental Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);
    const keyLight = new THREE.DirectionalLight(0xfff7ed, 2.2);
    keyLight.position.set(5, 8, 6);
    scene.add(keyLight);
    const fillLight = new THREE.DirectionalLight(0xe0f2fe, 1.0);
    fillLight.position.set(-5, -4, -4);
    scene.add(fillLight);
    const emeraldRimLight = new THREE.DirectionalLight(0x10b981, 0.85);
    emeraldRimLight.position.set(0, -6, 2);
    scene.add(emeraldRimLight);
    const instances = [];
    let isDisposed = false;
    // Load assets and populate instances
    loadOnionAssets().then(() => {
        if (isDisposed)
            return;
        ONION_CONFIGS.forEach((cfg, idx) => {
            const mesh = createOnionInstance(cfg.type);
            if (!mesh)
                return;
            mesh.scale.setScalar(cfg.scale);
            mesh.rotation.set(...cfg.baseRot);
            mesh.position.set(cfg.baseX, cfg.baseY, cfg.baseZ);
            scene.add(mesh);
            instances.push({
                config: cfg,
                group: mesh,
                currentRot: [...cfg.baseRot],
                idHash: idx * 1.618
            });
        });
        // Render initial static frame immediately
        renderer.render(scene, camera);
    }).catch((err) => {
        console.warn('[FloatingOnionsScene] Could not load 3D onion assets:', err);
    });
    // 5. Responsive & Motion State
    let targetScrollProgress = 0;
    let currentScrollProgress = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;
    const computeScrollProgress = () => {
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        if (maxScroll <= 0)
            return 0;
        return Math.min(1.0, Math.max(0, window.scrollY / maxScroll));
    };
    const handleScroll = () => {
        targetScrollProgress = computeScrollProgress();
    };
    const handleMouseMove = (e) => {
        if (window.innerWidth < 768)
            return; // Disable mouse parallax on mobile
        targetMouseX = (e.clientX / window.innerWidth) - 0.5;
        targetMouseY = (e.clientY / window.innerHeight) - 0.5;
    };
    const handleResize = () => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
        targetScrollProgress = computeScrollProgress();
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('resize', handleResize);
    targetScrollProgress = computeScrollProgress();
    currentScrollProgress = targetScrollProgress;
    // 6. Animation Loop with Visibility Pause
    let animId;
    let lastTime = performance.now();
    const animate = (now) => {
        animId = requestAnimationFrame(animate);
        if (document.hidden)
            return;
        const deltaMs = Math.min(now - lastTime, 100);
        lastTime = now;
        const t = now * 0.001;
        // Smooth lerp for scroll and mouse
        currentScrollProgress += (targetScrollProgress - currentScrollProgress) * 0.08;
        currentMouseX += (targetMouseX - currentMouseX) * 0.06;
        currentMouseY += (targetMouseY - currentMouseY) * 0.06;
        const isMobile = window.innerWidth < 768;
        const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
        const widthRatio = Math.min(1.0, window.innerWidth / 1360);
        instances.forEach((inst) => {
            const { config, group, idHash } = inst;
            // Device filter
            if (isMobile && config.minDevice !== 'mobile') {
                group.visible = false;
                return;
            }
            if (isTablet && config.minDevice === 'desktop') {
                group.visible = false;
                return;
            }
            // Parallax vertical travel
            // delta is difference between user scroll position and this onion's center
            const scrollDelta = (currentScrollProgress - config.targetScrollProgress);
            // Vertical travel: 22 units spans across screen entry to exit
            const travelY = -scrollDelta * 22 * config.parallaxSpeed;
            const targetY = config.baseY + travelY;
            // Viewport frustum culling: hide if off-screen (camera FOV 45 at z ~ 10 is ~ +-5.5)
            if (targetY > 6.2 || targetY < -6.2) {
                group.visible = false;
                return;
            }
            group.visible = true;
            if (prefersReducedMotion) {
                // Static resting layout if user requests reduced motion
                group.position.set(config.baseX * widthRatio, config.baseY, config.baseZ);
                return;
            }
            // Floating oscillations
            const floatX = Math.sin(t * config.floatFreq + idHash) * config.floatAmp;
            const floatY = Math.cos(t * config.floatFreq * 0.85 + idHash) * (config.floatAmp * 1.15);
            const floatZ = Math.sin(t * config.floatFreq * 0.6 + idHash) * (config.floatAmp * 0.5);
            // Mouse Parallax Offset (subtle depth multiplier)
            const depthFactor = 1.0 / (Math.abs(config.baseZ) + 2.5);
            const mouseShiftX = isMobile ? 0 : currentMouseX * 0.65 * depthFactor;
            const mouseShiftY = isMobile ? 0 : -currentMouseY * 0.45 * depthFactor;
            // Position update
            const posX = (config.baseX * widthRatio) + floatX + mouseShiftX;
            const posY = targetY + floatY + mouseShiftY;
            const posZ = config.baseZ + floatZ;
            group.position.set(posX, posY, posZ);
            // Continuous subtle rotation
            inst.currentRot[0] += config.rotSpeed[0] * (deltaMs / 16.6);
            inst.currentRot[1] += config.rotSpeed[1] * (deltaMs / 16.6);
            inst.currentRot[2] += config.rotSpeed[2] * (deltaMs / 16.6);
            // Plus subtle scroll-dependent delta spin
            const scrollSpin = scrollDelta * 1.5;
            group.rotation.set(inst.currentRot[0], inst.currentRot[1] + scrollSpin, inst.currentRot[2]);
        });
        renderer.render(scene, camera);
    };
    if (!prefersReducedMotion) {
        animId = requestAnimationFrame(animate);
    }
    else {
        // Just render static scene on load
        const checkAndRender = () => {
            if (instances.length > 0) {
                renderer.render(scene, camera);
            }
            else {
                setTimeout(checkAndRender, 100);
            }
        };
        checkAndRender();
    }
    // 7. Cleanup
    return () => {
        isDisposed = true;
        cancelAnimationFrame(animId);
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('resize', handleResize);
        // Dispose Three.js objects
        instances.forEach((inst) => {
            scene.remove(inst.group);
        });
        scene.clear();
        renderer.dispose();
    };
}
function footerScene() {
    const hostRef = { current: document.querySelector('.footer-meadow-canvas') };
    const actions = { current: { breeze: () => { }, refresh: () => { } } };
    const pausedRef = { current: false };
    const meadow = document.querySelector('.footer-meadow');
    if (!meadow)
        return;
    const controls = document.createElement('div');
    controls.className = 'footer-meadow-controls';
    controls.innerHTML = '<button type="button">Send a breeze</button><button type="button" aria-label="Pause grass animation" aria-pressed="false">Pause</button>';
    document.querySelector('.site-footer-animation-controls')?.append(controls);
    const [breeze, pause] = controls.children;
    breeze.onclick = () => { actions.current.breeze(); breeze.textContent = 'Breeze flowing'; setTimeout(() => breeze.textContent = 'Send a breeze', 2400); };
    pause.onclick = () => { pausedRef.current = !pausedRef.current; pause.textContent = pausedRef.current ? 'Play' : 'Pause'; pause.setAttribute('aria-label', pausedRef.current ? 'Resume grass animation' : 'Pause grass animation'); pause.setAttribute('aria-pressed', pausedRef.current); breeze.disabled = pausedRef.current; actions.current.refresh(); };
    const setReady = v => meadow.classList.toggle('is-ready', v);
    const setReduced = v => controls.hidden = v;
    const host = hostRef.current;
    if (!host)
        return;
    let disposed = false;
    let teardown = () => { };
    const observer = new IntersectionObserver(([entry]) => {
        if (!entry.isIntersecting)
            return;
        observer.disconnect();
        if (disposed)
            return;
        let renderer;
        try {
            renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' });
        }
        catch {
            return; // The static foliage remains visible without WebGL.
        }
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
        host.appendChild(renderer.domElement);
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 60);
        camera.position.set(0, 3.1, 9);
        camera.lookAt(0, 0.6, 0);
        const ambient = new THREE.HemisphereLight(0xf4ffe7, 0x23321a, 2.1);
        const sunlight = new THREE.DirectionalLight(0xfff0c6, 3.2);
        sunlight.position.set(-5, 7, 4);
        const rim = new THREE.DirectionalLight(0xb0ddc3, 1.8);
        rim.position.set(5, 3, -2);
        scene.add(ambient, sunlight, rim);
        const onionAssets = createFooterOnions();
        const onions = onionAssets.groups;
        onions.forEach(onion => scene.add(onion));
        const onionMotion = onions.map(() => ({ tilt: 0, velocity: 0, turn: 0, targetTurn: 0 }));
        let hoveredOnion = -1;
        const onionClearings = Array.from({ length: 4 }, () => new THREE.Vector3(1000, 1000, 1));
        const positionOnions = () => {
            const width = 2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * 7 * camera.aspect;
            const mobile = host.clientWidth <= 600;
            onions.forEach((onion, index) => {
                const side = index < 2 ? -1 : 1;
                const small = index % 2 === 1;
                const scale = mobile ? (small ? 1.05 : 1.75) : (small ? 1.65 : 2.65);
                onion.scale.setScalar(scale);
                onion.position.set(side * Math.max(scale * .3, width * .35 - scale * (small ? .95 : .22)), .035, small ? 1.55 : 2.1);
                onion.rotation.set(0, index * .65, side * (small ? -.06 : .04));
                onionClearings[index].set(onion.position.x, onion.position.z, scale * .58);
            });
        };
        const base = new THREE.PlaneGeometry(1, 1, 1, 7);
        base.translate(0, 0.5, 0);
        const geometry = new THREE.InstancedBufferGeometry();
        geometry.index = base.index.clone();
        geometry.setAttribute('position', base.attributes.position.clone());
        const count = window.innerWidth < 768 ? 12000 : 26000;
        const blades = new Float32Array(count * 4);
        const angles = new Float32Array(count);
        let seed = 27;
        const random = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
        for (let i = 0; i < count; i++) {
            const x = (random() - 0.5) * 34;
            const z = (random() - 0.5) * 10;
            blades.set([x, z, 0.45 + random() * 0.9 + Math.sin(x * 0.7) * 0.13, random()], i * 4);
            angles[i] = random() * Math.PI * 2;
        }
        geometry.setAttribute('blade', new THREE.InstancedBufferAttribute(blades, 4));
        geometry.setAttribute('angle', new THREE.InstancedBufferAttribute(angles, 1));
        geometry.instanceCount = count;
        const uniforms = {
            time: { value: 0 }, gust: { value: 0 }, spread: { value: 1 },
            radius: { value: 2 }, ripple: { value: new THREE.Vector3(0, 0, -100) },
            pointer: { value: new THREE.Vector3(100, 100, 0) },
            onionClearings: { value: onionClearings },
            lightMode: { value: 0 },
        };
        const material = new THREE.ShaderMaterial({ vertexShader, fragmentShader, uniforms, side: THREE.DoubleSide, transparent: true });
        const meadow = new THREE.Mesh(geometry, material);
        meadow.frustumCulled = false;
        scene.add(meadow);
        // A continuous turf floor blocks the page background between blades.
        // Fade only the distant edge, leaving the foreground completely opaque.
        const groundGeometry = new THREE.PlaneGeometry(300, 16);
        groundGeometry.rotateX(-Math.PI / 2);
        groundGeometry.translate(0, -.025, 3);
        const groundMaterial = new THREE.ShaderMaterial({
            uniforms: { lightMode: uniforms.lightMode, onionClearings: uniforms.onionClearings },
            transparent: true,
            vertexShader: `varying vec3 p; void main() { p = position; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
            fragmentShader: `
          uniform float lightMode;
          uniform vec3 onionClearings[4];
          varying vec3 p;
          void main() {
            float texture = sin(p.x * 19.0 + sin(p.z * 13.0)) * sin(p.z * 31.0 + p.x * 7.0) * 0.5 + 0.5;
            vec3 color = mix(vec3(0.025, 0.065, 0.018), vec3(0.075, 0.15, 0.032), lightMode);
            color += vec3(0.025, 0.04, 0.008) * texture;
            for (int i = 0; i < 4; i++) {
              vec2 delta = (p.xz - onionClearings[i].xy) / (onionClearings[i].z * .7);
              color *= 1.0 - exp(-dot(delta, delta) * 2.0) * .6;
            }
            gl_FragColor = vec4(color, smoothstep(-5.0, -3.6, p.z));
          }
        `,
        });
        const ground = new THREE.Mesh(groundGeometry, groundMaterial);
        ground.renderOrder = -1;
        scene.add(ground);
        base.dispose();
        const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
        let visible = false;
        let contextLost = false;
        let frame = 0;
        let previous = 0;
        let pointerActive = false;
        const target = new THREE.Vector3(100, 100, 0);
        const ray = new THREE.Raycaster();
        const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), -0.55);
        const hit = new THREE.Vector3();
        const render = () => renderer.render(scene, camera);
        // Curved, double-sided leaves catch the same warm rim light as the onions.
        const leafShape = new THREE.Shape();
        leafShape.moveTo(0, -.5);
        leafShape.bezierCurveTo(-.36, -.12, -.3, .25, 0, .5);
        leafShape.bezierCurveTo(.3, .25, .36, -.12, 0, -.5);
        const leafGeometry = new THREE.ShapeGeometry(leafShape, 10);
        const leafPositions = leafGeometry.attributes.position;
        for (let i = 0; i < leafPositions.count; i++) {
            leafPositions.setZ(i, Math.abs(leafPositions.getX(i)) * .5 + Math.pow(leafPositions.getY(i), 2) * .3);
        }
        leafGeometry.computeVertexNormals();
        const leafMaterial = new THREE.MeshStandardMaterial({ color: 0x608d27, roughness: .44, side: THREE.DoubleSide });
        const leaves = Array.from({ length: 5 }, (_, i) => {
            const leaf = new THREE.Mesh(leafGeometry, leafMaterial);
            leaf.scale.setScalar(.28 + (i % 3) * .13);
            scene.add(leaf);
            return leaf;
        });
        const poseLeaves = () => {
            const width = 2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * 9 * camera.aspect;
            leaves.forEach((leaf, i) => {
                const t = uniforms.time.value;
                const side = i % 2 ? -1 : 1;
                leaf.position.set(side * width * (.27 + (i % 3) * .08) + Math.sin(t * .45 + i) * .15, 1.35 + (i % 3) * .35 + Math.sin(t * .65 + i) * .1, -.5 + i * .25);
                leaf.rotation.set(.3 + Math.sin(t * .4 + i) * .3, i + Math.sin(t * .3) * .4, side * .7 + Math.sin(t * .6 + i) * .2);
            });
        };
        const tick = (now) => {
            frame = 0;
            const dt = Math.min((now - previous) / 1000 || 0, 0.04);
            previous = now;
            uniforms.time.value += dt;
            uniforms.gust.value *= Math.exp(-dt * 0.5);
            if (pointerActive)
                target.z = 1;
            uniforms.pointer.value.lerp(target, 1 - Math.exp(-dt * 7));
            onions.forEach((onion, index) => {
                const state = onionMotion[index];
                const side = index < 2 ? -1 : 1;
                const rest = side * (index % 2 ? -.06 : .04);
                const desired = hoveredOnion === index ? side * -.13 : 0;
                state.velocity += ((desired - state.tilt) * 65 - state.velocity * 11) * dt;
                state.tilt += state.velocity * dt;
                state.turn += (state.targetTurn - state.turn) * (1 - Math.exp(-dt * 5));
                onion.rotation.z = rest + state.tilt;
                onion.rotation.y = index * .65 + state.turn;
            });
            poseLeaves();
            render();
            if (visible && !document.hidden && !contextLost && !pausedRef.current && !motion.matches)
                frame = requestAnimationFrame(tick);
        };
        const refresh = () => {
            cancelAnimationFrame(frame);
            frame = 0;
            if (visible && !document.hidden && !contextLost) {
                render();
                if (!pausedRef.current && !motion.matches) {
                    previous = performance.now();
                    frame = requestAnimationFrame(tick);
                }
            }
        };
        actions.current = {
            refresh,
            breeze: () => {
                if (motion.matches || pausedRef.current)
                    return;
                uniforms.gust.value = 1.8;
                uniforms.ripple.value.set(0, 1, uniforms.time.value);
                onionMotion.forEach((state, index) => { state.velocity += index % 2 ? .65 : -.65; });
                refresh();
            },
        };
        const move = (event) => {
            if (motion.matches || pausedRef.current)
                return;
            const rect = host.getBoundingClientRect();
            ray.setFromCamera(new THREE.Vector2((event.clientX - rect.left) / rect.width * 2 - 1, 1 - (event.clientY - rect.top) / rect.height * 2), camera);
            const bulbHit = ray.intersectObjects(onions.map(onion => onion.children[0]), false)[0];
            hoveredOnion = bulbHit ? bulbHit.object.userData.onionIndex : -1;
            host.style.cursor = hoveredOnion >= 0 ? 'pointer' : '';
            if (ray.ray.intersectPlane(plane, hit)) {
                target.set(hit.x, hit.z, 1);
                if (!pointerActive)
                    uniforms.pointer.value.set(hit.x, hit.z, 0);
                pointerActive = true;
            }
        };
        const leave = () => { pointerActive = false; target.z = 0; hoveredOnion = -1; host.style.cursor = ''; };
        const press = (event) => {
            move(event);
            if (motion.matches || pausedRef.current || !pointerActive)
                return;
            if (hoveredOnion >= 0) {
                onionMotion[hoveredOnion].velocity += 2.4;
                onionMotion[hoveredOnion].targetTurn += Math.PI * .45;
            }
            uniforms.pointer.value.copy(target);
            uniforms.ripple.value.set(target.x, target.y, uniforms.time.value);
            uniforms.gust.value = Math.max(uniforms.gust.value, .45);
            refresh();
        };
        const resize = new ResizeObserver(() => {
            renderer.setSize(host.clientWidth, host.clientHeight, false);
            camera.aspect = host.clientWidth / host.clientHeight;
            uniforms.spread.value = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * 9 * camera.aspect * 1.15 / 17;
            uniforms.radius.value = Math.max(1.4, camera.aspect * .45);
            camera.updateProjectionMatrix();
            positionOnions();
            poseLeaves();
            refresh();
        });
        resize.observe(host);
        const visibility = new IntersectionObserver(([item]) => { visible = item.isIntersecting; refresh(); });
        visibility.observe(host);
        const theme = () => {
            uniforms.lightMode.value = document.documentElement.dataset.theme === 'light' ? 1 : 0;
            refresh();
        };
        const themeObserver = new MutationObserver(theme);
        themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
        const preference = () => { setReduced(motion.matches); refresh(); };
        motion.addEventListener('change', preference);
        document.addEventListener('visibilitychange', refresh);
        host.addEventListener('pointermove', move);
        host.addEventListener('pointerdown', press);
        host.addEventListener('pointerleave', leave);
        host.addEventListener('pointerup', leave);
        host.addEventListener('pointercancel', leave);
        const lost = (event) => { event.preventDefault(); contextLost = true; cancelAnimationFrame(frame); setReady(false); };
        const restored = () => { contextLost = false; setReady(true); refresh(); };
        renderer.domElement.addEventListener('webglcontextlost', lost);
        renderer.domElement.addEventListener('webglcontextrestored', restored);
        theme();
        preference();
        setReady(true);
        teardown = () => {
            cancelAnimationFrame(frame);
            resize.disconnect();
            visibility.disconnect();
            themeObserver.disconnect();
            motion.removeEventListener('change', preference);
            document.removeEventListener('visibilitychange', refresh);
            host.removeEventListener('pointermove', move);
            host.removeEventListener('pointerdown', press);
            host.removeEventListener('pointerleave', leave);
            host.removeEventListener('pointerup', leave);
            host.removeEventListener('pointercancel', leave);
            renderer.domElement.removeEventListener('webglcontextlost', lost);
            renderer.domElement.removeEventListener('webglcontextrestored', restored);
            geometry.dispose();
            material.dispose();
            renderer.dispose();
            leafGeometry.dispose();
            leafMaterial.dispose();
            groundGeometry.dispose();
            groundMaterial.dispose();
            onionAssets.dispose();
            host.style.cursor = '';
            renderer.domElement.remove();
            actions.current = { breeze: () => { }, refresh: () => { } };
        };
    }, { rootMargin: '200px' });
    observer.observe(host);
    return () => { disposed = true; observer.disconnect(); teardown(); };
}
const cleanups = [];
try {
    cleanups.push(initFieldDepth());
}
catch (error) {
    console.warn('Gallery depth unavailable', error);
}
try {
    cleanups.push(floatingScene());
}
catch (error) {
    console.warn('Floating scene unavailable', error);
}
try {
    cleanups.push(footerScene());
}
catch (error) {
    console.warn('Meadow unavailable', error);
}
window.addEventListener('pagehide', () => cleanups.forEach(fn => fn?.()));
