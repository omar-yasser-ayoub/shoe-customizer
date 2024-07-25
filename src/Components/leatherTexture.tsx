import * as THREE from 'three';

const leatherTexture = (color: THREE.Color) => {
  const textureLoader = new THREE.TextureLoader();

  const colorMap = textureLoader.load('/textures/leather/leather_red_02_coll1_1k.jpg');
  colorMap.wrapS = THREE.RepeatWrapping;
  colorMap.wrapT = THREE.RepeatWrapping;
  colorMap.colorSpace = THREE.SRGBColorSpace;
  colorMap.repeat.set(0.1, 0.1);
  const armMap = textureLoader.load('/textures/leather/leather_red_02_arm_1k.jpg');
  armMap.wrapS = THREE.RepeatWrapping;
  armMap.wrapT = THREE.RepeatWrapping
  const displacementMap = textureLoader.load('/textures/leather/leather_red_02_disp_1k.jpg');
    displacementMap.wrapS = THREE.RepeatWrapping;
    displacementMap.wrapT = THREE.RepeatWrapping;
  const normalDXMap = textureLoader.load('/textures/leather/leather_red_02_nor_dx_1k.jpg');
    normalDXMap.wrapS = THREE.RepeatWrapping;
    normalDXMap.wrapT = THREE.RepeatWrapping;

  const material = new THREE.MeshStandardMaterial({ 
    color: color,
    map: colorMap,
    aoMap: armMap,
    displacementMap: displacementMap,
    displacementScale: 0.001,
    normalMap: normalDXMap, 
    roughnessMap: armMap,
    metalnessMap: armMap,
  });

  return material;
};

export default leatherTexture;