"use client";
import {useEffect,useMemo,useState} from "react";import Link from "next/link";import {KEYS,getJSON,setJSON} from "@/lib/storage";
type P={projectName:string;purpose:string;targetUser:string;features:string[];stack:string[]};
type I={answers:Record<string,string>;complete:boolean};
const names=["PROJECT.md","PRD.md","AGENTS.md","QA_CHECKLIST.md"] as const;
export default function Documents(){const [p,setP]=useState<P|null>(null);const [iv,setIv]=useState<I|null>(null);const [tab,setTab]=useState(0);const [docs,setDocs]=useState<Record<string,string>>({});
 useEffect(()=>{setP(getJSON<P|null>(KEYS.project,null));setIv(getJSON<I|null>(KEYS.interview,null));setDocs(getJSON<Record<string,string>>(KEYS.documents,{}))},[]);
 const generated=useMemo(():Record<string,string>=>{if(!p||!iv)return {};const a=iv.answers;return {
"PROJECT.md":`# ${p.projectName}\n\n## 목적\n${p.purpose}\n\n## 사용자\n${p.targetUser}\n\n## 해결 문제\n${a.intent||""}\n\n## 핵심 기능\n${p.features.map(x=>"- "+x).join("\n")}\n\n## 기술\n${p.stack.map(x=>"- "+x).join("\n")}\n\n## 완료 목표\n${a.success||""}`,
"PRD.md":`# PRD\n\n## Product Goal\n${a.outcome||""}\n\n## Core Feature\n${a.core||""}\n\n## MVP / In Scope\n${a.scope||p.features.join(", ")}\n\n## Out of Scope\n${a.exclude||""}\n\n## Constraints\n${a.rules||""}\n\n## Technical Stack\n${p.stack.map(x=>"- "+x).join("\n")}`,
"AGENTS.md":`# AGENTS.md\n\n## Objective\nPROJECT.md와 PRD.md에 정의된 MVP를 구현한다.\n\n## Rules\n- 기존 정상 기능을 임의로 삭제하지 않는다.\n- PRD 범위를 벗어난 기능을 임의로 추가하지 않는다.\n- TypeScript 오류를 남기지 않는다.\n- 비밀키를 코드에 직접 작성하지 않는다.\n- 기존 구조를 먼저 확인한다.\n- 작은 단위로 구현하고 매 단계 검증한다.\n\n## Project Constraints\n${a.rules||""}\n\n## Completion\nQA_CHECKLIST.md의 필수 기준을 통과해야 완료한다.`,
"QA_CHECKLIST.md":`# QA CHECKLIST\n\n## Functional\n${(a.success||p.features.join(",")).split(",").map(x=>"- [ ] "+x.trim()).join("\n")}\n\n## Technical\n- [ ] npm run build 성공\n- [ ] TypeScript Error 0\n- [ ] 모바일 정상\n- [ ] 깨진 링크 없음\n- [ ] 주요 Console 오류 없음\n\n## Additional\n${a.technical||""}`
}},[p,iv]);
 useEffect(()=>{if(p&&iv?.complete){setJSON(KEYS.documents,{...generated,...docs})}},[p,iv,generated,docs]);
 const merged:Record<string,string>={...generated,...docs}; if(!p||!iv?.complete)return <div className="card"><h1>개발 문서를 만들 준비가 되지 않았습니다.</h1><p>프로젝트 선택과 Deep Interview를 먼저 완료해주세요.</p><Link className="btn" href="/project">프로젝트 시작</Link></div>;
 const name=names[tab], text=merged[name]||"";const update=(v:string)=>{const n:Record<string,string>={...merged,[name]:v};setDocs(n);setJSON(KEYS.documents,n)};
 const download=()=>{const blob=new Blob([text],{type:"text/markdown;charset=utf-8"});const u=URL.createObjectURL(blob);const a=document.createElement("a");a.href=u;a.download=name;a.click();URL.revokeObjectURL(u)};
 return <><p className="eyebrow">BUILD · STEP 3</p><h1>AI 개발 문서</h1><p className="lead">인터뷰 결과를 실제 개발에 사용할 수 있는 네 가지 문서로 변환했습니다.</p><div className="actions">{names.map((n,i)=><button className={i===tab?"btn":"btn alt"} key={n} onClick={()=>setTab(i)}>{n}</button>)}</div><textarea className="doc" rows={20} value={text} onChange={e=>update(e.target.value)}/><div className="actions"><button className="btn" onClick={()=>navigator.clipboard.writeText(text)}>복사</button><button className="btn alt" onClick={download}>다운로드</button><Link className="btn alt" href="/my-progress">나의 진행률</Link></div></>}