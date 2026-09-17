"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const learningPaths = ["/terms", "/ax", "/vibe-coding", "/prompt", "/context", "/agent", "/harness"];
const navigation = [
  { href: "/terms", label: "학습하기", section: "learning" },
  { href: "/project", label: "프로젝트", section: "project" },
  { href: "/my-progress", label: "나의 학습", section: "progress" },
];

export default function Header() {
  const pathname = usePathname();
  const isCurrent = (section: string) => {
    if (section === "learning") return learningPaths.includes(pathname);
    if (section === "project") return pathname.startsWith("/project");
    return pathname === "/my-progress";
  };

  const renderLinks = () =>
    navigation.map((item) => {
      const current = isCurrent(item.section);
      return (
        <Link
          href={item.href}
          key={item.href}
          className={current ? "current" : undefined}
          aria-current={current ? "page" : undefined}
        >
          {item.label}
        </Link>
      );
    });

  return (
    <header>
      <nav className="nav" aria-label="주요 메뉴">
        <Link className="brand" href="/" aria-label="AX START 홈">
          <span className="brand-mark">AX</span>
          <span>START</span>
        </Link>
        <div className="desktop-nav">{renderLinks()}</div>
        <details className="mobile-nav">
          <summary>메뉴</summary>
          <div>{renderLinks()}</div>
        </details>
      </nav>
    </header>
  );
}
