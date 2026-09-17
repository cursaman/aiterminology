import type {Metadata} from "next";
import TermsLesson from "@/components/TermsLesson";

export const metadata: Metadata = {
  title: "초보자를 위한 AI 용어",
  description: "AI, LLM, 프롬프트, 토큰, RAG 등 꼭 필요한 AI 용어를 쉬운 비유와 예시로 배웁니다.",
};

export default function TermsPage() {
  return <TermsLesson />;
}

