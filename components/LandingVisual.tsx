"use client"
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stage } from "@react-three/drei";
import { Model } from "@/components/Scene";

export default function LandingVisual() {
  return (
    <Canvas style={{ width: "40vw", height: "40vh" }} className="flex items-center justify-center -my-24 mx-auto">
      <Stage environment="city" intensity={10}>
        {/* <PostItModel rotation={[Math.PI / 200, Math.PI / -1200, Math.PI / 150]} /> */}
        <Model />
      </Stage>
      <OrbitControls enableZoom={false} autoRotate enableRotate={true} autoRotateSpeed={5} />
    </Canvas>
  );
}
