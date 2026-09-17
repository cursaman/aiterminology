"use client";
import {useEffect,useState} from "react";import {useRouter} from "next/navigation";import Link from "next/link";import {KEYS,getJSON,setJSON} from "@/lib/storage";
type P={projectName:string;purpose:string;targetUser:string;features:string[];stack:string[]};
const qs=[
["intent","이 프로젝트가 해결했으면 하는 가장 큰 문제는 무엇인가요?","예: 선택지가 너무 많아 결정하는 데 시간이 오래 걸린다."],
["outcome","사용자가 이 서비스를 이용한 뒤 얻어야 하는 결과는 무엇인가요?","예: 원하는 정보를 빠르게 찾고 선택할 수 있다."],
["core","가장 중요한 기능 하나는 무엇인가요?","예: 추천"],
["scope","첫 번째 버전에서 꼭 만들 기능은 무엇인가요?","예: 검색, 추천, 상세정보"],
["exclude","이번 버전에서 만들지 않을 기능은 무엇인가요?","예: 회원가입, 결제, 커뮤니티"],
["rules","반드시 지켜야 할 조건은 무엇인가요?","예: 모바일 지원, 실제 데이터, 환경변수 사용"],
["success","사용자 기능 중 무엇이 정상이어야 완료인가요?","예: 검색, 추천, 상세 페이지"],
["technical","기술적으로 무엇을 통과해야 하나요?","예: npm run build 성공, TypeScript 오류 0"]
];
export default function Interview(){const router=useRouter();const [project,setProject]=useState<P|null>(null);const [i,setI]=useState(0);const [answers,setAnswers]=useState<Record<string,string>>({});const [value,setValue]=useState("");
 useEffect(()=>{setProject(getJSON<P|null>(KEYS.project,null));const old=getJSON<{answers:Record<string,string>,index:number}|null>(KEYS.interview,null);if(old){const index=Number.isInteger(old.index)?Math.max(0,Math.min(old.index,qs.length-1)):0;setAnswers(old.answers);setI(index);setValue(old.answers[qs[index][0]]||"")}},[]);
 if(!project)return <div className="card"><h1>프로젝트가 없습니다.</h1><p>먼저 만들고 싶은 프로젝트를 선택해주세요.</p><Link className="btn" href="/project">프로젝트 선택</Link></div>;
 const save=()=>{if(!value.trim())return;const a={...answers,[qs[i][0]]:value.trim()};setAnswers(a);if(i<qs.length-1){setJSON(KEYS.interview,{answers:a,index:i+1,complete:false});setI(i+1);setValue(a[qs[i+1][0]]||"")}else{setJSON(KEYS.interview,{answers:a,index:i,complete:true});router.push("/project/documents")}};
 return <><p className="eyebrow">BUILD · STEP 2</p><h1>Deep Interview</h1><p>{project.projectName}</p><div className="progress"><span style={{width:`${((i+1)/qs.length)*100}%`}}/></div><p className="muted">질문 {i+1} / {qs.length} · 프로젝트 명확도 {40+Math.round(((i+1)/qs.length)*50)}%</p><section className="card"><h2>{qs[i][1]}</h2><p className="muted">{qs[i][2]}</p><textarea rows={5} value={value} onChange={e=>setValue(e.target.value)} placeholder="직접 입력해보세요."/><div className="actions">{i>0&&<button className="btn alt" onClick={()=>{const ni=i-1;setI(ni);setValue(answers[qs[ni][0]]||"")}}>← 이전</button>}<button className="btn" onClick={save}>{i===qs.length-1?"인터뷰 완료":"다음 →"}</button></div></section></>}