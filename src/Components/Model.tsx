import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { Mesh } from 'three';
import { useEffect, useState } from 'react';


function Model(url: string) {
    const [model, setModel] = useState<Mesh[]>([]);

    useEffect(() => {
        const loader = new GLTFLoader();
        loader.load(url, (gltf) => {
            setModel(gltf.scene.children as Mesh[]);
        });
    }, [url]);

    return model;
}

export default Model;