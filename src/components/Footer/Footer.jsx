import { motion } from "framer-motion";

import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaArrowUp,
  FaHeart,
} from "react-icons/fa";

function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const socialLinks = [
    {
      name: "GitHub",
      href: "https://github.com/Saleh-Abu",
      icon: FaGithub,
      external: true,
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/abu-saleh-b483b5326",
      icon: FaLinkedin,
      external: true,
    },
    {
      name: "Email",
      href: "mailto:abusalehkqr4@gmail.com",
      icon: FaEnvelope,
      external: false,
    },
  ];

  return (
    <footer
      className="
        relative
        overflow-hidden
        bg-black
        text-white
        border-t
        border-purple-500/10
        px-4
        sm:px-6
        py-10
        sm:py-12
      "
    >
      {/* Top Glowing Line */}
      <div
        className="
          absolute
          top-0
          left-0
          w-full
          h-px
          bg-gradient-to-r
          from-transparent
          via-purple-500/70
          to-transparent
        "
      />

      {/* Background Glow */}
      <motion.div
        animate={{
          x: [-40, 40, -40],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          bottom-[-150px]
          left-1/2
          -translate-x-1/2
          w-96
          h-72
          bg-purple-600/10
          blur-[120px]
          rounded-full
          pointer-events-none
        "
      />

      <div
        className="
          relative
          z-10
          max-w-7xl
          mx-auto
        "
      >
        {/* Main Footer Content */}
        <div
          className="
            flex
            flex-col
            lg:flex-row
            items-center
            justify-between
            gap-8
          "
        >
          {/* Name */}
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.6,
            }}
            viewport={{ once: true }}
            className="
              text-center
              lg:text-left
            "
          >
            <h3
              className="
                text-2xl
                sm:text-3xl
                font-bold
              "
            >
              Abu{" "}
              <span
                className="
                  text-transparent
                  bg-clip-text
                  bg-gradient-to-r
                  from-purple-400
                  to-cyan-400
                "
              >
                Saleh
              </span>
            </h3>

            <p
              className="
                text-gray-500
                text-sm
                mt-2
              "
            >
              Full Stack Developer
            </p>
          </motion.div>

          {/* Copyright */}
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.6,
              delay: 0.1,
            }}
            viewport={{ once: true }}
            className="
              text-center
              text-gray-500
              text-xs
              sm:text-sm
            "
          >
            <p>
              © {currentYear} Abu Saleh. All rights reserved.
            </p>

            <p
              className="
                mt-2
                flex
                flex-wrap
                items-center
                justify-center
                gap-1
              "
            >
              Built with React, Tailwind CSS &

              <motion.span
                animate={{
                  scale: [1, 1.25, 1],
                }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="
                  inline-flex
                  text-purple-400
                "
              >
                <FaHeart />
              </motion.span>
            </p>
          </motion.div>

          {/* Social Links + Back To Top */}
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.6,
              delay: 0.2,
            }}
            viewport={{ once: true }}
            className="
              flex
              items-center
              justify-center
              gap-3
              sm:gap-4
            "
          >
            {socialLinks.map((social) => {
              const Icon = social.icon;

              return (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target={
                    social.external
                      ? "_blank"
                      : undefined
                  }
                  rel={
                    social.external
                      ? "noopener noreferrer"
                      : undefined
                  }
                  aria-label={social.name}
                  title={social.name}
                  whileHover={{
                    y: -4,
                    scale: 1.08,
                  }}
                  whileTap={{
                    scale: 0.95,
                  }}
                  className="
                    w-10
                    h-10
                    sm:w-11
                    sm:h-11
                    rounded-xl
                    bg-slate-900/80
                    border
                    border-slate-800
                    flex
                    items-center
                    justify-center
                    text-gray-400
                    text-lg
                    sm:text-xl
                    hover:text-purple-400
                    hover:border-purple-500/50
                    hover:shadow-[0_0_20px_rgba(168,85,247,0.2)]
                    transition-colors
                    duration-300
                  "
                >
                  <Icon />
                </motion.a>
              );
            })}

            {/* Back To Top */}
            <motion.button
              type="button"
              onClick={scrollToTop}
              aria-label="Back to top"
              title="Back to top"
              whileHover={{
                y: -5,
                scale: 1.08,
              }}
              whileTap={{
                scale: 0.92,
              }}
              className="
                relative
                overflow-hidden
                w-10
                h-10
                sm:w-11
                sm:h-11
                rounded-xl
                bg-purple-600
                flex
                items-center
                justify-center
                text-white
                hover:bg-purple-500
                hover:shadow-[0_0_30px_rgba(168,85,247,0.55)]
                transition
                duration-300
              "
            >
              <motion.span
                animate={{
                  y: [2, -3, 2],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <FaArrowUp />
              </motion.span>
            </motion.button>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;