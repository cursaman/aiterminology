import Link from "next/link";

const navigation = [
  { href: "/terms", label: "학습하기" },
  { href: "/project", label: "프로젝트" },
  { href: "/my-progress", label: "나의 학습" },
];

export default function Header() {
  return (
    <header>
      <nav className="nav" aria-label="주요 메뉴">
        <Link className="brand" href="/">
          AX START
        </Link>
        <div className="desktop-nav">
          {navigation.map((item) => (
            <Link href={item.href} key={item.href}>
              {item.label}
            </Link>
          ))}
        </div>
        <details className="mobile-nav">
          <summary>메뉴</summary>
          <div>
            {navigation.map((item) => (
              <Link href={item.href} key={item.href}>
                {item.label}
              </Link>
            ))}
          </div>
        </details>
      </nav>
    </header>
  );
}
