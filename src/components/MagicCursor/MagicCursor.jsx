import { useEffect, useRef } from "react";

function MagicCursor() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let animationFrameId;

    let pointerX = -200;
    let pointerY = -200;
    let isVisible = false;
    let particles = [];

    // Fixed angle — wand never rotates
    const angle = -0.8;

    const woodGrains = [
      { distance: 0.24, length: 0.1, offset: 1 },
      { distance: 0.39, length: 0.13, offset: -1 },
      { distance: 0.55, length: 0.1, offset: 1.5 },
      { distance: 0.7, length: 0.12, offset: -1.5 },
    ];

    const getWandLength = () => {
      if (window.innerWidth < 640) {
        return 70;
      }

      if (window.innerWidth < 1024) {
        return 90;
      }

      return 110;
    };

    const resizeCanvas = () => {
      const dpr = Math.min(
        window.devicePixelRatio || 1,
        2
      );

      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;

      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const createParticles = (x, y, amount = 3) => {
      for (let i = 0; i < amount; i++) {
        particles.push({
          x: x + (Math.random() - 0.5) * 10,
          y: y + (Math.random() - 0.5) * 10,

          size: Math.random() * 2.5 + 1,

          speedX: (Math.random() - 0.5) * 1.4,
          speedY: (Math.random() - 0.5) * 1.4,

          life: 1,
        });
      }

      if (particles.length > 150) {
        particles = particles.slice(-150);
      }
    };

    const updatePointer = (x, y) => {
      pointerX = x;
      pointerY = y;
      isVisible = true;

      createParticles(pointerX, pointerY);
    };

    // =========================
    // DESKTOP MOUSE
    // =========================

    const handleMouseMove = (event) => {
      updatePointer(
        event.clientX,
        event.clientY
      );
    };

    const handleMouseLeave = () => {
      isVisible = false;
    };

    const handleMouseEnter = () => {
      isVisible = true;
    };

    // =========================
    // MOBILE + TABLET TOUCH
    // =========================

    const handleTouchStart = (event) => {
      const touch = event.touches[0];

      if (!touch) return;

      updatePointer(
        touch.clientX,
        touch.clientY
      );

      createParticles(
        touch.clientX,
        touch.clientY,
        8
      );
    };

    const handleTouchMove = (event) => {
      const touch = event.touches[0];

      if (!touch) return;

      updatePointer(
        touch.clientX,
        touch.clientY
      );
    };

    const handleTouchEnd = () => {
      // Keep particles fading after finger lifts
      isVisible = false;

      pointerX = -200;
      pointerY = -200;
    };

    // =========================
    // PARTICLES
    // =========================

    const drawParticles = () => {
      particles.forEach((particle) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        particle.life -= 0.025;
        particle.size *= 0.98;

        ctx.beginPath();

        ctx.arc(
          particle.x,
          particle.y,
          particle.size,
          0,
          Math.PI * 2
        );

        ctx.fillStyle = `rgba(
          216,
          180,
          254,
          ${particle.life}
        )`;

        ctx.shadowBlur = 15;
        ctx.shadowColor = "#a855f7";

        ctx.fill();
      });

      particles = particles.filter(
        (particle) => particle.life > 0
      );

      ctx.shadowBlur = 0;
    };

    // =========================
    // WOODEN WAND
    // =========================

    const drawWand = () => {
      if (!isVisible) return;

      const wandLength = getWandLength();

      const tipX = pointerX;
      const tipY = pointerY;

      const endX =
        tipX - Math.cos(angle) * wandLength;

      const endY =
        tipY - Math.sin(angle) * wandLength;

      const perpX = -Math.sin(angle);
      const perpY = Math.cos(angle);

      const handleWidth =
        window.innerWidth < 640 ? 4.5 : 6;

      ctx.save();

      // Wand shadow
      ctx.beginPath();
      ctx.moveTo(tipX, tipY);
      ctx.lineTo(endX, endY);

      ctx.lineWidth = handleWidth * 2;
      ctx.lineCap = "round";

      ctx.strokeStyle =
        "rgba(0, 0, 0, 0.4)";

      ctx.shadowBlur = 14;
      ctx.shadowColor =
        "rgba(0, 0, 0, 0.9)";

      ctx.stroke();

      ctx.shadowBlur = 0;

      // Wooden gradient
      const woodGradient =
        ctx.createLinearGradient(
          tipX,
          tipY,
          endX,
          endY
        );

      woodGradient.addColorStop(
        0,
        "#b9783a"
      );

      woodGradient.addColorStop(
        0.2,
        "#8b5528"
      );

      woodGradient.addColorStop(
        0.5,
        "#6f421f"
      );

      woodGradient.addColorStop(
        0.75,
        "#4a2a16"
      );

      woodGradient.addColorStop(
        1,
        "#24130b"
      );

      // Main body
      ctx.beginPath();

      ctx.moveTo(tipX, tipY);

      ctx.lineTo(
        endX + perpX * handleWidth,
        endY + perpY * handleWidth
      );

      ctx.quadraticCurveTo(
        endX - Math.cos(angle) * 9,
        endY - Math.sin(angle) * 9,

        endX - perpX * handleWidth,
        endY - perpY * handleWidth
      );

      ctx.closePath();

      ctx.fillStyle = woodGradient;
      ctx.fill();

      // Wood highlight
      ctx.beginPath();

      ctx.moveTo(
        tipX - Math.cos(angle) * 12,
        tipY - Math.sin(angle) * 12
      );

      ctx.lineTo(
        endX + perpX * 1.5,
        endY + perpY * 1.5
      );

      ctx.lineWidth = 1.5;
      ctx.lineCap = "round";

      ctx.strokeStyle =
        "rgba(255, 210, 150, 0.45)";

      ctx.stroke();

      // Wood grain
      woodGrains.forEach((grain) => {
        const distance =
          wandLength * grain.distance;

        const grainLength =
          wandLength * grain.length;

        const startX =
          tipX -
          Math.cos(angle) * distance +
          perpX * grain.offset;

        const startY =
          tipY -
          Math.sin(angle) * distance +
          perpY * grain.offset;

        const grainEndX =
          tipX -
          Math.cos(angle) *
            (distance + grainLength) +
          perpX * grain.offset;

        const grainEndY =
          tipY -
          Math.sin(angle) *
            (distance + grainLength) +
          perpY * grain.offset;

        ctx.beginPath();

        ctx.moveTo(startX, startY);
        ctx.lineTo(grainEndX, grainEndY);

        ctx.lineWidth = 1;

        ctx.strokeStyle =
          "rgba(35, 17, 8, 0.65)";

        ctx.stroke();
      });

      // Handle rings
      for (let i = 0; i < 3; i++) {
        const distance =
          wandLength * (0.75 + i * 0.075);

        const ringX =
          tipX -
          Math.cos(angle) * distance;

        const ringY =
          tipY -
          Math.sin(angle) * distance;

        ctx.beginPath();

        ctx.moveTo(
          ringX +
            perpX *
              (handleWidth - 1),
          ringY +
            perpY *
              (handleWidth - 1)
        );

        ctx.lineTo(
          ringX -
            perpX *
              (handleWidth - 1),
          ringY -
            perpY *
              (handleWidth - 1)
        );

        ctx.lineWidth = 2;

        ctx.strokeStyle =
          "rgba(30, 15, 8, 0.85)";

        ctx.stroke();
      }

      // Handle end
      ctx.beginPath();

      ctx.arc(
        endX,
        endY,
        handleWidth - 0.5,
        0,
        Math.PI * 2
      );

      ctx.fillStyle = "#2b170c";
      ctx.fill();

      ctx.restore();
    };

    // =========================
    // MAGIC LIGHTNING TIP
    // =========================

    const drawMagicTip = () => {
      if (!isVisible) return;

      const glowSize =
        window.innerWidth < 640 ? 28 : 36;

      const glow =
        ctx.createRadialGradient(
          pointerX,
          pointerY,
          0,
          pointerX,
          pointerY,
          glowSize
        );

      glow.addColorStop(
        0,
        "rgba(255, 255, 255, 1)"
      );

      glow.addColorStop(
        0.15,
        "rgba(233, 213, 255, 1)"
      );

      glow.addColorStop(
        0.4,
        "rgba(168, 85, 247, 0.7)"
      );

      glow.addColorStop(
        1,
        "rgba(168, 85, 247, 0)"
      );

      ctx.beginPath();

      ctx.arc(
        pointerX,
        pointerY,
        glowSize,
        0,
        Math.PI * 2
      );

      ctx.fillStyle = glow;
      ctx.fill();

      // White core
      ctx.beginPath();

      ctx.arc(
        pointerX,
        pointerY,
        4,
        0,
        Math.PI * 2
      );

      ctx.fillStyle = "white";

      ctx.shadowBlur = 30;
      ctx.shadowColor = "white";

      ctx.fill();

      // Horizontal + vertical lightning
      const sparkSize =
        window.innerWidth < 640 ? 10 : 13;

      ctx.beginPath();

      ctx.moveTo(
        pointerX - sparkSize,
        pointerY
      );

      ctx.lineTo(
        pointerX + sparkSize,
        pointerY
      );

      ctx.moveTo(
        pointerX,
        pointerY - sparkSize
      );

      ctx.lineTo(
        pointerX,
        pointerY + sparkSize
      );

      ctx.strokeStyle =
        "rgba(255, 255, 255, 0.95)";

      ctx.lineWidth = 1.2;

      ctx.shadowBlur = 15;
      ctx.shadowColor = "#d8b4fe";

      ctx.stroke();

      // Diagonal lightning
      const diagonal = sparkSize * 0.55;

      ctx.beginPath();

      ctx.moveTo(
        pointerX - diagonal,
        pointerY - diagonal
      );

      ctx.lineTo(
        pointerX + diagonal,
        pointerY + diagonal
      );

      ctx.moveTo(
        pointerX + diagonal,
        pointerY - diagonal
      );

      ctx.lineTo(
        pointerX - diagonal,
        pointerY + diagonal
      );

      ctx.strokeStyle =
        "rgba(216, 180, 254, 0.75)";

      ctx.lineWidth = 0.8;
      ctx.stroke();

      ctx.shadowBlur = 0;
    };

    // =========================
    // ANIMATION LOOP
    // =========================

    const animate = () => {
      ctx.clearRect(
        0,
        0,
        window.innerWidth,
        window.innerHeight
      );

      drawParticles();
      drawWand();
      drawMagicTip();

      animationFrameId =
        requestAnimationFrame(animate);
    };

    resizeCanvas();

    // Desktop
    window.addEventListener(
      "mousemove",
      handleMouseMove
    );

    document.addEventListener(
      "mouseleave",
      handleMouseLeave
    );

    document.addEventListener(
      "mouseenter",
      handleMouseEnter
    );

    // Mobile + tablet
    window.addEventListener(
      "touchstart",
      handleTouchStart,
      { passive: true }
    );

    window.addEventListener(
      "touchmove",
      handleTouchMove,
      { passive: true }
    );

    window.addEventListener(
      "touchend",
      handleTouchEnd
    );

    window.addEventListener(
      "touchcancel",
      handleTouchEnd
    );

    window.addEventListener(
      "resize",
      resizeCanvas
    );

    animate();

    return () => {
      window.removeEventListener(
        "mousemove",
        handleMouseMove
      );

      document.removeEventListener(
        "mouseleave",
        handleMouseLeave
      );

      document.removeEventListener(
        "mouseenter",
        handleMouseEnter
      );

      window.removeEventListener(
        "touchstart",
        handleTouchStart
      );

      window.removeEventListener(
        "touchmove",
        handleTouchMove
      );

      window.removeEventListener(
        "touchend",
        handleTouchEnd
      );

      window.removeEventListener(
        "touchcancel",
        handleTouchEnd
      );

      window.removeEventListener(
        "resize",
        resizeCanvas
      );

      cancelAnimationFrame(
        animationFrameId
      );
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="
        fixed
        inset-0
        z-[9999]
        pointer-events-none
      "
    />
  );
}

export default MagicCursor;