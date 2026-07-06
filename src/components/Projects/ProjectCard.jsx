import { motion } from "framer-motion";
import {
  FaGithub,
  FaExternalLinkAlt,
} from "react-icons/fa";

function ProjectCard({ project, index = 0 }) {
  return (
    <motion.article
      initial={{
        opacity: 0,
        y: 50,
        scale: 0.97,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      transition={{
        duration: 0.7,
        delay: index * 0.08,
      }}
      viewport={{
        once: true,
        amount: 0.15,
      }}
      whileHover={{
        y: -8,
      }}
      className="
        group
        relative
        min-w-0
        bg-slate-900/60
        border
        border-slate-800
        rounded-2xl
        sm:rounded-3xl
        overflow-hidden
        hover:border-purple-500/50
        hover:shadow-[0_20px_60px_rgba(168,85,247,0.12)]
        transition-colors
        duration-300
      "
    >
      {/* Project Image */}
      <div
        className="
          relative
          h-48
          sm:h-64
          lg:h-72
          overflow-hidden
        "
      >
        <img
          src={project.image}
          alt={`${project.title} project`}
          loading="lazy"
          className="
            w-full
            h-full
            object-cover
            transition-transform
            duration-700
            group-hover:scale-105
          "
        />

        {/* Image Gradient */}
        <div
          className="
            absolute
            inset-0
            bg-gradient-to-t
            from-slate-950/80
            via-transparent
            to-transparent
            pointer-events-none
          "
        />

        {/* Hover Light Sweep */}
        <motion.div
          initial={{
            x: "-150%",
          }}
          whileHover={{
            x: "150%",
          }}
          transition={{
            duration: 1,
          }}
          className="
            absolute
            inset-y-0
            w-32
            bg-gradient-to-r
            from-transparent
            via-white/10
            to-transparent
            skew-x-12
            pointer-events-none
          "
        />
      </div>

      {/* Project Content */}
      <div
        className="
          relative
          p-5
          sm:p-6
          lg:p-8
        "
      >
        {/* Category */}
        <p
          className="
            text-purple-400
            text-xs
            sm:text-sm
            font-medium
            uppercase
            tracking-wider
          "
        >
          {project.category}
        </p>

        {/* Title */}
        <h3
          className="
            text-2xl
            sm:text-3xl
            font-bold
            mt-3
            break-words
          "
        >
          {project.title}
        </h3>

        {/* Description */}
        <p
          className="
            text-gray-400
            text-sm
            sm:text-base
            leading-7
            mt-4
            break-words
          "
        >
          {project.description}
        </p>

        {/* Technologies */}
        <div
          className="
            flex
            flex-wrap
            gap-2
            mt-5
            sm:mt-6
          "
        >
          {project.technologies.map((technology) => (
            <span
              key={technology}
              className="
                bg-purple-500/10
                border
                border-purple-500/20
                text-purple-300
                text-xs
                sm:text-sm
                px-2.5
                sm:px-3
                py-1
                rounded-full
              "
            >
              {technology}
            </span>
          ))}
        </div>

        {/* Project Links */}
        <div
          className="
            flex
            flex-wrap
            gap-3
            sm:gap-5
            mt-7
            sm:mt-8
          "
        >
          {project.github && (
            <motion.a
              whileHover={{
                y: -2,
              }}
              whileTap={{
                scale: 0.96,
              }}
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="
                inline-flex
                items-center
                justify-center
                gap-2
                px-4
                py-2.5
                rounded-xl
                bg-slate-800/70
                border
                border-slate-700
                text-gray-300
                text-sm
                hover:text-white
                hover:border-purple-500/50
                transition-colors
                duration-300
              "
            >
              <FaGithub />
              View Code
            </motion.a>
          )}

          {project.live && (
            <motion.a
              whileHover={{
                y: -2,
              }}
              whileTap={{
                scale: 0.96,
              }}
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="
                inline-flex
                items-center
                justify-center
                gap-2
                px-4
                py-2.5
                rounded-xl
                bg-purple-600
                text-white
                text-sm
                hover:bg-purple-500
                hover:shadow-[0_0_25px_rgba(168,85,247,0.35)]
                transition
                duration-300
              "
            >
              <FaExternalLinkAlt />
              Live Demo
            </motion.a>
          )}
        </div>
      </div>
    </motion.article>
  );
}

export default ProjectCard;