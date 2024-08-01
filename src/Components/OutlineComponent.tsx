import React, { useEffect, useRef } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { OutlinePass } from "three/examples/jsm/postprocessing/OutlinePass.js";
import { FXAAShader } from "three/examples/jsm/shaders/FXAAShader.js";
import * as THREE from "three";
import { GammaCorrectionShader } from 'three/examples/jsm/shaders/GammaCorrectionShader.js';

interface OutlineComponentProps {
  selectedMesh: THREE.Object3D | undefined;
}

const OutlineComponent: React.FC<OutlineComponentProps> = ({ selectedMesh }) => {
  const { scene, camera, gl } = useThree();
  const composerRef = useRef<EffectComposer>();

  useEffect(() => {
    const composer = new EffectComposer(gl);
    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);

    const outlinePass = new OutlinePass(new THREE.Vector2(window.innerWidth, window.innerHeight), scene, camera);
    outlinePass.edgeThickness = 2.0;
    outlinePass.edgeStrength = 3;
    outlinePass.visibleEdgeColor.set(0x00ffff);
    outlinePass.hiddenEdgeColor.set(0x00ffff);
    outlinePass.usePatternTexture = true;
    composer.addPass(outlinePass);

    const gammaCorrectionShader = new ShaderPass(GammaCorrectionShader);
    composer.addPass(gammaCorrectionShader);

    

    const textureLoader = new THREE.TextureLoader();
    textureLoader.load("/textures/leather/leather_red_03_coll2_2k.webp", function (texture) {
      if (texture) {
        outlinePass.patternTexture = texture;
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
      }
    });

    composerRef.current = composer;

    return () => composer.dispose();
  }, [scene, camera, gl]);

  useEffect(() => {
    if (composerRef.current) {
      const outlinePass = composerRef.current.passes.find(pass => pass instanceof OutlinePass) as OutlinePass;
      if (outlinePass && selectedMesh) {
        outlinePass.selectedObjects = [selectedMesh];
      }
    }
  }, [selectedMesh]);

  useFrame(() => {
    composerRef.current?.render();
  }, 1);

  return null;
};

export default OutlineComponent;
