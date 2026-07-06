import { motion } from "framer-motion";
import {
  FaCertificate,
  FaExternalLinkAlt,
} from "react-icons/fa";

function CertificationCard({
  certification,
  index = 0,
}) {
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
        duration: 0.6,
        delay: index * 0.12,
      }}
      viewport={{
        once: true,
        amount: 0.2,
      }}
      whileHover={{
        y: -8,
      }}
      className="
        group
        relative
        overflow-hidden
        bg-slate-900/60
        border
        border-slate-800
        rounded-2xl
        sm:rounded-3xl
        p-5
        sm:p-6
        lg:p-8
        hover:border-purple-500/50
        hover:shadow-[0_20px_60px_rgba(168,85,247,0.12)]
        transition-colors
        duration-300
      "
    >
      {/* Card Background Glow */}
      <div
        className="
          absolute
          top-[-100px]
          right-[-100px]
          w-52
          h-52
          rounded-full
          bg-purple-500/0
          blur-[70px]
          group-hover:bg-purple-500/10
          transition
          duration-500
          pointer-events-none
        "
      />

      {/* Certificate Icon */}
      <motion.div
        whileHover={{
          rotate: [0, -8, 8, 0],
          scale: 1.08,
        }}
        transition={{
          duration: 0.5,
        }}
        className="
          relative
          w-12
          h-12
          sm:w-14
          sm:h-14
          rounded-xl
          sm:rounded-2xl
          bg-purple-500/10
          border
          border-purple-500/20
          flex
          items-center
          justify-center
          group-hover:shadow-[0_0_25px_rgba(168,85,247,0.2)]
        "
      >
        <FaCertificate
          className="
            text-xl
            sm:text-2xl
            text-purple-400
          "
        />
      </motion.div>

      {/* Issuer */}
      <p
        className="
          relative
          text-purple-400
          text-xs
          sm:text-sm
          uppercase
          tracking-wider
          mt-5
          sm:mt-6
        "
      >
        {certification.issuer}
      </p>

      {/* Title */}
      <h3
        className="
          relative
          text-xl
          sm:text-2xl
          font-bold
          mt-3
          break-words
        "
      >
        {certification.title}
      </h3>

      {/* Description */}
      <p
        className="
          relative
          text-gray-400
          text-sm
          sm:text-base
          leading-7
          mt-4
        "
      >
        {certification.description}
      </p>

      {/* Skills */}
      <div
        className="
          relative
          flex
          flex-wrap
          gap-2
          mt-5
          sm:mt-6
        "
      >
        {certification.skills.map((skill) => (
          <span
            key={skill}
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
            {skill}
          </span>
        ))}
      </div>

      {/* View Certificate */}
      <motion.a
        href={certification.certificate}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{
          y: -2,
        }}
        whileTap={{
          scale: 0.97,
        }}
        className="
          relative
          inline-flex
          items-center
          justify-center
          gap-2
          mt-7
          sm:mt-8
          px-4
          sm:px-5
          py-2.5
          sm:py-3
          rounded-xl
          bg-purple-600
          text-white
          text-sm
          sm:text-base
          font-medium
          hover:bg-purple-500
          hover:shadow-[0_0_25px_rgba(168,85,247,0.35)]
          transition
          duration-300
        "
      >
        <FaExternalLinkAlt />
        View Certificate
      </motion.a>
    </motion.article>
  );
}

export default CertificationCard;