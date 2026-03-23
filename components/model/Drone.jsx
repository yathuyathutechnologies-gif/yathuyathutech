"use client";

import React, {
  forwardRef,
  useRef,
  useState,
  useEffect,
  useImperativeHandle,
} from "react";
import { useGLTF } from "@react-three/drei";
import gsap from "gsap";
import { useFrame } from "@react-three/fiber";

const Drone = forwardRef(
  ({ scale = 1, position = [0, 0, 0], ...props }, ref) => {
    const groupRef = useRef();
    const { nodes, materials } = useGLTF("/models/drone.glb");

    const [lastScale, setLastScale] = useState(scale);

    // expose internal group
    useImperativeHandle(ref, () => groupRef.current);

    // scale animation
    useEffect(() => {
      if (groupRef.current && scale !== lastScale) {
        gsap.to(groupRef.current.scale, {
          x: scale,
          y: scale,
          z: scale,
          duration: 1,
          ease: "power2.out",
        });
        setLastScale(scale);
      }
      console.log("scale ",scale);  
    }, [scale, lastScale]);

    //floating motion
    useFrame((state) => {
      if (groupRef.current) {
        groupRef.current.position.y += Math.sin(state.clock.elapsedTime) * 0.002;
      }
    });

    //slow rotation
    useFrame(() => {
      if (groupRef.current) {
        groupRef.current.rotation.y += 0.002;
      }
    });
    return (
      <group
        ref={groupRef}
        {...props}
        dispose={null}
        position={position}
        // position={[-0,-1,0]}
        scale={scale}
      >

        <group rotation={[0, 0, Math.PI / 2]} scale={0.13}>
          <mesh geometry={nodes.Cube012.geometry} material={materials.foil_silver} />
          <mesh geometry={nodes.Cube012_1.geometry} material={materials['carbon fiber']} />
          <mesh geometry={nodes.Cube012_2.geometry} material={materials.aluminum} />
          <group rotation={[0, 0, -Math.PI / 2]} scale={7.721}>
            <mesh geometry={nodes.Cube002.geometry} material={materials['carbon fiber']} />
            <mesh geometry={nodes.Cube002_1.geometry} material={materials.binoculars} />
          </group>
          <group position={[1.965, 0.664, 0.69]} rotation={[-0.864, -0.69, -0.373]} scale={7.721}>
            <mesh geometry={nodes['MHP_JR_AV_ROTOR_STOWED_120717_A1-STOWED_ROTOR_ASSEMBLY,_120056'].geometry} material={materials.gunmetal} />
            <mesh geometry={nodes['MHP_JR_AV_ROTOR_STOWED_120717_A1-STOWED_ROTOR_ASSEMBLY,_120056_1'].geometry} material={materials.gunmetal_dark} />
            <mesh geometry={nodes['MHP_JR_AV_ROTOR_STOWED_120717_A1-STOWED_ROTOR_ASSEMBLY,_120056_2'].geometry} material={materials.aluminum} />
          </group>
          <group position={[1.965, 0.664, -0.686]} rotation={[0.864, 0.69, -0.373]} scale={7.721}>
            <mesh geometry={nodes['MHP_JR_AV_ROTOR_STOWED_120717_A1-STOWED_ROTOR_ASSEMBLY,_120027'].geometry} material={materials.gunmetal} />
            <mesh geometry={nodes['MHP_JR_AV_ROTOR_STOWED_120717_A1-STOWED_ROTOR_ASSEMBLY,_120027_1'].geometry} material={materials.gunmetal_dark} />
            <mesh geometry={nodes['MHP_JR_AV_ROTOR_STOWED_120717_A1-STOWED_ROTOR_ASSEMBLY,_120027_2'].geometry} material={materials.aluminum} />
          </group>
          <group position={[1.868, -0.543, 0.729]} rotation={[-0.276, -1.476, -1.126]} scale={7.721}>
            <mesh geometry={nodes.Cylinder028.geometry} material={materials.gunmetal} />
            <mesh geometry={nodes.Cylinder028_1.geometry} material={materials.gunmetal_dark} />
            <mesh geometry={nodes.Cylinder028_2.geometry} material={materials.aluminum} />
          </group>
          <group position={[1.879, -0.543, -0.724]} rotation={[0.368, 1.468, -1.217]} scale={7.721}>
            <mesh geometry={nodes.Cylinder019.geometry} material={materials.gunmetal} />
            <mesh geometry={nodes.Cylinder019_1.geometry} material={materials.gunmetal_dark} />
            <mesh geometry={nodes.Cylinder019_2.geometry} material={materials.aluminum} />
          </group>
          <group position={[3.272, 0.014, 0.002]} rotation={[0, 0, -Math.PI / 2]} scale={7.721}>
            <mesh geometry={nodes.Cylinder005.geometry} material={materials.aluminum} />
            <mesh geometry={nodes.Cylinder005_1.geometry} material={materials.gunmetal} />
            <mesh geometry={nodes.Cylinder005_2.geometry} material={materials.grey_brushed} />
          </group>
          <group position={[2.508, 0.014, 0.002]} rotation={[0, 0, -1.571]} scale={7.721}>
            <mesh geometry={nodes.Cylinder035.geometry} material={materials.aluminum} />
            <mesh geometry={nodes.Cylinder035_1.geometry} material={materials.gunmetal} />
            <mesh geometry={nodes.Cylinder035_2.geometry} material={materials.grey_brushed} />
          </group>
          <group position={[3.499, 0.014, 0.002]} rotation={[Math.PI / 9, 0, 0]} scale={7.721}>
            <mesh geometry={nodes.Cylinder017.geometry} material={materials.gunmetal} />
            <mesh geometry={nodes.Cylinder017_1.geometry} material={materials['carbon fiber']} />
            <mesh geometry={nodes.Cylinder017_2.geometry} material={materials.aluminum} />
            <mesh geometry={nodes.Cylinder017_3.geometry} material={materials.blades} />
          </group>
          <group position={[2.734, 0.014, 0.002]} rotation={[-0.873, 0, -Math.PI]} scale={7.721}>
            <mesh geometry={nodes.Cylinder014.geometry} material={materials.blades} />
            <mesh geometry={nodes.Cylinder014_1.geometry} material={materials['carbon fiber']} />
            <mesh geometry={nodes.Cylinder014_2.geometry} material={materials.gunmetal} />
            <mesh geometry={nodes.Cylinder014_3.geometry} material={materials.aluminum} />
          </group>
          <group position={[3.673, 0.014, 0.002]} rotation={[-Math.PI, Math.PI / 2, 0]} scale={7.721}>
            <mesh geometry={nodes['10460522-1_2_B1-SOLAR_PANEL_SUBSTRATE_5781_FILLET5003'].geometry} material={materials.gunmetal_dark} />
            <mesh geometry={nodes['10460522-1_2_B1-SOLAR_PANEL_SUBSTRATE_5781_FILLET5003_1'].geometry} material={materials.chopper_sp} />
            <mesh geometry={nodes['10460522-1_2_B1-SOLAR_PANEL_SUBSTRATE_5781_FILLET5003_2'].geometry} material={materials.gold} />
            <mesh geometry={nodes['10460522-1_2_B1-SOLAR_PANEL_SUBSTRATE_5781_FILLET5003_3'].geometry} material={materials.aluminum} />
          </group>
        </group>
      </group>
    );
  }
);

export default Drone;
useGLTF.preload("/models/drone.glb");