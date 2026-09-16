"use client";
export const KEYS={progress:"ax-start-progress",last:"ax-start-last-page",project:"ax-start-project",interview:"ax-start-interview",documents:"ax-start-documents"};
export function getJSON<T>(key:string,fallback:T):T{if(typeof window==="undefined")return fallback;try{const v=localStorage.getItem(key);return v?JSON.parse(v):fallback}catch{return fallback}}
export function setJSON(key:string,value:unknown){if(typeof window!=="undefined")localStorage.setItem(key,JSON.stringify(value))}
export function clearProject(){if(typeof window==="undefined")return;[KEYS.project,KEYS.interview,KEYS.documents].forEach(k=>localStorage.removeItem(k))}
