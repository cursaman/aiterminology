export const lessons=[
{slug:"terms",title:"AI 용어",summary:"LLM, 토큰, 멀티모달, RAG 등 핵심 용어를 익힙니다."},
{slug:"ax",title:"AX / AI Native",summary:"기존 업무 능력에 AI 활용 능력을 결합하는 방식을 배웁니다."},
{slug:"vibe-coding",title:"Vibe Coding",summary:"AI와 대화하며 작게 만들고 검증하는 개발 흐름입니다."},
{slug:"prompt",title:"Prompt",summary:"목표·조건·출력·완료기준을 명확하게 전달합니다."},
{slug:"context",title:"Context Engineering",summary:"AI가 일하는 데 필요한 맥락과 문서를 설계합니다."},
{slug:"agent",title:"AI Agent",summary:"목표를 받고 도구를 사용하며 여러 단계를 수행합니다."},
{slug:"harness",title:"Harness Engineering",summary:"목표·규칙·검증·반복으로 에이전트 작업을 안정화합니다."}
] as const;
export const lessonContent:Record<string,{intro:string,points:string[],example:string}>={
terms:{intro:"AI 용어는 외우기보다 서로의 관계를 이해하는 것이 중요합니다.",points:["LLM: 대량의 텍스트를 학습해 언어 작업을 수행하는 모델","Token: 모델이 텍스트를 처리하는 작은 단위","Multimodal: 텍스트·이미지·음성 등 여러 형식을 함께 처리","RAG: 외부 자료를 찾아 답변 생성에 활용","Embedding: 의미를 숫자 벡터로 표현","Inference: 학습된 모델이 실제 답을 생성하는 과정"],example:"AI → LLM → Prompt/Context → Agent → Tool → 결과"},
ax:{intro:"AX는 AI를 업무와 서비스의 실제 흐름에 적용해 일하는 방식을 바꾸는 관점입니다.",points:["기존 직무 기초가 먼저","AI로 문제를 정의하고 해결","프롬프트와 작업 과정을 기록","결과를 직접 검증하고 설명","프로젝트 과정 자체가 포트폴리오"],example:"문제 정의 → AI 활용 → 반복 개선 → 결과 검증 → 설명"},
"vibe-coding":{intro:"바이브코딩은 자연어로 의도를 전달하면서 AI와 함께 소프트웨어를 만드는 방식입니다.",points:["주변의 작은 문제에서 시작","한 번에 거대한 기능을 요구하지 않기","작은 단위로 구현","매 단계 직접 실행","Git으로 변경 기록"],example:"아이디어 → 계획 → 작은 구현 → 실행 → 수정 → 반복"},
prompt:{intro:"좋은 프롬프트는 화려한 문장보다 목표와 완료 조건이 분명합니다.",points:["Goal: 무엇을 만들까?","Context: 현재 상황은?","Constraints: 무엇을 지켜야 하나?","Output: 어떤 형태로 받을까?","Success: 무엇이 되면 완료인가?"],example:"Next.js로 초보자용 페이지를 만들고 모바일을 지원하며 npm run build 성공까지 확인해줘."},
context:{intro:"Context Engineering은 AI에게 필요한 정보를 적절한 시점에 구조적으로 제공하는 일입니다.",points:["프로젝트 목적","현재 코드 구조","기술 스택","금지 사항","기존 결정","테스트 및 완료 기준"],example:"PROJECT.md + PRD.md + AGENTS.md + QA_CHECKLIST.md"},
agent:{intro:"AI Agent는 단순 답변을 넘어 목표를 향해 여러 단계의 작업을 수행하는 구조입니다.",points:["Goal: 목표","Plan: 계획","Tool: 파일·터미널·API 등","Memory/Context: 필요한 맥락","Verification: 결과 확인"],example:"요구사항 확인 → 파일 수정 → Build → 오류 수정 → 재검증"},
harness:{intro:"Harness Engineering은 AI가 목표를 잃지 않고 결과를 검증하며 끝까지 일하도록 작업 구조를 만드는 것입니다.",points:["Goal: 목표","Specification: 명세","Rules: 규칙","Tools: 도구","Verification: 검증","Loop: 실패 시 수정하고 다시 검증","Deep Interview: 질문으로 모호함 축소","Quality Gate: 완료 판정 기준"],example:"요구사항 → 계획 → 작업 → 테스트 → 실패 시 수정 → Quality Gate 통과 → 완료"}
};