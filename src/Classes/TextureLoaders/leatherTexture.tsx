import * as THREE from "three";

const leatherTexture = (
  color: THREE.Color,
  textureLoader: THREE.TextureLoader
) => {
  const colorMap = textureLoader.load(
    "/textures/leather/leather_red_03_coll2_2k.webp"
  );
  colorMap.wrapS = THREE.RepeatWrapping;
  colorMap.wrapT = THREE.RepeatWrapping;
  colorMap.colorSpace = THREE.SRGBColorSpace;
  colorMap.repeat.set(0.1, 0.1);
  const armMap = textureLoader.load(
    "/textures/leather/leather_red_03_arm_2k.webp"
  );
  armMap.wrapS = THREE.RepeatWrapping;
  armMap.wrapT = THREE.RepeatWrapping;
  const displacementMap = textureLoader.load(
    "/textures/leather/leather_red_03_disp_2k.webp"
  );
  displacementMap.wrapS = THREE.RepeatWrapping;
  displacementMap.wrapT = THREE.RepeatWrapping;
  const normalDXMap = textureLoader.load(
    "/textures/leather/leather_red_03_nor_gl_2k.webp"
  );
  normalDXMap.wrapS = THREE.RepeatWrapping;
  normalDXMap.wrapT = THREE.RepeatWrapping;

  const material = new THREE.MeshStandardMaterial({
    color: color,
    map: colorMap,
    aoMap: armMap,
    displacementMap: displacementMap,
    displacementScale: 0.0001,
    normalMap: normalDXMap,
    roughnessMap: armMap,
    metalnessMap: armMap,
    roughness: 5,
    metalness: 1,
    aoMapIntensity: 4,
  });

  return material;
};

export default leatherTexture;
