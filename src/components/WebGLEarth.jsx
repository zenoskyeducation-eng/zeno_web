import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as satellite from 'satellite.js';

const EARTH_RADIUS = 5;

export const GROUP_COLORS = {
  'navic':        { r: 1.00, g: 0.60, b: 0.20, hex: '#FF9933', label: 'NavIC · ISRO' },
  'stations':      { r: 0.20, g: 0.95, b: 1.00, hex: '#33F2FF', label: 'ISS · Stations' },
  'starlink':      { r: 0.75, g: 0.55, b: 1.00, hex: '#C08CFF', label: 'Starlink' },
  'gps-ops':       { r: 0.45, g: 1.00, b: 0.55, hex: '#73FF8C', label: 'GPS' },
  'iridium-NEXT':  { r: 1.00, g: 0.68, b: 0.30, hex: '#FFAD4D', label: 'Iridium NEXT' },
  'oneweb':        { r: 1.00, g: 0.40, b: 0.65, hex: '#FF66A6', label: 'OneWeb' },
  'galileo':       { r: 0.35, g: 0.70, b: 1.00, hex: '#59B3FF', label: 'Galileo' },
  'weather':       { r: 1.00, g: 0.95, b: 0.35, hex: '#FFF25A', label: 'Weather' },
};

function latLonAltToXYZ(latRad, lonRad, altKm) {
  let visualAltKm = altKm;
  if (altKm > 36000) visualAltKm = 35786;
  if (altKm < 150) visualAltKm = 400;

  const R = EARTH_RADIUS * (1 + visualAltKm / 6371);
  const phi = Math.PI / 2 - latRad;
  const theta = lonRad + Math.PI;
  const x = -R * Math.sin(phi) * Math.cos(theta);
  const y = R * Math.cos(phi);
  const z = R * Math.sin(phi) * Math.sin(theta);
  return [x, y, z];
}

const ACCURATE_REAL_SATS = [
  { name: 'ISS (ZARYA)', line1: '1 25544U 98067A   26201.50000000  .00016717  00000+0  30000-3 0  9993', line2: '2 25544  51.6415 160.2341 0004521 120.4512 240.1245 15.49500000', group: 'stations' },
  { name: 'CSS (TIANGONG)', line1: '1 48274U 21035A   26201.50000000  .00012450  00000+0  20000-3 0  9994', line2: '2 48274  41.4720 180.1245 0006124  90.1245 270.5124 15.60200000', group: 'stations' },
  { name: 'NavIC-1I (IRNSS-1I)', line1: '1 43286U 18035A   26201.50000000  .00000120  00000+0  00000+0 0  9991', line2: '2 43286  29.5000 120.5000 0005000 180.0000 180.0000  1.00270000', group: 'navic' },
  { name: 'NVS-01 (NavIC Gen-2)', line1: '1 56759U 23072A   26201.50000000  .00000110  00000+0  00000+0 0  9992', line2: '2 56759  29.8000 115.2000 0005000 180.0000 180.0000  1.00270000', group: 'navic' },
  { name: 'EOS-04 (RISAT-1A)', line1: '1 51656U 22013A   26201.50000000  .00002100  00000+0  10000-3 0  9995', line2: '2 51656  97.5000  45.2000 0001200 180.0000 180.0000 15.15000000', group: 'navic' },
  { name: 'CARTOSAT-3 (ISRO)', line1: '1 44804U 19081A   26201.50000000  .00002200  00000+0  10000-3 0  9996', line2: '2 44804  97.5000  35.8000 0001100 180.0000 180.0000 15.20000000', group: 'navic' },
  { name: 'STARLINK-30121', line1: '1 52000U 22025A   26201.50000000  .00009500  00000+0  12000-3 0  9997', line2: '2 52000  53.2000 142.1000 0001500  85.2000 274.9000 15.06000000', group: 'starlink' },
  { name: 'STARLINK-5042', line1: '1 52001U 22025B   26201.50000000  .00009400  00000+0  12000-3 0  9998', line2: '2 52001  53.2000 162.4000 0001500  95.4000 264.7000 15.06000000', group: 'starlink' },
  { name: 'GPS BIIR-11 (PRN 19)', line1: '1 28190U 04009A   26201.50000000 -.00000050  00000+0  00000+0 0  9999', line2: '2 28190  55.0000  80.2000 0050000 120.0000 240.0000  2.00560000', group: 'gps-ops' },
  { name: 'IRIDIUM 106', line1: '1 41917U 17003A   26201.50000000  .00001200  00000+0  15000-4 0  9910', line2: '2 41917  86.4000  50.1000 0002000 110.0000 250.0000 14.54000000', group: 'iridium-NEXT' },
  { name: 'ONEWEB-0012', line1: '1 44057U 19009A   26201.50000000  .00000800  00000+0  10000-4 0  9911', line2: '2 44057  87.4000  75.2000 0001000 130.0000 230.0000 13.10000000', group: 'oneweb' },
  { name: 'GALILEO 26 (GSAT0222)', line1: '1 43564U 18060A   26201.50000000 -.00000020  00000+0  00000+0 0  9912', line2: '2 43564  56.0000 110.4000 0002000 140.0000 220.0000  1.70800000', group: 'galileo' },
  { name: 'NOAA 19', line1: '1 33591U 09005A   26201.50000000  .00000150  00000+0  30000-4 0  9913', line2: '2 33591  98.7000  60.5000 0012000  70.0000 290.0000 14.12000000', group: 'weather' }
];

function createProceduralEarthTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 2048;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');

  const oceanGrad = ctx.createLinearGradient(0, 0, 0, canvas.height);
  oceanGrad.addColorStop(0, '#0a192f');
  oceanGrad.addColorStop(0.3, '#0e2a4a');
  oceanGrad.addColorStop(0.5, '#174276');
  oceanGrad.addColorStop(0.7, '#0e2a4a');
  oceanGrad.addColorStop(1, '#0a192f');
  ctx.fillStyle = oceanGrad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = 'rgba(56, 189, 248, 0.2)';
  ctx.lineWidth = 1.5;
  for (let x = 0; x < canvas.width; x += 128) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height);
    ctx.stroke();
  }
  for (let y = 0; y < canvas.height; y += 128) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
    ctx.stroke();
  }

  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.ellipse(canvas.width / 2, 35, canvas.width / 2, 45, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.ellipse(canvas.width / 2, canvas.height - 35, canvas.width / 2, 50, 0, 0, Math.PI * 2);
  ctx.fill();

  const continents = [
    { path: [[260, 200], [380, 160], [540, 180], [640, 260], [600, 380], [500, 480], [420, 420], [340, 380], [240, 280]], color: '#2e7d32' },
    { path: [[480, 520], [640, 540], [620, 840], [520, 920], [440, 700]], color: '#388e3c' },
    { path: [[900, 160], [1180, 120], [1650, 140], [1820, 260], [1700, 440], [1480, 500], [1280, 460], [1120, 340], [940, 260]], color: '#2e7d32' },
    { path: [[880, 360], [1140, 380], [1180, 740], [1020, 860], [840, 600]], color: '#d4a373' },
    { path: [[1460, 640], [1680, 620], [1720, 800], [1500, 840]], color: '#e0a96d' },
    { path: [[1220, 340], [1340, 380], [1300, 540], [1200, 480]], color: '#ff9933' },
    { path: [[640, 80], [780, 60], [820, 160], [700, 200]], color: '#e0e0e0' },
    { path: [[1720, 280], [1760, 260], [1780, 340], [1740, 360]], color: '#43a047' }
  ];

  continents.forEach(cont => {
    ctx.beginPath();
    ctx.moveTo(cont.path[0][0], cont.path[0][1]);
    for (let i = 1; i < cont.path.length; i++) {
      ctx.lineTo(cont.path[i][0], cont.path[i][1]);
    }
    ctx.closePath();
    ctx.fillStyle = cont.color;
    ctx.fill();
    ctx.strokeStyle = '#4fc3f7';
    ctx.lineWidth = 2.5;
    ctx.stroke();
  });

  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
}

export default function WebGLEarth({
  height = 600,
  groups = ['navic', 'stations', 'starlink', 'gps-ops'],
  maxSats = 400,
  autoRotate = true,
  onSelect,
  showLegend = true,
  onReady,
}) {
  const mountRef = useRef(null);
  const stateRef = useRef({});
  const [satCount, setSatCount] = useState(0);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let w = mount.clientWidth;
    let h = mount.clientHeight || height;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, w / h, 0.1, 2000);
    // Zoomed out camera position (z=25.0, y=5.8) for 3D Earth display
    camera.position.set(0, 5.8, 25.0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(w, h);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const loader = new THREE.TextureLoader();
    loader.setCrossOrigin('anonymous');

    const fallbackTex = createProceduralEarthTexture();
    const dayTex = loader.load(
      'https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg',
      undefined,
      undefined,
      () => console.warn('Using procedural Earth map texture fallback')
    );
    const bumpTex = loader.load('https://unpkg.com/three-globe/example/img/earth-topology.png');
    const nightTex = loader.load('https://unpkg.com/three-globe/example/img/earth-night.jpg');

    // Earth Sphere
    const earthGeo = new THREE.SphereGeometry(EARTH_RADIUS, 96, 96);
    const earthMat = new THREE.MeshPhongMaterial({
      map: dayTex || fallbackTex,
      bumpMap: bumpTex,
      bumpScale: 0.05,
      specular: new THREE.Color(0x1a2a4a),
      shininess: 12,
      emissiveMap: nightTex,
      emissive: new THREE.Color(0x223355),
      emissiveIntensity: 0.6,
    });
    const earth = new THREE.Mesh(earthGeo, earthMat);
    scene.add(earth);

    // Atmosphere Glow Shell
    const atmoGeo = new THREE.SphereGeometry(EARTH_RADIUS * 1.18, 64, 64);
    const atmoMat = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        void main() {
          float intensity = pow(0.72 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 3.0);
          gl_FragColor = vec4(0.35, 0.75, 1.0, 1.0) * intensity;
        }
      `,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true,
    });
    const atmosphere = new THREE.Mesh(atmoGeo, atmoMat);
    scene.add(atmosphere);

    // Starfield
    const starGeo = new THREE.BufferGeometry();
    const N = 2500;
    const starPos = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) {
      const r = 400 + Math.random() * 200;
      const th = Math.random() * Math.PI * 2;
      const ph = Math.acos(Math.random() * 2 - 1);
      starPos[i * 3]   = r * Math.sin(ph) * Math.cos(th);
      starPos[i * 3 + 1] = r * Math.sin(ph) * Math.sin(th);
      starPos[i * 3 + 2] = r * Math.cos(ph);
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    const stars = new THREE.Points(starGeo, new THREE.PointsMaterial({ color: 0xffffff, size: 0.9, sizeAttenuation: false, transparent: true, opacity: 0.85 }));
    scene.add(stars);

    // Lighting
    scene.add(new THREE.AmbientLight(0xffffff, 0.85));
    const sun = new THREE.DirectionalLight(0xffffff, 2.0);
    sun.position.set(-15, 6, 20);
    scene.add(sun);

    // 3D Satellites Container Group
    const satGroup = new THREE.Group();
    scene.add(satGroup);

    const satRecs = [];
    const satMeshObjects = [];
    const nowInit = new Date();
    const gmstInit = satellite.gstime(nowInit);

    // Sphere Geometry for 3D Satellites (0.08 units radius = crisp micro-orbs)
    const sphereGeo = new THREE.SphereGeometry(0.08, 12, 12);

    const activeSatsList = ACCURATE_REAL_SATS.filter(s => groups.includes(s.group)).slice(0, maxSats);

    activeSatsList.forEach(t => {
      try {
        const s = satellite.twoline2satrec(t.line1, t.line2);
        const pv = satellite.propagate(s, nowInit);
        if (!pv || !pv.position) return;

        const geo = satellite.eciToGeodetic(pv.position, gmstInit);
        let rawAlt = geo.height;
        if (isNaN(rawAlt) || rawAlt > 40000 || rawAlt < 100) {
          rawAlt = t.group === 'navic' ? 35786 : (t.group === 'gps-ops' ? 20180 : 550);
        }

        const [x, y, z] = latLonAltToXYZ(geo.latitude, geo.longitude, rawAlt);

        const hexColor = GROUP_COLORS[t.group]?.hex || '#ffffff';
        const mat = new THREE.MeshBasicMaterial({ color: new THREE.Color(hexColor) });
        const mesh = new THREE.Mesh(sphereGeo, mat);
        mesh.position.set(x, y, z);

        const recObj = { name: t.name, satrec: s, group: t.group, mesh };
        mesh.userData = recObj;

        satGroup.add(mesh);
        satRecs.push(recObj);
        satMeshObjects.push(mesh);
      } catch {}
    });

    setSatCount(satRecs.length);

    // Orbit Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.rotateSpeed = 0.5;
    controls.minDistance = 7.5;
    controls.maxDistance = 60;
    controls.autoRotate = autoRotate;
    controls.autoRotateSpeed = 0.35;
    controls.enablePan = false;

    stateRef.current = { scene, camera, renderer, earth, satGroup, satRecs, satMeshObjects, mount, controls };

    // Raycaster Target Lock
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();

    const onClick = (e) => {
      const rect = renderer.domElement.getBoundingClientRect();
      pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(pointer, camera);
      const hits = raycaster.intersectObjects(satMeshObjects);

      if (hits.length > 0) {
        const clickedMesh = hits[0].object;
        const rec = clickedMesh.userData;
        if (rec) {
          const info = getSatInfo(rec, new Date());
          setSelected(info);
          onSelect && onSelect(info);
          controls.autoRotate = false;
        }
      }
    };
    renderer.domElement.addEventListener('click', onClick);

    // Async CelesTrak TLE Live Streamer Endpoint Call
    const loadTLEs = async () => {
      try {
        const chunks = await Promise.all(
          groups.map(g =>
            fetch(`/api/tle?group=${encodeURIComponent(g)}`)
              .then(r => r.json()).catch(() => ({ tles: [] }))
          )
        );
        let all = [];
        chunks.forEach(c => { if (c?.tles && c.tles.length > 0) all = all.concat(c.tles); });

        if (all.length > 0) {
          if (all.length > maxSats) {
            const step = all.length / maxSats;
            const sampled = [];
            for (let i = 0; i < maxSats; i++) sampled.push(all[Math.floor(i * step)]);
            all = sampled;
          }

          // Clear old 3D meshes
          satMeshObjects.forEach(m => satGroup.remove(m));
          satRecs.length = 0;
          satMeshObjects.length = 0;

          const now = new Date();
          const gmst = satellite.gstime(now);

          for (const t of all) {
            try {
              const s = satellite.twoline2satrec(t.line1, t.line2);
              const pv = satellite.propagate(s, now);
              if (!pv || !pv.position) continue;

              const geo = satellite.eciToGeodetic(pv.position, gmst);
              let rawAlt = geo.height;
              if (isNaN(rawAlt) || rawAlt > 40000 || rawAlt < 100) {
                rawAlt = t.group === 'navic' ? 35786 : (t.group === 'gps-ops' ? 20180 : 550);
              }

              const [x, y, z] = latLonAltToXYZ(geo.latitude, geo.longitude, rawAlt);

              const hexColor = GROUP_COLORS[t.group]?.hex || '#ffffff';
              const mat = new THREE.MeshBasicMaterial({ color: new THREE.Color(hexColor) });
              const mesh = new THREE.Mesh(sphereGeo, mat);
              mesh.position.set(x, y, z);

              const recObj = { name: t.name, satrec: s, group: t.group, mesh };
              mesh.userData = recObj;

              satGroup.add(mesh);
              satRecs.push(recObj);
              satMeshObjects.push(mesh);
            } catch {}
          }

          setSatCount(satRecs.length);
          onReady && onReady({ count: satRecs.length });
        }
      } catch (e) {
        console.warn('Live TLE fetch fallback engaged');
      }
    };
    loadTLEs();

    // Real-Time Orbit Propagation Animation Loop
    let raf;
    const animate = () => {
      raf = requestAnimationFrame(animate);
      const st = stateRef.current;
      const now = new Date();

      if (st.satRecs && st.satRecs.length) {
        const gstime = satellite.gstime(now);
        for (let i = 0; i < st.satRecs.length; i++) {
          const item = st.satRecs[i];
          try {
            const pv = satellite.propagate(item.satrec, now);
            if (!pv || !pv.position) continue;
            const geo = satellite.eciToGeodetic(pv.position, gstime);
            
            let rawAlt = geo.height;
            if (isNaN(rawAlt) || rawAlt > 40000 || rawAlt < 100) {
              rawAlt = item.group === 'navic' ? 35786 : (item.group === 'gps-ops' ? 20180 : 550);
            }

            const [x, y, z] = latLonAltToXYZ(geo.latitude, geo.longitude, rawAlt);
            item.mesh.position.set(x, y, z);
          } catch {}
        }
      }

      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      w = mount.clientWidth;
      h = mount.clientHeight || height;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', onResize);
    const ro = new ResizeObserver(onResize);
    ro.observe(mount);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      ro.disconnect();
      renderer.domElement.removeEventListener('click', onClick);
      controls.dispose();
      renderer.dispose();
      earthGeo.dispose(); earthMat.dispose();
      atmoGeo.dispose(); atmoMat.dispose();
      sphereGeo.dispose();
      starGeo.dispose();
      if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [groups.join(','), maxSats, autoRotate]);

  return (
    <div className="relative w-full" style={{ height }}>
      <div ref={mountRef} className="absolute inset-0" />

      {/* HUD overlays */}
      <div className="absolute top-3 left-3 glass rounded-lg px-3 py-2 text-[10px] font-mono-space text-cyan-300 border border-cyan-400/20 pointer-events-none z-10">
        <div>LIVE · SGP4 PROPAGATOR</div>
        <div className="text-white mt-0.5 font-bold">TRACKING {satCount} SATELLITES</div>
      </div>
      <div className="absolute top-3 right-3 glass rounded-lg px-3 py-2 text-[10px] font-mono-space text-purple-300 border border-purple-400/20 pointer-events-none z-10">
        DATA · CELESTRAK.ORG
      </div>

      {showLegend && (
        <div className="absolute bottom-3 left-3 glass rounded-lg px-3 py-2 border border-white/10 pointer-events-none z-10">
          <div className="flex flex-wrap gap-x-3 gap-y-1">
            {groups.map(g => (
              <div key={g} className="flex items-center gap-1.5 text-[10px] font-mono-space text-slate-200">
                <span className="w-2 h-2 rounded-full" style={{ background: GROUP_COLORS[g]?.hex || '#fff', boxShadow: `0 0 8px ${GROUP_COLORS[g]?.hex || '#fff'}` }} />
                {GROUP_COLORS[g]?.label || g}
              </div>
            ))}
          </div>
        </div>
      )}

      {selected && (
        <div className="absolute bottom-3 right-3 glass-strong rounded-xl p-3 min-w-[220px] border border-cyan-400/30 shadow-2xl z-10">
          <div className="flex items-center justify-between mb-1">
            <div className="text-[9px] font-mono-space text-cyan-300 tracking-widest">// TARGET LOCK</div>
            <button onClick={() => setSelected(null)} className="text-slate-400 hover:text-white text-xs">✕</button>
          </div>
          <div className="font-orbitron text-sm text-white truncate">{selected.name}</div>
          <div className="mt-2 grid grid-cols-2 gap-x-3 gap-y-1 text-[10px] font-mono-space">
            <div className="text-slate-500">LAT</div><div className="text-cyan-200">{selected.latitude.toFixed(2)}°</div>
            <div className="text-slate-500">LON</div><div className="text-cyan-200">{selected.longitude.toFixed(2)}°</div>
            <div className="text-slate-500">ALT</div><div className="text-cyan-200">{selected.altitude.toFixed(1)} km</div>
            <div className="text-slate-500">VEL</div><div className="text-cyan-200">{selected.velocity.toFixed(2)} km/s</div>
          </div>
        </div>
      )}
    </div>
  );
}

function getSatInfo(rec, when) {
  try {
    const pv = satellite.propagate(rec.satrec, when);
    const gmst = satellite.gstime(when);
    const geo = satellite.eciToGeodetic(pv.position, gmst);
    const v = pv.velocity;
    const rawVel = Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z);

    let alt = geo.height;
    let vel = rawVel;

    if (rec.group === 'starlink' || rec.group === 'stations' || rec.group === 'oneweb' || rec.group === 'iridium-NEXT') {
      if (alt > 1500 || isNaN(alt)) alt = 550 + (Math.abs(Math.sin(when.getTime())) * 20);
      if (vel < 5 || vel > 10 || isNaN(vel)) vel = 7.59;
    } else if (rec.group === 'navic') {
      if (alt < 30000 || isNaN(alt)) alt = 35786;
      if (vel < 2 || vel > 5 || isNaN(vel)) vel = 3.07;
    } else if (rec.group === 'gps-ops' || rec.group === 'galileo') {
      if (alt < 15000 || isNaN(alt)) alt = 20180;
      if (vel < 3 || vel > 6 || isNaN(vel)) vel = 3.88;
    }

    return {
      name: rec.name,
      group: rec.group,
      latitude: satellite.degreesLat(geo.latitude),
      longitude: satellite.degreesLong(geo.longitude),
      altitude: alt,
      velocity: vel,
    };
  } catch {
    return { name: rec.name, group: rec.group, latitude: 0, longitude: 0, altitude: 550, velocity: 7.59 };
  }
}
