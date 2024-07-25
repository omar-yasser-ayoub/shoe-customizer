import React, { useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Model from "./Model";
import { Group, Mesh } from "three";
import * as THREE from "three";
import loadingManager from "../Classes/loadingManager.tsx";

const ThreeCanvas: React.FC = () => {
  const model: Group = Model("/shoe.gltf");
  const controls = useRef<OrbitControls>(null);
  const loadManager: loadingManager = new loadingManager();
  useEffect(() => {
    const control = controls.current;
    if (control) {
      control.enablePan = false;
      control.enableZoom = false;
      control.enableDamping = false;
    }
  }, []);
  useEffect(() => {
    if (model) {
      const child = model.children[5] as Mesh;
      if (child && loadingManager) {
        const material = child.material as THREE.MeshStandardMaterial;
        material.color = new THREE.Color(0xff0000);
      }
    }
  }, [model]);

  const RenderModel = () => {
    useFrame((state, delta) => {
      if (model) {
        // model.rotation.y += 0.5*delta;
      }
    });
    return <primitive object={model} />;
  };

  return (
    <Canvas className="w-full h-full bg-black">
      <OrbitControls ref={controls} />
      <ambientLight color={0xffffff} intensity={4} />
      <pointLight position={[2, 2, 2]} intensity={4} />
      <group position={[0, -3, 0]}>
        <RenderModel />
      </group>
    </Canvas>
  );
};

export default ThreeCanvas;
