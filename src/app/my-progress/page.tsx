"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { lessons } from "@/data/lessons";
import { KEYS, clearProject, getJSON } from "@/lib/storage";

type Project = {
  projectName: string;
  purpose: string;
  targetUser: string;
};

type Interview = {
  complete?: boolean;
};

export default function Progress() {
  const [progressData, setProgressData] = useState<Record<string, boolean>>({});
  const [project, setProject] = useState<Project | null>(null);
  const [interview, setInterview] = useState<Interview | null>(null);
  const [hasDocuments, setHasDocuments] = useState(false);

  useEffect(() => {
    setProgressData(getJSON(KEYS.progress, {}));
    setProject(getJSON<Project | null>(KEYS.project, null));
    setInterview(getJSON<Interview | null>(KEYS.interview, null));
    setHasDocuments(Boolean(getJSON(KEYS.documents, null)));
  }, []);

  const done = lessons.filter((lesson) => progressData[lesson.slug]).length;
  const percent = Math.round((done / lessons.length) * 100);
  const nextLesson = lessons.find((lesson) => !progressData[lesson.slug]);

  return (
    <>
      <p className="eyebrow">MY AX START</p>
      <h1>나의 학습</h1>
      <section className="card progress-card">
        <div className="progress-heading">
          <div>
            <p className="eyebrow">LEARNING PROGRESS</p>
            <h2>학습 진행률 {percent}%</h2>
          </div>
          <strong>{done} / {lessons.length} 완료</strong>
        </div>
        <div
          className="progress"
          role="progressbar"
          aria-label="전체 학습 진행률"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={percent}
        >
          <span style={{ width: `${percent}%` }} />
        </div>
        {nextLesson ? (
          <Link className="btn continue-learning" href={`/${nextLesson.slug}`}>
            다음 학습: {nextLesson.title} →
          </Link>
        ) : (
          <p className="completion-message">모든 학습을 완료했습니다! 🎉</p>
        )}
        <div className="lesson-progress-list" aria-label="단계별 학습 현황">
          {lessons.map((lesson, index) => {
            const isDone = Boolean(progressData[lesson.slug]);
            const isNext = nextLesson?.slug === lesson.slug;
            return (
              <Link
                href={`/${lesson.slug}`}
                key={lesson.slug}
                className={`lesson-progress-item${isDone ? " done" : ""}${isNext ? " next" : ""}`}
                aria-current={isNext ? "step" : undefined}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{lesson.title}</strong>
                <em>{isDone ? "완료" : isNext ? "다음 학습" : "미완료"}</em>
              </Link>
            );
          })}
        </div>
      </section>
      <section className="card project-progress-card">
        <h2>나의 프로젝트</h2>
        {project ? (
          <>
            <h3>{project.projectName}</h3>
            <p>{project.purpose} · {project.targetUser}</p>
            <div className="project-status" aria-label="프로젝트 진행 현황">
              <span className="done">프로젝트 선택 완료</span>
              <span className={interview?.complete ? "done" : "current"}>
                심층 질문 {interview?.complete ? "완료" : "진행 중"}
              </span>
              <span className={hasDocuments ? "done" : ""}>
                문서 {hasDocuments ? "완료" : "미완료"}
              </span>
            </div>
            <div className="actions">
              <Link
                className="btn"
                href={interview?.complete ? "/project/documents" : "/project/interview"}
              >
                프로젝트 이어서 하기
              </Link>
              <button
                className="btn alt"
                onClick={() => {
                  clearProject();
                  location.reload();
                }}
              >
                프로젝트 새로 만들기
              </button>
            </div>
          </>
        ) : (
          <>
            <p>아직 프로젝트가 없습니다.</p>
            <Link className="btn" href="/project">프로젝트 만들기</Link>
          </>
        )}
      </section>
    </>
  );
}
