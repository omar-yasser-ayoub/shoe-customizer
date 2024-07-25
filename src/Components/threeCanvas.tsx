import React from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Model from './Model';
import {Group} from 'three';

const ThreeCanvas: React.FC = () => {
  const model: Group = Model('/shoe.gltf');

  const RenderModel = () => {
    useFrame((state, delta) => {
      if (model) {
        model.rotation.y += 0.5*delta;
      }
    });
    return <primitive object={model} />;
  };

  return (
    <Canvas className="w-full h-full bg-black">
      <OrbitControls />
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <group position={[0, -3, 0]}>
        <RenderModel />
      </group>
    </Canvas>
  );
};

export default ThreeCanvas;