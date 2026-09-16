"use client";
import Link from "next/link";import {useEffect,useState} from "react";import {KEYS,getJSON,setJSON} from "@/lib/storage";import {lessons,lessonContent} from "@/data/lessons";
export default function LessonPage({slug}:{slug:string}){
 const idx=lessons.findIndex(x=>x.slug===slug); const lesson=lessons[idx]; const content=lessonContent[slug]; const [done,setDone]=useState(false);
 useEffect(()=>{const p=getJSON<Record<string,boolean>>(KEYS.progress,{});setDone(!!p[slug]);setJSON(KEYS.last,"/"+slug)},[slug]);
 const complete=()=>{const p=getJSON<Record<string,boolean>>(KEYS.progress,{});p[slug]=true;setJSON(KEYS.progress,p);setDone(true)};
 return <article className="lesson"><p className="eyebrow">LEARN {idx+1} / {lessons.length}</p><h1>{lesson.title}</h1><p className="lead">{content.intro}</p>
 <section><h2>핵심 개념</h2>{content.points.map((x,i)=><div className="card" key={x}><b>{String(i+1).padStart(2,"0")}</b> · {x}</div>)}</section>
 <section><h2>한눈에 보기</h2><blockquote>{content.example}</blockquote></section>
 <div className="actions"><button className="btn" onClick={complete}>{done?"✓ 학습 완료":"학습 완료"}</button></div>
 <div className="lesson-nav">{idx>0?<Link href={"/"+lessons[idx-1].slug}>← {lessons[idx-1].title}</Link>:<Link href="/">← 홈</Link>}{idx<lessons.length-1?<Link href={"/"+lessons[idx+1].slug}>{lessons[idx+1].title} →</Link>:<Link href="/project">프로젝트 만들기 →</Link>}</div></article>
}