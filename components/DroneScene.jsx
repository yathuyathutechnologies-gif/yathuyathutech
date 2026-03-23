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
import Drone from "./model/Drone";

gsap.registerPlugin(ScrollTrigger);

const DroneScene = ({ progress }) => {
    const cameraRef = useRef();
    const droneRef = useRef();

    const [droneScale, setDroneScale] = useState(1);

    // Keep camera looking at center
    useFrame(() => {
        if (cameraRef.current) cameraRef.current.lookAt(0, 0, 0);
    });

    useLayoutEffect(() => {
        const updateScene = () => {
            const positions = [
                [-0,-1,0],[-0,-1,0],[-0,-1,0]
            ];

            const clampedProgress = Math.min(progress, 0.999);
            const segmentProgress = 1 / (positions.length - 1);

            let segmentIndex = Math.floor(clampedProgress / segmentProgress);
            segmentIndex = Math.min(segmentIndex, positions.length - 2);

            const percentage =
                (clampedProgress % segmentProgress) / segmentProgress;

            if (positions[segmentIndex] && positions[segmentIndex + 1]) {
                const [startX, startY, startZ] = positions[segmentIndex];
                const [endX, endY, endZ] = positions[segmentIndex + 1];

                const x = startX + (endX - startX) * percentage;
                const y = startY + (endY - startY) * percentage;
                const z = startZ + (endZ - startZ) * percentage;

                // Camera animation
                // gsap.to(cameraRef.current.position, {
                //   x,
                //   y,
                //   z,
                //   duration: 0.5,
                //   ease: "power1.out",
                // });
                
                if (droneRef.current) {
                      gsap.to(droneRef.current.position, {
                        x: x,
                        y: y,
                        z: z,
                        duration: 0.5,
                        ease: "power1.out",
                      });
                }
            }

            // scale logic
            const targetDrone = 3;
            setDroneScale((prev) => (prev !== targetDrone ? targetDrone : prev));
        };

        updateScene();
    }, [progress]);

    return (
        <>
            <PerspectiveCamera
                makeDefault
                ref={cameraRef}
                position={[0.2, 8.12, 0.01]}
            />

            <OrbitControls enableZoom={false} />
            <Environment preset="sunset" />

            <Drone ref={droneRef} scale={droneScale} />

            <axesHelper args={[5]} />
        </>
    );
};

export default DroneScene;