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

const Iphone = forwardRef(
  ({ scale = 1, position = [0, 0, 0], ...props }, ref) => {
    const groupRef = useRef();
    const { nodes, materials } = useGLTF("/models/phone.glb");

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
      console.log("scale ", scale);
    }, [scale, lastScale]);

    //floating motion
    // useFrame((state) => {
    //   if (groupRef.current) {
    //     groupRef.current.position.y += Math.sin(state.clock.elapsedTime) * 0.002;
    //   }
    // });

    // //slow rotation
    // useFrame(() => {
    //   if (groupRef.current) {
    //     groupRef.current.rotation.y += 0.002;
    //   }
    // });
    return (
      <group
        ref={groupRef}
        {...props}
        dispose={null}
        //position={position}
        position={[-0,-1,0]}
        scale={scale}
      >
        <group position={[0, 0.078, 0]} rotation={[0, 0, -Math.PI / 2]}>
          <mesh geometry={nodes.Cube005.geometry} material={materials['Screen,glass']} />
          <mesh geometry={nodes.Cube005_1.geometry} material={materials.Body} />
          <mesh geometry={nodes.Cube005_2.geometry} material={materials.glass} />
          <mesh geometry={nodes.Cube005_3.geometry} material={materials['Metall.paint']} />
          <mesh geometry={nodes.back.geometry} material={materials['Material.007']} position={[-0.052, -0.005, 0]} rotation={[0, -Math.PI / 2, 0]} scale={-1} />
          <group position={[-0.067, 0.003, -0.027]} rotation={[-Math.PI, 0, Math.PI / 2]}>
            <mesh geometry={nodes.Cube004.geometry} material={materials.lense} />
            <mesh geometry={nodes.Cube004_1.geometry} material={materials.Black_rought} />
            <mesh geometry={nodes.Cube004_2.geometry} material={materials['Material.006']} />
          </group>
          <group position={[-0.051, -0.003, -0.017]} rotation={[-Math.PI, 0, Math.PI / 2]}>
            <mesh geometry={nodes.Cube006.geometry} material={materials.lense} />
            <mesh geometry={nodes.Cube006_1.geometry} material={materials.Black_rought} />
            <mesh geometry={nodes.Cube006_2.geometry} material={materials['Material.006']} />
          </group>
          <group position={[-0.051, -0.003, -0.006]} rotation={[-Math.PI, 0, Math.PI / 2]}>
            <mesh geometry={nodes.Cube007.geometry} material={materials.lense2} />
            <mesh geometry={nodes.Cube007_1.geometry} material={materials.Black_rought} />
            <mesh geometry={nodes.Cube007_2.geometry} material={materials['Material.006']} />
          </group>
          <group position={[-0.051, -0.003, 0.005]} rotation={[-Math.PI, 0, Math.PI / 2]}>
            <mesh geometry={nodes.Cube008.geometry} material={materials.lense} />
            <mesh geometry={nodes.Cube008_1.geometry} material={materials.Black_rought} />
            <mesh geometry={nodes.Cube008_2.geometry} material={materials['Material.006']} />
          </group>
          <group position={[-0.052, -0.004, 0.013]} rotation={[Math.PI, Math.PI / 2, 0]}>
            <mesh geometry={nodes.Circle001.geometry} material={materials['Diod.glass']} />
            <mesh geometry={nodes.Circle001_1.geometry} material={materials.Diod} />
          </group>
          <group rotation={[-Math.PI, 0, Math.PI / 2]}>
            <mesh geometry={nodes.Plane.geometry} material={materials.frame} />
            <mesh geometry={nodes.Plane_1.geometry} material={materials['Material.004']} />
            <mesh geometry={nodes.Plane_2.geometry} material={materials['Material.003']} />
            <mesh geometry={nodes.Plane_3.geometry} material={materials.steel} />
            <mesh geometry={nodes.Plane_4.geometry} material={materials['Metall.paint']} />
          </group>
          <mesh geometry={nodes.Framecam.geometry} material={materials.Body} position={[-0.052, -0.005, 0]} rotation={[0, -Math.PI / 2, 0]} scale={-1} />
          <mesh geometry={nodes.framein.geometry} material={materials['frame.in']} position={[0, -0.014, 0]} />
          <mesh geometry={nodes.glass.geometry} material={materials.glass} position={[-0.052, -0.004, 0]} rotation={[0, -Math.PI / 2, 0]} scale={-1} />
          <mesh geometry={nodes.glassunder.geometry} material={materials['Black.glass']} position={[-0.052, -0.004, 0]} rotation={[0, -Math.PI / 2, 0]} scale={-1} />
          <mesh geometry={nodes.screenin.geometry} material={materials['Screen.in']} />
          <group position={[-0.052, -0.004, 0.017]} rotation={[-Math.PI, Math.PI / 2, 0]}>
            <mesh geometry={nodes.Plane003.geometry} material={materials['Material.007']} />
            <mesh geometry={nodes.Plane003_1.geometry} material={materials['Material.001']} />
            <mesh geometry={nodes.Plane003_2.geometry} material={materials['Material.005']} />
            <mesh geometry={nodes.Plane003_3.geometry} material={materials['Material.008']} />
            <mesh geometry={nodes.Plane003_4.geometry} material={materials['Material.009']} />
          </group>
          <mesh geometry={nodes.speaker.geometry} material={materials['Metall.paint']} position={[-0.074, -0.003, 0]} rotation={[-Math.PI, 0, Math.PI / 2]} />
        </group>

      </group>
    );
  }
);

export default Iphone;
useGLTF.preload("/models/phone.glb");
