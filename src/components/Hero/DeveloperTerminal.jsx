import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
} from "framer-motion";

import {
  FaReact,
  FaLaravel,
  FaNodeJs,
  FaGithub,
} from "react-icons/fa";

import {
  SiMongodb,
  SiJavascript,
} from "react-icons/si";

const terminalLines = [
  {
    command: "whoami",
    output: "Abu Saleh",
  },
  {
    command: "role",
    output: "Full Stack Developer",
  },
  {
    command: "skills --top",
    output: "React • Laravel • Node.js • AI",
  },
];

function DeveloperTerminal() {
  const terminalRef = useRef(null);

  const [activeLine, setActiveLine] =
    useState(0);

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const smoothRotateX = useSpring(
    rotateX,
    {
      stiffness: 120,
      damping: 20,
    }
  );

  const smoothRotateY = useSpring(
    rotateY,
    {
      stiffness: 120,
      damping: 20,
    }
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveLine((current) =>
        current >= terminalLines.length - 1
          ? 0
          : current + 1
      );
    }, 2200);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const handleMouseMove = (event) => {
    if (!terminalRef.current) return;

    const rect =
      terminalRef.current.getBoundingClientRect();

    const x =
      event.clientX - rect.left;

    const y =
      event.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    rotateY.set(
      ((x - centerX) / centerX) * 4
    );

    rotateX.set(
      -((y - centerY) / centerY) * 4
    );
  };

  const resetTilt = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <div
      className="
        relative
        w-full
        max-w-[460px]
        h-[410px]
        mx-auto
        flex
        items-center
        justify-center
      "
    >
      {/* Background Glow */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.25, 0.45, 0.25],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="
          absolute
          w-64
          h-64
          bg-purple-600/20
          blur-[90px]
          rounded-full
          pointer-events-none
        "
      />

      {/* Floating Icons */}
      <FloatingIcon
        className="top-[3%] left-[5%]"
        delay={0}
      >
        <FaReact />
      </FloatingIcon>

      <FloatingIcon
        className="top-[4%] right-[5%]"
        delay={0.5}
      >
        <FaLaravel />
      </FloatingIcon>

      <FloatingIcon
        className="bottom-[3%] left-[4%]"
        delay={1}
      >
        <FaNodeJs />
      </FloatingIcon>

      <FloatingIcon
        className="bottom-[2%] right-[5%]"
        delay={1.5}
      >
        <SiMongodb />
      </FloatingIcon>

      <FloatingIcon
        className="top-[45%] left-[-1%]"
        delay={0.8}
      >
        <SiJavascript />
      </FloatingIcon>

      <FloatingIcon
        className="top-[43%] right-[-1%]"
        delay={1.2}
      >
        <FaGithub />
      </FloatingIcon>

      {/* Terminal Card */}
      <motion.div
        ref={terminalRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={resetTilt}
        style={{
          rotateX: smoothRotateX,
          rotateY: smoothRotateY,
          transformPerspective: 1000,
        }}
        initial={{
          opacity: 0,
          y: 30,
          scale: 0.95,
        }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        transition={{
          duration: 0.8,
          delay: 0.2,
        }}
        className="
          relative
          z-10
          w-[88%]
          max-w-[390px]
          overflow-hidden
          rounded-2xl
          border
          border-purple-500/30
          bg-slate-950/85
          backdrop-blur-xl
          shadow-[0_0_35px_rgba(168,85,247,0.12)]
        "
      >
        {/* Moving Energy Line */}
        <motion.div
          animate={{
            x: ['-100%', '250%'],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="
            absolute
            top-0
            left-0
            w-1/3
            h-px
            bg-gradient-to-r
            from-transparent
            via-purple-300
            to-transparent
            shadow-[0_0_14px_#a855f7]
          "
        />

        {/* Header */}
        <div
          className="
            flex
            items-center
            justify-between
            px-4
            py-3
            border-b
            border-slate-800
            bg-slate-900/70
          "
        >
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
          </div>

          <p className="text-[11px] text-gray-500">
            abu@portfolio:~
          </p>
        </div>

        {/* Terminal Body */}
        <div
          className="
            min-h-[250px]
            p-5
            font-mono
            text-xs
            sm:text-sm
          "
        >
          <p className="text-gray-500 mb-4">
            Welcome to my developer space.
          </p>

          {terminalLines.map(
            (line, index) => (
              <motion.div
                key={line.command}
                initial={{
                  opacity: 0,
                  x: -10,
                }}
                animate={{
                  opacity:
                    index <= activeLine
                      ? 1
                      : 0.15,
                  x: 0,
                }}
                transition={{
                  duration: 0.35,
                }}
                className="mb-4"
              >
                <p className="text-gray-300">
                  <span className="text-purple-400">
                    abu@portfolio
                  </span>

                  <span className="text-gray-500">
                    :~$
                  </span>{" "}

                  {line.command}
                </p>

                <p
                  className="
                    mt-1.5
                    pl-3
                    text-cyan-300
                  "
                >
                  {line.output}
                </p>
              </motion.div>
            )
          )}

          {/* Live Prompt */}
          <div className="flex items-center gap-1.5 text-gray-300">
            <span className="text-purple-400">
              abu@portfolio
            </span>

            <span className="text-gray-500">
              :~$
            </span>

            <motion.span
              animate={{
                opacity: [1, 0, 1],
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
              }}
              className="
                inline-block
                w-1.5
                h-4
                bg-purple-400
              "
            />
          </div>
        </div>

        {/* Bottom Status */}
        <div
          className="
            flex
            items-center
            justify-between
            gap-3
            px-4
            py-2.5
            border-t
            border-slate-800
            bg-slate-900/50
          "
        >
          <div className="flex items-center gap-2 min-w-0">
            <span
              className="
                flex-shrink-0
                w-2
                h-2
                rounded-full
                bg-green-400
                animate-pulse
              "
            />

            <p className="text-[10px] sm:text-xs text-gray-400 truncate">
              Building ideas into products
            </p>
          </div>

          <p className="flex-shrink-0 text-[10px] sm:text-xs text-purple-400">
            ONLINE
          </p>
        </div>
      </motion.div>
    </div>
  );
}

function FloatingIcon({
  children,
  className,
  delay,
}) {
  return (
    <motion.div
      animate={{
        y: [0, -8, 0],
        rotate: [-3, 3, -3],
      }}
      transition={{
        duration: 4,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      whileHover={{
        scale: 1.15,
        rotate: 0,
      }}
      className={`
        absolute
        z-20
        w-10
        h-10
        lg:w-11
        lg:h-11
        flex
        items-center
        justify-center
        rounded-xl
        border
        border-purple-500/20
        bg-slate-900/90
        backdrop-blur-xl
        text-xl
        lg:text-2xl
        text-purple-400
        shadow-[0_0_20px_rgba(168,85,247,0.12)]
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
}

export default DeveloperTerminal;