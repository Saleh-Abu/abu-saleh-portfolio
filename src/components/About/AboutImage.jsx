import { motion } from "framer-motion";
import profile from "../../assets/images/profile.jpg";

function AboutImage() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -80 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="relative flex justify-center"
    >
      {/* Background Glow */}
      <div className="absolute w-80 h-80 bg-purple-600/20 blur-[100px] rounded-full"></div>

      {/* Decorative Border */}
      <div className="relative p-[2px] rounded-3xl bg-gradient-to-br from-purple-500 via-cyan-500 to-purple-500">
        {/* Image Card */}
        <div className="relative bg-slate-900 rounded-3xl overflow-hidden p-3">
          <img
            src={profile}
            alt="Abu Saleh"
            className="
              w-80
              h-96
              object-cover
              rounded-2xl
              transition
              duration-500
              hover:scale-105
            "
          />

          {/* Bottom Gradient */}
          <div className="absolute inset-x-3 bottom-3 h-32 bg-gradient-to-t from-slate-950 to-transparent rounded-b-2xl"></div>

          {/* Name Badge */}
          <div className="absolute bottom-8 left-8">
            <h3 className="text-2xl font-bold text-white">
              Abu Saleh
            </h3>

            <p className="text-purple-400 text-sm mt-1">
              Full Stack Developer
            </p>
          </div>
        </div>
      </div>

      {/* Floating Decoration */}
      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          -right-2
          top-12
          bg-slate-900
          border
          border-purple-500/40
          px-4
          py-3
          rounded-xl
          shadow-xl
        "
      >
        <p className="text-sm text-gray-300">
          💻 Building Ideas
        </p>
      </motion.div>
    </motion.div>
  );
}

export default AboutImage;