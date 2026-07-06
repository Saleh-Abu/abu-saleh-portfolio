import { motion } from "framer-motion";
import { certifications } from "../../data/certifications";
import CertificationCard from "./CertificationCard";

function Certifications() {
  return (
    <section
      id="certifications"
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
      {/* Animated Background Glow */}
      <motion.div
        animate={{
          x: [0, -50, 0],
          y: [0, 40, 0],
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
          right-[-100px]
          sm:right-10
          w-72
          h-72
          sm:w-80
          sm:h-80
          bg-cyan-500/10
          blur-[120px]
          rounded-full
        "
      />

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
            Continuous Learning
          </p>

          <h2
            className="
              text-4xl
              sm:text-5xl
              font-bold
              mt-3
            "
          >
            My{" "}
            <span
              className="
                text-transparent
                bg-clip-text
                bg-gradient-to-r
                from-purple-400
                to-cyan-400
              "
            >
              Certifications
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
            Certifications and professional learning experiences that
            have strengthened my technical and development skills.
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

        {/* Certifications Grid */}
        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            gap-5
            sm:gap-8
          "
        >
          {certifications.map((certification, index) => (
            <CertificationCard
              key={certification.id}
              certification={certification}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Certifications;