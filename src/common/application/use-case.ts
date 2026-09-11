/**
 * 모든 유스케이스가 따르는 공통 계약.
 * 유스케이스는 domain 계층의 포트(인터페이스)에만 의존하고, 구현체는 composition에서 주입받는다.
 */
export interface UseCase<Input, Output> {
  execute(input: Input): Promise<Output>;
}
