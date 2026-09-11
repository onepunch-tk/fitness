# fitness

zustand + expo-sqlite로 만드는 local-first 운동 기록 앱. 클린 아키텍처를 Expo 환경에 맞게 옮겨보는 토이 프로젝트다.

## 스택

- Expo SDK 57, expo-router
- expo-sqlite
- zustand
- bun, biome

## 실행

```sh
bun install
bun start
```

`bun run check`로 lint와 포맷을 한 번에 검사한다.

## 구조

도메인별로 폴더를 나누고, 각 도메인 안에 계층을 둔다. 라우트(`src/app`)는 화면을 연결만 하고 로직을 갖지 않는다.

```
src/
  app/                      expo-router 라우트
  common/                   공통 모듈 (Id, DomainException, UseCase 계약, DB 클라이언트 등)
  workout-ca-example/       데모 도메인
    domain/entities/        엔티티 + 팩토리. 불변식 위반 시 DomainException
    application/ports/      유스케이스가 필요로 하는 인터페이스
    application/use-cases/  유스케이스. 포트에만 의존
    infrastructure/         포트 구현체(sqlite), 테이블 스키마
    presentation/           zustand store, screens, components
    workout.composition.ts  어댑터를 유스케이스에 주입하는 유일한 장소
```

의존 방향은 presentation → application → domain 한 방향이다. infrastructure는 application의 포트를 구현하는 어댑터고, domain은 어느 계층도 import하지 않는다.

파일명은 `<이름>.<역할>.ts` 규칙을 따른다. (`*.entity.ts`, `*.port.ts`, `*.use-case.ts`, `*.repository.ts`, `*.schema.ts`, `*.store.ts`, `*.screen.tsx`)

## 라이선스

MIT
