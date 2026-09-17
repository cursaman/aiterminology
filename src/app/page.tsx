import Link from "next/link";
import { lessons } from "@/data/lessons";

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">AI 초보자에서 AI 빌더까지</p>
          <h1>
            AI를 배우고,
            <br />첫 프로젝트까지.
          </h1>
          <p className="lead">
            어려운 용어는 쉽게 배우고, 하나의 예시 프로젝트를 따라가며
            나만의 개발 문서까지 완성합니다.
          </p>
          <div className="actions">
            <Link className="btn" href="/terms">AI 공부 시작하기</Link>
            <Link className="btn alt" href="/project">프로젝트 만들기</Link>
          </div>
        </div>
        <div className="hero-visual" aria-label="배우기, 만들기, 검증하기 3단계 과정">
          <p className="hero-visual-label">AX START 학습 여정</p>
          <div className="hero-path">
            <div><b>01</b><span>쉽게 배우기</span><small>AI 핵심 개념 7단계</small></div>
            <i>→</i>
            <div><b>02</b><span>직접 만들기</span><small>나만의 프로젝트 설계</small></div>
            <i>→</i>
            <div><b>03</b><span>결과 확인하기</span><small>개발 문서 4개 완성</small></div>
          </div>
          <div className="hero-stats">
            <span><strong>7</strong> 학습 단계</span>
            <span><strong>15</strong> 핵심 용어</span>
            <span><strong>4</strong> 완성 문서</span>
          </div>
        </div>
      </section>

      <section className="roadmap-section">
        <div className="section-title">
          <div>
            <p className="eyebrow">차근차근 배우는 순서</p>
            <h2>7단계 학습 로드맵</h2>
          </div>
          <p>앞 단계부터 순서대로 따라오면 AI 프로젝트의 전체 흐름을 이해할 수 있습니다.</p>
        </div>
        <div className="roadmap-grid">
          {lessons.map((lesson, index) => (
            <Link className="roadmap-card" href={`/${lesson.slug}`} key={lesson.slug}>
              <span className="roadmap-step">{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3>{lesson.title}</h3>
                <p>{lesson.summary}</p>
              </div>
              <span className="card-link">학습하기 →</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="build-callout">
        <div>
          <p className="eyebrow">배운 내용을 결과물로</p>
          <h2>이제 나의 첫 AI 프로젝트를 설계해보세요.</h2>
          <p>프로젝트 선택과 심층 질문을 거쳐 개발에 필요한 문서 네 개를 완성합니다.</p>
        </div>
        <Link className="btn" href="/project">프로젝트 시작하기 →</Link>
      </section>
    </>
  );
}
