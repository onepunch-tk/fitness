*Fitness App*

**sumary**
  - 이 프로젝트는 zustand + sqlite를 활용한 local first app 토이 프로젝트
  - 이 프로젝트는 도메인 중심 아키텍쳐 + 클린 아키텍쳐를 모방한다.
  

**core**
  - 이 프로젝트는 구조는 domain-first 수직 슬라이스 구조를 사용한다.
  - expo router(선언적 파일 베이스 라우터)를 존중하되, 도메인 중심으로 폴더를 생성한다.
  - 예를 들어 user 라는 도메인은 src/user 라는 디렉토리를 생성하고 이 디렉토리에서 infrastructure, application, presentaion 등을 선언한다. 
  - 공통 모듈의 경우 common 디렉토리를 만들며, 이 디렉토리의 구조도 위와 같다.

**라이러리**
  - expo sdk 57
  - expo-router
  - 패키지매니져: bun
  - lint & formatter: biome

**구조 (뼈대)**
  - 의존 방향: presentation → application → domain. infrastructure는 application의 포트(인터페이스)를 구현하는 어댑터다. domain은 아무 계층도 import하지 않는다.
  - 파일명은 `<이름>.<역할>.ts` 접미사 규칙을 따른다 (*.entity.ts, *.port.ts, *.use-case.ts, *.repository.ts, *.schema.ts, *.store.ts, *.screen.tsx).
  - src/app: expo-router 라우트. 화면 컴포넌트를 연결만 하고 로직을 두지 않는다. 루트 레이아웃(_layout.tsx)이 각 도메인 스키마를 모아 DB를 초기화한다.
  - src/<domain>/
      domain/
        entities/          엔티티 + 팩토리(불변식). 위반 시 DomainException을 던진다.
      application/
        ports/             유스케이스가 필요로 하는 인터페이스 (리포지토리 등). 구현체는 모른다.
        use-cases/         유스케이스. 포트에만 의존한다.
      infrastructure/
        adapters/          포트 구현체 (sqlite-<name>.repository.ts)
        <name>.schema.ts   이 도메인이 소유하는 테이블 정의
      presentation/        zustand store, screens, components
      <domain>.composition.ts   Composition Root. 어댑터를 유스케이스에 주입하는 유일한 장소.
  - src/shared: 위와 같은 4계층 구조의 공통 모듈 (Id, DomainException, UseCase 계약, DB 클라이언트, Screen 래퍼 등)
  - 데모 도메인: workout

**반드시 하면 안되는 행동**
  - 깃 커밋 시 메세지에 create by "agent name" 같은 내용을 넣어서는 안된다. 즉, 어떤 AI 모델이 커밋했는지 작성자를 남기자 말라.
