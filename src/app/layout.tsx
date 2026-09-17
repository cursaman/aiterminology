import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: { default: "AX START | AI 초보자 학습", template: "%s | AX START" },
  description:
    "AI 용어부터 AX, 바이브코딩, Context Engineering, AI Agent, Harness Engineering과 첫 프로젝트까지 단계별로 배웁니다.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <Header />
        <main className="container">{children}</main>
        <footer>
          <div className="footer-inner">
            <div>
              <strong>AX START</strong>
              <p>AI를 쉽게 배우고 첫 프로젝트까지 완성하는 학습 공간</p>
            </div>
            <nav aria-label="하단 메뉴">
              <Link href="/terms">학습하기</Link>
              <Link href="/project">프로젝트 만들기</Link>
              <Link href="/my-progress">나의 학습</Link>
            </nav>
          </div>
        </footer>
      </body>
    </html>
  );
}
