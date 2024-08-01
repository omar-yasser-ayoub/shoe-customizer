import { useFrame } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { Group } from "three";
import { useEffect, useState } from "react";

function Model(url: string) {
  const [model, setModel] = useState<Group>(new Group());

  useEffect(() => {
    const loader = new GLTFLoader();
    loader.load(url, (gltf) => {
      setModel(gltf.scene as Group);
    });
  }, [url]);

  return model;
}

export default Model;
