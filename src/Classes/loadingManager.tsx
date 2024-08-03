import * as THREE from "three";
import leatherTexture from "./TextureLoaders/leatherTexture";
import fabricTexture from "./TextureLoaders/fabricTexture";
import Model from "./Models/Model";

class loadingManager {
  textureLoader: THREE.TextureLoader;
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
  public getLeatherMaterial(color: THREE.Color): THREE.MeshStandardMaterial {
    return leatherTexture(color, this.textureLoader);
  }
  public getFabricMaterial(color: THREE.Color): THREE.MeshStandardMaterial {
    return fabricTexture(color, this.textureLoader);
  }

  //rinse and repeat for all the textures?
}

export default loadingManager;
