import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
export const metadata: Metadata = {
  title: {default:"AX START | AI 초보자 학습", template:"%s | AX START"},
  description:"AI 용어부터 AX, 바이브코딩, Context Engineering, AI Agent, Harness Engineering과 첫 프로젝트까지 단계별로 배웁니다."
};
export default function RootLayout({children}:{children:React.ReactNode}) {
  return <html lang="ko"><body><Header/><main className="container">{children}</main><footer>AX START · Learn → Build → Verify</footer></body></html>;
}