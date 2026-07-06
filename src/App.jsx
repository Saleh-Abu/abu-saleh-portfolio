import {
  useCallback,
  useState,
} from "react";

import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import About from "./components/About/About";
import Skills from "./components/Skills/Skills";
import Projects from "./components/Projects/Projects";
import Experience from "./components/Experience/Experience";
import Certifications from "./components/Certifications/Certifications";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";
import MagicCursor from "./components/MagicCursor/MagicCursor";
import OpeningScreen from "./components/OpeningScreen/OpeningScreen";

function App() {
  // Opening screen
  const [showOpening, setShowOpening] =
    useState(true);

  // Magic flame activation
  const [magicActivated, setMagicActivated] =
    useState(false);

  // Exact flame position
  const [flamePosition, setFlamePosition] =
    useState(null);

  const activateMagic = useCallback(() => {
    setMagicActivated(true);
  }, []);

  const handleFlamePositionChange = useCallback(
    (position) => {
      setFlamePosition(position);
    },
    []
  );

  const handleOpeningComplete =
    useCallback(() => {
      setShowOpening(false);
    }, []);

  return (
    <>
      {/* Opening Screen */}
      {showOpening && (
        <OpeningScreen
          onComplete={
            handleOpeningComplete
          }
        />
      )}

      {/* Portfolio */}
      <Navbar
        magicActivated={magicActivated}
        flamePosition={flamePosition}
      />

      <Hero
        magicActivated={magicActivated}
        onMagicActivate={activateMagic}
        onFlamePositionChange={
          handleFlamePositionChange
        }
      />

      <About />

      <Skills />

      <Projects />

      <Experience />

      <Certifications />

      <Contact />

      <Footer />

      <MagicCursor />
    </>
  );
}

export default App;