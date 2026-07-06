import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

function MagicFlame({
  magicActivated,
  onMagicActivate,
  onFlamePositionChange,
}) {
  const gobletOpeningRef = useRef(null);
  const flameOriginRef = useRef(null);

  const [wandNear, setWandNear] = useState(false);

  // =========================
  // EXACT FLAME POSITION
  // =========================

  useEffect(() => {
    if (!magicActivated) return;

    const reportFlamePosition = () => {
      if (!flameOriginRef.current) return;

      const rect =
        flameOriginRef.current.getBoundingClientRect();

      onFlamePositionChange?.({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      });
    };

    // Wait until the flame has appeared in the DOM
    const firstFrame = requestAnimationFrame(() => {
      reportFlamePosition();
    });

    // Report again after ignition animation settles
    const settleTimer = setTimeout(() => {
      reportFlamePosition();
    }, 900);

    window.addEventListener(
      "resize",
      reportFlamePosition
    );

    return () => {
      cancelAnimationFrame(firstFrame);
      clearTimeout(settleTimer);

      window.removeEventListener(
        "resize",
        reportFlamePosition
      );
    };
  }, [
    magicActivated,
    onFlamePositionChange,
  ]);

  // =========================
  // WAND DETECTION
  // =========================

  useEffect(() => {
    if (magicActivated) {
      setWandNear(false);
      return;
    }

    const checkWandPosition = (x, y) => {
      if (!gobletOpeningRef.current) return;

      const rect =
        gobletOpeningRef.current.getBoundingClientRect();

      const extraHitArea = 18;

      const isInside =
        x >= rect.left - extraHitArea &&
        x <= rect.right + extraHitArea &&
        y >= rect.top - extraHitArea &&
        y <= rect.bottom + extraHitArea;

      setWandNear(isInside);

      if (isInside) {
        onMagicActivate();
      }
    };

    const handleMouseMove = (event) => {
      checkWandPosition(
        event.clientX,
        event.clientY
      );
    };

    const handleTouchMove = (event) => {
      const touch = event.touches[0];

      if (!touch) return;

      checkWandPosition(
        touch.clientX,
        touch.clientY
      );
    };

    window.addEventListener(
      "mousemove",
      handleMouseMove
    );

    window.addEventListener(
      "touchmove",
      handleTouchMove,
      { passive: true }
    );

    return () => {
      window.removeEventListener(
        "mousemove",
        handleMouseMove
      );

      window.removeEventListener(
        "touchmove",
        handleTouchMove
      );
    };
  }, [
    magicActivated,
    onMagicActivate,
  ]);

  // =========================
  // EXPLORE BUTTON
  // =========================

  const handleExplore = () => {
    document
      .getElementById("about")
      ?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
  };

  return (
    <div
      className="
        relative
        w-full
        max-w-[420px]
        h-[430px]
        mx-auto
        flex
        flex-col
        items-center
        justify-center
      "
    >
      {/* BACKGROUND AURA */}

      <AnimatePresence>
        {magicActivated && (
          <>
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.3,
              }}
              animate={{
                opacity: [0.2, 0.5, 0.3],
                scale: [0.7, 1.2, 1],
              }}
              transition={{
                duration: 1.2,
              }}
              className="
                absolute
                top-[35px]
                w-72
                h-72
                rounded-full
                bg-purple-600/30
                blur-[85px]
                pointer-events-none
              "
            />

            <motion.div
              initial={{
                opacity: 0,
                scale: 0.4,
              }}
              animate={{
                opacity: [0.1, 0.35, 0.2],
                scale: [0.6, 1, 0.85],
              }}
              transition={{
                duration: 1.4,
              }}
              className="
                absolute
                top-[70px]
                w-52
                h-52
                rounded-full
                bg-cyan-400/25
                blur-[70px]
                pointer-events-none
              "
            />
          </>
        )}
      </AnimatePresence>

      {/* IGNITION BURST */}

      <AnimatePresence>
        {magicActivated &&
          [...Array(20)].map((_, index) => (
            <motion.span
              key={`burst-${index}`}
              initial={{
                x: 0,
                y: 0,
                opacity: 1,
                scale: 1,
              }}
              animate={{
                x:
                  index % 2 === 0
                    ? 30 + (index % 5) * 12
                    : -30 - (index % 5) * 12,

                y:
                  -70 -
                  (index % 6) * 20,

                opacity: 0,
                scale: 0,
              }}
              transition={{
                duration:
                  0.8 +
                  (index % 4) * 0.15,

                delay:
                  (index % 5) * 0.04,

                ease: "easeOut",
              }}
              className={`
                absolute
                z-40
                top-[175px]
                left-1/2
                w-2
                h-2
                rounded-full
                pointer-events-none

                ${
                  index % 2 === 0
                    ? "bg-purple-300 shadow-[0_0_16px_#c084fc]"
                    : "bg-cyan-200 shadow-[0_0_16px_#67e8f9]"
                }
              `}
            />
          ))}
      </AnimatePresence>

      {/* CONTINUOUS SPARKS */}

      {magicActivated &&
        [...Array(12)].map((_, index) => (
          <motion.span
            key={`spark-${index}`}
            animate={{
              y: [
                0,
                -90 -
                  (index % 4) * 18,
              ],

              x: [
                0,
                index % 2 === 0
                  ? 18
                  : -18,
              ],

              opacity: [0, 1, 0],

              scale: [
                0.3,
                1,
                0.1,
              ],
            }}
            transition={{
              duration:
                1.8 +
                (index % 3) * 0.3,

              delay:
                index * 0.18,

              repeat: Infinity,
              ease: "easeOut",
            }}
            className={`
              absolute
              z-30
              top-[175px]
              left-1/2
              w-1
              h-1
              rounded-full
              pointer-events-none

              ${
                index % 2 === 0
                  ? "bg-purple-300 shadow-[0_0_12px_#c084fc]"
                  : "bg-cyan-200 shadow-[0_0_12px_#67e8f9]"
              }
            `}
          />
        ))}

      {/* COMPLETE GOBLET */}

      <motion.div
        animate={{
          y: [0, -4, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          relative
          z-10
          w-[270px]
          h-[340px]
          flex
          flex-col
          items-center
          justify-end
        "
      >
        {/* EXACT SHARED FLAME ORIGIN */}

        <div
          ref={flameOriginRef}
          className="
            absolute
            z-[60]
            top-[150px]
            left-1/2
            w-1
            h-1
            -translate-x-1/2
            pointer-events-none
          "
        />

        {/* PURPLE + CYAN FIRE */}

        <AnimatePresence>
          {magicActivated && (
            <motion.div
              initial={{
                opacity: 0,
                scaleY: 0,
                scaleX: 0.35,
                y: 100,
              }}
              animate={{
                opacity: 1,
                scaleY: 1,
                scaleX: 1,
                y: 0,
              }}
              transition={{
                duration: 0.85,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="
                absolute
                top-0
                left-1/2
                -translate-x-1/2
                w-[220px]
                h-[205px]
                origin-bottom
                pointer-events-none
              "
            >
              {/* LEFT FLAME */}

              <motion.div
                animate={{
                  scaleX: [1, 0.8, 1.12, 1],
                  scaleY: [1, 1.15, 0.9, 1],
                  rotate: [-8, -16, -3, -8],
                }}
                transition={{
                  duration: 1.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="
                  absolute
                  bottom-0
                  left-[30px]
                  w-[92px]
                  h-[155px]
                  origin-bottom
                  rounded-[70%_30%_65%_35%]
                  bg-gradient-to-t
                  from-purple-300
                  via-purple-500
                  to-violet-800
                  blur-[2px]
                  opacity-85
                  shadow-[0_0_40px_rgba(168,85,247,0.9)]
                "
              />

              {/* RIGHT FLAME */}

              <motion.div
                animate={{
                  scaleX: [1, 1.15, 0.85, 1],
                  scaleY: [1, 0.9, 1.18, 1],
                  rotate: [9, 17, 3, 9],
                }}
                transition={{
                  duration: 1.25,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="
                  absolute
                  bottom-[4px]
                  right-[28px]
                  w-[95px]
                  h-[145px]
                  origin-bottom
                  rounded-[35%_65%_30%_70%]
                  bg-gradient-to-t
                  from-fuchsia-300
                  via-purple-500
                  to-indigo-800
                  blur-[2px]
                  opacity-80
                  shadow-[0_0_40px_rgba(192,132,252,0.85)]
                "
              />

              {/* CENTER FLAME */}

              <motion.div
                animate={{
                  scaleX: [1, 0.78, 1.1, 1],
                  scaleY: [1, 1.18, 0.92, 1],
                  rotate: [0, -7, 7, 0],
                }}
                transition={{
                  duration: 1.05,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="
                  absolute
                  bottom-0
                  left-1/2
                  -translate-x-1/2
                  w-[95px]
                  h-[190px]
                  origin-bottom
                  rounded-[50%_50%_35%_65%]
                  bg-gradient-to-t
                  from-white
                  via-purple-300
                  to-violet-700
                  blur-[1px]
                  shadow-[0_0_50px_rgba(168,85,247,0.95)]
                "
              />

              {/* CYAN CORE */}

              <motion.div
                animate={{
                  scaleX: [0.85, 1.05, 0.9],
                  scaleY: [0.85, 1.12, 0.9],
                  opacity: [0.75, 1, 0.75],
                }}
                transition={{
                  duration: 0.75,
                  repeat: Infinity,
                }}
                className="
                  absolute
                  bottom-[5px]
                  left-1/2
                  -translate-x-1/2
                  w-[58px]
                  h-[105px]
                  rounded-[50%_50%_35%_65%]
                  bg-gradient-to-t
                  from-white
                  via-cyan-200
                  to-transparent
                  blur-[2px]
                  shadow-[0_0_30px_rgba(103,232,249,0.7)]
                "
              />

              {/* WHITE HOT CORE */}

              <motion.div
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.6, 1, 0.6],
                }}
                transition={{
                  duration: 0.7,
                  repeat: Infinity,
                }}
                className="
                  absolute
                  bottom-[18px]
                  left-1/2
                  -translate-x-1/2
                  w-10
                  h-10
                  rounded-full
                  bg-white
                  blur-xl
                  shadow-[0_0_55px_22px_rgba(216,180,254,0.9)]
                "
              />

              {/* OUTER GLOW */}

              <motion.div
                animate={{
                  scale: [0.9, 1.15, 0.95],
                  opacity: [0.2, 0.45, 0.2],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                }}
                className="
                  absolute
                  bottom-[5px]
                  left-1/2
                  -translate-x-1/2
                  w-[180px]
                  h-[150px]
                  rounded-full
                  bg-purple-500/30
                  blur-[45px]
                  -z-10
                "
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* EXPLORE ME */}

        <AnimatePresence>
          {magicActivated && (
            <motion.button
              type="button"
              onClick={handleExplore}
              initial={{
                opacity: 0,
                scale: 0.4,
                y: 35,
                filter: "blur(12px)",
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
                filter: "blur(0px)",
              }}
              exit={{
                opacity: 0,
                scale: 0.5,
              }}
              transition={{
                delay: 6.5,
                duration: 1.2,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{
                scale: 1.1,
                y: -4,
              }}
              whileTap={{
                scale: 0.95,
              }}
              className="
                absolute
                z-50
                top-[105px]
                left-1/2
                -translate-x-1/2
                whitespace-nowrap
                cursor-pointer
                group
              "
            >
              <motion.span
                animate={{
                  scale: [1, 1.06, 1],

                  textShadow: [
                    "0 0 10px rgba(168,85,247,0.6)",
                    "0 0 25px rgba(168,85,247,1)",
                    "0 0 18px rgba(103,232,249,0.8)",
                    "0 0 10px rgba(168,85,247,0.6)",
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="
                  block
                  text-xl
                  sm:text-2xl
                  font-bold
                  text-transparent
                  bg-clip-text
                  bg-gradient-to-r
                  from-purple-200
                  via-white
                  to-cyan-200
                "
              >
                ✨ Explore Me ✨
              </motion.span>
            </motion.button>
          )}
        </AnimatePresence>

        {/* GOBLET */}

        <div
          className="
            relative
            z-30
            flex
            flex-col
            items-center
          "
        >
          {/* OPENING */}

          <motion.div
            ref={gobletOpeningRef}
            animate={
              wandNear && !magicActivated
                ? {
                    boxShadow: [
                      "0 0 0px rgba(168,85,247,0)",
                      "0 0 28px rgba(168,85,247,0.75)",
                      "0 0 12px rgba(103,232,249,0.45)",
                      "0 0 0px rgba(168,85,247,0)",
                    ],
                  }
                : {}
            }
            transition={{
              duration: 0.8,
              repeat:
                wandNear && !magicActivated
                  ? Infinity
                  : 0,
            }}
            className="
              relative
              z-40
              w-[190px]
              h-[38px]
              rounded-[50%]
              bg-gradient-to-b
              from-slate-500
              via-slate-800
              to-black
              border
              border-purple-500/40
            "
          >
            <div
              className="
                absolute
                inset-[5px]
                rounded-[50%]
                bg-black
                border
                border-purple-500/20
                shadow-[inset_0_6px_18px_rgba(0,0,0,1)]
              "
            />

            <AnimatePresence>
              {wandNear &&
                !magicActivated && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      scale: 0,
                    }}
                    animate={{
                      opacity: [0.4, 1, 0.4],
                      scale: [0.5, 1.5, 0.5],
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0,
                    }}
                    transition={{
                      duration: 0.45,
                      repeat: Infinity,
                    }}
                    className="
                      absolute
                      z-50
                      top-1/2
                      left-1/2
                      -translate-x-1/2
                      -translate-y-1/2
                      w-2
                      h-2
                      rounded-full
                      bg-white
                      shadow-[0_0_12px_5px_rgba(192,132,252,1),0_0_24px_10px_rgba(103,232,249,0.7)]
                    "
                  />
                )}
            </AnimatePresence>
          </motion.div>

          {/* BOWL */}

          <motion.div
            animate={
              magicActivated
                ? {
                    boxShadow: [
                      "0 20px 40px rgba(0,0,0,0.7), inset 0 0 20px rgba(168,85,247,0.12)",
                      "0 20px 40px rgba(0,0,0,0.7), inset 0 0 40px rgba(168,85,247,0.28)",
                      "0 20px 40px rgba(0,0,0,0.7), inset 0 0 20px rgba(103,232,249,0.12)",
                    ],
                  }
                : {}
            }
            transition={{
              duration: 2,
              repeat:
                magicActivated
                  ? Infinity
                  : 0,
            }}
            className="
              relative
              -mt-3
              w-[175px]
              h-[128px]
              overflow-hidden
              rounded-b-[48%]
              bg-gradient-to-br
              from-slate-600
              via-slate-900
              to-black
              border-x
              border-b
              border-purple-500/35
              shadow-[0_20px_40px_rgba(0,0,0,0.7)]
            "
          >
            <div
              className="
                absolute
                inset-4
                rounded-full
                border
                border-purple-500/20
              "
            />

            <div
              className="
                absolute
                inset-8
                rounded-full
                border
                border-cyan-400/15
              "
            />

            <motion.div
              animate={
                magicActivated
                  ? {
                      opacity: [0.35, 1, 0.35],
                      scale: [1, 1.12, 1],
                    }
                  : {
                      opacity: 0.18,
                    }
              }
              transition={{
                duration: 1.7,
                repeat:
                  magicActivated
                    ? Infinity
                    : 0,
              }}
              className="
                absolute
                top-1/2
                left-1/2
                -translate-x-1/2
                -translate-y-1/2
                text-purple-300
                text-3xl
                font-serif
              "
            >
              ✦
            </motion.div>
          </motion.div>

          {/* NECK */}

          <div
            className="
              w-[50px]
              h-[50px]
              bg-gradient-to-r
              from-black
              via-slate-600
              to-black
              border-x
              border-purple-500/25
            "
          />

          {/* BASE */}

          <div
            className="
              w-[125px]
              h-[25px]
              rounded-[50%]
              bg-gradient-to-b
              from-slate-500
              via-slate-900
              to-black
              border
              border-purple-500/35
              shadow-[0_10px_25px_rgba(0,0,0,0.7),0_0_18px_rgba(168,85,247,0.12)]
            "
          />
        </div>
      </motion.div>

      {/* BEFORE IGNITION MESSAGE */}

      <AnimatePresence>
        {!magicActivated && (
          <motion.p
            initial={{
              opacity: 0,
              y: 8,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.8,
            }}
            className="
              relative
              z-40
              -mt-2
              text-lg
              sm:text-xl
              font-semibold
              text-white
              text-center
            "
          >
            Light me with your wand 🪄
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

export default MagicFlame;