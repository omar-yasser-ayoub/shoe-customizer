import React, { useRef, useEffect } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { Group, Raycaster, Vector2, Object3D, Mesh } from 'three';
import { OrbitControls } from '@react-three/drei';

interface RaycastHandlerProps {
    setSelectedMesh: (mesh: Mesh) => void;
  }

const RaycastHandler: React.FC<RaycastHandlerProps> = ({ setSelectedMesh }) => {
  const { camera, scene } = useThree();
  const raycaster = useRef<Raycaster>(new Raycaster()).current;
  const mouse = useRef<Vector2>(new Vector2()).current;

  const handleMouseMove = (event: MouseEvent) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children, true);

    if (intersects.length > 0 && intersects[0].object instanceof Mesh) {
      setSelectedMesh(intersects[0].object);
    }
  };

  useEffect(() => {
    window.addEventListener('click', handleMouseMove);
    return () => {
      window.removeEventListener('click', handleMouseMove);
    };
  }, [camera, scene]);

  return null;
};
export default RaycastHandler;