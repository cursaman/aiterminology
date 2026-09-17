"use client";

import Link from "next/link";
import {useEffect, useState} from "react";
import {aiTerms, termCategories, type TermCategory} from "@/data/aiTerms";
import {termQuizQuestions, type QuizQuestion} from "@/data/termQuiz";
import {KEYS, getJSON, setJSON} from "@/lib/storage";

type CategoryFilter = "all" | TermCategory;

const QUIZ_SIZE = 7;
const PASS_SCORE = 6;

function shuffle<T>(items: readonly T[]): T[] {
  const result = [...items];

  for (let index = result.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [result[index], result[randomIndex]] = [result[randomIndex], result[index]];
  }

  return result;
}

function createQuiz(): QuizQuestion[] {
  return shuffle(termQuizQuestions)
    .slice(0, QUIZ_SIZE)
    .map((question) => ({...question, options: shuffle(question.options)}));
}

export default function TermsLesson() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<CategoryFilter>("all");
  const [showAll, setShowAll] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [activeQuiz, setActiveQuiz] = useState<QuizQuestion[]>([]);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, string>>({});
  const [quizResult, setQuizResult] = useState<number | null>(null);

  useEffect(() => {
    const progress = getJSON<Record<string, boolean>>(KEYS.progress, {});
    setIsComplete(Boolean(progress.termsQuiz));
    setActiveQuiz(createQuiz());
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
  const allQuizQuestionsAnswered = activeQuiz.length === QUIZ_SIZE
    && activeQuiz.every((question) => Boolean(quizAnswers[question.id]));

  function selectCategory(nextCategory: CategoryFilter) {
    setCategory(nextCategory);
    setShowAll(nextCategory !== "all");
  }

  function selectQuizAnswer(questionId: string, answer: string) {
    setQuizAnswers((current) => ({...current, [questionId]: answer}));
    setQuizResult(null);
  }

  function checkQuiz() {
    if (!allQuizQuestionsAnswered) return;

    const score = activeQuiz.filter(
      (question) => quizAnswers[question.id] === question.correctAnswer,
    ).length;
    setQuizResult(score);

    if (score >= PASS_SCORE) {
      const progress = getJSON<Record<string, boolean>>(KEYS.progress, {});
      setJSON(KEYS.progress, {...progress, terms: true, termsQuiz: true});
      setIsComplete(true);
    }
  }

  function startNewQuiz() {
    setActiveQuiz(createQuiz());
    setQuizAnswers({});
    setQuizResult(null);
  }

  function reviewTerm(termId: string) {
    setCategory("all");
    setQuery("");
    setShowAll(true);

    window.setTimeout(() => {
      document.getElementById(termId)?.scrollIntoView({behavior: "smooth", block: "center"});
    }, 0);
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
        <h2 id="term-quiz-title">7문제로 이해도 확인하기</h2>
        <p className="muted">
          15문제 은행에서 매번 새로운 7문제가 나옵니다. 6문제 이상 맞히면 학습 완료입니다.
        </p>

        {activeQuiz.length === QUIZ_SIZE ? (
          <div className="quiz-list">
            {activeQuiz.map((quiz, questionIndex) => {
              const isCorrect = quizAnswers[quiz.id] === quiz.correctAnswer;

              return (
                <fieldset className="quiz-question" key={quiz.id}>
                  <legend>{questionIndex + 1}. {quiz.question}</legend>
                  <div className="quiz-options">
                    {quiz.options.map((option) => (
                      <label key={option}>
                        <input
                          type="radio"
                          name={`quiz-${quiz.id}`}
                          value={option}
                          checked={quizAnswers[quiz.id] === option}
                          onChange={() => selectQuizAnswer(quiz.id, option)}
                        />
                        <span>{option}</span>
                      </label>
                    ))}
                  </div>
                  {quizResult !== null ? (
                    <div className={isCorrect ? "quiz-correct" : "quiz-wrong"}>
                      <p>{isCorrect ? "정답입니다." : "다시 복습해보세요."} {quiz.explanation}</p>
                      {!isCorrect ? (
                        <button type="button" onClick={() => reviewTerm(quiz.termId)}>
                          관련 용어 다시 보기
                        </button>
                      ) : null}
                    </div>
                  ) : null}
                </fieldset>
              );
            })}
          </div>
        ) : (
          <p className="quiz-loading" role="status">문제를 준비하고 있습니다.</p>
        )}

        <div className="quiz-actions">
          <button
            className="btn"
            type="button"
            disabled={!allQuizQuestionsAnswered || quizResult !== null}
            onClick={checkQuiz}
          >
            {quizResult !== null ? "채점 완료" : "정답 확인"}
          </button>
          {quizResult !== null || isComplete ? (
            <button className="btn alt" type="button" onClick={startNewQuiz}>
              다른 7문제 풀기
            </button>
          ) : null}
        </div>

        {!allQuizQuestionsAnswered && quizResult === null ? (
          <p className="quiz-help">일곱 문제에 모두 답하면 정답을 확인할 수 있습니다.</p>
        ) : null}
        {quizResult !== null && quizResult < PASS_SCORE ? (
          <p className="quiz-result" role="status">
            7개 중 {quizResult}개를 맞혔습니다. 틀린 용어를 복습한 뒤 다시 도전해보세요.
          </p>
        ) : null}
        {quizResult !== null && quizResult >= PASS_SCORE ? (
          <p className="quiz-result success" role="status">
            7개 중 {quizResult}개를 맞혔습니다. AI 용어 학습을 완료했습니다!
          </p>
        ) : null}
        {isComplete && quizResult === null ? (
          <p className="quiz-result success">완료한 학습입니다. 새로운 7문제로 복습할 수 있습니다.</p>
        ) : null}
      </section>

      <nav className="lesson-nav" aria-label="학습 페이지 이동">
        <Link href="/">← 홈</Link>
        <Link href="/ax">AX / AI Native →</Link>
      </nav>
    </article>
  );
}

