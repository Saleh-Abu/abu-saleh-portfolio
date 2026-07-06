import { motion } from "framer-motion";
import { FaBriefcase, FaCalendarAlt } from "react-icons/fa";

function ExperienceCard({
  role,
  company,
  duration,
  description,
  skills,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -60 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: true }}
      className="
        relative
        bg-slate-900/60
        border
        border-slate-800
        rounded-3xl
        p-8
        hover:border-purple-500/50
        transition
        duration-300
      "
    >
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-5">
        <div>
          <div className="flex items-center gap-3 text-purple-400 mb-4">
            <FaBriefcase />

            <span className="text-sm uppercase tracking-wider">
              Experience
            </span>
          </div>

          <h3 className="text-2xl font-bold text-white">
            {role}
          </h3>

          <p className="text-purple-400 mt-2">
            {company}
          </p>
        </div>

        <div className="flex items-center gap-2 text-gray-400">
          <FaCalendarAlt />
          <span>{duration}</span>
        </div>
      </div>

      <p className="text-gray-400 leading-7 mt-6">
        {description}
      </p>

      <div className="flex flex-wrap gap-2 mt-6">
        {skills.map((skill) => (
          <span
            key={skill}
            className="
              bg-purple-500/10
              border
              border-purple-500/20
              text-purple-300
              text-sm
              px-3
              py-1
              rounded-full
            "
          >
            {skill}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export default ExperienceCard;
