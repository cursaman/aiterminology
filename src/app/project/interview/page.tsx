"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { KEYS, getJSON, setJSON } from "@/lib/storage";

type Project = {
  projectName: string;
  purpose: string;
  targetUser: string;
  features: string[];
  stack: string[];
};

const questions = [
  ["intent", "이 프로젝트가 해결했으면 하는 가장 큰 문제는 무엇인가요?", "선택지가 너무 많아 결정하는 데 시간이 오래 걸린다."],
  ["outcome", "사용자가 이 서비스를 이용한 뒤 얻어야 하는 결과는 무엇인가요?", "원하는 정보를 빠르게 찾고 선택할 수 있다."],
  ["core", "가장 중요한 기능 하나는 무엇인가요?", "조건에 맞는 결과를 추천한다."],
  ["scope", "첫 번째 버전에서 꼭 만들 기능은 무엇인가요?", "검색, 추천, 상세정보를 만든다."],
  ["exclude", "이번 버전에서 만들지 않을 기능은 무엇인가요?", "회원가입, 결제, 커뮤니티는 만들지 않는다."],
  ["rules", "반드시 지켜야 할 조건은 무엇인가요?", "모바일을 지원하고 실제 데이터를 사용한다."],
  ["success", "사용자 기능 중 무엇이 정상이어야 완료인가요?", "검색, 추천, 상세 페이지가 정상 작동해야 한다."],
  ["technical", "기술적으로 무엇을 통과해야 하나요?", "npm run build 성공과 TypeScript 오류 0개를 확인한다."],
] as const;

export default function Interview() {
  const router = useRouter();
  const [project, setProject] = useState<Project | null>(null);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [value, setValue] = useState("");

  useEffect(() => {
    setProject(getJSON<Project | null>(KEYS.project, null));
    const old = getJSON<{ answers: Record<string, string>; index: number } | null>(
      KEYS.interview,
      null,
    );
    if (old) {
      const savedIndex = Number.isInteger(old.index)
        ? Math.max(0, Math.min(old.index, questions.length - 1))
        : 0;
      setAnswers(old.answers);
      setIndex(savedIndex);
      setValue(old.answers[questions[savedIndex][0]] || "");
    }
  }, []);

  if (!project) {
    return (
      <div className="card">
        <h1>프로젝트가 없습니다.</h1>
        <p>먼저 만들고 싶은 프로젝트를 선택해주세요.</p>
        <Link className="btn" href="/project">프로젝트 선택</Link>
      </div>
    );
  }

  const save = () => {
    if (!value.trim()) return;
    const nextAnswers = { ...answers, [questions[index][0]]: value.trim() };
    setAnswers(nextAnswers);
    if (index < questions.length - 1) {
      setJSON(KEYS.interview, { answers: nextAnswers, index: index + 1, complete: false });
      setIndex(index + 1);
      setValue(nextAnswers[questions[index + 1][0]] || "");
    } else {
      setJSON(KEYS.interview, { answers: nextAnswers, index, complete: true });
      router.push("/project/documents");
    }
  };

  const goBack = () => {
    if (index === 0) return;
    const currentAnswers = value.trim()
      ? { ...answers, [questions[index][0]]: value.trim() }
      : answers;
    const previousIndex = index - 1;
    setAnswers(currentAnswers);
    setIndex(previousIndex);
    setValue(currentAnswers[questions[previousIndex][0]] || "");
  };

  const progress = Math.round(((index + 1) / questions.length) * 100);
  const question = questions[index];

  return (
    <div className="interview-page">
      <p className="eyebrow">프로젝트 만들기 · 2단계</p>
      <h1>프로젝트 심층 질문</h1>
      <p className="interview-subtitle">Deep Interview · {project.projectName}</p>
      <div
        className="progress"
        role="progressbar"
        aria-label="심층 질문 진행률"
        aria-valuemin={0}
        aria-valuemax={questions.length}
        aria-valuenow={index + 1}
      >
        <span style={{ width: `${progress}%` }} />
      </div>
      <p className="progress-copy">
        <strong>{index + 1} / {questions.length} 단계</strong>
        <span>{progress}% 진행</span>
      </p>
      <section className="card interview-card">
        <p className="question-number">질문 {index + 1}</p>
        <h2>{question[1]}</h2>
        <div className="answer-example">
          <span>답변 예시</span>
          <p>{question[2]}</p>
          <button type="button" onClick={() => setValue(question[2])}>예시 답변 사용</button>
        </div>
        <label className="form-field" htmlFor="interview-answer">
          <span>나의 답변</span>
          <textarea
            id="interview-answer"
            rows={2}
            value={value}
            onChange={(event) => setValue(event.target.value)}
            placeholder="짧은 문장으로 편하게 입력해보세요."
          />
        </label>
        <div className="interview-actions">
          {index > 0 && <button className="btn alt" onClick={goBack}>← 이전</button>}
          <button className="btn" onClick={save} disabled={!value.trim()}>
            {index === questions.length - 1 ? "문서 만들기 →" : "다음 질문 →"}
          </button>
        </div>
      </section>
    </div>
  );
}
