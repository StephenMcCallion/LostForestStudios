"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

export default function Fog() {
  const fog = useRef<THREE.Points>(null);
  const timeRef = useRef(0);

  const particleTexture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 64;
    canvas.height = 64;

    const context = canvas.getContext("2d");
    if (!context) return null;

    const gradient = context.createRadialGradient(32, 32, 0, 32, 32, 32);
    gradient.addColorStop(0, "rgba(255,255,255,0.8)");
    gradient.addColorStop(0.2, "rgba(255,255,255,0.6)");
    gradient.addColorStop(0.6, "rgba(255,255,255,0.2)");
    gradient.addColorStop(1, "rgba(255,255,255,0)");

    context.fillStyle = gradient;
    context.fillRect(0, 0, 64, 64);

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.needsUpdate = true;

    return texture;
  }, []);

  useFrame(() => {
    if (!fog.current) return;

    timeRef.current += 0.008;

    // Faster, more organic movement with wave-like motion
    fog.current.rotation.y += 0.0008;
    fog.current.position.x = Math.sin(timeRef.current * 0.5) * 8;
    fog.current.position.z = Math.cos(timeRef.current * 0.4) * 6;
    fog.current.position.y = Math.sin(timeRef.current * 0.3) * 5;
  });

  const particles = useMemo(() => {
    const count = 48000;
    const arr = new Float32Array(count * 3);

    for (let i = 0; i < count; i += 1) {
      // Generate particles radiating outward from center in all directions
      const distance = Math.pow(Math.random(), 0.5) * 30; // Pow for more density near center
      const theta = Math.random() * Math.PI * 2; // Horizontal rotation
      const phi = Math.acos(Math.random() * 2 - 1); // Vertical distribution

      arr[i * 3] = Math.sin(phi) * Math.cos(theta) * distance;
      arr[i * 3 + 1] = Math.cos(phi) * distance;
      arr[i * 3 + 2] = Math.sin(phi) * Math.sin(theta) * distance;
    }

    return arr;
  }, []);

  return (
    <points ref={fog}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[particles, 3]} />
      </bufferGeometry>

      <pointsMaterial
        map={particleTexture ?? undefined}
        color="#9db3c8"
        size={4.5}
        transparent
        opacity={0.06}
        depthWrite={false}
        sizeAttenuation
        blending={THREE.NormalBlending}
      />
    </points>
  );
}