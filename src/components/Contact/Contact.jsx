import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import {
  FaEnvelope,
  FaPhoneAlt,
  FaGithub,
  FaLinkedin,
  FaPaperPlane,
  FaCheckCircle,
  FaExclamationCircle,
} from "react-icons/fa";

function Contact() {
  const [status, setStatus] = useState("idle");

  const handleSubmit = async (event) => {
    event.preventDefault();

    setStatus("sending");

   const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch(
        "https://formspree.io/f/mdaryrve",
        {
          method: "POST",
          body: formData,
          headers: {
            Accept: "application/json",
          },
        }
      );

      if (response.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  const contactLinks = [
    {
      label: "Email",
      value: "abusalehkqr4@gmail.com",
      href: "mailto:abusalehkqr4@gmail.com",
      icon: FaEnvelope,
    },
    {
      label: "Phone",
      value: "+91 96083 70713",
      href: "tel:+919608370713",
      icon: FaPhoneAlt,
    },
    {
      label: "GitHub",
      value: "github.com/Saleh-Abu",
      href: "https://github.com/Saleh-Abu",
      icon: FaGithub,
      external: true,
    },
    {
      label: "LinkedIn",
      value: "Connect with me",
      href: "https://www.linkedin.com/in/abu-saleh-b483b5326",
      icon: FaLinkedin,
      external: true,
    },
  ];

  return (
    <section
      id="contact"
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
      {/* Animated Background Glows */}
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

      <motion.div
        animate={{
          x: [0, -50, 0],
          y: [0, -30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          bottom-10
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
            Get In Touch
          </p>

          <h2
            className="
              text-4xl
              sm:text-5xl
              font-bold
              mt-3
            "
          >
            Let's Work{" "}
            <span
              className="
                text-transparent
                bg-clip-text
                bg-gradient-to-r
                from-purple-400
                to-cyan-400
              "
            >
              Together
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
            Have an opportunity, project idea, or just want to connect?
            Feel free to send me a message.
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

        {/* Contact Content */}
        <div
          className="
            grid
            grid-cols-1
            lg:grid-cols-2
            gap-6
            sm:gap-8
            lg:gap-10
            items-stretch
          "
        >
          {/* Left Side */}
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
              duration: 0.7,
            }}
            viewport={{
              once: true,
              amount: 0.2,
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
              hover:border-purple-500/40
              transition-colors
              duration-300
            "
          >
            {/* Card Glow */}
            <div
              className="
                absolute
                top-[-100px]
                left-[-100px]
                w-64
                h-64
                bg-purple-500/0
                group-hover:bg-purple-500/10
                blur-[100px]
                rounded-full
                transition
                duration-500
                pointer-events-none
              "
            />

            <div className="relative z-10">
              <p className="text-purple-400 font-medium">
                Contact Information
              </p>

              <h3
                className="
                  text-2xl
                  sm:text-3xl
                  font-bold
                  mt-3
                "
              >
                Let's build something great.
              </h3>

              <p
                className="
                  text-gray-400
                  text-sm
                  sm:text-base
                  leading-7
                  mt-5
                "
              >
                I'm currently open to full-stack development opportunities,
                collaborations, and interesting technical projects.
              </p>

              {/* Contact Links */}
              <div
                className="
                  space-y-3
                  sm:space-y-4
                  mt-8
                  sm:mt-10
                "
              >
                {contactLinks.map((contact, index) => {
                  const Icon = contact.icon;

                  return (
                    <motion.a
                      key={contact.label}
                      href={contact.href}
                      target={
                        contact.external
                          ? "_blank"
                          : undefined
                      }
                      rel={
                        contact.external
                          ? "noopener noreferrer"
                          : undefined
                      }
                      initial={{
                        opacity: 0,
                        x: -25,
                      }}
                      whileInView={{
                        opacity: 1,
                        x: 0,
                      }}
                      transition={{
                        duration: 0.5,
                        delay: index * 0.1,
                      }}
                      viewport={{ once: true }}
                      whileHover={{
                        x: 6,
                      }}
                      whileTap={{
                        scale: 0.98,
                      }}
                      className="
                        group/contact
                        flex
                        items-center
                        gap-3
                        sm:gap-4
                        p-3
                        rounded-xl
                        hover:bg-purple-500/5
                        transition-colors
                        duration-300
                        min-w-0
                      "
                    >
                      {/* Icon */}
                      <div
                        className="
                          flex-shrink-0
                          w-11
                          h-11
                          sm:w-12
                          sm:h-12
                          rounded-xl
                          bg-purple-500/10
                          border
                          border-purple-500/10
                          flex
                          items-center
                          justify-center
                          group-hover/contact:bg-purple-500/20
                          group-hover/contact:border-purple-500/30
                          group-hover/contact:shadow-[0_0_20px_rgba(168,85,247,0.2)]
                          transition
                          duration-300
                        "
                      >
                        <Icon className="text-purple-400" />
                      </div>

                      {/* Text */}
                      <div className="min-w-0">
                        <p
                          className="
                            text-gray-500
                            text-xs
                            sm:text-sm
                          "
                        >
                          {contact.label}
                        </p>

                        <p
                          className="
                            text-white
                            text-sm
                            sm:text-base
                            break-all
                            sm:break-normal
                            group-hover/contact:text-purple-400
                            transition
                            duration-300
                          "
                        >
                          {contact.value}
                        </p>
                      </div>
                    </motion.a>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Right Side - Contact Form */}
          <motion.form
  action="https://formspree.io/f/mdaryrve"
  method="POST"
  onSubmit={handleSubmit}
            initial={{
              opacity: 0,
              x: 60,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.7,
            }}
            viewport={{
              once: true,
              amount: 0.2,
            }}
            className="
              bg-slate-900/60
              border
              border-slate-800
              rounded-2xl
              sm:rounded-3xl
              p-5
              sm:p-6
              lg:p-8
              space-y-5
              sm:space-y-6
            "
          >
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="
                  block
                  text-gray-300
                  text-sm
                  sm:text-base
                  mb-2
                "
              >
                Your Name
              </label>

              <input
                id="name"
                name="name"
                type="text"
                required
                placeholder="Enter your name"
                className="
                  w-full
                  bg-slate-950/70
                  border
                  border-slate-700
                  rounded-xl
                  px-4
                  py-3
                  text-sm
                  sm:text-base
                  text-white
                  placeholder:text-gray-600
                  outline-none
                  focus:border-purple-500
                  focus:ring-2
                  focus:ring-purple-500/10
                  transition
                "
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="
                  block
                  text-gray-300
                  text-sm
                  sm:text-base
                  mb-2
                "
              >
                Your Email
              </label>

              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="Enter your email"
                className="
                  w-full
                  bg-slate-950/70
                  border
                  border-slate-700
                  rounded-xl
                  px-4
                  py-3
                  text-sm
                  sm:text-base
                  text-white
                  placeholder:text-gray-600
                  outline-none
                  focus:border-purple-500
                  focus:ring-2
                  focus:ring-purple-500/10
                  transition
                "
              />
            </div>

            {/* Message */}
            <div>
              <label
                htmlFor="message"
                className="
                  block
                  text-gray-300
                  text-sm
                  sm:text-base
                  mb-2
                "
              >
                Message
              </label>

              <textarea
                id="message"
                name="message"
                rows="6"
                required
                placeholder="Write your message..."
                className="
                  w-full
                  bg-slate-950/70
                  border
                  border-slate-700
                  rounded-xl
                  px-4
                  py-3
                  text-sm
                  sm:text-base
                  text-white
                  placeholder:text-gray-600
                  outline-none
                  focus:border-purple-500
                  focus:ring-2
                  focus:ring-purple-500/10
                  transition
                  resize-none
                "
              />
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={status === "sending"}
              whileHover={
                status !== "sending"
                  ? { y: -2 }
                  : {}
              }
              whileTap={
                status !== "sending"
                  ? { scale: 0.98 }
                  : {}
              }
              className="
                w-full
                flex
                items-center
                justify-center
                gap-3
                bg-purple-600
                hover:bg-purple-500
                hover:shadow-[0_0_30px_rgba(168,85,247,0.35)]
                disabled:opacity-60
                disabled:cursor-not-allowed
                text-white
                font-medium
                px-6
                py-3
                sm:py-3.5
                rounded-xl
                transition
                duration-300
              "
            >
              <motion.span
                animate={
                  status === "sending"
                    ? {
                        x: [0, 5, -5, 0],
                      }
                    : {}
                }
                transition={{
                  duration: 0.8,
                  repeat:
                    status === "sending"
                      ? Infinity
                      : 0,
                }}
              >
                <FaPaperPlane />
              </motion.span>

              {status === "sending"
                ? "Sending..."
                : "Send Message"}
            </motion.button>

            {/* Status Messages */}
            <AnimatePresence mode="wait">
              {status === "success" && (
                <motion.div
                  key="success"
                  initial={{
                    opacity: 0,
                    y: 15,
                    scale: 0.97,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                  }}
                  className="
                    flex
                    items-center
                    gap-3
                    bg-green-500/10
                    border
                    border-green-500/30
                    text-green-400
                    text-sm
                    sm:text-base
                    px-4
                    py-3
                    rounded-xl
                  "
                >
                  <FaCheckCircle className="flex-shrink-0" />
                  Message sent successfully!
                </motion.div>
              )}

              {status === "error" && (
                <motion.div
                  key="error"
                  initial={{
                    opacity: 0,
                    y: 15,
                    scale: 0.97,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                  }}
                  className="
                    flex
                    items-center
                    gap-3
                    bg-red-500/10
                    border
                    border-red-500/30
                    text-red-400
                    text-sm
                    sm:text-base
                    px-4
                    py-3
                    rounded-xl
                  "
                >
                  <FaExclamationCircle className="flex-shrink-0" />
                  Something went wrong. Please try again.
                </motion.div>
              )}
            </AnimatePresence>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

export default Contact;