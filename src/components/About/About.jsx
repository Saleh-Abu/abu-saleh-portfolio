import { motion } from "framer-motion";

import AboutImage from "./AboutImage";
import AboutContent from "./AboutContent";

function About() {
  return (
    <section
      id="about"
      className="
        relative
        bg-slate-950
        text-white
        py-16
        sm:py-20
        lg:py-20
        px-4
        sm:px-6
        overflow-hidden
      "
    >
      {/* Animated Purple Glow */}
      <motion.div
        animate={{
          x: [0, -80, 20, 0],
          y: [0, 60, -30, 0],
          scale: [1, 1.2, 0.9, 1],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          top-20
          right-10
          w-80
          h-80
          bg-purple-600/10
          blur-[120px]
          rounded-full
          pointer-events-none
        "
      />

      {/* Animated Cyan Glow */}
      <motion.div
        animate={{
          x: [0, 70, -20, 0],
          y: [0, -50, 30, 0],
          scale: [1, 0.9, 1.2, 1],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          bottom-10
          left-10
          w-80
          h-80
          bg-cyan-500/10
          blur-[120px]
          rounded-full
          pointer-events-none
        "
      />

      {/* Floating Code Symbol */}
      <motion.span
        animate={{
          y: [0, -20, 0],
          rotate: [0, 8, 0],
          opacity: [0.15, 0.4, 0.15],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          top-[28%]
          left-[7%]
          hidden
          lg:block
          text-purple-400
          text-4xl
          font-mono
          select-none
          pointer-events-none
        "
      >
        {"</>"}
      </motion.span>

      {/* Floating Braces */}
      <motion.span
        animate={{
          y: [0, 25, 0],
          rotate: [0, -10, 0],
          opacity: [0.1, 0.35, 0.1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          top-[55%]
          right-[8%]
          hidden
          lg:block
          text-cyan-400
          text-5xl
          font-mono
          select-none
          pointer-events-none
        "
      >
        {"{ }"}
      </motion.span>

      {/* Main Container */}
      <div
        className="
          relative
          z-10
          max-w-7xl
          mx-auto
        "
      >
        {/* Section Heading */}
        <motion.div
          initial={{
            opacity: 0,
            y: 40,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.7,
            ease: "easeOut",
          }}
          viewport={{
            once: true,
            amount: 0.3,
          }}
          className="
            text-center
            mb-12
            lg:mb-14
          "
        >
          <motion.p
            initial={{
              opacity: 0,
              letterSpacing: "1px",
            }}
            whileInView={{
              opacity: 1,
              letterSpacing: "4px",
            }}
            transition={{
              duration: 1,
              delay: 0.2,
            }}
            viewport={{ once: true }}
            className="
              text-purple-400
              uppercase
              font-medium
            "
          >
            Who I Am
          </motion.p>

          <motion.h2
            initial={{
              opacity: 0,
              scale: 0.9,
            }}
            whileInView={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              duration: 0.7,
              delay: 0.3,
            }}
            viewport={{ once: true }}
            className="
              text-4xl
              sm:text-5xl
              font-bold
              mt-3
            "
          >
            Get To Know{" "}
            <span
              className="
                text-transparent
                bg-clip-text
                bg-gradient-to-r
                from-purple-400
                to-cyan-400
              "
            >
              Me
            </span>
          </motion.h2>

          {/* Heading Line */}
          <motion.div
            initial={{
              width: 0,
              opacity: 0,
            }}
            whileInView={{
              width: 80,
              opacity: 1,
            }}
            transition={{
              duration: 0.8,
              delay: 0.6,
            }}
            viewport={{ once: true }}
            className="
              h-1
              bg-gradient-to-r
              from-purple-500
              to-cyan-400
              mx-auto
              mt-5
              rounded-full
              shadow-[0_0_15px_rgba(168,85,247,0.6)]
            "
          />
        </motion.div>

        {/* Main Content */}
        <div
          className="
            grid
            grid-cols-1
            lg:grid-cols-2
            gap-10
            lg:gap-12
            xl:gap-16
            items-center
          "
        >
          {/* Image Entrance */}
          <motion.div
            initial={{
              opacity: 0,
              x: -60,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.8,
              ease: "easeOut",
            }}
            viewport={{
              once: true,
              amount: 0.2,
            }}
            className="min-w-0"
          >
            <AboutImage />
          </motion.div>

          {/* Content Entrance */}
          <motion.div
            initial={{
              opacity: 0,
              x: 60,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.8,
              delay: 0.1,
              ease: "easeOut",
            }}
            viewport={{
              once: true,
              amount: 0.2,
            }}
            className="min-w-0"
          >
            <AboutContent />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default About;