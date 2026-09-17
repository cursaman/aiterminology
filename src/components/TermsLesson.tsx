"use client";

import Link from "next/link";
import {useEffect, useState} from "react";
import {aiTerms, termCategories, type TermCategory} from "@/data/aiTerms";
import {KEYS, getJSON, setJSON} from "@/lib/storage";

type CategoryFilter = "all" | TermCategory;

const quizQuestions = [
  {
    question: "AI가 알려준 통계가 정확한지 확인하려면 어떻게 해야 할까요?",
    options: ["AI의 답을 그대로 믿는다", "공식 자료와 출처를 직접 확인한다", "같은 질문을 한 번 더 한다"],
    correctAnswer: "공식 자료와 출처를 직접 확인한다",
    explanation: "AI는 사실이 아닌 내용을 그럴듯하게 말할 수 있으므로 중요한 정보는 출처를 확인해야 합니다.",
  },
  {
    question: "RAG는 AI가 답하기 전에 무엇을 하게 만드는 방법일까요?",
    options: ["관련 자료를 검색한다", "그림을 그린다", "모델을 새로 학습한다"],
    correctAnswer: "관련 자료를 검색한다",
    explanation: "RAG는 질문과 관련된 자료를 먼저 찾고, 그 내용을 답변에 활용합니다.",
  },
  {
    question: "Prompt는 무엇일까요?",
    options: ["AI에게 주는 질문이나 지시", "AI가 저장된 컴퓨터", "글을 숫자로 바꾸는 기술"],
    correctAnswer: "AI에게 주는 질문이나 지시",
    explanation: "Prompt는 AI에게 원하는 일과 조건을 전달하는 질문 또는 지시문입니다.",
  },
] as const;

export default function TermsLesson() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<CategoryFilter>("all");
  const [showAll, setShowAll] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, string>>({});
  const [quizResult, setQuizResult] = useState<number | null>(null);

  useEffect(() => {
    const progress = getJSON<Record<string, boolean>>(KEYS.progress, {});
    setIsComplete(Boolean(progress.termsQuiz));
    setJSON(KEYS.last, "/terms");
  }, []);

  const normalizedQuery = query.trim().toLowerCase();
  const matchingTerms = aiTerms.filter((term) => {
    const matchesCategory = category === "all" || term.category === category;
    const searchableText = [
      term.name,
      term.koreanName,
      term.fullName,
      term.pronunciation,
      term.oneLine,
      term.example,
    ].filter(Boolean).join(" ").toLowerCase();

    return matchesCategory && searchableText.includes(normalizedQuery);
  });

  const isIntroView = category === "all" && normalizedQuery.length === 0;
  const visibleTerms = isIntroView && !showAll
    ? matchingTerms.slice(0, 5)
    : matchingTerms;
  const allQuizQuestionsAnswered = Object.keys(quizAnswers).length === quizQuestions.length;

  function selectCategory(nextCategory: CategoryFilter) {
    setCategory(nextCategory);
    setShowAll(nextCategory !== "all");
  }

  function selectQuizAnswer(questionIndex: number, answer: string) {
    setQuizAnswers((current) => ({...current, [questionIndex]: answer}));
    setQuizResult(null);
  }

  function checkQuiz() {
    if (!allQuizQuestionsAnswered) return;

    const score = quizQuestions.filter(
      (question, index) => quizAnswers[index] === question.correctAnswer,
    ).length;
    setQuizResult(score);

    if (score === quizQuestions.length) {
      const progress = getJSON<Record<string, boolean>>(KEYS.progress, {});
      setJSON(KEYS.progress, {...progress, terms: true, termsQuiz: true});
      setIsComplete(true);
    }
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
                onClick={() => selectCategory(item.id)}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {visibleTerms.length > 0 ? (
          <>
            <div className="term-grid">
              {visibleTerms.map((term, index) => (
                <article className="term-card" id={term.id} key={term.id}>
                  <p className="term-number">{String(index + 1).padStart(2, "0")}</p>
                  <h3>{term.name}</h3>
                  <div className="term-name-meta">
                    <p className="term-korean">{term.koreanName}</p>
                    {term.pronunciation ? <span>읽는 법: {term.pronunciation}</span> : null}
                  </div>
                  {term.fullName ? <p className="term-full-name">{term.fullName}</p> : null}
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

            {isIntroView && !showAll ? (
              <div className="terms-more">
                <p>기초 용어 5개를 먼저 살펴봤습니다.</p>
                <button className="btn alt" type="button" onClick={() => setShowAll(true)}>
                  나머지 {aiTerms.length - 5}개 용어 보기
                </button>
              </div>
            ) : null}
          </>
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
          <span>사용자가 사실 여부 확인</span>
        </div>
      </section>

      <section className="term-quiz" aria-labelledby="term-quiz-title">
        <p className="eyebrow">LEARNING CHECK</p>
        <h2 id="term-quiz-title">3문제로 이해도 확인하기</h2>
        <p className="muted">모두 맞히면 AI 용어 학습이 완료됩니다.</p>

        <div className="quiz-list">
          {quizQuestions.map((quiz, questionIndex) => (
            <fieldset className="quiz-question" key={quiz.question}>
              <legend>{questionIndex + 1}. {quiz.question}</legend>
              <div className="quiz-options">
                {quiz.options.map((option) => (
                  <label key={option}>
                    <input
                      type="radio"
                      name={`quiz-${questionIndex}`}
                      value={option}
                      checked={quizAnswers[questionIndex] === option}
                      onChange={() => selectQuizAnswer(questionIndex, option)}
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
              {quizResult !== null ? (
                <p className={quizAnswers[questionIndex] === quiz.correctAnswer ? "quiz-correct" : "quiz-wrong"}>
                  {quizAnswers[questionIndex] === quiz.correctAnswer
                    ? `정답입니다. ${quiz.explanation}`
                    : `다시 생각해보세요. ${quiz.explanation}`}
                </p>
              ) : null}
            </fieldset>
          ))}
        </div>

        <button
          className="btn"
          type="button"
          disabled={isComplete || !allQuizQuestionsAnswered}
          onClick={checkQuiz}
        >
          {isComplete ? "✓ AI 용어 학습 완료" : "정답 확인"}
        </button>

        {!allQuizQuestionsAnswered && !isComplete ? (
          <p className="quiz-help">세 문제에 모두 답하면 정답을 확인할 수 있습니다.</p>
        ) : null}
        {quizResult !== null && quizResult < quizQuestions.length ? (
          <p className="quiz-result" role="status">
            {quizQuestions.length}개 중 {quizResult}개를 맞혔습니다. 답을 바꾼 뒤 다시 확인해보세요.
          </p>
        ) : null}
        {isComplete ? (
          <p className="quiz-result success" role="status">모두 맞혔습니다. 다음 학습으로 이동해보세요!</p>
        ) : null}
      </section>

      <nav className="lesson-nav" aria-label="학습 페이지 이동">
        <Link href="/">← 홈</Link>
        <Link href="/ax">AX / AI Native →</Link>
      </nav>
    </article>
  );
}

