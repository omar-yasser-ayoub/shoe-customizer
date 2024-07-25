import React from 'react';
import { Canvas} from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Model from './Model';
import { Mesh, MeshPhysicalMaterial } from 'three';


const ThreeCanvas: React.FC = () => {
    const model: Mesh[] = Model('/shoe.gltf');
    
    const renderModel = () => {
        return model.map((mesh, index) => {
            mesh.material = new MeshPhysicalMaterial({
                color: 'white',
                roughness: 0.5,
                clearcoat: 1,
                clearcoatRoughness: 0.25,
                reflectivity: 1,
                transmission: 0.5,
                ior: 1.5,
                side: 2,
                metalness: 0.5
            });
            return <primitive object={mesh} key={index} />
        });
    }
    return(
        <Canvas className="w-full h-full bg-black" >
            <OrbitControls />
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            <group position={[0,-1,0]}>
                {renderModel()}
            </group>
        </Canvas>
    )
}
export default ThreeCanvas;