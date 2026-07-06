import { useRef } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import Button from "../Common/Button";

function AboutContent() {
  const containerRef = useRef(null);

  const mouseX = useMotionValue(-500);
  const mouseY = useMotionValue(-500);

  const handlePointerMove = (event) => {
    const rect = containerRef.current?.getBoundingClientRect();

    if (!rect) return;

    mouseX.set(event.clientX - rect.left);
    mouseY.set(event.clientY - rect.top);
  };

  const spotlightBackground = useMotionTemplate`
    radial-gradient(
      260px circle at ${mouseX}px ${mouseY}px,
      rgba(168, 85, 247, 0.12),
      transparent 70%
    )
  `;

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 28,
    },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  const cards = [
    {
      label: "🎓 Education",
      value: "B.Tech in Computer Science",
    },
    {
      label: "💻 Focus",
      value: "Full Stack Development",
    },
    {
      label: "🤖 Exploring",
      value: "AI-Powered Applications",
    },
    {
      label: "🚀 Goal",
      value: "Build Real-World Solutions",
    },
  ];

  return (
    <motion.div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: true,
        amount: 0.2,
      }}
      transition={{
        staggerChildren: 0.14,
      }}
      className="
        relative
        space-y-7
        rounded-3xl
        overflow-hidden
      "
    >
      {/* Mouse / Touch Spotlight */}
      <motion.div
        style={{
          background: spotlightBackground,
        }}
        className="
          absolute
          inset-0
          pointer-events-none
          z-0
        "
      />

      <div className="relative z-10 space-y-7">

        {/* Small Heading */}
        <motion.p
          variants={itemVariants}
          transition={{ duration: 0.6 }}
          className="
            text-purple-400
            font-medium
            text-lg
          "
        >
          A little about me
        </motion.p>

        {/* Main Heading */}
        <motion.h3
          variants={itemVariants}
          transition={{ duration: 0.7 }}
          className="
            text-3xl
            sm:text-4xl
            font-bold
            leading-tight
          "
        >
          I build modern web experiences{" "}
          <motion.span
            animate={{
              textShadow: [
                "0 0 0px rgba(168,85,247,0)",
                "0 0 16px rgba(168,85,247,0.65)",
                "0 0 0px rgba(168,85,247,0)",
              ],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="
              text-transparent
              bg-clip-text
              bg-gradient-to-r
              from-purple-400
              to-cyan-400
            "
          >
            from idea to deployment.
          </motion.span>
        </motion.h3>

        {/* First Description */}
        <motion.p
          variants={itemVariants}
          transition={{ duration: 0.7 }}
          className="text-gray-400 leading-8"
        >
          I'm{" "}
          <span className="text-white font-medium">
            Abu Saleh
          </span>
          , a Computer Science graduate and{" "}
          <span
            className="
              text-purple-300
              font-medium
              hover:text-purple-200
              hover:drop-shadow-[0_0_8px_rgba(192,132,252,0.9)]
              transition
              duration-300
            "
          >
            Full Stack Developer
          </span>{" "}
          focused on building responsive, user-friendly, and practical web
          applications.
        </motion.p>

        {/* Second Description */}
        <motion.p
          variants={itemVariants}
          transition={{ duration: 0.7 }}
          className="text-gray-400 leading-8"
        >
          I work with{" "}
          <span className="text-purple-300 hover:text-white transition">
            React
          </span>
          ,{" "}
          <span className="text-purple-300 hover:text-white transition">
            Laravel
          </span>
          ,{" "}
          <span className="text-purple-300 hover:text-white transition">
            Node.js
          </span>
          ,{" "}
          <span className="text-purple-300 hover:text-white transition">
            Express
          </span>
          ,{" "}
          <span className="text-purple-300 hover:text-white transition">
            MongoDB
          </span>
          ,{" "}
          <span className="text-purple-300 hover:text-white transition">
            MySQL
          </span>
          , REST APIs, and modern development tools. I also enjoy exploring{" "}
          <span
            className="
              text-cyan-300
              font-medium
              hover:drop-shadow-[0_0_8px_rgba(103,232,249,0.9)]
              transition
            "
          >
            AI integrations
          </span>{" "}
          and turning ideas into real-world projects.
        </motion.p>

        {/* Animated Highlight Cards */}
        <motion.div
          variants={itemVariants}
          transition={{ duration: 0.7 }}
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            gap-4
            pt-2
          "
        >
          {cards.map((card, index) => (
            <motion.div
              key={card.label}
              initial={{
                opacity: 0,
                y: 25,
                scale: 0.96,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              transition={{
                duration: 0.5,
                delay: index * 0.12,
              }}
              viewport={{ once: true }}
              whileHover={{
                y: -6,
                scale: 1.02,
              }}
              className="
                group
                relative
                overflow-hidden
                bg-slate-900/60
                border
                border-slate-800
                rounded-xl
                p-4
                hover:border-purple-500/60
                hover:shadow-[0_10px_35px_rgba(168,85,247,0.12)]
                transition-colors
                duration-300
              "
            >
              {/* Hover Light Sweep */}
              <motion.div
                initial={{ x: "-150%" }}
                whileHover={{ x: "150%" }}
                transition={{ duration: 0.8 }}
                className="
                  absolute
                  inset-y-0
                  w-20
                  bg-gradient-to-r
                  from-transparent
                  via-purple-400/10
                  to-transparent
                  skew-x-12
                  pointer-events-none
                "
              />

              <p className="relative text-purple-400 text-sm">
                {card.label}
              </p>

              <h4 className="relative text-white font-semibold mt-2">
                {card.value}
              </h4>
            </motion.div>
          ))}
        </motion.div>

        {/* Resume Button */}
        <motion.div
          variants={itemVariants}
          transition={{ duration: 0.7 }}
          className="pt-3"
        >
          <Button
  text="View Resume"
  variant="primary"
  href="/resume/Abu-Saleh-Resume.pdf"
  target="_blank"
/>
          
        </motion.div>
      </div>
    </motion.div>
  );
}

export default AboutContent;