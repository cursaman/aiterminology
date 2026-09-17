export type TermCategory = "basic" | "conversation" | "build";

export type AiTerm = {
  id: string;
  name: string;
  koreanName: string;
  fullName?: string;
  pronunciation?: string;
  category: TermCategory;
  oneLine: string;
  analogy: string;
  example: string;
  connectsTo: string[];
};

export const termCategories: Array<{
  id: "all" | TermCategory;
  label: string;
}> = [
  {id: "all", label: "전체"},
  {id: "basic", label: "기초 개념"},
  {id: "conversation", label: "AI와 대화"},
  {id: "build", label: "AI 서비스 만들기"},
];

export const aiTerms: AiTerm[] = [
  {
    id: "ai",
    name: "AI",
    koreanName: "인공지능",
    fullName: "Artificial Intelligence",
    pronunciation: "에이아이",
    category: "basic",
    oneLine: "사람이 하던 판단, 학습, 창작 같은 일을 컴퓨터가 하도록 만든 기술입니다.",
    analogy: "많은 문제를 보고 풀이 방법을 익힌 디지털 조수와 비슷합니다.",
    example: "사진 속 고양이 찾기, 문장 요약하기, 음악 추천하기",
    connectsTo: ["Model", "LLM"],
  },
  {
    id: "model",
    name: "Model",
    koreanName: "모델",
    category: "basic",
    oneLine: "데이터에서 규칙을 배워 입력에 알맞은 결과를 내는 프로그램입니다.",
    analogy: "공부를 마친 학생 한 명이 문제를 받아 답하는 것과 비슷합니다.",
    example: "사진을 보고 음식 이름을 맞히는 이미지 모델",
    connectsTo: ["AI", "LLM", "Inference"],
  },
  {
    id: "llm",
    name: "LLM",
    koreanName: "대규모 언어 모델",
    fullName: "Large Language Model",
    pronunciation: "엘엘엠",
    category: "basic",
    oneLine: "아주 많은 글을 학습해 사람의 말을 이해하고 문장을 만드는 AI 모델입니다.",
    analogy: "수많은 책을 읽고 문장 이어 쓰기를 아주 잘하게 된 사람과 비슷합니다.",
    example: "질문 답변, 글 요약, 번역, 코드 작성",
    connectsTo: ["Token", "Prompt", "Context"],
  },
  {
    id: "token",
    name: "Token",
    koreanName: "토큰",
    category: "basic",
    oneLine: "AI가 글을 읽고 만드는 데 사용하는 작은 글자 조각입니다.",
    analogy: "문장을 레고 블록처럼 작은 조각으로 나눈 것입니다.",
    example: "긴 문서는 토큰이 많아 처리 시간과 비용이 늘어날 수 있습니다.",
    connectsTo: ["LLM", "Context"],
  },
  {
    id: "inference",
    name: "Inference",
    koreanName: "추론",
    category: "basic",
    oneLine: "학습을 마친 AI 모델이 실제 질문을 받고 답을 만드는 과정입니다.",
    analogy: "학생이 공부를 마친 뒤 시험 문제를 푸는 순간과 비슷합니다.",
    example: "챗봇에 질문을 입력하고 답변을 받는 과정",
    connectsTo: ["Model", "Prompt"],
  },
  {
    id: "prompt",
    name: "Prompt",
    koreanName: "프롬프트",
    category: "conversation",
    oneLine: "AI에게 원하는 일을 알려주는 질문이나 지시문입니다.",
    analogy: "처음 일하는 동료에게 업무를 설명하는 요청서와 비슷합니다.",
    example: "초등학생도 이해할 수 있게 태양계를 세 문장으로 설명해줘.",
    connectsTo: ["Context", "LLM"],
  },
  {
    id: "context",
    name: "Context",
    koreanName: "맥락",
    category: "conversation",
    oneLine: "AI가 현재 요청을 제대로 이해하는 데 필요한 배경 정보입니다.",
    analogy: "친구에게 지난 대화를 알려줘야 이어서 이야기할 수 있는 것과 같습니다.",
    example: "대상 독자, 목적, 기존 문서, 지켜야 할 조건을 함께 제공하기",
    connectsTo: ["Prompt", "Token", "RAG"],
  },
  {
    id: "multimodal",
    name: "Multimodal",
    koreanName: "멀티모달",
    category: "conversation",
    oneLine: "글뿐 아니라 이미지, 음성, 영상 등 여러 형태의 정보를 함께 다루는 능력입니다.",
    analogy: "사람이 눈으로 보고 귀로 들으며 상황을 이해하는 것과 비슷합니다.",
    example: "영수증 사진을 보여주고 지출 내역을 표로 정리해달라고 요청하기",
    connectsTo: ["AI", "Model"],
  },
  {
    id: "hallucination",
    name: "Hallucination",
    koreanName: "환각",
    category: "conversation",
    oneLine: "AI가 사실이 아닌 내용을 그럴듯하게 만들어 말하는 현상입니다.",
    analogy: "정답을 모르는 사람이 자신 있게 추측해서 말하는 것과 비슷합니다.",
    example: "존재하지 않는 책이나 통계를 실제 자료처럼 소개하는 경우",
    connectsTo: ["RAG", "Prompt"],
  },
  {
    id: "embedding",
    name: "Embedding",
    koreanName: "임베딩",
    category: "build",
    oneLine: "글이나 이미지의 의미를 컴퓨터가 비교할 수 있는 숫자 목록으로 바꾸는 기술입니다.",
    analogy: "비슷한 책을 같은 서가 가까이에 꽂는 분류 좌표와 비슷합니다.",
    example: "표현이 달라도 뜻이 비슷한 질문과 문서를 찾아내기",
    connectsTo: ["RAG", "Vector DB"],
  },
  {
    id: "rag",
    name: "RAG",
    koreanName: "검색 증강 생성",
    fullName: "Retrieval-Augmented Generation",
    pronunciation: "래그",
    category: "build",
    oneLine: "AI가 답하기 전에 관련 자료를 찾아보고 그 내용을 바탕으로 답하게 하는 방법입니다.",
    analogy: "기억에만 의존하지 않고 참고서를 펼쳐본 뒤 답하는 시험과 비슷합니다.",
    example: "회사 규정 문서를 검색해 최신 휴가 규정을 답하는 사내 챗봇",
    connectsTo: ["Embedding", "Context", "Hallucination"],
  },
  {
    id: "vector-db",
    name: "Vector DB",
    koreanName: "벡터 데이터베이스",
    pronunciation: "벡터 디비",
    category: "build",
    oneLine: "임베딩으로 바꾼 숫자를 저장하고 의미가 비슷한 자료를 빠르게 찾는 저장소입니다.",
    analogy: "책 제목이 아니라 책의 주제와 분위기로 자료를 찾는 도서관과 비슷합니다.",
    example: "사용자 질문과 의미가 가장 비슷한 회사 문서를 찾아 RAG에 전달하기",
    connectsTo: ["Embedding", "RAG"],
  },
  {
    id: "tool",
    name: "Tool",
    koreanName: "도구",
    pronunciation: "툴",
    category: "build",
    oneLine: "AI가 검색, 계산, 파일 읽기처럼 대화만으로 할 수 없는 일을 수행하는 기능입니다.",
    analogy: "업무 담당자가 계산기, 검색창, 문서 프로그램을 꺼내 쓰는 것과 비슷합니다.",
    example: "AI 에이전트가 날씨 API를 사용해 오늘의 실제 기온 확인하기",
    connectsTo: ["AI Agent", "API"],
  },
  {
    id: "agent",
    name: "AI Agent",
    koreanName: "AI 에이전트",
    category: "build",
    oneLine: "목표를 받고 필요한 도구를 사용하며 여러 단계를 스스로 진행하는 AI입니다.",
    analogy: "지시를 받은 뒤 자료 조사, 작성, 확인까지 진행하는 업무 담당자와 비슷합니다.",
    example: "여행 조건을 확인하고 항공편을 검색한 뒤 일정표를 만드는 작업",
    connectsTo: ["Prompt", "Tool", "API"],
  },
  {
    id: "api",
    name: "API",
    koreanName: "프로그램 연결 창구",
    fullName: "Application Programming Interface",
    pronunciation: "에이피아이",
    category: "build",
    oneLine: "서로 다른 프로그램이 정해진 방식으로 요청하고 결과를 주고받는 연결 창구입니다.",
    analogy: "손님의 주문을 주방에 전달하고 음식을 받아오는 식당 직원과 비슷합니다.",
    example: "날씨 서비스에 서울 날씨를 요청해 앱 화면에 표시하기",
    connectsTo: ["AI Agent", "Tool"],
  },
];

