type ProjectIconProps = {
  id: string;
  size?: number;
};

export default function ProjectIcon({ id, size = 24 }: ProjectIconProps) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  const icon = (() => {
    switch (id) {
      case "movie":
        return <><path d="M4 7h16v12H4z" /><path d="m4 7 3-4 3 4 3-4 3 4 3-4" /><path d="m10 11 5 3-5 3z" /></>;
      case "travel":
        return <><path d="m3 11 18-7-7 18-3-8-8-3Z" /><path d="m11 14 4-4" /></>;
      case "food":
        return <><path d="M6 3v8M3 3v5a3 3 0 0 0 6 0V3M6 11v10M16 3v18M16 3c3 2 4 5 4 8h-4" /></>;
      case "golf":
        return <><path d="M6 21h12M9 18h6M12 18V4" /><path d="m12 4 7 2-7 3" /><circle cx="6" cy="17" r="1.5" /></>;
      case "farm":
        return <><path d="M12 21v-9" /><path d="M12 13C6 13 4 9 4 5c5 0 8 2 8 8ZM12 16c5 0 8-3 8-7-5 0-8 2-8 7Z" /></>;
      case "diary":
        return <><path d="M5 4h11a3 3 0 0 1 3 3v13H7a2 2 0 0 1-2-2V4Z" /><path d="M8 4v16M11 8h5M11 12h5" /></>;
      default:
        return <><path d="M9 18h6M10 22h4" /><path d="M8.5 14.5A7 7 0 1 1 15.5 14.5c-1 .7-1.5 1.6-1.5 2.5h-4c0-.9-.5-1.8-1.5-2.5Z" /></>;
    }
  })();

  return <span className="project-icon"><svg {...common}>{icon}</svg></span>;
}
