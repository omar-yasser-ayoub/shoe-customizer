import * as THREE from "three";

const fabricTexture = (
  color: THREE.Color,
  textureLoader: THREE.TextureLoader
) => {
  const colorMap = textureLoader.load(
    "/textures/fabric/Fabric_Burlap_002_COLOR.jpg"
  );
  colorMap.wrapS = THREE.RepeatWrapping;
  colorMap.wrapT = THREE.RepeatWrapping;
  colorMap.colorSpace = THREE.SRGBColorSpace;
  colorMap.repeat.set(0.02, 0.02);
  const AOMap = textureLoader.load(
    "/textures/fabric/Fabric_Burlap_002_OCC.jpg"
  );
  AOMap.wrapS = THREE.RepeatWrapping;
  AOMap.wrapT = THREE.RepeatWrapping;
  const RoughMap = textureLoader.load(
    "/textures/fabric/Fabric_Burlap_002_ROUGH.jpg"
  );
  RoughMap.wrapS = THREE.RepeatWrapping;
  RoughMap.wrapT = THREE.RepeatWrapping;
  const displacementMap = textureLoader.load(
    "/textures/fabric/Fabric_Burlap_002_DISP.png"
  );
  displacementMap.wrapS = THREE.RepeatWrapping;
  displacementMap.wrapT = THREE.RepeatWrapping;
  const normalDXMap = textureLoader.load(
    "/textures/fabric/Fabric_Burlap_002_NORM.jpg"
  );
  normalDXMap.wrapS = THREE.RepeatWrapping;
  normalDXMap.wrapT = THREE.RepeatWrapping;

  const material = new THREE.MeshStandardMaterial({
    color: color,
    map: colorMap,
    aoMap: AOMap,
    displacementMap: displacementMap,
    displacementScale: 0.0001,
    normalMap: normalDXMap,
    roughnessMap: AOMap,
    roughness: 2,
    metalness: 0,
    aoMapIntensity: 1,
  });

  return material;
};

export default fabricTexture;
