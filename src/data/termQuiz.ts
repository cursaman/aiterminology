export type QuizQuestion = {
  id: string;
  termId: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
};

export const termQuizQuestions: QuizQuestion[] = [
  {
    id: "ai-example",
    termId: "ai",
    question: "다음 중 AI를 활용한 사례는 무엇일까요?",
    options: ["사진 속 고양이를 구별하기", "전원 버튼으로 컴퓨터 켜기", "파일 이름을 직접 바꾸기"],
    correctAnswer: "사진 속 고양이를 구별하기",
    explanation: "AI는 많은 사진에서 특징을 학습해 새로운 사진 속 대상을 구별할 수 있습니다.",
  },
  {
    id: "model-meaning",
    termId: "model",
    question: "AI에서 Model은 무엇일까요?",
    options: ["데이터에서 규칙을 배운 프로그램", "AI를 사용하는 사람", "자료를 보관하는 폴더"],
    correctAnswer: "데이터에서 규칙을 배운 프로그램",
    explanation: "Model은 데이터에서 규칙을 학습하고 새로운 입력에 알맞은 결과를 냅니다.",
  },
  {
    id: "llm-role",
    termId: "llm",
    question: "LLM이 가장 잘하는 일은 무엇일까요?",
    options: ["사람의 말을 이해하고 문장 만들기", "컴퓨터 부품 조립하기", "인터넷 속도 높이기"],
    correctAnswer: "사람의 말을 이해하고 문장 만들기",
    explanation: "LLM은 많은 글을 학습한 언어 모델로 질문 답변, 요약, 번역 등에 사용됩니다.",
  },
  {
    id: "token-meaning",
    termId: "token",
    question: "Token은 무엇일까요?",
    options: ["AI가 글을 처리하는 작은 조각", "AI 서비스의 비밀번호", "완성된 답변 전체"],
    correctAnswer: "AI가 글을 처리하는 작은 조각",
    explanation: "AI는 문장을 토큰이라는 작은 단위로 나누어 읽고 답변을 만듭니다.",
  },
  {
    id: "inference-timing",
    termId: "inference",
    question: "Inference는 언제 일어날까요?",
    options: ["학습한 모델이 실제 질문에 답할 때", "새 컴퓨터를 구매할 때", "데이터를 삭제할 때"],
    correctAnswer: "학습한 모델이 실제 질문에 답할 때",
    explanation: "Inference는 학습을 마친 모델이 실제 입력을 받아 결과를 만드는 과정입니다.",
  },
  {
    id: "prompt-meaning",
    termId: "prompt",
    question: "Prompt는 무엇일까요?",
    options: ["AI에게 주는 질문이나 지시", "AI가 설치된 컴퓨터", "글을 숫자로 바꾸는 기술"],
    correctAnswer: "AI에게 주는 질문이나 지시",
    explanation: "Prompt는 AI에게 원하는 일과 조건을 전달하는 질문 또는 지시문입니다.",
  },
  {
    id: "context-role",
    termId: "context",
    question: "Context를 함께 제공하는 이유는 무엇일까요?",
    options: ["AI가 요청의 배경을 이해하도록 돕기 위해", "글자 크기를 키우기 위해", "컴퓨터를 빠르게 켜기 위해"],
    correctAnswer: "AI가 요청의 배경을 이해하도록 돕기 위해",
    explanation: "목적, 대상 독자, 기존 자료 같은 맥락을 주면 AI가 요청을 더 정확하게 이해합니다.",
  },
  {
    id: "multimodal-input",
    termId: "multimodal",
    question: "Multimodal AI가 함께 다룰 수 있는 것은 무엇일까요?",
    options: ["글, 이미지, 음성", "숫자만", "영어만"],
    correctAnswer: "글, 이미지, 음성",
    explanation: "Multimodal은 텍스트뿐 아니라 이미지, 음성, 영상 등 여러 정보 형식을 다룹니다.",
  },
  {
    id: "hallucination-response",
    termId: "hallucination",
    question: "AI가 알려준 통계가 정확한지 확인하려면 어떻게 해야 할까요?",
    options: ["공식 자료와 출처를 직접 확인한다", "AI의 답을 그대로 믿는다", "같은 질문을 한 번 더 한다"],
    correctAnswer: "공식 자료와 출처를 직접 확인한다",
    explanation: "AI는 사실이 아닌 내용을 그럴듯하게 말할 수 있으므로 중요한 정보는 출처를 확인해야 합니다.",
  },
  {
    id: "embedding-role",
    termId: "embedding",
    question: "Embedding은 글이나 이미지의 의미를 무엇으로 바꿀까요?",
    options: ["비교할 수 있는 숫자 목록", "종이 문서", "비밀번호"],
    correctAnswer: "비교할 수 있는 숫자 목록",
    explanation: "Embedding은 의미를 숫자로 표현해 컴퓨터가 서로 비슷한 자료를 비교할 수 있게 합니다.",
  },
  {
    id: "rag-action",
    termId: "rag",
    question: "RAG는 AI가 답하기 전에 무엇을 하게 만드는 방법일까요?",
    options: ["관련 자료를 검색한다", "그림을 그린다", "모델을 새로 학습한다"],
    correctAnswer: "관련 자료를 검색한다",
    explanation: "RAG는 질문과 관련된 자료를 먼저 찾고 그 내용을 답변에 활용합니다.",
  },
  {
    id: "vector-db-role",
    termId: "vector-db",
    question: "Vector DB의 주요 역할은 무엇일까요?",
    options: ["의미가 비슷한 자료를 빠르게 찾기", "동영상을 재생하기", "컴퓨터 전원을 관리하기"],
    correctAnswer: "의미가 비슷한 자료를 빠르게 찾기",
    explanation: "Vector DB는 임베딩을 저장하고 질문과 의미가 가까운 자료를 검색합니다.",
  },
  {
    id: "tool-example",
    termId: "tool",
    question: "AI Agent가 사용할 수 있는 Tool의 예시는 무엇일까요?",
    options: ["검색과 계산 기능", "책상과 의자", "화면 배경색"],
    correctAnswer: "검색과 계산 기능",
    explanation: "Tool은 AI가 검색, 계산, 파일 읽기 등 외부 작업을 수행할 수 있게 합니다.",
  },
  {
    id: "agent-role",
    termId: "agent",
    question: "AI Agent의 특징은 무엇일까요?",
    options: ["목표를 받고 도구를 사용해 여러 단계를 진행한다", "항상 한 문장만 답한다", "인터넷 연결만 관리한다"],
    correctAnswer: "목표를 받고 도구를 사용해 여러 단계를 진행한다",
    explanation: "AI Agent는 목표를 이해하고 필요한 도구를 사용하며 작업을 단계적으로 수행합니다.",
  },
  {
    id: "api-role",
    termId: "api",
    question: "API는 어떤 역할을 할까요?",
    options: ["서로 다른 프로그램이 요청과 결과를 주고받게 한다", "컴퓨터 화면을 청소한다", "문서의 글꼴만 바꾼다"],
    correctAnswer: "서로 다른 프로그램이 요청과 결과를 주고받게 한다",
    explanation: "API는 프로그램들이 정해진 방식으로 기능과 데이터를 주고받는 연결 창구입니다.",
  },
];

