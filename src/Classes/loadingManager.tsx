import * as THREE from "three";
import leatherTexture from "./TextureLoaders/leatherTexture";

class loadingManager {
  textureLoader: THREE.TextureLoader;
  leatherMaterial?: THREE.MeshStandardMaterial;

  constructor() {
    this.textureLoader = new THREE.TextureLoader();
  }

  public getLeatherMaterial(color: THREE.Color): THREE.MeshStandardMaterial {
    if (!this.leatherMaterial) {
      this.leatherMaterial = leatherTexture(color, this.textureLoader);
    }
    return this.leatherMaterial;
  }

  //rinse and repeat for all the textures?
}

export default loadingManager;
