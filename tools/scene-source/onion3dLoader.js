import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
let cachedYellow = null;
let cachedPurple = null;
let loadPromise = null;
/**
 * Normalizes a loaded 3D onion model:
 * - Centers geometry at (0, 0, 0)
 * - Scales the bounding box to a uniform 1.0 unit box
 * - Sets realistic PBR material properties (roughness, metalness, env map intensity)
 */
function normalizeModel(scene) {
    const box = new THREE.Box3().setFromObject(scene);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    const scale = 1.0 / maxDim;
    scene.position.sub(center);
    scene.scale.setScalar(scale);
    scene.traverse((child) => {
        if (child.isMesh) {
            const mesh = child;
            mesh.castShadow = true;
            mesh.receiveShadow = true;
            if (mesh.material) {
                const mat = mesh.material;
                mat.roughness = Math.max(mat.roughness, 0.38);
                mat.metalness = Math.min(mat.metalness, 0.08);
                mat.envMapIntensity = 1.1;
                mat.needsUpdate = true;
            }
        }
    });
    const wrapper = new THREE.Group();
    wrapper.add(scene);
    return wrapper;
}
/**
 * Loads authentic yellow and purple 3D onion models once and caches them in memory.
 */
export function loadOnionAssets() {
    if (cachedYellow && cachedPurple) {
        return Promise.resolve({ yellow: cachedYellow, purple: cachedPurple });
    }
    if (loadPromise) {
        return loadPromise;
    }
    const loader = new GLTFLoader();
    loadPromise = Promise.all([
        new Promise((resolve, reject) => {
            loader.load(new URL("model/onion.glb",document.baseURI).href, (gltf) => {
                const norm = normalizeModel(gltf.scene);
                cachedYellow = norm;
                resolve(norm);
            }, undefined, (err) => {
                console.warn('[Onion3DLoader] Failed to load onion.glb:', err);
                reject(err);
            });
        }),
        new Promise((resolve, reject) => {
            loader.load(new URL("model/purple_onion.glb",document.baseURI).href, (gltf) => {
                const norm = normalizeModel(gltf.scene);
                cachedPurple = norm;
                resolve(norm);
            }, undefined, (err) => {
                console.warn('[Onion3DLoader] Failed to load purple_onion.glb:', err);
                reject(err);
            });
        })
    ]).then(([yellow, purple]) => ({ yellow, purple }));
    return loadPromise;
}
/**
 * Clones a preloaded model instance for lightweight multi-object rendering.
 * Does not duplicate GPU textures or geometries.
 */
export function createOnionInstance(type) {
    const template = type === 'purple' ? cachedPurple : cachedYellow;
    if (!template)
        return null;
    return template.clone(true);
}
