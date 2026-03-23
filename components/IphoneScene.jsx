"use client";

import React, { useLayoutEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import {
  Environment,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Iphone from "./model/Iphone";

gsap.registerPlugin(ScrollTrigger);

const IphoneScene = ({ progress }) => {
  const cameraRef = useRef();
  const iphoneRef = useRef();

  const [iphoneScale, setIphoneScale] = useState(1);

  useFrame(() => {
    if (cameraRef.current && iphoneRef.current) {
      cameraRef.current.lookAt(iphoneRef.current.position);
    }
  });


  const interpolate = (positions, progress) => {
    const clamped = Math.min(progress, 0.999);
    const segmentProgress = 1 / (positions.length - 1);

    let index = Math.floor(clamped / segmentProgress);
    index = Math.min(index, positions.length - 2);

    const t = (clamped % segmentProgress) / segmentProgress;

    const [sx, sy, sz] = positions[index];
    const [ex, ey, ez] = positions[index + 1];

    return {
      x: sx + (ex - sx) * t,
      y: sy + (ey - sy) * t,
      z: sz + (ez - sz) * t,
    };
  };

  useLayoutEffect(() => {
    const cameraPositions = [
      [0.2, 6, 8],
      [0, 4, 8],
      [5, 2, 8],
    ];


    const iphonePositions = [
      [0, -2, 0],
      [0, -1, 0],
      [0, -3, 0],
    ];

    const cam = interpolate(cameraPositions, progress);
    const phone = interpolate(iphonePositions, progress);

    if (cameraRef.current) {
      gsap.to(cameraRef.current.position, {
        x: cam.x,
        y: cam.y,
        z: cam.z,
        duration: 0.6,
        ease: "power2.out",
      });
    }

    if (iphoneRef.current) {
      gsap.to(iphoneRef.current.position, {
        x: phone.x,
        y: phone.y,
        z: phone.z,
        duration: 0.6,
        ease: "power2.out",
      });
    }


    const targetScale = 25;
    setIphoneScale((prev) => (prev !== targetScale ? targetScale : prev));

  }, [progress]);

  return (
    <>
      <PerspectiveCamera
        makeDefault
        ref={cameraRef}
        position={[0.2, 6, 8]}
      />

      <OrbitControls enableZoom={false} />

      <ambientLight intensity={1.5} />
      <Environment preset="sunset" />

      <Iphone ref={iphoneRef} scale={iphoneScale} />

      <axesHelper args={[5]} />
    </>
  );
};

export default IphoneScene;