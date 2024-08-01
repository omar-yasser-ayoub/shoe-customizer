import * as THREE from "three";

const fabricTexture = (
  color: THREE.Color,
  textureLoader: THREE.TextureLoader
) => {
  const colorMap = textureLoader.load(
    "/textures/fabric/fabric_col1.webp"
  );
  colorMap.wrapS = THREE.RepeatWrapping;
  colorMap.wrapT = THREE.RepeatWrapping;
  colorMap.colorSpace = THREE.SRGBColorSpace;
  colorMap.repeat.set(0.0075, 0.0075);
  const armMap = textureLoader.load(
    "/textures/fabric/fabric_arm.webp"
  );
  armMap.wrapS = THREE.RepeatWrapping;
  armMap.wrapT = THREE.RepeatWrapping;
  const displacementMap = textureLoader.load(
    "/textures/fabric/fabric_disp.webp"
  );
  displacementMap.wrapS = THREE.RepeatWrapping;
  displacementMap.wrapT = THREE.RepeatWrapping;
  const normalDXMap = textureLoader.load(
    "/textures/fabric/fabric_nor.webp"
  );
  normalDXMap.wrapS = THREE.RepeatWrapping;
  normalDXMap.wrapT = THREE.RepeatWrapping;

  const material = new THREE.MeshPhysicalMaterial({
    color: color,
    map: colorMap,
    aoMap: armMap,
    displacementMap: displacementMap,
    displacementScale: 0.0003,
    normalMap: normalDXMap,
    roughnessMap: armMap,
    metalnessMap: armMap,
    roughness: 2,
    metalness: 1,
    aoMapIntensity: 1,
  });

  return material;
};

export default fabricTexture;
