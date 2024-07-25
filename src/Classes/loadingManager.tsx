import * as THREE from "three";
import leatherTexture from "./TextureLoaders/leatherTexture";
import fabricTexture from "./TextureLoaders/fabricTexture";

class loadingManager {
  textureLoader: THREE.TextureLoader;
  leatherMaterial?: THREE.MeshPhysicalMaterial;
  fabricMaterial?: THREE.MeshPhysicalMaterial;

  constructor() {
    this.textureLoader = new THREE.TextureLoader();
  }

  public getLeatherMaterial(color: THREE.Color): THREE.MeshPhysicalMaterial {
    if (!this.leatherMaterial) {
      this.leatherMaterial = leatherTexture(color, this.textureLoader);
    }
    return this.leatherMaterial;
  }
  public getFabricMaterial(color: THREE.Color): THREE.MeshPhysicalMaterial {
    if (!this.fabricMaterial) {
      this.fabricMaterial = fabricTexture(color, this.textureLoader);
    }
    return this.fabricMaterial;
  }

  //rinse and repeat for all the textures?
}

export default loadingManager;
