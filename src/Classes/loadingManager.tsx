import * as THREE from "three";
import leatherTexture from "./TextureLoaders/leatherTexture";
import fabricTexture from "./TextureLoaders/fabricTexture";
import Model from "./Models/Model";

class loadingManager {
  textureLoader: THREE.TextureLoader;
  leatherMaterial?: THREE.MeshPhysicalMaterial;
  fabricMaterial?: THREE.MeshPhysicalMaterial;
  model?: THREE.Group;
  constructor() {
    this.textureLoader = new THREE.TextureLoader();
  }
  public getModel(url: string): THREE.Group {
    if (!this.model) {
      this.model = Model(url);
    }
    return this.model;
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
