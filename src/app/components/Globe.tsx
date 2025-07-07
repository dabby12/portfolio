"use client";

import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { useRef, Suspense } from "react";
import { Group, TextureLoader } from "three";

// to do list
/*
make globe darker
make grid lines darker \

*/
export default function Globe() {
  return (
    <div className="absolute w-[300px] h-[300px] md:w-[400px] md:h-[400px] bottom-10 right-10 z-0">
      <Canvas camera={{ position: [2, 0, 3], fov: 40 }}>
        <ambientLight intensity={0.8} />
        <Stars radius={100} depth={50} count={5000} factor={4} />
        <Suspense fallback={null}>
          <RotatingGlobeGroup />
        </Suspense>
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  );
}

function RotatingGlobeGroup() {
  const groupRef = useRef<Group>(null);
  const alphaMap = useLoader(TextureLoader, "/earth-outline.png");

  // Spin the globe (30° per second, framerate independent)
  useFrame((_, delta) => {
    if (groupRef.current) {
      const degreesPerSecond = 30;
      const radians = degreesPerSecond * (Math.PI / 180);
      groupRef.current.rotation.y += radians * delta;
    }
  });

  // Singapore coordinates (approx)
  const radius = 1.001;
  const lat = 1.35;
  const lon = 103.8;
  const latRad = (lat * Math.PI) / 180;
  const lonRad = (lon * Math.PI) / 180;
  const x = radius * Math.cos(latRad) * Math.cos(lonRad);
  const y = radius * Math.sin(latRad);
  const z = radius * Math.cos(latRad) * Math.sin(lonRad);

  return (
    <group ref={groupRef}>
      {/* Wireframe globe */}
      <mesh>
        <sphereGeometry args={[1, 64, 64]} />
        <meshBasicMaterial color="#7F00FF" wireframe />
      </mesh>

      {/* Continent outline */}
      <mesh>
        <sphereGeometry args={[1.001, 64, 64]} />
        <meshBasicMaterial
          alphaMap={alphaMap}
          transparent
          opacity={0.6}
          color="blue"
          depthWrite={false}
        />
      </mesh>

      {/* Red dot for Singapore */}
      <mesh position={[x, y, z]}>
        <sphereGeometry args={[0.01, 16, 16]} />
        <meshBasicMaterial color="red" 
        />
      </mesh>
    </group>
  );
}
