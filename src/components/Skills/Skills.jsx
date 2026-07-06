import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { skills } from "../../data/skills";
import TechStackBalls from "./TechStackBalls";

function Skills() {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = [
    "All",
    "Frontend",
    "Backend",
    "Database",
    "Tools",
  ];

  const filteredSkills =
    activeCategory === "All"
      ? skills
      : skills.filter(
          (skill) => skill.category === activeCategory
        );

  return (
    <section
      id="skills"
      className="
        relative
        bg-slate-950
        text-white
        py-16
        sm:py-20
        lg:py-24
        px-4
        sm:px-6
        overflow-hidden
      "
    >
      {/* Background Glow */}
      <motion.div
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 12,
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
          sm:w-80
          sm:h-80
          bg-purple-600/10
          blur-[120px]
          rounded-full
        "
      />

      {/* Main Container */}
      <div className="relative z-10 max-w-7xl mx-auto">

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
          }}
          viewport={{
            once: true,
            amount: 0.3,
          }}
          className="
            text-center
            mb-10
            sm:mb-14
            lg:mb-16
          "
        >
          <p
            className="
              text-purple-400
              uppercase
              tracking-[3px]
              sm:tracking-[4px]
              text-sm
              sm:text-base
              font-medium
            "
          >
            My Toolkit
          </p>

          <h2
            className="
              text-4xl
              sm:text-5xl
              font-bold
              mt-3
            "
          >
            Tech{" "}
            <span
              className="
                text-transparent
                bg-clip-text
                bg-gradient-to-r
                from-purple-400
                to-cyan-400
              "
            >
              Stack
            </span>
          </h2>

          <p
            className="
              text-gray-400
              max-w-2xl
              mx-auto
              mt-5
              text-sm
              sm:text-base
              leading-7
            "
          >
            Technologies and tools I use to build modern,
            scalable, and user-friendly web applications.
          </p>

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
              delay: 0.4,
            }}
            viewport={{ once: true }}
            className="
              h-1
              bg-gradient-to-r
              from-purple-500
              to-cyan-400
              mx-auto
              mt-6
              rounded-full
              shadow-[0_0_15px_rgba(168,85,247,0.5)]
            "
          />
        </motion.div>

        {/* 3D Interactive Tech Balls */}
        <TechStackBalls />

        {/* Category Filters */}
        <motion.div
          initial={{
            opacity: 0,
            y: 25,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.6,
          }}
          viewport={{
            once: true,
            amount: 0.3,
          }}
          className="
            flex
            flex-wrap
            justify-center
            gap-2
            sm:gap-3
            mt-6
            sm:mt-8
            mb-8
            sm:mb-12
          "
        >
          {categories.map((category) => {
            const isActive = activeCategory === category;

            return (
              <motion.button
                key={category}
                type="button"
                onClick={() =>
                  setActiveCategory(category)
                }
                whileTap={{
                  scale: 0.95,
                }}
                className={`
                  relative
                  overflow-hidden
                  px-3
                  sm:px-5
                  py-2
                  text-xs
                  sm:text-sm
                  rounded-full
                  border
                  transition-colors
                  duration-300
                  ${
                    isActive
                      ? `
                        bg-purple-600
                        border-purple-500
                        text-white
                        shadow-[0_0_20px_rgba(168,85,247,0.35)]
                      `
                      : `
                        bg-slate-900/60
                        border-slate-700
                        text-gray-400
                        hover:border-purple-500
                        hover:text-white
                      `
                  }
                `}
              >
                {/* Active Button Glow */}
                {isActive && (
                  <motion.span
                    layoutId="active-skill-category"
                    className="
                      absolute
                      inset-0
                      bg-gradient-to-r
                      from-purple-600
                      to-purple-500
                      -z-10
                    "
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 25,
                    }}
                  />
                )}

                {category}
              </motion.button>
            );
          })}
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          layout
          className="
            grid
            grid-cols-2
            sm:grid-cols-3
            lg:grid-cols-4
            xl:grid-cols-5
            gap-3
            sm:gap-5
            lg:gap-6
          "
        >
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill, index) => {
              const Icon = skill.icon;

              return (
                <motion.div
                  layout
                  key={skill.name}
                  initial={{
                    opacity: 0,
                    y: 30,
                    scale: 0.9,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.85,
                  }}
                  transition={{
                    duration: 0.35,
                    delay: index * 0.04,
                  }}
                  whileHover={{
                    y: -8,
                    scale: 1.03,
                  }}
                  className="
                    group
                    relative
                    overflow-hidden
                    bg-slate-900/60
                    border
                    border-slate-800
                    rounded-xl
                    sm:rounded-2xl
                    p-4
                    sm:p-6
                    text-center
                    hover:border-purple-500/60
                    hover:shadow-[0_12px_35px_rgba(168,85,247,0.12)]
                    transition-colors
                    duration-300
                  "
                >
                  {/* Card Background Glow */}
                  <div
                    className="
                      absolute
                      inset-0
                      bg-gradient-to-b
                      from-purple-500/0
                      to-purple-500/0
                      group-hover:from-purple-500/5
                      group-hover:to-transparent
                      transition
                      duration-300
                      pointer-events-none
                    "
                  />

                  {/* Icon */}
                  <motion.div
                    whileHover={{
                      rotate: [0, -8, 8, 0],
                    }}
                    transition={{
                      duration: 0.5,
                    }}
                    className="relative"
                  >
                    <Icon
                      className="
                        text-4xl
                        sm:text-5xl
                        text-purple-400
                        mx-auto
                        mb-3
                        sm:mb-5
                        group-hover:scale-110
                        group-hover:drop-shadow-[0_0_12px_rgba(192,132,252,0.7)]
                        transition
                        duration-300
                      "
                    />
                  </motion.div>

                  {/* Skill Name */}
                  <h3
                    className="
                      relative
                      text-white
                      font-semibold
                      text-sm
                      sm:text-base
                      lg:text-lg
                      break-words
                    "
                  >
                    {skill.name}
                  </h3>

                  {/* Category */}
                  <p
                    className="
                      relative
                      text-gray-500
                      text-xs
                      sm:text-sm
                      mt-1
                      sm:mt-2
                    "
                  >
                    {skill.category}
                  </p>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

export default Skills;