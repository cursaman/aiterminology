"use client";

import Link from "next/link";
import {useEffect, useState} from "react";
import ProjectExample from "@/components/ProjectExample";
import {KEYS, getJSON, setJSON} from "@/lib/storage";
import {lessons, lessonContent} from "@/data/lessons";
import type {JourneySlug} from "@/data/projectJourney";

export default function LessonPage({slug}: {slug: JourneySlug}) {
  const lessonIndex = lessons.findIndex((lesson) => lesson.slug === slug);
  const lesson = lessons[lessonIndex];
  const content = lessonContent[slug];
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const progress = getJSON<Record<string, boolean>>(KEYS.progress, {});
    setIsComplete(Boolean(progress[slug]));
    setJSON(KEYS.last, `/${slug}`);
  }, [slug]);

  function completeLesson() {
    const progress = getJSON<Record<string, boolean>>(KEYS.progress, {});
    setJSON(KEYS.progress, {...progress, [slug]: true});
    setIsComplete(true);
  }

  return (
    <article className="lesson">
      <p className="eyebrow">LEARN {lessonIndex + 1} / {lessons.length}</p>
      <h1>{lesson.title}</h1>
      <p className="lead">{content.intro}</p>

      <ProjectExample slug={slug} />

      <section>
        <h2>핵심 개념</h2>
        {content.points.map((point, index) => (
          <div className="card" key={point}>
            <b>{String(index + 1).padStart(2, "0")}</b> · {point}
          </div>
        ))}
      </section>

      <section>
        <h2>한눈에 보기</h2>
        <blockquote>{content.example}</blockquote>
      </section>

      <div className="actions">
        <button className="btn" type="button" onClick={completeLesson}>
          {isComplete ? "✓ 학습 완료" : "학습 완료"}
        </button>
      </div>

      <nav className="lesson-nav" aria-label="학습 페이지 이동">
        {lessonIndex > 0 ? (
          <Link href={`/${lessons[lessonIndex - 1].slug}`}>← {lessons[lessonIndex - 1].title}</Link>
        ) : (
          <Link href="/">← 홈</Link>
        )}
        {lessonIndex < lessons.length - 1 ? (
          <Link href={`/${lessons[lessonIndex + 1].slug}`}>{lessons[lessonIndex + 1].title} →</Link>
        ) : (
          <Link href="/project">프로젝트 만들기 →</Link>
        )}
      </nav>
    </article>
  );
}

