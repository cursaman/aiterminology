export type JourneySlug =
  | "terms"
  | "ax"
  | "vibe-coding"
  | "prompt"
  | "context"
  | "agent"
  | "harness";

type JourneyStep = {
  step: number;
  title: string;
  task: string;
  exampleTitle: string;
  exampleLines: string[];
  result: string;
};

export const exampleProject = {
  name: "오늘 뭐 먹지?",
  description: "현재 위치, 예산, 음식 취향을 입력하면 가까운 맛집을 추천하는 서비스",
  targetUser: "점심 메뉴를 고르기 어려운 직장인",
  goal: "1분 안에 조건에 맞는 식당 3곳 추천",
};

export const projectJourney: Record<JourneySlug, JourneyStep> = {
  terms: {
    step: 1,
    title: "추천 과정을 AI 용어로 이해하기",
    task: "사용자의 한 문장 요청이 AI 안에서 어떻게 처리되는지 핵심 용어와 연결합니다.",
    exampleTitle: "점심 추천 요청 한 번에 쓰이는 용어",
    exampleLines: [
      "Prompt  → 강남역에서 1만원 이하 점심을 추천해줘",
      "Context → 위치: 강남역 / 예산: 1만원 / 시간: 점심",
      "RAG     → 실제 식당 자료에서 조건에 맞는 곳 검색",
      "LLM     → 추천 이유를 이해하기 쉬운 문장으로 작성",
    ],
    result: "AI 용어가 따로 떨어진 암기 대상이 아니라 하나의 추천 과정에서 함께 작동한다는 것을 이해합니다.",
  },
  ax: {
    step: 2,
    title: "기존 메뉴 선택 과정을 AI와 함께 바꾸기",
    task: "사람이 반복하던 검색과 비교는 AI가 돕고, 최종 판단은 사람이 하는 새로운 업무 흐름을 설계합니다.",
    exampleTitle: "변경 전과 변경 후",
    exampleLines: [
      "변경 전 → 지도 검색 → 식당 여러 곳 열기 → 가격 비교 → 결정",
      "변경 후 → 조건 입력 → AI가 후보 3곳 정리 → 사용자가 선택",
      "AI 역할 → 검색, 조건 비교, 추천 이유 정리",
      "사람 역할 → 정보 확인, 취향 판단, 최종 선택",
    ],
    result: "AI가 사람을 대신하는 것이 아니라 반복 작업을 줄이고 사람이 더 빠르게 판단하도록 돕는 AX 흐름이 만들어집니다.",
  },
  "vibe-coding": {
    step: 3,
    title: "가장 작은 추천 서비스부터 만들기",
    task: "처음부터 완벽한 서비스를 만들지 않고 핵심 기능을 작은 단위로 구현하고 직접 확인합니다.",
    exampleTitle: "세 번의 작은 구현",
    exampleLines: [
      "1차 → 위치와 예산을 입력하는 화면 만들기",
      "2차 → 입력 조건에 맞는 식당 카드 3개 표시하기",
      "3차 → 추천 이유와 지도 링크 추가하기",
      "매 단계 → 실행 → 화면 확인 → 오류 수정 → Git 기록",
    ],
    result: "회원가입이나 결제 없이도 입력부터 추천 결과까지 작동하는 작은 MVP가 완성됩니다.",
  },
  prompt: {
    step: 4,
    title: "AI가 오해하지 않는 요청 작성하기",
    task: "만들 기능, 사용자 조건, 제한 사항과 완료 기준을 구체적인 프롬프트로 작성합니다.",
    exampleTitle: "실제 개발 프롬프트",
    exampleLines: [
      "Goal        → 맛집 추천 결과 화면을 만들어줘",
      "Context     → 사용자는 강남역 직장인이고 모바일로 사용해",
      "Constraints → 예산과 음식 종류를 입력받고 결과는 3개만 보여줘",
      "Output      → 식당명, 예상 가격, 추천 이유, 지도 링크",
      "Success     → 입력 후 추천 카드 3개가 모바일에서 정상 표시",
    ],
    result: "AI가 무엇을 만들고 언제 완료인지 판단할 수 있는 구체적인 작업 지시가 만들어집니다.",
  },
  context: {
    step: 5,
    title: "프로젝트 정보를 문서로 정리하기",
    task: "AI가 작업할 때 반복해서 참고해야 할 목적, 범위, 규칙과 검증 기준을 문서로 제공합니다.",
    exampleTitle: "AI에게 제공할 네 가지 문서",
    exampleLines: [
      "PROJECT.md      → 사용자, 문제, 프로젝트 목적",
      "PRD.md          → 핵심 기능, 화면, 제외할 기능",
      "AGENTS.md       → 코드 수정 규칙과 작업 순서",
      "QA_CHECKLIST.md → 검색, 추천, 모바일, 빌드 확인 항목",
    ],
    result: "대화가 길어져도 AI가 프로젝트 목표와 범위를 잃지 않고 같은 기준으로 작업할 수 있습니다.",
  },
  agent: {
    step: 6,
    title: "AI가 여러 작업을 순서대로 수행하게 하기",
    task: "하나의 목표를 받은 AI Agent가 필요한 도구를 선택하고 결과를 확인하는 작업 흐름을 설계합니다.",
    exampleTitle: "맛집 추천 Agent의 작업 순서",
    exampleLines: [
      "1. 요청 분석  → 위치, 예산, 음식 취향 추출",
      "2. Tool 사용  → 식당 데이터와 지도 정보 검색",
      "3. 조건 비교  → 거리와 예산에 맞지 않는 식당 제외",
      "4. 결과 작성  → 추천 3곳과 이유 정리",
      "5. 자체 확인  → 링크와 가격 정보가 있는지 검사",
    ],
    result: "질문에 한 번 답하는 챗봇보다 검색, 비교, 작성, 확인을 이어서 수행하는 Agent 흐름이 만들어집니다.",
  },
  harness: {
    step: 7,
    title: "AI 작업을 규칙과 검증으로 안정화하기",
    task: "Agent가 잘못된 식당을 추천하거나 기능을 임의로 바꾸지 않도록 규칙, 테스트와 반복 절차를 둡니다.",
    exampleTitle: "추천 서비스의 안전장치",
    exampleLines: [
      "Rule    → 실제 데이터에 없는 식당은 만들지 않기",
      "Rule    → 가격을 확인할 수 없으면 '확인 필요' 표시",
      "Test    → 예산 1만원 입력 시 초과 식당이 없는지 검사",
      "Test    → 모바일에서 추천 카드와 지도 링크 확인",
      "Loop    → 실패하면 수정한 뒤 같은 테스트 다시 실행",
    ],
    result: "우연히 한 번 작동하는 결과가 아니라 같은 기준을 반복해서 통과하는 신뢰할 수 있는 서비스가 됩니다.",
  },
};

