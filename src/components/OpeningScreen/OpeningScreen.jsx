import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

function OpeningScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [exitStarted, setExitStarted] = useState(false);

  // Around 4 seconds to reach 100%
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((current) => {
        const next = current + 2;

        if (next >= 100) {
          clearInterval(interval);
          return 100;
        }

        return next;
      });
    }, 80);

    return () => {
      clearInterval(interval);
    };
  }, []);

  // Final ready moment + gate opening
  useEffect(() => {
    if (progress !== 100) return;

    const gateTimer = setTimeout(() => {
      setExitStarted(true);
    }, 350);

    const completeTimer = setTimeout(() => {
      onComplete?.();
    }, 1450);

    return () => {
      clearTimeout(gateTimer);
      clearTimeout(completeTimer);
    };
  }, [progress, onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        className="
          fixed
          inset-0
          z-[9999]
          overflow-hidden
          text-white
          pointer-events-auto
        "
      >
        {/* LEFT MAGICAL GATE */}
        <motion.div
          initial={{ x: "0%" }}
          animate={{
            x: exitStarted ? "-100%" : "0%",
          }}
          transition={{
            duration: 1,
            ease: [0.76, 0, 0.24, 1],
          }}
          className="
            absolute
            top-0
            left-0
            w-1/2
            h-full
            bg-slate-950
            border-r
            border-purple-500/20
          "
        >
          <div
            className="
              absolute
              inset-0
              bg-gradient-to-r
              from-slate-950
              via-slate-950
              to-purple-950/30
            "
          />

          <motion.div
            animate={{
              opacity: [0.15, 0.4, 0.15],
              scale: [0.9, 1.15, 0.9],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="
              absolute
              right-[-180px]
              top-1/2
              -translate-y-1/2
              w-[360px]
              h-[500px]
              rounded-full
              bg-purple-600/25
              blur-[120px]
            "
          />
        </motion.div>

        {/* RIGHT MAGICAL GATE */}
        <motion.div
          initial={{ x: "0%" }}
          animate={{
            x: exitStarted ? "100%" : "0%",
          }}
          transition={{
            duration: 1,
            ease: [0.76, 0, 0.24, 1],
          }}
          className="
            absolute
            top-0
            right-0
            w-1/2
            h-full
            bg-slate-950
            border-l
            border-cyan-400/10
          "
        >
          <div
            className="
              absolute
              inset-0
              bg-gradient-to-l
              from-slate-950
              via-slate-950
              to-cyan-950/20
            "
          />

          <motion.div
            animate={{
              opacity: [0.1, 0.3, 0.1],
              scale: [0.85, 1.1, 0.85],
            }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="
              absolute
              left-[-180px]
              top-1/2
              -translate-y-1/2
              w-[360px]
              h-[500px]
              rounded-full
              bg-cyan-500/20
              blur-[120px]
            "
          />
        </motion.div>

        {/* MAIN CONTENT */}
        <motion.div
          animate={
            exitStarted
              ? {
                  opacity: 0,
                  scale: 1.12,
                  filter: "blur(12px)",
                }
              : {
                  opacity: 1,
                  scale: 1,
                  filter: "blur(0px)",
                }
          }
          transition={{
            duration: 0.35,
          }}
          className="
            absolute
            inset-0
            z-20
            flex
            items-center
            justify-center
            pointer-events-none
          "
        >
          {/* PURPLE AURA */}
          <motion.div
            animate={{
              scale: [0.7, 1.2, 0.8],
              opacity: [0.15, 0.35, 0.15],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="
              absolute
              w-[420px]
              h-[420px]
              rounded-full
              bg-purple-600/30
              blur-[120px]
            "
          />

          {/* CYAN AURA */}
          <motion.div
            animate={{
              x: [-80, 80, -80],
              y: [40, -40, 40],
              opacity: [0.08, 0.25, 0.08],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="
              absolute
              w-[300px]
              h-[300px]
              rounded-full
              bg-cyan-400/20
              blur-[100px]
            "
          />

          {/* FLOATING PARTICLES */}
          {[...Array(12)].map((_, index) => (
            <motion.span
              key={index}
              initial={{
                opacity: 0,
              }}
              animate={{
                y: [30, -180 - (index % 4) * 30],
                x: [
                  0,
                  index % 2 === 0 ? 30 : -30,
                ],
                opacity: [0, 0.8, 0],
                scale: [0.4, 1, 0.2],
              }}
              transition={{
                duration: 2.5 + (index % 3) * 0.5,
                delay: index * 0.2,
                repeat: Infinity,
                ease: "easeOut",
              }}
              className={`
                absolute
                left-1/2
                top-[65%]
                w-1
                h-1
                rounded-full

                ${
                  index % 2 === 0
                    ? "bg-purple-300 shadow-[0_0_12px_#c084fc]"
                    : "bg-cyan-200 shadow-[0_0_12px_#67e8f9]"
                }
              `}
            />
          ))}

          <div
            className="
              relative
              z-10
              flex
              flex-col
              items-center
              text-center
              px-6
            "
          >
            {/* CODE SYMBOL */}
            <motion.div
              initial={{
                opacity: 0,
                scale: 0,
                rotate: -90,
                filter: "blur(15px)",
              }}
              animate={{
                opacity: 1,
                scale: 1,
                rotate: 0,
                filter: "blur(0px)",
              }}
              transition={{
                duration: 0.9,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="
                relative
                mb-6
                text-4xl
                sm:text-5xl
                font-mono
                font-bold
                text-purple-300
                drop-shadow-[0_0_20px_rgba(192,132,252,1)]
              "
            >
              {"</>"}

              <motion.span
                animate={{
                  scale: [1, 1.8, 1],
                  opacity: [0.4, 0, 0.4],
                }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                }}
                className="
                  absolute
                  inset-0
                  rounded-full
                  border
                  border-purple-400/50
                "
              />
            </motion.div>

            {/* NAME */}
            <motion.h1
              initial={{
                opacity: 0,
                y: 30,
                letterSpacing: "0.1em",
                filter: "blur(12px)",
              }}
              animate={{
                opacity: 1,
                y: 0,
                letterSpacing: "0.18em",
                filter: "blur(0px)",
              }}
              transition={{
                delay: 0.45,
                duration: 0.9,
                ease: "easeOut",
              }}
              className="
                text-4xl
                sm:text-5xl
                lg:text-6xl
                font-bold
                uppercase
                text-transparent
                bg-clip-text
                bg-gradient-to-r
                from-purple-300
                via-white
                to-cyan-300
              "
            >
              Abu Saleh
            </motion.h1>

            {/* TAGLINE */}
            <motion.p
              initial={{
                opacity: 0,
                y: 15,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.9,
                duration: 0.7,
              }}
              className="
                mt-4
                text-sm
                sm:text-base
                tracking-[0.25em]
                uppercase
                text-gray-400
              "
            >
              Crafting Digital Experiences
            </motion.p>

            {/* LOADING AREA */}
            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 1.1,
                duration: 0.6,
              }}
              className="
                w-full
                max-w-sm
                mt-10
              "
            >
              <div
                className="
                  flex
                  items-center
                  justify-between
                  mb-3
                  text-xs
                  sm:text-sm
                  font-mono
                "
              >
                <motion.span
                  animate={{
                    opacity: [0.4, 1, 0.4],
                  }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                  }}
                  className="text-purple-300"
                >
                  {progress < 100
                    ? "Initializing Portfolio..."
                    : "Portfolio Ready ✦"}
                </motion.span>

                <span
                  className="
                    text-cyan-300
                    tabular-nums
                  "
                >
                  {progress}%
                </span>
              </div>

              {/* LOADING BAR */}
              <div
                className="
                  relative
                  h-[3px]
                  w-full
                  rounded-full
                  bg-slate-800
                "
              >
                <motion.div
                  animate={{
                    width: `${progress}%`,
                  }}
                  transition={{
                    duration: 0.08,
                    ease: "linear",
                  }}
                  className="
                    relative
                    h-full
                    rounded-full
                    bg-gradient-to-r
                    from-purple-600
                    via-purple-400
                    to-cyan-300
                    shadow-[0_0_15px_rgba(168,85,247,0.9)]
                  "
                >
                  <motion.div
                    animate={{
                      scale: [1, 1.7, 1],
                      opacity: [0.7, 1, 0.7],
                    }}
                    transition={{
                      duration: 0.6,
                      repeat: Infinity,
                    }}
                    className="
                      absolute
                      right-0
                      top-1/2
                      -translate-y-1/2
                      w-2
                      h-2
                      rounded-full
                      bg-white
                      shadow-[0_0_8px_white,0_0_18px_#a855f7,0_0_28px_#67e8f9]
                    "
                  />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* CENTER ENERGY LINE */}
        <motion.div
          initial={{
            opacity: 0.15,
            scaleY: 0,
          }}
          animate={
            progress === 100
              ? {
                  opacity: exitStarted
                    ? [1, 1, 0]
                    : 1,
                  scaleY: 1,
                  width: exitStarted
                    ? ["2px", "18px", "2px"]
                    : "2px",
                }
              : {
                  opacity: 0.15,
                  scaleY: 0,
                }
          }
          transition={{
            duration: exitStarted ? 0.7 : 0.3,
          }}
          className="
            absolute
            z-40
            top-0
            left-1/2
            -translate-x-1/2
            h-full
            bg-white
            shadow-[0_0_10px_white,0_0_25px_#a855f7,0_0_50px_#67e8f9]
            pointer-events-none
          "
        />

        {/* FINAL ENERGY FLASH */}
        <AnimatePresence>
          {exitStarted && (
            <motion.div
              initial={{
                opacity: 0,
                scale: 0,
              }}
              animate={{
                opacity: [0, 0.9, 0],
                scale: [0, 1.5, 3],
              }}
              transition={{
                duration: 0.75,
                ease: "easeOut",
              }}
              className="
                absolute
                z-50
                top-1/2
                left-1/2
                -translate-x-1/2
                -translate-y-1/2
                w-40
                h-40
                rounded-full
                bg-white
                blur-[50px]
                shadow-[0_0_80px_30px_rgba(168,85,247,0.9)]
                pointer-events-none
              "
            />
          )}
        </AnimatePresence>

        {/* BOTTOM MESSAGE */}
        <motion.p
          animate={{
            opacity: exitStarted ? 0 : 0.4,
          }}
          className="
            absolute
            z-30
            bottom-8
            left-1/2
            -translate-x-1/2
            text-xs
            font-mono
            tracking-widest
            text-gray-500
            whitespace-nowrap
          "
        >
          &lt; welcome to my world /&gt;
        </motion.p>
      </motion.div>
    </AnimatePresence>
  );
}

export default OpeningScreen;