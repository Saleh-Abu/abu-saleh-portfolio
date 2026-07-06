import * as THREE from "three";
import {
  Suspense,
  useEffect,
  useRef,
  useState,
} from "react";

import {
  Canvas,
  useFrame,
} from "@react-three/fiber";

import {
  useAnimations,
  useGLTF,
} from "@react-three/drei";

import {
  typingBoneNames,
  eyebrowBoneNames,
} from "../../data/boneData";

function createFilteredAction(
  animations,
  mixer,
  clipName,
  boneNames
) {
  const clip = THREE.AnimationClip.findByName(
    animations,
    clipName
  );

  if (!clip) {
    console.warn(
      `Animation "${clipName}" not found`
    );

    return null;
  }

  const filteredTracks = clip.tracks.filter(
    (track) =>
      boneNames.some((boneName) =>
        track.name.includes(boneName)
      )
  );

  if (filteredTracks.length === 0) {
    console.warn(
      `No matching bone tracks found for "${clipName}"`
    );

    return null;
  }

  const filteredClip =
    new THREE.AnimationClip(
      `${clipName}_filtered`,
      clip.duration,
      filteredTracks
    );

  return mixer.clipAction(filteredClip);
}

function AvatarModel({
  setReady,
  setHoverTarget,
}) {
  const characterRef = useRef(null);
  const headRef = useRef(null);

  const pointerTarget = useRef({
    x: 0,
    y: 0,
  });

  const originalHeadRotation = useRef({
    x: 0,
    y: 0,
  });

  const { scene, animations } = useGLTF(
    "/models/anime.glb"
  );

  const {
    actions,
    mixer,
  } = useAnimations(
    animations,
    characterRef
  );

  useEffect(() => {
    if (!characterRef.current) return;

    const head =
      characterRef.current.getObjectByName(
        "spine006"
      );

    if (head) {
      headRef.current = head;

      originalHeadRotation.current = {
        x: head.rotation.x,
        y: head.rotation.y,
      };
    } else {
      console.warn(
        'Head bone "spine006" not found'
      );
    }

    setReady(true);
  }, [scene, setReady]);

  useEffect(() => {
    if (!actions || !mixer) return;

    const startedActions = [];

    // Intro animation
    const intro = actions.introAnimation;

    if (intro) {
      intro
        .reset()
        .setLoop(THREE.LoopOnce, 1)
        .fadeIn(0.25)
        .play();

      intro.clampWhenFinished = true;

      startedActions.push(intro);
    }

    // Continuous supporting animations
    [
      "key1",
      "key2",
      "key5",
      "key6",
    ].forEach((clipName) => {
      const action = actions[clipName];

      if (!action) return;

      action
        .reset()
        .setLoop(THREE.LoopRepeat, Infinity)
        .play();

      action.timeScale = 1.2;

      startedActions.push(action);
    });

    // Filtered typing animation
    const typingAction =
      createFilteredAction(
        animations,
        mixer,
        "typing",
        typingBoneNames
      );

    if (typingAction) {
      typingAction
        .reset()
        .setLoop(
          THREE.LoopRepeat,
          Infinity
        )
        .play();

      typingAction.timeScale = 1.2;

      startedActions.push(typingAction);
    }

    // Blink after intro begins
    const blinkTimeout = setTimeout(() => {
      const blink = actions.Blink;

      if (!blink) return;

      blink
        .reset()
        .setLoop(
          THREE.LoopRepeat,
          Infinity
        )
        .fadeIn(0.4)
        .play();

      startedActions.push(blink);
    }, 2500);

    return () => {
      clearTimeout(blinkTimeout);

      startedActions.forEach((action) => {
        action.stop();
      });
    };
  }, [actions, animations, mixer]);

  useEffect(() => {
    const handlePointerMove = (event) => {
      pointerTarget.current.x =
        (event.clientX / window.innerWidth) *
          2 -
        1;

      pointerTarget.current.y =
        -(
          (event.clientY /
            window.innerHeight) *
            2 -
          1
        );
    };

    const handleTouchMove = (event) => {
      const touch = event.touches[0];

      if (!touch) return;

      pointerTarget.current.x =
        (touch.clientX /
          window.innerWidth) *
          2 -
        1;

      pointerTarget.current.y =
        -(
          (touch.clientY /
            window.innerHeight) *
            2 -
          1
        );
    };

    const resetPointer = () => {
      pointerTarget.current = {
        x: 0,
        y: 0,
      };
    };

    window.addEventListener(
      "pointermove",
      handlePointerMove,
      { passive: true }
    );

    window.addEventListener(
      "touchmove",
      handleTouchMove,
      { passive: true }
    );

    window.addEventListener(
      "touchend",
      resetPointer
    );

    return () => {
      window.removeEventListener(
        "pointermove",
        handlePointerMove
      );

      window.removeEventListener(
        "touchmove",
        handleTouchMove
      );

      window.removeEventListener(
        "touchend",
        resetPointer
      );
    };
  }, []);

  useFrame((state) => {
    if (
      !characterRef.current ||
      !headRef.current
    ) {
      return;
    }

    const time =
      state.clock.elapsedTime;

    // Small idle floating movement
    characterRef.current.position.y =
      Math.sin(time * 1.4) * 0.025;

    const maxRotationY =
      Math.PI / 6;

    const targetY =
      originalHeadRotation.current.y +
      pointerTarget.current.x *
        maxRotationY;

    const targetX =
      originalHeadRotation.current.x +
      THREE.MathUtils.clamp(
        -pointerTarget.current.y * 0.3,
        -0.28,
        0.28
      );

    headRef.current.rotation.y =
      THREE.MathUtils.lerp(
        headRef.current.rotation.y,
        targetY,
        0.08
      );

    headRef.current.rotation.x =
      THREE.MathUtils.lerp(
        headRef.current.rotation.x,
        targetX,
        0.08
      );
  });

  useEffect(() => {
    const hoverElement =
      setHoverTarget.current;

    if (!hoverElement || !mixer) return;

    const eyebrowAction =
      createFilteredAction(
        animations,
        mixer,
        "browup",
        eyebrowBoneNames
      );

    if (!eyebrowAction) return;

    eyebrowAction.setLoop(
      THREE.LoopOnce,
      1
    );

    eyebrowAction.clampWhenFinished = true;

    const handleEnter = () => {
      eyebrowAction
        .reset()
        .setEffectiveWeight(4)
        .fadeIn(0.3)
        .play();
    };

    const handleLeave = () => {
      eyebrowAction.fadeOut(0.5);
    };

    hoverElement.addEventListener(
      "mouseenter",
      handleEnter
    );

    hoverElement.addEventListener(
      "mouseleave",
      handleLeave
    );

    return () => {
      hoverElement.removeEventListener(
        "mouseenter",
        handleEnter
      );

      hoverElement.removeEventListener(
        "mouseleave",
        handleLeave
      );

      eyebrowAction.stop();
    };
  }, [
    animations,
    mixer,
    setHoverTarget,
  ]);

  return (
    <primitive
      ref={characterRef}
      object={scene}
    />
  );
}

function InteractiveAvatar() {
  const [ready, setReady] =
    useState(false);

  const hoverTargetRef =
    useRef(null);

  return (
    <div
      className="
        relative
        w-full
        h-[420px]
        sm:h-[500px]
        lg:h-[650px]
      "
    >
      {/* Loading text */}
      {!ready && (
        <div
          className="
            absolute
            inset-0
            z-20
            flex
            items-center
            justify-center
            text-sm
            text-purple-300
            pointer-events-none
          "
        >
          Loading character...
        </div>
      )}

      {/* Character hover area */}
      <div
        ref={hoverTargetRef}
        className="
          absolute
          z-20
          top-[15%]
          left-[25%]
          w-[50%]
          h-[45%]
        "
      />

      <Canvas
        camera={{
          position: [0, 13.1, 24.7],
          fov: 14.5,
          near: 0.1,
          far: 1000,
          zoom: 1.1,
        }}
        gl={{
          alpha: true,
          antialias: true,
        }}
        dpr={[1, 1.5]}
        shadows
      >
        <ambientLight intensity={1.8} />

        <directionalLight
          position={[-0.47, -0.32, -1]}
          intensity={1.5}
          color="#c7a9ff"
        />

        <pointLight
          position={[3, 12, 4]}
          intensity={2}
          color="#c2a4ff"
        />

        <Suspense fallback={null}>
          <AvatarModel
            setReady={setReady}
            setHoverTarget={
              hoverTargetRef
            }
          />
        </Suspense>
      </Canvas>
    </div>
  );
}

useGLTF.preload("/models/anime.glb");

export default InteractiveAvatar;