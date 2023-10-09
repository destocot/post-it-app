"use client"
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stage } from "@react-three/drei";
import PostItModel from "./PostItModel";

export default function LandingVisual() {
  return (
    <Canvas style={{ width: "50vw", height: "50vh" }} className="flex items-center justify-center -mt-24 mx-auto -mb-24 -z-10">
      <Stage environment="city" intensity={10}>
        <PostItModel rotation={[Math.PI / 125, 0, Math.PI / 115]} />
      </Stage>
      <OrbitControls enableZoom={false} autoRotate enableRotate={false} autoRotateSpeed={5} />
    </Canvas>
  );
}
