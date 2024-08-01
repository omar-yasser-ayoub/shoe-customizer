import React, { useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Group, Mesh } from "three";
import * as THREE from "three";
import loadingManager from "../Classes/loadingManager.tsx";
import { Environment } from "@react-three/drei";
import Model from "../Classes/Models/Model.tsx";

const ThreeCanvas: React.FC = () => {
  const controls = useRef<OrbitControls>(null);
  const loadManager: loadingManager = new loadingManager();
  const model: Group = loadManager.getModel("/shoe.gltf");


  const soleGroup : Group = new THREE.Group();
  const primaryGroup : Group = new THREE.Group();
  const secondaryGroup : Group = new THREE.Group();
  const fabricIndices :  number[] = [];
  const leatherIndices : number[] = [];


  useEffect(() => {
    const control = controls.current;
    if (control) {
      // control.enablePan = false;
      // control.enableZoom = false;
      // control.enableDamping = false;
    }
  }, []);
  useEffect(() => {
    if (!model || !loadManager) return;

    const tempSoleArray: Mesh[] = [];
    const tempPrimaryArray: Mesh[] = [];
    const tempSecondaryArray: Mesh[] = [];

    model.children.forEach((child) => {
      if (child instanceof Mesh) {
        child.receiveShadow = true;
        child.castShadow = true;
        if (child.material.name.includes("Scene")) {
          tempSoleArray.push(child);
        }
        if (child.material.name.includes("Leather")) {
          tempPrimaryArray.push(child);
        }
        if (child.material.name.includes("Cotton")) {
          tempSecondaryArray.push(child);
        }
      }
    });
    tempSoleArray.forEach((child) => {
      soleGroup.add(child);
    })
    tempPrimaryArray.forEach((child) => {
      primaryGroup.add(child);
    })
    tempSecondaryArray.forEach((child) => {
      secondaryGroup.add(child);
    })
    model.add(soleGroup, primaryGroup, secondaryGroup);
    fabricIndices.forEach(index => {
      const child = model.children[index] as Mesh;
      if (child) {
        child.material = loadManager.getFabricMaterial(new THREE.Color("blue"));
      }
    });
  
    leatherIndices.forEach(index => {
      const child = model.children[index] as Mesh;
      if (child) {
        child.material = loadManager.getLeatherMaterial(new THREE.Color("white"));
      }
    });
  
  }, [model, loadManager]);

  const RenderModel = () => {
    useFrame((state, delta) => {
      if (model) {
        model.rotation.y += 0.5*delta;
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
        color={0xFFFFFF}
        intensity={22}
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
