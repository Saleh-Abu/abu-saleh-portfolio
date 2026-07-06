import * as THREE from "three";
import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Physics,
  RigidBody,
  BallCollider,
} from "@react-three/rapier";

const imageUrls = [
  "/Images/express.webp",
  "/Images/javascript.webp",
  "/Images/mongo.webp",
  "/Images/mysql.webp",
  "/Images/next.webp",
  "/Images/next2.webp",
  "/Images/nextBL.webp",
  "/Images/node.webp",
  "/Images/node2.webp",
  "/Images/react.webp",
  "/Images/react2.webp",
  "/Images/typescript.webp",
];

const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);

function TechBall({ scale, material, spread }) {
  const bodyRef = useRef(null);
  const vector = useMemo(() => new THREE.Vector3(), []);

  const initialPosition = useMemo(
    () => [
      THREE.MathUtils.randFloatSpread(spread),
      THREE.MathUtils.randFloatSpread(spread),
      THREE.MathUtils.randFloatSpread(6),
    ],
    [spread]
  );

  useFrame((_, delta) => {
    if (!bodyRef.current) return;

    delta = Math.min(0.1, delta);

    const position = bodyRef.current.translation();

    vector
      .set(position.x, position.y, position.z)
      .normalize()
      .multiplyScalar(-35 * delta * scale);

    bodyRef.current.applyImpulse(
      {
        x: vector.x,
        y: vector.y,
        z: vector.z,
      },
      true
    );
  });

  return (
    <RigidBody
      ref={bodyRef}
      colliders={false}
      linearDamping={0.75}
      angularDamping={0.2}
      friction={0.2}
      restitution={0.5}
      position={initialPosition}
    >
      <BallCollider args={[scale]} />

      <mesh
        castShadow
        receiveShadow
        scale={scale}
        geometry={sphereGeometry}
        material={material}
      />
    </RigidBody>
  );
}

function Pointer({ pointerSize }) {
  const pointerRef = useRef(null);
  const vector = useMemo(() => new THREE.Vector3(), []);

  useFrame(({ pointer, viewport }) => {
    if (!pointerRef.current) return;

    vector.set(
      (pointer.x * viewport.width) / 2,
      (pointer.y * viewport.height) / 2,
      0
    );

    pointerRef.current.setNextKinematicTranslation({
      x: vector.x,
      y: vector.y,
      z: vector.z,
    });
  });

  return (
    <RigidBody
      ref={pointerRef}
      type="kinematicPosition"
      colliders={false}
      position={[100, 100, 100]}
    >
      <BallCollider args={[pointerSize]} />
    </RigidBody>
  );
}

function Scene({ deviceType }) {
  const materials = useMemo(() => {
    const loader = new THREE.TextureLoader();

    return imageUrls.map((url) => {
      const texture = loader.load(url);

      texture.colorSpace = THREE.SRGBColorSpace;

      return new THREE.MeshPhysicalMaterial({
        map: texture,
        roughness: 0.7,
        metalness: 0.1,
        clearcoat: 0.2,
      });
    });
  }, []);

  const settings = {
    mobile: {
      count: 18,
      minScale: 0.48,
      maxScale: 0.72,
      spread: 10,
      pointerSize: 1.25,
    },

    tablet: {
      count: 24,
      minScale: 0.58,
      maxScale: 0.9,
      spread: 14,
      pointerSize: 1.5,
    },

    desktop: {
      count: 30,
      minScale: 0.7,
      maxScale: 1.1,
      spread: 18,
      pointerSize: 1.8,
    },
  };

  const currentSettings = settings[deviceType];

  const spheres = useMemo(
    () =>
      Array.from(
        { length: currentSettings.count },
        (_, index) => ({
          id: `${deviceType}-${index}`,
          scale: THREE.MathUtils.randFloat(
            currentSettings.minScale,
            currentSettings.maxScale
          ),
        })
      ),
    [deviceType]
  );

  return (
    <>
      <ambientLight intensity={2} />

      <directionalLight
        position={[5, 8, 10]}
        intensity={3}
      />

      <Physics gravity={[0, 0, 0]}>
        <Pointer
          pointerSize={currentSettings.pointerSize}
        />

        {spheres.map((sphere, index) => (
          <TechBall
            key={sphere.id}
            scale={sphere.scale}
            spread={currentSettings.spread}
            material={
              materials[index % materials.length]
            }
          />
        ))}
      </Physics>
    </>
  );
}

function TechStackBalls() {
  const [deviceType, setDeviceType] =
    useState("desktop");

  useEffect(() => {
    const updateDeviceType = () => {
      if (window.innerWidth < 640) {
        setDeviceType("mobile");
      } else if (window.innerWidth < 1024) {
        setDeviceType("tablet");
      } else {
        setDeviceType("desktop");
      }
    };

    updateDeviceType();

    window.addEventListener(
      "resize",
      updateDeviceType
    );

    return () => {
      window.removeEventListener(
        "resize",
        updateDeviceType
      );
    };
  }, []);

  const cameraZ =
    deviceType === "mobile"
      ? 18
      : deviceType === "tablet"
        ? 20
        : 22;

  return (
    <div
      className="
        relative
        w-full
        h-[380px]
        sm:h-[480px]
        lg:h-[600px]
        overflow-hidden
        rounded-3xl
        touch-none
      "
    >
      <Canvas
        key={deviceType}
        shadows
        camera={{
          position: [0, 0, cameraZ],
          fov: 35,
          near: 1,
          far: 100,
        }}
      >
        <Scene deviceType={deviceType} />
      </Canvas>

      <p
        className="
          absolute
          bottom-3
          sm:bottom-5
          left-1/2
          -translate-x-1/2
          w-full
          px-4
          text-center
          text-gray-500
          text-xs
          sm:text-sm
          pointer-events-none
        "
      >
        <span className="hidden sm:inline">
          Move your cursor through the tech stack
        </span>

        <span className="sm:hidden">
          Touch and drag through the tech stack
        </span>
      </p>
    </div>
  );
}

export default TechStackBalls;