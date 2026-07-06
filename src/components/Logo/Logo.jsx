import { FaCode } from "react-icons/fa";

function Logo() {
  return (
    <div className="flex items-center gap-3 cursor-pointer">

      <div
        className="
        w-12
        h-12
        rounded-full
        bg-gradient-to-r
        from-purple-600
        to-cyan-500
        flex
        items-center
        justify-center
        text-white
        text-xl
        shadow-lg
        shadow-purple-500/30
        "
      >
        <FaCode />
      </div>

      <div>

        <h1 className="text-white text-xl font-bold">
          Abu
          <span className="text-purple-500">
            {" "}Saleh
          </span>
        </h1>

        <p className="text-gray-400 text-xs">
          Full Stack Developer
        </p>

      </div>

    </div>
  );
}

export default Logo;