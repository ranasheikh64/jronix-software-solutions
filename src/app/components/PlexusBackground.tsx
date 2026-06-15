import { useEffect, useRef } from "react";
import * as THREE from "three";

const colorPresets = {
  electricBlue: {
    bg: 0x010515,
    nodeColor: 0x00f0ff,
    lineColor: 0x0055ff,
    faceColor: 0x003cd0,
  },
};

export function PlexusBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animId: number;
    const settings = {
      speed: 1.0,
      range: 7.5,
      density: 150,
      faceOpacity: 0,
      theme: "electricBlue" as keyof typeof colorPresets,
      autoRotate: true,
      mousePull: true,
    };

    // Scene
    const scene = new THREE.Scene();
    const preset = colorPresets[settings.theme];
    scene.fog = new THREE.FogExp2(preset.bg, 0.02);

    // Camera
    const camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.z = 25;

    // Renderer — transparent so our CSS background shows through
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0); // fully transparent clear
    container.appendChild(renderer.domElement);

    // Glow texture
    function createGlowTexture() {
      const cvs = document.createElement("canvas");
      cvs.width = 64; cvs.height = 64;
      const ctx = cvs.getContext("2d")!;
      const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      g.addColorStop(0, "rgba(255,255,255,1)");
      g.addColorStop(0.2, "rgba(0,240,255,0.9)");
      g.addColorStop(0.5, "rgba(0,80,255,0.3)");
      g.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, 64, 64);
      const tex = new THREE.Texture(cvs);
      tex.needsUpdate = true;
      return tex;
    }

    // Nodes
    interface Node { pos: THREE.Vector3; velocity: THREE.Vector3 }
    const nodes: Node[] = [];
    for (let i = 0; i < settings.density; i++) {
      nodes.push({
        pos: new THREE.Vector3(
          (Math.random() - 0.5) * 32,
          (Math.random() - 0.5) * 18,
          (Math.random() - 0.5) * 16
        ),
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.05,
          (Math.random() - 0.5) * 0.05,
          (Math.random() - 0.5) * 0.05
        ),
      });
    }

    // Points
    const ptGeo = new THREE.BufferGeometry();
    const ptPos = new Float32Array(settings.density * 3);
    nodes.forEach((n, i) => {
      ptPos[i * 3] = n.pos.x;
      ptPos[i * 3 + 1] = n.pos.y;
      ptPos[i * 3 + 2] = n.pos.z;
    });
    ptGeo.setAttribute("position", new THREE.BufferAttribute(ptPos, 3));
    const ptMat = new THREE.PointsMaterial({
      size: 0.45,
      map: createGlowTexture(),
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      color: preset.nodeColor,
    });
    const particlePoints = new THREE.Points(ptGeo, ptMat);
    scene.add(particlePoints);

    // Lines
    const maxLines = settings.density * 6;
    const lineGeo = new THREE.BufferGeometry();
    const linePos = new Float32Array(maxLines * 2 * 3);
    const lineCol = new Float32Array(maxLines * 2 * 3);
    lineGeo.setAttribute("position", new THREE.BufferAttribute(linePos, 3));
    lineGeo.setAttribute("color", new THREE.BufferAttribute(lineCol, 3));
    const lineMat = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      opacity: 0.65,
    });
    const lineSegments = new THREE.LineSegments(lineGeo, lineMat);
    scene.add(lineSegments);

    // Triangles
    const maxTris = settings.density * 4;
    const triGeo = new THREE.BufferGeometry();
    const triPos = new Float32Array(maxTris * 3 * 3);
    const triCol = new Float32Array(maxTris * 3 * 3);
    triGeo.setAttribute("position", new THREE.BufferAttribute(triPos, 3));
    triGeo.setAttribute("color", new THREE.BufferAttribute(triCol, 3));
    const triMat = new THREE.MeshBasicMaterial({
      vertexColors: true,
      side: THREE.DoubleSide,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      opacity: settings.faceOpacity,
    });
    const triangleMesh = new THREE.Mesh(triGeo, triMat);
    scene.add(triangleMesh);

    // Mouse
    let mouseX = 0, mouseY = 0, targetX = 0;
    const halfW = window.innerWidth / 2;
    const halfH = window.innerHeight / 2;
    const mouse3D = new THREE.Vector3();

    const onMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX - halfW) / 100;
      mouseY = (e.clientY - halfH) / 100;
      mouse3D.set(
        (e.clientX / window.innerWidth) * 2 - 1,
        -(e.clientY / window.innerHeight) * 2 + 1,
        0.5
      );
      mouse3D.unproject(camera);
      const dir = mouse3D.sub(camera.position).normalize();
      const dist = -camera.position.z / dir.z;
      mouse3D.copy(camera.position).add(dir.multiplyScalar(dist));
    };

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("resize", onResize);

    const baseColor = new THREE.Color(preset.lineColor);
    const secColor = new THREE.Color(preset.nodeColor);
    const faceColor = new THREE.Color(preset.faceColor);

    const render = () => {
      if (settings.autoRotate) targetX += 0.002;
      camera.position.x += (mouseX - camera.position.x + Math.sin(targetX) * 3) * 0.05;
      camera.position.y += (-mouseY - camera.position.y + Math.cos(targetX) * 1.5) * 0.05;
      camera.lookAt(scene.position);

      const pArr = particlePoints.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < settings.density; i++) {
        const n = nodes[i];
        n.pos.addScaledVector(n.velocity, settings.speed * 0.5);
        if (Math.abs(n.pos.x) > 20) n.velocity.x *= -1;
        if (Math.abs(n.pos.y) > 12) n.velocity.y *= -1;
        if (Math.abs(n.pos.z) > 10) n.velocity.z *= -1;
        if (settings.mousePull) {
          const d = n.pos.distanceTo(mouse3D);
          if (d < 8) n.pos.lerp(mouse3D, (8 - d) * 0.005);
        }
        pArr[i * 3] = n.pos.x;
        pArr[i * 3 + 1] = n.pos.y;
        pArr[i * 3 + 2] = n.pos.z;
      }
      particlePoints.geometry.attributes.position.needsUpdate = true;

      const lPos = lineSegments.geometry.attributes.position.array as Float32Array;
      const lCol = lineSegments.geometry.attributes.color.array as Float32Array;
      const tPos = triangleMesh.geometry.attributes.position.array as Float32Array;
      const tCol = triangleMesh.geometry.attributes.color.array as Float32Array;

      let li = 0, ti = 0;

      for (let i = 0; i < settings.density; i++) {
        const a = nodes[i];
        let conn = 0;
        for (let j = i + 1; j < settings.density; j++) {
          const b = nodes[j];
          const dist = a.pos.distanceTo(b.pos);
          if (dist < settings.range && conn < 6) {
            if (li < maxLines) {
              const va = li * 6, vb = va + 3;
              lPos[va] = a.pos.x; lPos[va+1] = a.pos.y; lPos[va+2] = a.pos.z;
              lPos[vb] = b.pos.x; lPos[vb+1] = b.pos.y; lPos[vb+2] = b.pos.z;
              const alpha = 1 - dist / settings.range;
              lCol[va] = baseColor.r * alpha; lCol[va+1] = baseColor.g * alpha; lCol[va+2] = baseColor.b * alpha;
              lCol[vb] = secColor.r * alpha; lCol[vb+1] = secColor.g * alpha; lCol[vb+2] = secColor.b * alpha;
              li++; conn++;
            }
            for (let k = j + 1; k < settings.density && ti < maxTris; k++) {
              const c = nodes[k];
              const dac = a.pos.distanceTo(c.pos);
              const dbc = b.pos.distanceTo(c.pos);
              const fr = settings.range * 0.75;
              if (dac < fr && dbc < fr) {
                const o = ti * 9;
                tPos[o]=a.pos.x; tPos[o+1]=a.pos.y; tPos[o+2]=a.pos.z;
                tPos[o+3]=b.pos.x; tPos[o+4]=b.pos.y; tPos[o+5]=b.pos.z;
                tPos[o+6]=c.pos.x; tPos[o+7]=c.pos.y; tPos[o+8]=c.pos.z;
                const ta = 1 - (dist + dac + dbc) / 3 / fr;
                for (let x = 0; x < 9; x += 3) {
                  tCol[o+x] = faceColor.r * ta;
                  tCol[o+x+1] = faceColor.g * ta;
                  tCol[o+x+2] = faceColor.b * ta;
                }
                ti++;
              }
            }
          }
        }
      }

      lineSegments.geometry.setDrawRange(0, li * 2);
      lineSegments.geometry.attributes.position.needsUpdate = true;
      lineSegments.geometry.attributes.color.needsUpdate = true;
      triangleMesh.geometry.setDrawRange(0, ti * 3);
      triangleMesh.geometry.attributes.position.needsUpdate = true;
      triangleMesh.geometry.attributes.color.needsUpdate = true;

      renderer.render(scene, camera);
      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0, opacity: 0.22 }}
    />
  );
}
