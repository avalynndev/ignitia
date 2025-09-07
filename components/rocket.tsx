"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { RoundedBox, Text, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { useRef, useState } from "react";

function Rocket() {
  const rocketRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF("/rocket.glb");

  const [particles, setParticles] = useState<
    { position: THREE.Vector3; life: number }[]
  >([]);

  useFrame(({ clock }) => {
    if (!rocketRef.current) return;

    const t = clock.getElapsedTime();
    rocketRef.current.position.set(5 - t * 0.8, -3 + t * 1, 0);

    if (Math.random() < 0.4) {
      const exhaust = new THREE.Vector3(0, -25, 0);
      rocketRef.current.localToWorld(exhaust);
      setParticles((prev) => [...prev, { position: exhaust, life: 1 }]);
    }

    setParticles((prev) =>
      prev
        .map((p) => ({
          ...p,
          life: p.life - 0.01,
          position: p.position.add(
            new THREE.Vector3(
              (Math.random() - 0.5) * 0.02,
              (Math.random() - 0.5) * 0.02,
              0,
            ),
          ),
        }))
        .filter((p) => p.life > 0),
    );
  });

  return (
    <>
      <primitive
        ref={rocketRef}
        object={scene}
        scale={0.04}
        position={[6, -3, 0]}
        rotation={[0, 0, Math.PI / 6]}
      >
        <RoundedBox
          args={[8, 3, 0.2]}
          radius={0.5}
          smoothness={4}
          position={[-1, 10, -0.1]}
        >
          <meshStandardMaterial color="#1e1e1e" transparent opacity={0.8} />
        </RoundedBox>

        <Text
          position={[-1, 10, 0]}
          fontSize={2}
          anchorX="center"
          anchorY="middle"
          color="white"
        >
          Your 💡
        </Text>
      </primitive>

      {particles.map((p, i) => (
        <mesh key={i} position={p.position}>
          <sphereGeometry args={[0.2 * p.life, 16, 16]} />
          <meshStandardMaterial color="white" transparent opacity={p.life} />
        </mesh>
      ))}
    </>
  );
}

export default function RocketLaunch() {
  return (
    <div
      className="absolute inset-0"
      style={{
        pointerEvents: "none",
        zIndex: -1,
      }}
    >
      <Canvas camera={{ position: [0, 0, 12], fov: 50 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 10, 5]} intensity={1.5} />
        <Rocket />
      </Canvas>
    </div>
  );
}
