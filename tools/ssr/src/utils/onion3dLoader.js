"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadOnionAssets = loadOnionAssets;
exports.createOnionInstance = createOnionInstance;
const THREE = __importStar(require("three"));
const GLTFLoader_js_1 = require("three/examples/jsm/loaders/GLTFLoader.js");
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
function loadOnionAssets() {
    if (cachedYellow && cachedPurple) {
        return Promise.resolve({ yellow: cachedYellow, purple: cachedPurple });
    }
    if (loadPromise) {
        return loadPromise;
    }
    const loader = new GLTFLoader_js_1.GLTFLoader();
    loadPromise = Promise.all([
        new Promise((resolve, reject) => {
            loader.load('/model/onion.glb', (gltf) => {
                const norm = normalizeModel(gltf.scene);
                cachedYellow = norm;
                resolve(norm);
            }, undefined, (err) => {
                console.warn('[Onion3DLoader] Failed to load onion.glb:', err);
                reject(err);
            });
        }),
        new Promise((resolve, reject) => {
            loader.load('/model/purple_onion.glb', (gltf) => {
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
function createOnionInstance(type) {
    const template = type === 'purple' ? cachedPurple : cachedYellow;
    if (!template)
        return null;
    return template.clone(true);
}
