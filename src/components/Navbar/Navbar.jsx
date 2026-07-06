import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa";

import Logo from "../Logo/Logo";
import navLinks from "../../data/navLinks";

const NAV_START_DELAY = 1.1;
const NAV_ITEM_GAP = 0.55;
const NAV_ITEM_DURATION = 1.15;

function Navbar({ magicActivated }) {
  const [activeSection, setActiveSection] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [revealComplete, setRevealComplete] = useState(false);

  const [indicator, setIndicator] = useState({
    left: 0,
    width: 0,
  });

  const [travelBeam, setTravelBeam] = useState({
    left: 0,
    width: 0,
    visible: false,
  });

  const [mobileIndicator, setMobileIndicator] = useState({
    top: 0,
    height: 0,
  });

  const [mobileBeam, setMobileBeam] = useState({
    top: 0,
    height: 0,
    visible: false,
  });

  const desktopNavRef = useRef(null);
  const desktopLinkRefs = useRef({});

  const mobileNavRef = useRef(null);
  const mobileLinkRefs = useRef({});

  const previousDesktopSectionRef = useRef("home");
  const previousMobileSectionRef = useRef("home");

  const desktopTimeoutRef = useRef(null);
  const mobileTimeoutRef = useRef(null);
  const revealTimeoutRef = useRef(null);

  const getSectionId = (path) => path.replace("#", "");

  // =========================
  // MAGIC REVEAL COMPLETE
  // =========================

  useEffect(() => {
    if (!magicActivated) {
      setRevealComplete(false);
      return;
    }

    clearTimeout(revealTimeoutRef.current);

    const totalRevealTime =
      (NAV_START_DELAY +
        navLinks.length * NAV_ITEM_GAP +
        NAV_ITEM_DURATION) *
      1000;

    revealTimeoutRef.current = setTimeout(() => {
      setRevealComplete(true);
    }, totalRevealTime);

    return () => {
      clearTimeout(revealTimeoutRef.current);
    };
  }, [magicActivated]);

  // =========================
  // DESKTOP HORIZONTAL LIGHT
  // =========================

  const moveDesktopLight = (newSection) => {
    const container = desktopNavRef.current;
    const newElement = desktopLinkRefs.current[newSection];

    if (!container || !newElement) return;

    const oldSection = previousDesktopSectionRef.current;
    const oldElement = desktopLinkRefs.current[oldSection];

    const containerRect = container.getBoundingClientRect();
    const newRect = newElement.getBoundingClientRect();

    const newLeft = newRect.left - containerRect.left;
    const newWidth = newRect.width;

    if (!oldElement) {
      setIndicator({
        left: newLeft,
        width: newWidth,
      });

      previousDesktopSectionRef.current = newSection;
      return;
    }

    const oldRect = oldElement.getBoundingClientRect();

    const oldLeft = oldRect.left - containerRect.left;
    const oldRight = oldLeft + oldRect.width;
    const newRight = newLeft + newWidth;

    const beamLeft = Math.min(oldLeft, newLeft);
    const beamRight = Math.max(oldRight, newRight);

    clearTimeout(desktopTimeoutRef.current);

    setTravelBeam({
      left: beamLeft,
      width: beamRight - beamLeft,
      visible: true,
    });

    setIndicator({
      left: newLeft,
      width: newWidth,
    });

    desktopTimeoutRef.current = setTimeout(() => {
      setTravelBeam((current) => ({
        ...current,
        visible: false,
      }));
    }, 800);

    previousDesktopSectionRef.current = newSection;
  };

  // =========================
  // MOBILE VERTICAL LIGHT
  // =========================

  const moveMobileLight = (newSection) => {
    const container = mobileNavRef.current;
    const newElement = mobileLinkRefs.current[newSection];

    if (!container || !newElement) return;

    const oldSection = previousMobileSectionRef.current;
    const oldElement = mobileLinkRefs.current[oldSection];

    const containerRect = container.getBoundingClientRect();
    const newRect = newElement.getBoundingClientRect();

    const newTop = newRect.top - containerRect.top;
    const newHeight = newRect.height;

    if (!oldElement) {
      setMobileIndicator({
        top: newTop,
        height: newHeight,
      });

      previousMobileSectionRef.current = newSection;
      return;
    }

    const oldRect = oldElement.getBoundingClientRect();

    const oldTop = oldRect.top - containerRect.top;
    const oldBottom = oldTop + oldRect.height;
    const newBottom = newTop + newHeight;

    const beamTop = Math.min(oldTop, newTop);
    const beamBottom = Math.max(oldBottom, newBottom);

    clearTimeout(mobileTimeoutRef.current);

    setMobileBeam({
      top: beamTop,
      height: beamBottom - beamTop,
      visible: true,
    });

    setMobileIndicator({
      top: newTop,
      height: newHeight,
    });

    mobileTimeoutRef.current = setTimeout(() => {
      setMobileBeam((current) => ({
        ...current,
        visible: false,
      }));
    }, 800);

    previousMobileSectionRef.current = newSection;
  };

  // =========================
  // ACTIVE SECTION CHANGES
  // =========================

  useEffect(() => {
    if (revealComplete) {
      requestAnimationFrame(() => {
        moveDesktopLight(activeSection);
      });
    }

    if (isMenuOpen) {
      requestAnimationFrame(() => {
        moveMobileLight(activeSection);
      });
    }
  }, [activeSection, isMenuOpen, revealComplete]);

  // =========================
  // SCROLL DETECTION
  // =========================

  useEffect(() => {
    const handleScroll = () => {
      const sections = navLinks
        .map((link) =>
          document.getElementById(getSectionId(link.path))
        )
        .filter(Boolean);

      let currentSection = "home";

      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 220;

        if (window.scrollY >= sectionTop) {
          currentSection = section.id;
        }
      });

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // =========================
  // RESIZE
  // =========================

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMenuOpen(false);

        if (revealComplete) {
          requestAnimationFrame(() => {
            moveDesktopLight(activeSection);
          });
        }
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);

      clearTimeout(desktopTimeoutRef.current);
      clearTimeout(mobileTimeoutRef.current);
    };
  }, [activeSection, revealComplete]);

  // =========================
  // NAVIGATION
  // =========================

  const goToSection = (path, closeMenu = true) => {
    const sectionId = getSectionId(path);
    const section = document.getElementById(sectionId);

    if (!section) return;

    setActiveSection(sectionId);

    section.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    if (closeMenu) {
      setTimeout(() => {
        setIsMenuOpen(false);
      }, 850);
    }
  };

  const handleDesktopClick = (event, path) => {
    event.preventDefault();
    goToSection(path, false);
  };

  const handleMobileClick = (event, path) => {
    event.preventDefault();

    const sectionId = getSectionId(path);

    moveMobileLight(sectionId);
    goToSection(path, true);
  };

  const handleHireMe = () => {
    goToSection("#contact", isMenuOpen);
  };

  return (
    <nav
      className="
        fixed
        top-0
        left-0
        w-full
        z-50
        bg-slate-950/80
        backdrop-blur-xl
        border-b
        border-purple-500/10
        text-white
      "
    >
      {/* Bottom Glow */}
      <div
        className="
          absolute
          bottom-0
          left-0
          w-full
          h-px
          bg-gradient-to-r
          from-transparent
          via-purple-500/50
          to-transparent
        "
      />

      {/* Magic Flash */}
      <AnimatePresence>
        {magicActivated && !revealComplete && (
          <motion.div
            initial={{
              left: "-20%",
              opacity: 0,
            }}
            animate={{
              left: "120%",
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              delay: 0.5,
              ease: "easeInOut",
            }}
            className="
              absolute
              top-0
              bottom-0
              w-32
              bg-gradient-to-r
              from-transparent
              via-purple-400/20
              to-transparent
              blur-xl
              pointer-events-none
            "
          />
        )}
      </AnimatePresence>

      {/* MAIN BAR */}
      <div
        className="
          max-w-7xl
          mx-auto
          px-4
          sm:px-6
          lg:px-8
          py-4
          lg:py-5
          flex
          items-center
          justify-between
        "
      >
        <Logo />

        {/* DESKTOP NAVIGATION */}
        <div
          ref={desktopNavRef}
          className="
            relative
            hidden
            lg:block
            px-4
            py-2
          "
        >
          {/* Travelling Beam */}
          <AnimatePresence>
            {revealComplete && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{
                  left: travelBeam.left,
                  width: travelBeam.width,
                  opacity: travelBeam.visible
                    ? [0, 1, 0.9, 0]
                    : 0,
                }}
                className="
                  absolute
                  bottom-0
                  h-[3px]
                  rounded-full
                  pointer-events-none
                  bg-gradient-to-r
                  from-purple-500/10
                  via-purple-400
                  to-cyan-300
                  shadow-[0_0_12px_#a855f7,0_0_28px_#a855f7]
                "
                transition={{
                  duration: 0.8,
                  ease: "easeInOut",
                }}
              />
            )}
          </AnimatePresence>

          {/* Active Line */}
          <AnimatePresence>
            {revealComplete && (
              <motion.div
                initial={{
                  opacity: 0,
                  scaleX: 0,
                }}
                animate={{
                  opacity: 1,
                  scaleX: 1,
                  left: indicator.left,
                  width: indicator.width,
                }}
                className="
                  absolute
                  bottom-0
                  h-[3px]
                  rounded-full
                  bg-white
                  origin-center
                  shadow-[0_0_5px_white,0_0_12px_#d8b4fe,0_0_25px_#a855f7,0_0_45px_#7c3aed]
                  pointer-events-none
                "
                transition={{
                  type: "spring",
                  stiffness: 180,
                  damping: 22,
                }}
              />
            )}
          </AnimatePresence>

          {/* Energy Point */}
          <AnimatePresence>
            {revealComplete && (
              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  left:
                    indicator.left +
                    indicator.width / 2 -
                    4,
                }}
                className="
                  absolute
                  bottom-[-3px]
                  w-2
                  h-2
                  rounded-full
                  bg-white
                  pointer-events-none
                  shadow-[0_0_8px_white,0_0_18px_#c084fc,0_0_35px_#a855f7]
                "
                transition={{
                  type: "spring",
                  stiffness: 180,
                  damping: 22,
                }}
              />
            )}
          </AnimatePresence>

          <ul className="relative flex items-center gap-6 xl:gap-8">
            {navLinks.map((link, index) => {
              const sectionId = getSectionId(link.path);
              const isActive = activeSection === sectionId;

              const curvedX =
                (index - (navLinks.length - 1) / 2) * 55;

              return (
                <motion.li
                  key={link.id}
                  initial={false}
                  animate={
                    magicActivated
                      ? {
                          opacity: [0, 0.35, 1],
                          x: [curvedX, curvedX * 0.35, 0],
                          y: [420, 180, 0],
                          scale: [0.25, 0.7, 1],
                          filter: [
                            "blur(14px)",
                            "blur(5px)",
                            "blur(0px)",
                          ],
                        }
                      : {
                          opacity: 0,
                          x: curvedX,
                          y: 420,
                          scale: 0.25,
                          filter: "blur(14px)",
                        }
                  }
                  transition={{
                    duration: NAV_ITEM_DURATION,
                    delay: magicActivated
                      ? NAV_START_DELAY +
                        index * NAV_ITEM_GAP
                      : 0,
                    times: [0, 0.55, 1],
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="relative"
                >
                  {/* Magical Trail */}
                  <AnimatePresence>
                    {magicActivated && !revealComplete && (
                      <motion.span
                        initial={{
                          opacity: 0,
                          height: 0,
                        }}
                        animate={{
                          opacity: [0, 1, 0],
                          height: [0, 120, 0],
                        }}
                        transition={{
                          duration: NAV_ITEM_DURATION,
                          delay:
                            NAV_START_DELAY +
                            index * NAV_ITEM_GAP,
                        }}
                        className="
                          absolute
                          left-1/2
                          bottom-0
                          -translate-x-1/2
                          w-px
                          bg-gradient-to-t
                          from-purple-500
                          via-cyan-300
                          to-transparent
                          shadow-[0_0_12px_#a855f7]
                          pointer-events-none
                        "
                      />
                    )}
                  </AnimatePresence>

                  <a
                    ref={(element) => {
                      desktopLinkRefs.current[sectionId] =
                        element;
                    }}
                    href={link.path}
                    onClick={(event) =>
                      handleDesktopClick(event, link.path)
                    }
                    className={`
                      relative
                      block
                      py-2
                      whitespace-nowrap
                      transition-all
                      duration-300

                      ${
                        isActive && revealComplete
                          ? "text-white drop-shadow-[0_0_8px_rgba(216,180,254,1)]"
                          : "text-gray-400 hover:text-purple-300"
                      }
                    `}
                  >
                    {link.title}
                  </a>
                </motion.li>
              );
            })}
          </ul>
        </div>

        {/* DESKTOP HIRE ME */}
        <motion.button
          onClick={handleHireMe}
          initial={false}
          animate={
            magicActivated
              ? {
                  opacity: [0, 0.4, 1],
                  x: [80, 30, 0],
                  y: [420, 180, 0],
                  scale: [0.25, 0.7, 1],
                  filter: [
                    "blur(14px)",
                    "blur(5px)",
                    "blur(0px)",
                  ],
                }
              : {
                  opacity: 0,
                  x: 80,
                  y: 420,
                  scale: 0.25,
                  filter: "blur(14px)",
                }
          }
          transition={{
            duration: NAV_ITEM_DURATION,
            delay: magicActivated
              ? NAV_START_DELAY +
                navLinks.length * NAV_ITEM_GAP
              : 0,
            times: [0, 0.55, 1],
            ease: [0.16, 1, 0.3, 1],
          }}
          className="
            hidden
            lg:block
            bg-purple-600
            px-6
            py-2
            rounded-lg
            hover:bg-purple-500
            hover:shadow-[0_0_25px_rgba(168,85,247,0.6)]
            transition
            duration-300
          "
        >
          Hire Me
        </motion.button>

        {/* HAMBURGER */}
        <motion.button
          type="button"
          onClick={() =>
            setIsMenuOpen((current) => !current)
          }
          whileTap={{ scale: 0.9 }}
          className="
            lg:hidden
            relative
            z-[60]
            flex
            items-center
            justify-center
            text-purple-300
            hover:text-white
          "
          aria-label="Toggle navigation menu"
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={isMenuOpen ? "close" : "menu"}
              initial={{
                opacity: 0,
                rotate: -90,
                scale: 0.7,
              }}
              animate={{
                opacity: 1,
                rotate: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                rotate: 90,
                scale: 0.7,
              }}
              transition={{
                duration: 0.2,
              }}
              className="
                flex
                text-2xl
                drop-shadow-[0_0_8px_rgba(192,132,252,0.8)]
              "
            >
              {isMenuOpen ? <FaTimes /> : <FaBars />}
            </motion.span>
          </AnimatePresence>
        </motion.button>
      </div>

      {/* MOBILE + TABLET MENU */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{
              opacity: 0,
              height: 0,
            }}
            animate={{
              opacity: 1,
              height: "auto",
            }}
            exit={{
              opacity: 0,
              height: 0,
            }}
            transition={{
              duration: 0.35,
            }}
            className="
              lg:hidden
              overflow-hidden
              border-t
              border-purple-500/10
              bg-slate-950/95
              backdrop-blur-2xl
            "
          >
            <div
              className="
                max-w-7xl
                mx-auto
                px-4
                sm:px-6
                py-5
              "
            >
              <div
                ref={mobileNavRef}
                className="relative"
              >
                {/* Vertical Beam */}
                <motion.div
                  className="
                    absolute
                    left-[9px]
                    w-[3px]
                    rounded-full
                    pointer-events-none
                    bg-gradient-to-b
                    from-purple-500
                    via-white
                    to-cyan-300
                    shadow-[0_0_10px_white,0_0_22px_#a855f7]
                  "
                  animate={{
                    top: mobileBeam.top,
                    height: mobileBeam.height,
                    opacity: mobileBeam.visible
                      ? [0, 1, 0.9, 0]
                      : 0,
                  }}
                  transition={{
                    duration: 0.8,
                    ease: "easeInOut",
                  }}
                />

                {/* Mobile Active Light */}
                <motion.div
                  className="
                    absolute
                    left-[7px]
                    w-[7px]
                    rounded-full
                    bg-white
                    pointer-events-none
                    shadow-[0_0_8px_white,0_0_20px_#a855f7,0_0_35px_#7c3aed]
                  "
                  animate={{
                    top: mobileIndicator.top,
                    height: mobileIndicator.height,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 180,
                    damping: 22,
                  }}
                />

                <ul className="relative space-y-2">
                  {navLinks.map((link, index) => {
                    const sectionId =
                      getSectionId(link.path);

                    const isActive =
                      activeSection === sectionId;

                    return (
                      <motion.li
                        key={link.id}
                        initial={{
                          opacity: 0,
                          x: -25,
                        }}
                        animate={{
                          opacity: 1,
                          x: 0,
                        }}
                        transition={{
                          delay: index * 0.05,
                        }}
                      >
                        <a
                          ref={(element) => {
                            mobileLinkRefs.current[sectionId] =
                              element;
                          }}
                          href={link.path}
                          onClick={(event) =>
                            handleMobileClick(
                              event,
                              link.path
                            )
                          }
                          className={`
                            relative
                            flex
                            items-center
                            ml-6
                            px-5
                            py-4
                            rounded-xl
                            border
                            transition-all
                            duration-300

                            ${
                              isActive
                                ? "text-white bg-purple-500/15 border-purple-500/40 shadow-[0_0_25px_rgba(168,85,247,0.15)]"
                                : "text-gray-400 border-transparent hover:text-white hover:bg-white/5"
                            }
                          `}
                        >
                          {link.title}
                        </a>
                      </motion.li>
                    );
                  })}
                </ul>
              </div>

              <motion.button
                onClick={handleHireMe}
                whileTap={{
                  scale: 0.97,
                }}
                className="
                  w-full
                  mt-5
                  py-3
                  rounded-xl
                  bg-purple-600
                  text-white
                  font-medium
                  shadow-[0_0_25px_rgba(168,85,247,0.25)]
                  hover:bg-purple-500
                  transition
                "
              >
                Hire Me
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default Navbar;