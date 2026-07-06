function Button({
  text,
  variant = "primary",
  onClick,
  href,
  target,
  download,
}) {
  const baseStyle =
    "inline-flex items-center justify-center px-8 py-4 rounded-xl font-medium transition duration-300";

  const styles = {
    primary:
      "bg-purple-600 hover:bg-purple-700 hover:scale-105 shadow-lg shadow-purple-500/30",

    outline:
      "border border-purple-500 hover:bg-purple-600 hover:scale-105",
  };

  const className = `${baseStyle} ${styles[variant]}`;

  // If href exists, render as a link
  if (href) {
    return (
      <a
        href={href}
        target={target}
        download={download}
        rel={
          target === "_blank"
            ? "noopener noreferrer"
            : undefined
        }
        className={className}
      >
        {text}
      </a>
    );
  }

  // Otherwise, keep normal button behavior
  return (
    <button
      type="button"
      onClick={onClick}
      className={className}
    >
      {text}
    </button>
  );
}

export default Button;