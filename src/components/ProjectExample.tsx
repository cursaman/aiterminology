import Link from "next/link";
import {lessons} from "@/data/lessons";
import {exampleProject, projectJourney, type JourneySlug} from "@/data/projectJourney";
import ProjectIcon from "@/components/ProjectIcon";

export default function ProjectExample({slug}: {slug: JourneySlug}) {
  const currentStep = projectJourney[slug];

  return (
    <section className="project-example" aria-labelledby={`project-example-${slug}`}>
      <div className="project-example-heading">
        <div>
          <p className="eyebrow">하나의 프로젝트 · 7단계</p>
          <h2 id={`project-example-${slug}`}>하나의 프로젝트로 연결해 보기</h2>
        </div>
        <span>{currentStep.step}단계</span>
      </div>

      <div className="example-project-summary">
        <div>
          <p className="example-project-label">예시 프로젝트</p>
          <h3><ProjectIcon id="food" size={26} /> {exampleProject.name}</h3>
          <p>{exampleProject.description}</p>
        </div>
        <dl>
          <div>
            <dt>사용자</dt>
            <dd>{exampleProject.targetUser}</dd>
          </div>
          <div>
            <dt>완료 목표</dt>
            <dd>{exampleProject.goal}</dd>
          </div>
        </dl>
      </div>

      <nav className="journey-steps" aria-label="프로젝트 예시 단계">
        {lessons.map((lesson, index) => (
          <Link
            href={`/${lesson.slug}`}
            className={lesson.slug === slug ? "current" : undefined}
            aria-current={lesson.slug === slug ? "step" : undefined}
            key={lesson.slug}
          >
            <b>{index + 1}</b>
            <span>{lesson.title}</span>
          </Link>
        ))}
      </nav>

      <div className="project-example-grid">
        <article>
          <p className="example-part-label">이 단계에서 할 일</p>
          <h3>{currentStep.title}</h3>
          <p>{currentStep.task}</p>
        </article>

        <article className="example-work">
          <p className="example-part-label">실제 적용 예시</p>
          <h3>{currentStep.exampleTitle}</h3>
          <pre>{currentStep.exampleLines.join("\n")}</pre>
        </article>

        <article>
          <p className="example-part-label">만들어지는 결과</p>
          <h3>이 단계가 끝나면</h3>
          <p>{currentStep.result}</p>
        </article>
      </div>
    </section>
  );
}
