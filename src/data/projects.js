import temptingBites from "../assets/images/tempting-bites.png";
import portfolioImage from "../assets/images/portfolio.png";
import frameAI from "../assets/images/frame-ai.png";
import movieRecommendation from "../assets/images/movie-recommendation.png";
import mernStack from "../assets/images/mern-stack.png";

export const projects = [
  {
    id: 1,
    title: "FRAME.AI",
    category: "AI • Full Stack",
    image: frameAI,

    description:
      "An AI-powered eyewear recommendation platform that detects face shape using computer vision, analyzes facial landmarks, recommends suitable frames, and provides a virtual try-on experience.",

    technologies: [
      "React",
      "Go",
      "Spring Boot",
      "Python",
      "OpenCV",
      "MediaPipe",
      "Machine Learning",
      "Tailwind CSS",
    ],

    github: "https://github.com/Saleh-Abu/FRAME-AI",

    live: "",

    featured: true,
  },

  {
    id: 2,
    title: "Tempting Bites",
    category: "Full Stack",
    image: temptingBites,

    description:
      "A full-stack cake ordering platform featuring authentication, wishlist, shopping cart, admin dashboard, AI-assisted recommendations, secure ordering, and responsive design.",

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

    live: "https://tempting-bites-production.up.railway.app/",

    featured: true,
  },

  {
    id: 3,
    title: "Developer Portfolio",
    category: "Frontend",
    image: portfolioImage,

    description:
      "An interactive developer portfolio featuring cinematic animations, magical UI interactions, responsive layouts, reusable React components, and smooth user experiences.",

    technologies: [
      "React",
      "JavaScript",
      "Tailwind CSS",
      "Framer Motion",
      "Vite",
    ],

    github:
      "https://github.com/Saleh-Abu/abu-saleh-portfolio",

    live:
      "https://abu-saleh-portfolio.vercel.app",

    featured: true,
  },

  {
    id: 4,
    title: "Movie Recommendation System",
    category: "Java • Full Stack",
    image: movieRecommendation,

    description:
      "A modern movie recommendation platform with authentication, personalized recommendations, watchlists, ratings, search functionality, and secure REST APIs powered by Spring Boot.",

    technologies: [
      "React",
      "Next.js",
      "Java",
      "Spring Boot",
      "JWT",
      "MySQL",
      "JPA",
      "REST API",
      "JUnit",
      "Mockito",
      "Playwright",
      "Postman",
    ],

    github: "https://github.com/Saleh-Abu/FRAME-AI",

    live: "",

    featured: true,
  },
  {
  id: 5,
  title: "MERN Stack Application",
  category: "MERN Stack",
  image: mernStack,

  description:
    "A full-stack MERN application featuring secure authentication, CRUD operations, RESTful APIs, responsive user interface, and MongoDB-powered data management.",

  technologies: [
    "MongoDB",
    "Express.js",
    "React",
    "Node.js",
    "JWT",
    "REST API",
    "Tailwind CSS",
  ],

  github: "https://github.com/Saleh-Abu/tempting-bites-ecommerce",

  live: "https://tempting-bites-ecommerce.vercel.app",

  featured: true,
},
];