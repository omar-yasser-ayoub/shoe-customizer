import React, { useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Model from "./Model";
import { Group, Mesh } from "three";
import * as THREE from "three";
import loadingManager from "../Classes/loadingManager.tsx";
import { Environment } from "@react-three/drei";

const ThreeCanvas: React.FC = () => {
  const model: Group = Model("/shoe.gltf");
  const controls = useRef<OrbitControls>(null);
  const loadManager: loadingManager = new loadingManager();
  const dirLightRef = useRef<THREE.DirectionalLight>(null);
  useEffect(() => {
    const control = controls.current;
    if (control) {
      // control.enablePan = false;
      // control.enableZoom = false;
      // control.enableDamping = false;
    }
  }, []);
  useEffect(() => {
    if (model) {
      for (let i = 0; i < model.children.length; i++) {
        const child = model.children[i] as Mesh;
        if (child) {
          child.receiveShadow = true;
        }
      }
      const child = model.children[5] as Mesh;
      const child2 = model.children[7] as Mesh;
      const child3 = model.children[8] as Mesh;
      const child4 = model.children[9] as Mesh;
      const child5 = model.children[10] as Mesh;
      const child6 = model.children[11] as Mesh;
      if (child && child2 && loadManager) {
        child.material = loadManager.getFabricMaterial(new THREE.Color("red"));
        child2.material = loadManager.getFabricMaterial(new THREE.Color("red"));
        child3.material = loadManager.getFabricMaterial(new THREE.Color("red"));
        child4.material = loadManager.getFabricMaterial(new THREE.Color("red"));
        child5.material = loadManager.getFabricMaterial(new THREE.Color("red"));
        child6.material = loadManager.getFabricMaterial(new THREE.Color("red"));
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
    <Canvas
      className="w-full h-full bg-black"
      gl={{
        toneMapping: THREE.ReinhardToneMapping,
        toneMappingExposure: 2.2,
        antialias: true,
        shadowMapEnabled: true,
        shadowMapType: THREE.PCFSoftShadowMap,
      }}
      shadows={true}
    >
      <Environment files={"/textures/env/sky.hdr"} background />
      <OrbitControls ref={controls} />
      <ambientLight color={0xffffff} intensity={6} />
      <directionalLight
        ref={dirLightRef}
        color={0xffffff}
        intensity={6}
        position={[0, 7, 6]}
        castShadow={true}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={0.5}
        shadow-camera-far={500}
        shadow-camera-left={-50}
        shadow-camera-right={50}
        shadow-camera-top={50}
        shadow-camera-bottom={-50}
      >
      </directionalLight>
      <group position={[0, -3, 0]}>
        <RenderModel />
      </group>
    </Canvas>
  );
};

export default ThreeCanvas;
