"use-client"
import { OrbitControls, PerspectiveCamera, Environment, Float, Html } from "@react-three/drei";
import { Color, CylinderGeometry, Mesh, MeshBasicMaterial } from "three";
import { Suspense } from "react";
import { Rocks } from "./Rocks";
import { PlanetLevel } from "./PlanetLevel";
import { JetpackCat } from "./JetpackCat";

let lightColor = new Color(1, 0.2, 0.1);
let mesh = new Mesh(
    new CylinderGeometry(0.3, 0.3, 0.2, 20),
    new MeshBasicMaterial({
        color: lightColor,
        transparent: true,
        opacity: 1,
    })
);
mesh.rotation.x = Math.PI * 0.5;
mesh.position.set(1.17, 10.7, -4.1);
mesh.scale.set(1.5, 1, 1);

export default function SceneContainer() {
    return (
        <Suspense fallback={null}>
            {/* <Environment background={"only"} files={"/textures/bg.hdr"} /> */}
            <Environment background={false} files={"/textures/envmap.hdr"} />
            <PerspectiveCamera makeDefault fov={50} position={[-5.75, 15.85, 20.35]} />
            <OrbitControls target={[1, 5, 0]} maxPolarAngle={Math.PI * 0.5} />
            <Float speed={0.5} rotationIntensity={0.6} floatIntensity={0.6}>
                
                
                <Rocks />
                {/* <JetpackCat/> */}
            </Float>
        </Suspense>
    )
}
