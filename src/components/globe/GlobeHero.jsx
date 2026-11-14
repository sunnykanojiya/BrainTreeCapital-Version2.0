import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { PLACES, ROUTES, KEYS, LOOP_SECONDS } from './globeData';

const D2R = Math.PI / 180;
const BASE = import.meta.env.BASE_URL;
const PIN =
  'absolute left-0 top-0 whitespace-nowrap rounded-full border bg-white/95 px-2.5 py-1 text-[12.5px] font-semibold leading-4 text-[#0A1B3D] opacity-0 shadow-md transition-opacity duration-300 will-change-transform ';

// Latitude and longitude to a point on the unit sphere (matches SphereGeometry UVs).
const ll2v = (lon, lat, r) => {
  const L = lon * D2R;
  const f = lat * D2R;
  return new THREE.Vector3(r * Math.cos(f) * Math.cos(L), r * Math.sin(f), -r * Math.cos(f) * Math.sin(L));
};
const smooth = (u) => {
  const x = Math.max(0, Math.min(1, u));
  return x * x * (3 - 2 * x);
};
const camAt = (p) => {
  for (let i = 0; i < KEYS.length - 1; i++) {
    const a = KEYS[i];
    const b = KEYS[i + 1];
    if (p <= b.p) {
      const u = smooth((p - a.p) / (b.p - a.p));
      return { lo: a.lo + (b.lo - a.lo) * u, la: a.la + (b.la - a.la) * u, z: a.z + (b.z - a.z) * u };
    }
  }
  const l = KEYS[KEYS.length - 1];
  return { lo: l.lo, la: l.la, z: l.z };
};
const glowTex = (inner, outer) => {
  const c = document.createElement('canvas');
  c.width = c.height = 128;
  const g = c.getContext('2d');
  const gr = g.createRadialGradient(64, 64, 0, 64, 64, 64);
  gr.addColorStop(0, inner);
  gr.addColorStop(0.25, inner);
  gr.addColorStop(1, outer);
  g.fillStyle = gr;
  g.fillRect(0, 0, 128, 128);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
};
const coinTex = (sym) => {
  const c = document.createElement('canvas');
  c.width = c.height = 128;
  const g = c.getContext('2d');
  g.beginPath();
  g.arc(64, 64, 58, 0, 6.2832);
  const gr = g.createLinearGradient(10, 10, 118, 118);
  gr.addColorStop(0, '#FFE49A');
  gr.addColorStop(1, '#D9A020');
  g.fillStyle = gr;
  g.fill();
  g.lineWidth = 6;
  g.strokeStyle = '#B07D0E';
  g.stroke();
  g.fillStyle = '#5A3C00';
  g.font = '700 70px Inter, Arial, sans-serif';
  g.textAlign = 'center';
  g.textBaseline = 'middle';
  g.fillText(sym, 64, 70);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
};

const EARTH_VERT =
  'varying vec2 vUv; varying vec3 vN; varying vec3 vW; void main(){ vUv=uv; vN=normalize(normal); vW=position; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }';
const EARTH_FRAG = `
uniform sampler2D map; uniform sampler2D gold; uniform vec3 sun; uniform float ready; uniform float time;
varying vec2 vUv; varying vec3 vN; varying vec3 vW;
void main(){
  vec3 c = texture2D(map, vUv).rgb;
  float blue = clamp((c.b - c.r) * 2.6, 0.0, 1.0);
  c = mix(c, c * 1.55 + vec3(0.03, 0.10, 0.20), blue * 0.75);
  float snow = smoothstep(0.62, 0.9, dot(c, vec3(0.33)));
  c = mix(c, c * vec3(0.96, 0.98, 1.0), snow * 0.5);
  vec3 n = normalize(vN); vec3 V = normalize(cameraPosition - vW);
  float diff = max(dot(n, normalize(sun)), 0.0);
  c *= 0.66 + 0.52 * diff;
  vec3 refl = reflect(-normalize(sun), n);
  float spec = pow(max(dot(refl, V), 0.0), 40.0) * blue * 0.35;
  c += spec;
  float ga = texture2D(gold, vUv).r;
  float pulse = 0.5 + 0.5 * sin(time * 1.2);
  c = mix(c, vec3(1.0, 0.80, 0.30), ga * (0.36 + 0.05 * pulse));
  c += vec3(1.0, 0.72, 0.18) * ga * 0.07;
  float f = pow(1.0 - max(dot(n, V), 0.0), 2.4);
  c = mix(c, vec3(0.66, 0.84, 1.0), f * 0.80);
  c = mix(vec3(0.82, 0.90, 0.97), c, ready);
  gl_FragColor = vec4(c, 1.0);
}`;
const ATMO_VERT =
  'varying vec3 vNv; void main(){ vNv = normalize(normalMatrix * normal); gl_Position = projectionMatrix*modelViewMatrix*vec4(position,1.0); }';
const ATMO_FRAG =
  'varying vec3 vNv; void main(){ float i = pow(max(0.0, 0.74 - dot(vNv, vec3(0.0,0.0,1.0))), 3.2); gl_FragColor = vec4(0.52, 0.76, 1.0, clamp(i * 0.55, 0.0, 0.42)); }';

// Static fallback: shown when WebGL is unavailable or the visitor prefers reduced motion.
function Poster({ className }) {
  return (
    <img
      src={`${BASE}globe/poster.jpg`}
      alt="Globe with golden routes from India to the US, UK, UAE, Singapore and Japan"
      className={`mx-auto h-full w-full object-contain ${className || ''}`}
    />
  );
}

export default function GlobeHero({ className = '', scrollTarget }) {
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);
  const pinsRef = useRef(null);
  const [still, setStill] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  useEffect(() => {
    if (still) return undefined;
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    const layer = pinsRef.current;
    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    } catch (e) {
      setStill(true);
      return undefined;
    }
    renderer.setClearColor(0x000000, 0);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 60);
    const disposables = [];
    let raf = 0;
    let alive = true;
    let visible = true;

    const names = Object.keys(PLACES);
    const PL = {};
    names.forEach((k) => {
      PL[k] = { ...PLACES[k], v: ll2v(PLACES[k].ll[0], PLACES[k].ll[1], 1), arrive: 0 };
    });

    // textures
    const goldCanvas = document.createElement('canvas');
    goldCanvas.width = 2048;
    goldCanvas.height = 1024;
    const goldTex = new THREE.CanvasTexture(goldCanvas);
    goldTex.anisotropy = 4;
    const earthTex = new THREE.Texture();
    earthTex.colorSpace = THREE.NoColorSpace;
    earthTex.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
    const uni = {
      map: { value: earthTex },
      gold: { value: goldTex },
      sun: { value: new THREE.Vector3(0.4, 0.5, 0.8) },
      ready: { value: 0 },
      time: { value: 0 },
    };
    const img = new Image();
    img.onload = () => {
      earthTex.image = img;
      earthTex.needsUpdate = true;
      uni.ready.value = 1;
    };
    img.src = `${BASE}globe/earth.jpg`;
    fetch(`${BASE}globe/india.json`)
      .then((r) => r.json())
      .then((rings) => {
        const g = goldCanvas.getContext('2d');
        const path = () => {
          g.beginPath();
          rings.forEach((r) => {
            for (let i = 0; i < r.length; i += 2) {
              const x = ((r[i] + 180) / 360) * 2048;
              const y = ((90 - r[i + 1]) / 180) * 1024;
              if (i === 0) g.moveTo(x, y);
              else g.lineTo(x, y);
            }
            g.closePath();
          });
        };
        g.fillStyle = 'rgba(255,255,255,1)';
        path();
        g.fill();
        g.filter = 'blur(2px)';
        g.strokeStyle = 'rgba(255,255,255,1)';
        g.lineWidth = 2;
        path();
        g.stroke();
        goldTex.needsUpdate = true;
      })
      .catch(() => {});

    const earth = new THREE.Mesh(
      new THREE.SphereGeometry(1, 160, 120),
      new THREE.ShaderMaterial({ uniforms: uni, vertexShader: EARTH_VERT, fragmentShader: EARTH_FRAG })
    );
    scene.add(earth);
    const atmo = new THREE.Mesh(
      new THREE.SphereGeometry(1.11, 96, 64),
      new THREE.ShaderMaterial({
        transparent: true,
        side: THREE.BackSide,
        depthWrite: false,
        vertexShader: ATMO_VERT,
        fragmentShader: ATMO_FRAG,
      })
    );
    scene.add(atmo);

    // city markers
    const glow = glowTex('rgba(255,214,110,1)', 'rgba(255,190,60,0)');
    names.forEach((k) => {
      const p = PL[k];
      const pos = ll2v(p.ll[0], p.ll[1], 1.004);
      p.core = new THREE.Mesh(
        new THREE.SphereGeometry(p.home ? 0.013 : 0.01, 20, 16),
        new THREE.MeshBasicMaterial({ color: p.home ? 0xffe08a : 0xffd166 })
      );
      p.core.position.copy(pos);
      scene.add(p.core);
      p.halo = new THREE.Sprite(
        new THREE.SpriteMaterial({ map: glow, transparent: true, depthWrite: false, opacity: 0.9 })
      );
      p.halo.position.copy(pos);
      p.halo.scale.setScalar(p.home ? 0.09 : 0.07);
      scene.add(p.halo);
      p.ring = new THREE.Mesh(
        new THREE.RingGeometry(0.014, 0.017, 48),
        new THREE.MeshBasicMaterial({
          color: 0xe0a21e,
          transparent: true,
          opacity: 0,
          side: THREE.DoubleSide,
          depthWrite: false,
        })
      );
      p.ring.position.copy(ll2v(p.ll[0], p.ll[1], 1.003));
      p.ring.lookAt(p.ring.position.clone().multiplyScalar(2));
      scene.add(p.ring);
    });

    // routes: great circles lifted above the surface
    const sparkTex = glowTex('rgba(255,244,200,1)', 'rgba(255,200,80,0)');
    const coinI = coinTex('₹');
    const coinD = coinTex('$');
    const routes = ROUTES.map((src, idx) => {
      const r = { ...src };
      const A = PL[r.a].v;
      const B = PL[r.b].v;
      const w = Math.acos(Math.max(-1, Math.min(1, A.dot(B))));
      const sw = Math.sin(w);
      const h = 0.06 + 0.3 * (w / Math.PI);
      const pts = [];
      for (let k = 0; k <= 90; k++) {
        const t = k / 90;
        const a = Math.sin((1 - t) * w) / sw;
        const b = Math.sin(t * w) / sw;
        const rad = 1.004 + h * Math.pow(Math.sin(Math.PI * t), 0.85);
        pts.push(new THREE.Vector3().addScaledVector(A, a).addScaledVector(B, b).multiplyScalar(rad));
      }
      r.curve = new THREE.CatmullRomCurve3(pts);
      r.tubeSeg = 160;
      r.tube = new THREE.Mesh(
        new THREE.TubeGeometry(r.curve, r.tubeSeg, 0.0034, 6, false),
        new THREE.MeshBasicMaterial({ color: 0xf0b42c, transparent: true, opacity: 0.98 })
      );
      r.halo = new THREE.Mesh(
        new THREE.TubeGeometry(r.curve, r.tubeSeg, 0.011, 6, false),
        new THREE.MeshBasicMaterial({ color: 0xffc94d, transparent: true, opacity: 0.2, depthWrite: false })
      );
      r.idxT = r.tube.geometry.index.count;
      r.idxH = r.halo.geometry.index.count;
      r.tube.geometry.setDrawRange(0, 0);
      r.halo.geometry.setDrawRange(0, 0);
      scene.add(r.tube);
      scene.add(r.halo);
      r.spark = new THREE.Sprite(
        new THREE.SpriteMaterial({ map: sparkTex, transparent: true, depthWrite: false, opacity: 0 })
      );
      r.spark.scale.setScalar(0.075);
      scene.add(r.spark);
      r.coin = new THREE.Sprite(
        new THREE.SpriteMaterial({ map: coinI, transparent: true, depthWrite: false, opacity: 0 })
      );
      r.coin.scale.setScalar(0.06);
      scene.add(r.coin);
      r.off = (idx * 0.173) % 1;
      r.drawn = 0;
      return r;
    });

    // labels (DOM, positioned every frame)
    names.forEach((k) => {
      const p = PL[k];
      if (p.home) return;
      const d = document.createElement('div');
      d.className = `${PIN}border-[#0A1B3D]/10`;
      d.textContent = p.label;
      layer.appendChild(d);
      p.el = d;
      p.w = 0;
    });
    const indiaPin = document.createElement('div');
    indiaPin.className = `${PIN}border-[#D9A020]/70`;
    indiaPin.textContent = 'India';
    layer.appendChild(indiaPin);
    const indiaV = ll2v(79, 22.5, 1);
    const edgeTag = document.createElement('div');
    edgeTag.className = `${PIN}border-[#D9A020]/70`;
    edgeTag.textContent = 'To United States';
    layer.appendChild(edgeTag);

    let W = 1;
    let H = 1;
    let R0 = 300;
    let narrow = false;
    const resize = () => {
      W = wrap.clientWidth;
      H = wrap.clientHeight;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.setSize(W, H, false);
      camera.aspect = W / H;
      camera.updateProjectionMatrix();
      narrow = W < 520;
      R0 = Math.min(H, W) * 0.4;
      names.forEach((k) => {
        const p = PL[k];
        if (p.el) {
          p.el.textContent = narrow && p.short ? p.short : p.label;
          p.w = 0;
        }
      });
      indiaPin.w = 0;
      edgeTag.w = 0;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
    });
    io.observe(wrap);

    const tmp = new THREE.Vector3();
    const tmp2 = new THREE.Vector3();
    const camDirV = new THREE.Vector3();
    const project = (v) => {
      tmp.copy(v).project(camera);
      return { x: (tmp.x * 0.5 + 0.5) * W, y: (-tmp.y * 0.5 + 0.5) * H };
    };
    const t0 = performance.now();

    const frame = (now) => {
      if (!alive) return;
      raf = requestAnimationFrame(frame);
      if (document.hidden || !visible) return;
      const scrollSection = scrollTarget?.current;
      const t = scrollSection ? 0 : (now - t0) / 1000;
      const progress = scrollSection
        ? Math.max(
            0,
            Math.min(
              1,
              -scrollSection.getBoundingClientRect().top /
                Math.max(1, scrollSection.offsetHeight - window.innerHeight),
            ),
          )
        : null;
      // Stop at the last destination instead of entering the timed loop's return to India.
      const pS = progress === null ? 0.5 - 0.5 * Math.cos((2 * Math.PI * t) / LOOP_SECONDS) : progress * 0.9;
      uni.time.value = t;

      const cam = camAt(pS);
      const drift = Math.sin(t * 0.18) * 1.6;
      const dist = H / 2 / (R0 * cam.z * Math.tan(15 * D2R));
      const dirv = ll2v(cam.lo + drift, cam.la, 1);
      camera.position.copy(dirv).multiplyScalar(dist);
      camera.up.set(0, 1, 0);
      camera.lookAt(0, 0, 0);
      camera.updateMatrixWorld();
      const right = tmp2.setFromMatrixColumn(camera.matrixWorld, 0).clone();
      const up = new THREE.Vector3().setFromMatrixColumn(camera.matrixWorld, 1);
      uni.sun.value.copy(dirv).multiplyScalar(0.85).addScaledVector(right, -0.55).addScaledVector(up, 0.6).normalize();

      const intro = smooth((t - 0.6) / 2.6);
      routes.forEach((r) => {
        let d = smooth((pS - r.s) / (r.e - r.s));
        if (r.intro) d = Math.max(d, intro);
        r.drawn = d;
      });
      names.forEach((k) => {
        PL[k].arrive = 0;
      });
      routes.forEach((r) => {
        const a = Math.max(0, Math.min(1, (r.drawn - 0.96) / 0.04));
        if (a > PL[r.b].arrive) PL[r.b].arrive = a;
        if (r.drawn > 0.02) PL[r.a].arrive = 1;
      });
      routes.forEach((r) => {
        const d = r.drawn;
        const cnt = Math.floor(d * r.tubeSeg) * 36;
        r.tube.geometry.setDrawRange(0, Math.min(r.idxT, cnt));
        r.halo.geometry.setDrawRange(0, Math.min(r.idxH, cnt));
        const vis = d > 0.01;
        r.tube.visible = vis;
        r.halo.visible = vis;
        if (vis) {
          r.spark.position.copy(r.curve.getPoint(((t * 0.18 + r.off) % 1) * d));
          r.spark.material.opacity = 0.9;
          const cu = Math.min(d, 0.999) * (0.35 + 0.5 * ((t * 0.08 + r.off) % 1));
          r.coin.position.copy(r.curve.getPoint(cu));
          r.coin.material.map = cu > 0.5 ? coinD : coinI;
          r.coin.material.opacity = d > 0.08 ? 1 : 0;
          r.spark.visible = true;
          r.coin.visible = true;
        } else {
          r.spark.visible = false;
          r.coin.visible = false;
        }
      });
      names.forEach((k) => {
        const p = PL[k];
        const a = p.home ? 1 : p.arrive;
        const tw = 0.5 + 0.5 * Math.sin(t * 2.2 + p.ll[0]);
        p.core.visible = a > 0.01;
        p.halo.visible = a > 0.01;
        p.halo.material.opacity = 0.55 + 0.35 * tw;
        p.core.scale.setScalar(0.5 + 0.5 * a);
        const rp = (t * 0.5 + p.ll[1] * 0.07) % 1;
        p.ring.visible = a > 0.5;
        p.ring.scale.setScalar(1 + rp * 3.2);
        p.ring.material.opacity = (1 - rp) * 0.55 * a;
      });

      renderer.render(scene, camera);

      // labels, with simple collision avoidance
      const placed = [];
      const camDir = camDirV.copy(camera.position).normalize();
      const okI = indiaV.dot(camDir) > 0.2;
      if (okI) {
        const si = project(indiaV);
        if (!indiaPin.w) indiaPin.w = indiaPin.offsetWidth || 60;
        const rx = Math.max(8, Math.min(W - indiaPin.w - 8, si.x + 30));
        const ry = si.y - 13;
        placed.push({ x: rx, y: ry, w: indiaPin.w, h: 26 });
        indiaPin.style.transform = `translate(${rx.toFixed(1)}px,${ry.toFixed(1)}px)`;
      }
      indiaPin.style.opacity = okI ? 1 : 0;
      names.forEach((k) => {
        const p = PL[k];
        const el = p.el;
        if (!el) return;
        let ok = p.arrive > 0.5 && p.v.dot(camDir) > 0.2;
        if (ok) {
          const s = project(p.v);
          if (!p.w) p.w = el.offsetWidth || 90;
          const w = p.w;
          const h = 26;
          const gap = 12;
          let rx = p.side > 0 ? s.x + gap : s.x - gap - w;
          rx = Math.max(8, Math.min(W - w - 8, rx));
          const ry = s.y - h / 2;
          for (let i = 0; i < placed.length; i++) {
            const o = placed[i];
            if (rx < o.x + o.w + 4 && rx + w + 4 > o.x && ry < o.y + o.h + 3 && ry + h + 3 > o.y) {
              ok = false;
              break;
            }
          }
          if (ok) {
            placed.push({ x: rx, y: ry, w, h });
            el.style.transform = `translate(${rx.toFixed(1)}px,${ry.toFixed(1)}px)`;
          }
        }
        el.style.opacity = ok ? 1 : 0;
      });
      // edge tag toward the US when the US is on the far side
      const ny = PL['New York'];
      if (ny.arrive < 0.5 && routes[0].drawn > 0.4 && cam.lo > 0) {
        const sp = project(routes[0].curve.getPoint(0.55));
        if (!edgeTag.w) edgeTag.w = edgeTag.offsetWidth || 120;
        const ex = Math.max(8, Math.min(W - edgeTag.w - 8, sp.x - edgeTag.w - 10));
        edgeTag.style.transform = `translate(${ex.toFixed(1)}px,${Math.max(20, sp.y - 13).toFixed(1)}px)`;
        edgeTag.style.opacity = Math.min(1, (routes[0].drawn - 0.4) / 0.3);
      } else {
        edgeTag.style.opacity = 0;
      }
    };
    raf = requestAnimationFrame(frame);

    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      scene.traverse((o) => {
        if (o.geometry) o.geometry.dispose();
        if (o.material) {
          if (o.material.map) o.material.map.dispose();
          o.material.dispose();
        }
      });
      goldTex.dispose();
      earthTex.dispose();
      glow.dispose();
      sparkTex.dispose();
      coinI.dispose();
      coinD.dispose();
      disposables.length = 0;
      renderer.dispose();
      layer.replaceChildren();
    };
  }, [scrollTarget, still]);

  if (still) {
    return (
      <div className={`relative aspect-square w-full ${className}`}>
        <Poster />
      </div>
    );
  }
  return (
    <div ref={wrapRef} className={`relative aspect-square w-full ${className}`}>
      <canvas ref={canvasRef} className="absolute inset-0 block h-full w-full" />
      <div ref={pinsRef} className="pointer-events-none absolute inset-0 overflow-hidden" />
    </div>
  );
}
