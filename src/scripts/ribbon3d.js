import {
  CanvasTexture,
  CatmullRomCurve3,
  Color,
  DirectionalLight,
  Group,
  HemisphereLight,
  Mesh,
  MeshStandardMaterial,
  PerspectiveCamera,
  RepeatWrapping,
  Scene,
  TubeGeometry,
  Vector3,
  WebGLRenderer
} from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// S-shaped loop authored for a 16:10 frame: enters top-left, swings right,
// crosses back behind the headline, and leaves bottom-right. Both ends sit off-screen.
const PATH = [
  [-11, 6.2, -3],
  [-6, 3.4, 0],
  [0.5, 4.4, -1.6],
  [6.2, 2.6, 1],
  [4.2, -0.4, -1.2],
  [-2.5, 0.4, 1.4],
  [-6.6, -2, -0.6],
  [-2, -4.3, 1],
  [5.2, -3.4, -1],
  [11.5, -6.6, -3]
];

const BRAND_BLUE = '#4da2ff';

// Speckled bump map gives the tube its grainy, inflated surface
function createGrainTexture() {
  const size = 256;
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = 'rgb(128,128,128)';
  ctx.fillRect(0, 0, size, size);

  for (let i = 0; i < 9000; i++) {
    const v = 70 + Math.floor(Math.random() * 130);
    ctx.fillStyle = `rgb(${v},${v},${v})`;
    ctx.beginPath();
    ctx.arc(Math.random() * size, Math.random() * size, 0.6 + Math.random() * 1.3, 0, Math.PI * 2);
    ctx.fill();
  }

  const texture = new CanvasTexture(canvas);
  texture.wrapS = texture.wrapT = RepeatWrapping;
  texture.repeat.set(46, 4);
  return texture;
}

export function initRibbon(canvas) {
  const hero = canvas.parentElement;
  if (!hero) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  const deviceRatio = window.devicePixelRatio || 1;
  // Adaptive quality: start sharp, step resolution down if frames run slow
  const qualitySteps = [Math.min(deviceRatio, 1.75), 1, 0.75].filter((r, i, all) => i === 0 || r < all[0]);
  let quality = 0;

  let renderer;
  try {
    // High-density screens are sharp enough without MSAA
    renderer = new WebGLRenderer({ canvas, antialias: deviceRatio < 2, alpha: true });
  } catch {
    canvas.remove();
    return;
  }
  renderer.setClearColor(0x000000, 0);

  const scene = new Scene();
  const camera = new PerspectiveCamera(30, 1, 0.1, 100);
  camera.position.set(0, 0, 16);

  scene.add(new HemisphereLight(0xffffff, 0x2a5fb0, 1.6));
  const key = new DirectionalLight(0xffffff, 2.6);
  key.position.set(-6, 9, 10);
  scene.add(key);
  const fill = new DirectionalLight(0xdceeff, 0.9);
  fill.position.set(7, -5, 6);
  scene.add(fill);

  const grain = createGrainTexture();
  const material = new MeshStandardMaterial({
    color: new Color(BRAND_BLUE),
    roughness: 0.62,
    metalness: 0,
    bumpMap: grain,
    bumpScale: 1.6,
    emissive: new Color('#1d5fc4'),
    emissiveIntensity: 0.18
  });

  const group = new Group();
  scene.add(group);

  let mesh = null;
  let currentSquash = null;

  function buildTube(aspect) {
    // Narrow screens squeeze the loop sideways and slim the tube so it still reads as a ribbon
    const squash = Math.min(1.2, Math.max(0.42, aspect / 1.6));
    if (currentSquash !== null && Math.abs(squash - currentSquash) < 0.04) return;
    currentSquash = squash;

    const isSmall = window.innerWidth < 768;
    const curve = new CatmullRomCurve3(
      PATH.map(([x, y, z]) => new Vector3(x * squash, y, z)),
      false,
      'catmullrom',
      0.5
    );
    const radius = 0.78 * Math.max(0.7, Math.sqrt(squash));
    const geometry = new TubeGeometry(curve, isSmall ? 240 : 420, radius, isSmall ? 32 : 48, false);

    if (mesh) {
      mesh.geometry.dispose();
      mesh.geometry = geometry;
    } else {
      mesh = new Mesh(geometry, material);
      group.add(mesh);
    }
  }

  function resize() {
    const { width, height } = hero.getBoundingClientRect();
    if (!width || !height) return;
    renderer.setPixelRatio(qualitySteps[quality]);
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    buildTube(camera.aspect);
    render(performance.now());
  }

  // Motion state, eased toward targets every frame
  const state = { scroll: 0, scrollTarget: 0, mx: 0, my: 0, mxTarget: 0, myTarget: 0 };

  function render(now) {
    state.scroll += (state.scrollTarget - state.scroll) * 0.08;
    state.mx += (state.mxTarget - state.mx) * 0.05;
    state.my += (state.myTarget - state.my) * 0.05;

    if (!reducedMotion) {
      const t = now * 0.001;
      group.rotation.y = Math.sin(t * 0.25) * 0.12 + state.mx * 0.1 + state.scroll * 0.55;
      group.rotation.x = Math.cos(t * 0.2) * 0.05 + state.my * 0.06 + state.scroll * 0.3;
      group.position.y = state.scroll * 2.2;
      grain.offset.x = t * 0.004;
    }

    renderer.render(scene, camera);
  }

  resize();
  canvas.classList.add('is-ready');

  const resizeObserver = new ResizeObserver(() => resize());
  resizeObserver.observe(hero);

  if (reducedMotion) return;

  ScrollTrigger.create({
    trigger: hero,
    start: 'top top',
    end: 'bottom top',
    onUpdate: (self) => { state.scrollTarget = self.progress; }
  });

  if (finePointer) {
    window.addEventListener('pointermove', (e) => {
      state.mxTarget = (e.clientX / window.innerWidth - 0.5) * 2;
      state.myTarget = (e.clientY / window.innerHeight - 0.5) * 2;
    }, { passive: true });
  }

  // Render only while the hero is on screen
  let running = false;
  let frozen = false;
  let lastFrame = 0;
  let warmup = 30;
  let slowSamples = [];

  const tick = () => {
    const now = performance.now();
    // Skip the first frames (shader compile, texture upload) before judging speed
    if (warmup > 0) warmup--;
    else if (lastFrame && now - lastFrame < 250) {
      // Long gaps are a backgrounded tab, not a slow device
      slowSamples.push(now - lastFrame);
      if (slowSamples.length === 45) {
        const avg = slowSamples.reduce((a, b) => a + b, 0) / slowSamples.length;
        slowSamples = [];
        if (avg > 34) {
          if (quality < qualitySteps.length - 1) {
            quality++;
            resize();
          } else {
            // Still slow at the lowest resolution: keep the last frame as a still
            frozen = true;
            stop();
          }
        }
      }
    }
    lastFrame = now;
    render(now);
  };
  const start = () => {
    if (running || frozen) return;
    running = true;
    lastFrame = 0;
    warmup = 30;
    slowSamples = [];
    gsap.ticker.add(tick);
  };
  const stop = () => { if (running) { running = false; gsap.ticker.remove(tick); } };

  new IntersectionObserver(([entry]) => {
    entry.isIntersecting ? start() : stop();
  }, { rootMargin: '100px' }).observe(hero);

  canvas.addEventListener('webglcontextlost', (e) => {
    e.preventDefault();
    stop();
  });
}
