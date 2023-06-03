import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three'
import { useEffect } from 'react';


export function Rocks() {
  const gltf = useLoader(GLTFLoader,"/models/rocks.glb");
  useEffect(() =>{
    
  },[])
  return (
    <primitive object={gltf.scene} />
  )
}