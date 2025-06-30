import React, { useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Group, Mesh } from "three";
import * as THREE from "three";
import loadingManager from "../Classes/loadingManager.tsx";
import { Environment } from "@react-three/drei";
import RaycastHandler from "./RaycastHandler.tsx";
import { ColorResult, CirclePicker } from "react-color";
import OutlineComponent from "./OutlineComponent.tsx";
import { Palette, Layers } from "lucide-react";

interface MeshState {
  color: string;
  material: 'leather' | 'fabric';
}

const ThreeCanvas: React.FC = () => {
  const controls = useRef<OrbitControls>(null);
  const loadManager: loadingManager = new loadingManager();
  const model: Group = loadManager.getModel("/shoe.gltf");
  const [selectedMesh, setSelectedMesh] = useState<THREE.Mesh>(new THREE.Mesh());
  const [activeTab, setActiveTab] = useState<'color' | 'material'>('color');
  const [meshStates, setMeshStates] = useState<Map<string, MeshState>>(new Map());
  
  const soleGroup: Group = new THREE.Group();
  const primaryGroup: Group = new THREE.Group();
  const secondaryGroup: Group = new THREE.Group();
  const fabricIndices: Mesh[] = [];
  const leatherIndices: Mesh[] = [];

  const getCurrentMeshState = (): MeshState => {
    const meshId = selectedMesh.uuid;
    return meshStates.get(meshId) || { color: '#ffffff', material: 'leather' };
  };

  const updateMeshState = (updates: Partial<MeshState>) => {
    const meshId = selectedMesh.uuid;
    const currentState = getCurrentMeshState();
    const newState = { ...currentState, ...updates };
    
    setMeshStates(prev => new Map(prev.set(meshId, newState)));
    
    // Apply changes to the mesh
    if (selectedMesh.material instanceof THREE.MeshStandardMaterial) {
      selectedMesh.material.color.set(newState.color);
      
      // Apply material based on type
      if (newState.material === 'leather') {
        selectedMesh.material = loadManager.getLeatherMaterial(new THREE.Color(newState.color));
      } else {
        // For fabric, you might want to use a different material method if available
        selectedMesh.material = loadManager.getFabricMaterial(new THREE.Color(newState.color));
      }
    }
  };

  useEffect(() => {
    const control = controls.current;
    if (control) {
      control.enablePan = false;
      control.enableZoom = false;
      control.enableDamping = false;
    }
  }, []);

  useEffect(() => {
    if (!model || !loadManager) return;

    const tempSoleArray: Mesh[] = [];
    const tempPrimaryArray: Mesh[] = [];
    const tempSecondaryArray: Mesh[] = [];

    model.children.forEach((child) => {
      if (child instanceof Mesh) {
        child.receiveShadow = true;
        child.castShadow = true;
        if (child.material.name.includes("Scene")) {
          tempSoleArray.push(child);
        }
        if (child.material.name.includes("Leather")) {
          tempPrimaryArray.push(child);
        }
        if (child.material.name.includes("Cotton")) {
          tempSecondaryArray.push(child);
        }
      }
    });
    
    tempSoleArray.forEach((child) => {
      soleGroup.add(child);
    });
    tempPrimaryArray.forEach((child) => {
      primaryGroup.add(child);
    });
    tempSecondaryArray.forEach((child) => {
      secondaryGroup.add(child);
    });
    model.add(soleGroup, primaryGroup, secondaryGroup);

    for (let i = 0; i < primaryGroup.children.length; i++) {
      if (primaryGroup.children[i] instanceof Mesh) {
        fabricIndices.push(primaryGroup.children[i] as Mesh);
      }
    }
    for (let i = 0; i < secondaryGroup.children.length; i++) {
      if (secondaryGroup.children[i] instanceof Mesh) {
        leatherIndices.push(secondaryGroup.children[i] as Mesh);
      }
    }
    
    fabricIndices.forEach(mesh => {
      mesh.material = loadManager.getFabricMaterial(new THREE.Color("red"));
    });
    leatherIndices.forEach(mesh => {
      mesh.material = loadManager.getLeatherMaterial(new THREE.Color("white"));
    });
  }, [model, loadManager]);

  const RenderModel = () => {
    useFrame((state, delta) => {
      // if (model) {
      //   model.rotation.y += 0.5*delta;
      // }
    });
    return <primitive object={model} />;
  };

  const handleColorChange = (colorResult: ColorResult) => {
    updateMeshState({ color: colorResult.hex });
  };

  const handleMaterialChange = (material: 'leather' | 'fabric') => {
    updateMeshState({ material });
  };

  const currentState = getCurrentMeshState();

  return (
    <div className="w-full h-full relative bg-gradient-to-br from-slate-50 to-slate-100">
      <Canvas
        className="w-full h-full"
        gl={{
          toneMapping: THREE.ReinhardToneMapping,
          toneMappingExposure: 2.2,
          antialias: true,
          shadowMapEnabled: true,
          shadowMapType: THREE.PCFSoftShadowMap,
        }}
        shadows={true}
      >
        <Environment files={"/textures/env/sky.hdr"} background environmentIntensity={0.2}/>
        <OrbitControls ref={controls} />
        <ambientLight color={0xffffff} intensity={1} />
        <directionalLight
          color={0xFFFFFF}
          intensity={10}
          position={[0, 7, 6]}
          castShadow={true}
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-near={0.5}
          shadow-camera-far={500}
          shadow-camera-left={-50}
          shadow-camera-right={50}
          shadow-camera-top={50}
          shadow-camera-bottom={-50}
        />
        <RaycastHandler setSelectedMesh={setSelectedMesh} />
        <OutlineComponent selectedMesh={selectedMesh} />
        <group position={[0, -3, 0]}>
          <RenderModel />
        </group>
      </Canvas>

      {/* Modern Control Panel */}
      <div className="absolute top-6 left-6 w-80 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
        {/* Header with Tabs */}
        <div className="bg-gradient-to-r from-orange-500 to-red-500 px-6 py-4">
          <div className="flex space-x-1 bg-white/20 rounded-lg p-1">
            <button
              onClick={() => setActiveTab('color')}
              className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-md transition-all duration-200 ${
                activeTab === 'color'
                  ? 'bg-white text-orange-600 shadow-sm'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              <Palette className="w-4 h-4" />
              Color
            </button>
            <button
              onClick={() => setActiveTab('material')}
              className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-md transition-all duration-200 ${
                activeTab === 'material'
                  ? 'bg-white text-orange-600 shadow-sm'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              <Layers className="w-4 h-4" />
              Material
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'color' && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-gray-700 font-medium">Current Color:</span>
                <div 
                  className="w-8 h-8 rounded-lg border-2 border-white shadow-sm"
                  style={{ backgroundColor: currentState.color }}
                />
                <span className="text-gray-600 text-sm font-mono">{currentState.color}</span>
              </div>
              <CirclePicker 
                color={currentState.color} 
                onChangeComplete={handleColorChange}
                colors={['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FECA57', '#FF9FF3', '#54A0FF', '#5F27CD', '#ffffff', '#000000']}
                width="100%"
              />
            </div>
          )}

          {activeTab === 'material' && (
            <div className="space-y-3">
              <div className="text-gray-700 font-medium mb-4">Select Material:</div>
              <button
                onClick={() => handleMaterialChange('leather')}
                className={`w-full p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                  currentState.material === 'leather'
                    ? 'border-orange-500 bg-orange-50'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <div className="font-medium text-gray-800">Leather</div>
                <div className="text-sm text-gray-500 mt-1">Premium leather finish</div>
              </button>
              <button
                onClick={() => handleMaterialChange('fabric')}
                className={`w-full p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                  currentState.material === 'fabric'
                    ? 'border-orange-500 bg-orange-50'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <div className="font-medium text-gray-800">Fabric</div>
                <div className="text-sm text-gray-500 mt-1">Breathable textile material</div>
              </button>
            </div>
          )}
        </div>

        {/* Selected Object Info */}
        {selectedMesh.uuid && (
          <div className="px-6 pb-6 pt-0">
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="text-sm text-gray-600">
                <div className="font-medium text-gray-800 mb-2">Selected Object</div>
                <div>Material: <span className="capitalize font-medium">{currentState.material}</span></div>
                <div>Color: <span className="font-mono">{currentState.color}</span></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ThreeCanvas;