"use client";

import { Canvas } from "@react-three/fiber";
import Fog from "./Fog";

export default function Scene() {
  return (
    <div className="scene-bg">
      <Canvas
        camera={{ position: [0, 2, 5], fov: 60 }}
        className="scene-canvas"
      >
        <color attach="background" args={["black"]} />
        <Fog />
      </Canvas>
    </div>
  );
}