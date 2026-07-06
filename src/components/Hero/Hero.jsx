import Button from "../Common/Button";
import MagicFlame from "./MagicFlame";

import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";

import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaArrowDown,
} from "react-icons/fa";

function Hero({
  magicActivated,
  onMagicActivate,
}) {
  const scrollToProjects = () => {
    const projectsSection =
      document.getElementById("projects");

    if (projectsSection) {
      projectsSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <section
      id="home"
      className="
        relative
        min-h-screen
        bg-gradient-to-b
        from-slate-950
        via-slate-900
        to-black
        text-white
        pt-20
        lg:pt-24
        overflow-hidden
      "
    >
      {/* Purple Background Glow */}
      <motion.div
        animate={{
          x: [0, 40, 0],
          y: [0, 30, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          top-20
          left-[-100px]
          sm:left-10
          w-72
          h-72
          sm:w-96
          sm:h-96
          bg-purple-600/20
          blur-[120px]
          rounded-full
          pointer-events-none
        "
      />

      {/* Cyan Background Glow */}
      <motion.div
        animate={{
          x: [0, -40, 0],
          y: [0, -30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          bottom-20
          right-[-100px]
          sm:right-10
          w-72
          h-72
          sm:w-96
          sm:h-96
          bg-cyan-500/20
          blur-[120px]
          rounded-full
          pointer-events-none
        "
      />

      {/* Main Container */}
      <div
        className="
          relative
          z-10
          max-w-7xl
          mx-auto
          px-4
          sm:px-6
          lg:px-8
          min-h-[calc(100vh-6rem)]
          flex
          items-center
          py-6
          lg:py-8
        "
      >
        {/* Two-Column Hero Layout */}
        <div
          className="
            w-full
            grid
            grid-cols-1
            lg:grid-cols-[minmax(0,1.25fr)_minmax(340px,0.75fr)]
            items-center
            gap-10
            lg:gap-8
          "
        >
          {/* Left Side - Hero Content */}
          <motion.div
            initial={{
              opacity: 0,
              x: -80,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.8,
            }}
            className="
              w-full
              min-w-0
              max-w-3xl
              space-y-5
              sm:space-y-6
            "
          >
            {/* Availability Badge */}
            <motion.div
              initial={{
                opacity: 0,
                y: -20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.2,
                duration: 0.6,
              }}
              className="
                inline-flex
                items-center
                gap-2
                sm:gap-3
                bg-slate-900/70
                border
                border-purple-500/30
                px-4
                sm:px-5
                py-2
                rounded-full
                backdrop-blur-md
              "
            >
              <span
                className="
                  w-2.5
                  h-2.5
                  sm:w-3
                  sm:h-3
                  rounded-full
                  bg-green-500
                  animate-pulse
                "
              />

              <span className="text-xs sm:text-sm font-medium text-gray-300">
                Available for Opportunities
              </span>
            </motion.div>

            {/* Introduction */}
            <p className="text-purple-400 text-base sm:text-lg font-medium">
              👋 Hello, I'm
            </p>

            {/* Name */}
            <h1
              className="
                text-5xl
                sm:text-6xl
                lg:text-6xl
                xl:text-7xl
                font-bold
                leading-[1.05]
                break-words
              "
            >
              Abu{" "}
              <span
                className="
                  text-transparent
                  bg-clip-text
                  bg-gradient-to-r
                  from-purple-500
                  to-purple-300
                "
              >
                Saleh
              </span>
            </h1>

            {/* Animated Roles */}
            <div className="min-h-[42px] sm:min-h-[48px]">
              <TypeAnimation
                sequence={[
                  "Full Stack Developer",
                  2000,
                  "React Developer",
                  2000,
                  "Laravel Developer",
                  2000,
                  "MERN Stack Developer",
                  2000,
                  "AI Enthusiast",
                  2000,
                ]}
                wrapper="h2"
                speed={50}
                repeat={Infinity}
                className="
                  text-xl
                  sm:text-2xl
                  lg:text-3xl
                  font-semibold
                  text-purple-400
                "
              />
            </div>

            {/* Description */}
            <p
              className="
                max-w-xl
                text-sm
                sm:text-base
                text-gray-400
                leading-7
              "
            >
              Passionate Full Stack Developer specializing in Laravel,
              React, Node.js, Express, MongoDB, and AI-powered web
              applications.
            </p>

            {/* Buttons */}
            <div
              className="
                flex
                flex-col
                sm:flex-row
                gap-4
                sm:gap-5
              "
            >
              <Button
                text="View Resume"
                variant="primary"
                href={`${import.meta.env.BASE_URL}resume/Abu-Saleh-Resume.pdf`}
                target="_blank"
              />

              <Button
                text="View Projects"
                variant="outline"
                onClick={scrollToProjects}
              />
            </div>

            {/* Social Links */}
            <div className="flex gap-6 text-2xl">
              <motion.a
                whileHover={{
                  y: -4,
                  scale: 1.15,
                }}
                href="https://github.com/Saleh-Abu"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="
                  text-gray-400
                  hover:text-purple-500
                  transition
                  duration-300
                "
              >
                <FaGithub />
              </motion.a>

              <motion.a
                whileHover={{
                  y: -4,
                  scale: 1.15,
                }}
                href="https://www.linkedin.com/in/abu-saleh-b483b5326"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="
                  text-gray-400
                  hover:text-purple-500
                  transition
                  duration-300
                "
              >
                <FaLinkedin />
              </motion.a>

              <motion.a
                whileHover={{
                  y: -4,
                  scale: 1.15,
                }}
                href="mailto:abusalehkqr4@gmail.com"
                aria-label="Email"
                className="
                  text-gray-400
                  hover:text-purple-500
                  transition
                  duration-300
                "
              >
                <FaEnvelope />
              </motion.a>
            </div>

            {/* Stats */}
            <div
              className="
                grid
                grid-cols-1
                min-[400px]:grid-cols-3
                gap-3
                sm:gap-4
                pt-2
                max-w-2xl
              "
            >
              {[
                {
                  number: "15+",
                  label: "Projects Built",
                },
                {
                  number: "10+",
                  label: "Technologies",
                },
                {
                  number: "Open",
                  label: "Opportunities",
                },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{
                    opacity: 0,
                    y: 30,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: 0.5 + index * 0.12,
                  }}
                  whileHover={{
                    y: -5,
                  }}
                  className="
                    bg-slate-900/60
                    border
                    border-slate-700
                    rounded-xl
                    px-3
                    sm:px-5
                    py-3
                    sm:py-4
                    text-center
                    hover:border-purple-500
                    hover:shadow-[0_10px_30px_rgba(168,85,247,0.12)]
                    transition-colors
                    duration-300
                  "
                >
                  <h3
                    className={`
                      font-bold
                      text-purple-500
                      ${
                        stat.number === "Open"
                          ? "text-lg sm:text-xl"
                          : "text-2xl sm:text-3xl"
                      }
                    `}
                  >
                    {stat.number}
                  </h3>

                  <p className="text-gray-400 text-xs sm:text-sm mt-1">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Side - Magical Flame */}
          <motion.div
            initial={{
              opacity: 0,
              x: 50,
              scale: 0.95,
            }}
            animate={{
              opacity: 1,
              x: 0,
              scale: 1,
            }}
            transition={{
              duration: 0.8,
              delay: 0.35,
            }}
            className="
              hidden
              lg:flex
              min-w-0
              items-center
              justify-center
            "
          >
            <MagicFlame
              magicActivated={magicActivated}
              onMagicActivate={onMagicActivate}
            />
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{
          y: [0, 7, 0],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          hidden
          xl:flex
          absolute
          bottom-4
          left-1/2
          -translate-x-1/2
          flex-col
          items-center
          text-gray-400
        "
      >
        <p className="text-sm mb-2">
          Scroll Down
        </p>

        <FaArrowDown />
      </motion.div>
    </section>
  );
}

export default Hero;