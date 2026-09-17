"use client";

import Link from "next/link";
import {useEffect, useState} from "react";
import {aiTerms, termCategories, type TermCategory} from "@/data/aiTerms";
import {KEYS, getJSON, setJSON} from "@/lib/storage";

type CategoryFilter = "all" | TermCategory;

export default function TermsLesson() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<CategoryFilter>("all");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const progress = getJSON<Record<string, boolean>>(KEYS.progress, {});
    setIsComplete(Boolean(progress.terms));
    setJSON(KEYS.last, "/terms");
  }, []);

  const normalizedQuery = query.trim().toLowerCase();
  const visibleTerms = aiTerms.filter((term) => {
    const matchesCategory = category === "all" || term.category === category;
    const searchableText = [
      term.name,
      term.koreanName,
      term.oneLine,
      term.example,
    ].join(" ").toLowerCase();

    return matchesCategory && searchableText.includes(normalizedQuery);
  });

  function completeLesson() {
    const progress = getJSON<Record<string, boolean>>(KEYS.progress, {});
    setJSON(KEYS.progress, {...progress, terms: true});
    setIsComplete(true);
  }

  return (
    <article className="terms-lesson">
      <p className="eyebrow">LEARN 1 / 7</p>
      <h1>처음 만나는 AI 용어</h1>
      <p className="lead">
        어려운 정의를 외우지 않아도 됩니다. 쉬운 설명과 생활 속 비유로
        뜻을 이해한 뒤, 용어들이 어떻게 연결되는지 살펴보세요.
      </p>

      <section className="learning-guide" aria-labelledby="learning-guide-title">
        <div>
          <p className="eyebrow">3단계로 읽기</p>
          <h2 id="learning-guide-title">뜻 → 비유 → 예시</h2>
        </div>
        <ol>
          <li><b>뜻</b>으로 핵심을 한 문장에 이해합니다.</li>
          <li><b>비유</b>로 이미 아는 경험과 연결합니다.</li>
          <li><b>예시</b>로 실제 사용 장면을 떠올립니다.</li>
        </ol>
      </section>

      <section aria-labelledby="term-list-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow">AI BEGINNER DICTIONARY</p>
            <h2 id="term-list-title">꼭 알아야 할 용어</h2>
          </div>
          <p className="term-count">총 {aiTerms.length}개</p>
        </div>

        <div className="term-tools">
          <label className="term-search">
            <span>용어 검색</span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="예: 프롬프트, 검색, 이미지"
            />
          </label>

          <div className="term-filters" aria-label="용어 분야 선택">
            {termCategories.map((item) => (
              <button
                type="button"
                className={category === item.id ? "filter active" : "filter"}
                aria-pressed={category === item.id}
                key={item.id}
                onClick={() => setCategory(item.id)}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {visibleTerms.length > 0 ? (
          <div className="term-grid">
            {visibleTerms.map((term, index) => (
              <article className="term-card" id={term.id} key={term.id}>
                <p className="term-number">{String(index + 1).padStart(2, "0")}</p>
                <h3>{term.name}</h3>
                <p className="term-korean">{term.koreanName}</p>
                <p className="term-definition">{term.oneLine}</p>

                <dl className="term-details">
                  <div>
                    <dt>쉽게 비유하면</dt>
                    <dd>{term.analogy}</dd>
                  </div>
                  <div>
                    <dt>실제 예시</dt>
                    <dd>{term.example}</dd>
                  </div>
                  <div>
                    <dt>함께 보면 좋은 용어</dt>
                    <dd>{term.connectsTo.join(" · ")}</dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>
        ) : (
          <div className="empty-terms" role="status">
            <h3>검색 결과가 없습니다.</h3>
            <p>다른 단어를 입력하거나 ‘전체’를 선택해보세요.</p>
          </div>
        )}
      </section>

      <section className="term-flow" aria-labelledby="term-flow-title">
        <p className="eyebrow">한눈에 연결하기</p>
        <h2 id="term-flow-title">AI에게 질문하면 벌어지는 일</h2>
        <div className="flow-steps">
          <span>내가 Prompt 입력</span>
          <b aria-hidden="true">→</b>
          <span>문장을 Token으로 나눔</span>
          <b aria-hidden="true">→</b>
          <span>LLM이 답변 생성</span>
          <b aria-hidden="true">→</b>
          <span>사실 여부 확인</span>
        </div>
      </section>

      <div className="actions">
        <button className="btn" type="button" onClick={completeLesson}>
          {isComplete ? "✓ AI 용어 학습 완료" : "AI 용어 학습 완료"}
        </button>
      </div>

      <nav className="lesson-nav" aria-label="학습 페이지 이동">
        <Link href="/">← 홈</Link>
        <Link href="/ax">AX / AI Native →</Link>
      </nav>
    </article>
  );
}

