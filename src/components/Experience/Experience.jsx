import { motion } from "framer-motion";
import ExperienceCard from "./ExperienceCard";
import { experiences } from "../../data/Experience";

function Experience() {
  return (
    <section
      id="experience"
      className="relative bg-slate-950 text-white py-24 px-6 overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute top-20 left-10 w-80 h-80 bg-purple-600/10 blur-[120px] rounded-full"></div>

      {/* Main Container */}
      <div className="relative z-10 max-w-7xl mx-auto">

        {/* Section Heading */}
        <motion.div
        
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-purple-400 uppercase tracking-[4px] font-medium">
            My Journey
          </p>

          <h2 className="text-5xl font-bold mt-3">
            Experience
          </h2>

          <p className="text-gray-400 max-w-2xl mx-auto mt-5 leading-7">
            My professional experience, practical training, and journey
            of building real-world technical skills.
          </p>

          <div className="w-20 h-1 bg-purple-500 mx-auto mt-6 rounded-full"></div>
        </motion.div>
        {/* Experience Timeline */}
<div className="max-w-4xl mx-auto space-y-8">
  {experiences.map((experience) => (
    <ExperienceCard
      key={experience.id}
      {...experience}
    />
  ))}
</div>

      </div>
    </section>
  );
}

export default Experience;