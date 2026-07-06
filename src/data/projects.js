import temptingBites from "../assets/images/tempting-bites.png";
import portfolioImage from "../assets/images/portfolio.png";

export const projects = [
  {
    id: 1,
    title: "Tempting Bites",
    category: "Full Stack",
    image: temptingBites,

    description:
      "A full-stack cake ordering platform with product browsing, categories, wishlist, ratings, cart functionality, AI-powered assistance, and a complete Laravel backend.",

    technologies: [
      "Laravel",
      "PHP",
      "MySQL",
      "Tailwind CSS",
      "JavaScript",
      "REST API",
      "AI Integration",
    ],

    github: "https://github.com/Saleh-Abu/tempting-bites",
    live: "",
    featured: true,
  },

  {
    id: 2,
    title: "Developer Portfolio",
    category: "Frontend",
    image: portfolioImage,

    description:
      "A modern and responsive developer portfolio built to showcase my skills, projects, experience, and development journey with interactive animations and reusable React components.",

    technologies: [
      "React",
      "JavaScript",
      "Tailwind CSS",
      "Framer Motion",
      "Vite",
    ],

    github: "",
    live: "",
    featured: true,
  },
];