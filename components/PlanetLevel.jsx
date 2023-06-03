import { useLoader } from '@react-three/fiber';
import { useEffect } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three'


export function PlanetLevel() {
  const gltf = useLoader(GLTFLoader,"/models/purple_planet.glb");
  const clock = new THREE.Clock();
  let mixer = null;
  let req = null;
  useEffect(() =>{
    gltf.scene.scale.set(5,5,5)
    gltf.scene.position.y = 10
    mixer = new THREE.AnimationMixer(gltf.scene);
    mixer.clipAction(gltf.animations[0]).play();
    const animate = () => {
        req = requestAnimationFrame(animate)
        const delta = clock.getDelta();
        mixer.update(delta);
    }
    animate();
  },[])
  

  return (
    <primitive object={gltf.scene} />
  )
}