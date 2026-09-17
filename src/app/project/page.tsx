"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { projects } from "@/data/projects";
import { KEYS, clearProject, setJSON } from "@/lib/storage";
import ProjectIcon from "@/components/ProjectIcon";

export default function ProjectPage() {
  const router = useRouter();
  const formRef = useRef<HTMLElement>(null);
  const [selected, setSelected] = useState("");
  const [purpose, setPurpose] = useState("포트폴리오");
  const [user, setUser] = useState("일반 사용자");
  const [features, setFeatures] = useState<string[]>([]);
  const [custom, setCustom] = useState("");

  useEffect(() => {
    if (!selected) return;
    requestAnimationFrame(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      formRef.current?.focus({ preventScroll: true });
    });
  }, [selected]);

  const pick = (id: string) => {
    setSelected(id);
    const project = projects.find((item) => item.id === id);
    setFeatures(project?.features.slice(0, 3) ?? []);
  };

  const toggle = (feature: string) => {
    setFeatures((current) =>
      current.includes(feature)
        ? current.filter((item) => item !== feature)
        : current.length < 3
          ? [...current, feature]
          : current,
    );
  };

  const next = () => {
    const project = projects.find((item) => item.id === selected);
    if (!project || (selected === "custom" && !custom.trim())) return;
    clearProject();
    setJSON(KEYS.project, {
      templateId: selected,
      projectName: selected === "custom" ? custom.trim() : `${project.title} 서비스`,
      purpose,
      targetUser: user,
      features,
      priority: "작게 완성하기",
      stack: ["Next.js", "TypeScript", "GitHub", "Vercel"],
    });
    router.push("/project/interview");
  };

  const selectedProject = projects.find((item) => item.id === selected);

  return (
    <>
      <p className="eyebrow">프로젝트 만들기 · 1단계</p>
      <h1>나의 첫 AI 프로젝트</h1>
      <p className="lead">처음에는 문제 하나, 사용자 한 종류, 핵심 기능 세 개면 충분합니다.</p>
      <div className="grid project-grid">
        {projects.map((project) => {
          const isSelected = selected === project.id;
          return (
            <button
              key={project.id}
              className={`card project-card${isSelected ? " selected" : ""}`}
              aria-pressed={isSelected}
              onClick={() => pick(project.id)}
            >
              <span className="project-card-status">{isSelected ? "선택됨" : "선택하기"}</span>
              <ProjectIcon id={project.id} size={28} />
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <span className="pill">{project.difficulty}</span>
            </button>
          );
        })}
      </div>

      {selectedProject && (
        <section
          className="card project-form"
          ref={formRef}
          tabIndex={-1}
          aria-labelledby="project-form-title"
        >
          <p className="selection-notice">
            <ProjectIcon id={selectedProject.id} size={20} />
            <strong>{selectedProject.title}</strong>을 선택했습니다. 아래 정보를 확인해주세요.
          </p>
          <h2 id="project-form-title">기본 정보</h2>
          {selected === "custom" && (
            <label className="form-field">
              <span>프로젝트 이름</span>
              <input
                type="text"
                value={custom}
                onChange={(event) => setCustom(event.target.value)}
                placeholder="예: 우리 동네 산책 코스"
              />
            </label>
          )}
          <div className="project-selects">
            <label className="form-field">
              <span>만드는 목적</span>
              <select value={purpose} onChange={(event) => setPurpose(event.target.value)}>
                <option>포트폴리오</option>
                <option>AI 개발 공부</option>
                <option>실제 사용</option>
                <option>사업 아이디어</option>
              </select>
            </label>
            <label className="form-field">
              <span>주요 사용자</span>
              <select value={user} onChange={(event) => setUser(event.target.value)}>
                <option>일반 사용자</option>
                <option>나</option>
                <option>친구/가족</option>
                <option>동호회</option>
                <option>고객</option>
              </select>
            </label>
          </div>
          <div className="feature-heading">
            <h3>핵심 기능</h3>
            <span>{features.length} / 3 선택</span>
          </div>
          <p className="muted">첫 버전에 꼭 필요한 기능 세 개만 선택합니다.</p>
          {selectedProject.features.map((feature) => (
            <label className="choice" key={feature}>
              <input
                type="checkbox"
                checked={features.includes(feature)}
                onChange={() => toggle(feature)}
              />{" "}
              {feature}
            </label>
          ))}
          <button
            className="btn project-next"
            onClick={next}
            disabled={selected === "custom" && !custom.trim()}
          >
            심층 질문 시작하기 →
          </button>
        </section>
      )}
    </>
  );
}
