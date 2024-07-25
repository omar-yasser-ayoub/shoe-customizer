import React, { useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Model from './Model';
import {Group, Mesh} from 'three';
import leatherTexture from './leatherTexture';
import * as THREE from 'three';

const ThreeCanvas: React.FC = () => {
  const model: Group = Model('/shoe.gltf');
  const controls = useRef<OrbitControls>(null);

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
        const child = model.children[5] as Mesh;
        if (child) {
            child.material = leatherTexture(new THREE.Color(0xFF0000));
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
      <OrbitControls ref={controls}/>
      <ambientLight color={0xFFFFFF} intensity={4}/>
      <pointLight position={[2, 2, 2]} intensity={4}/>
      <group position={[0, -3, 0]}>
        <RenderModel />
      </group>
    </Canvas>
  );
};

export default ThreeCanvas;