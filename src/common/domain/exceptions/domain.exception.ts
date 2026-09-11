/** 도메인 불변식 위반. 팩토리·엔티티가 던지며, 일반 Error와 구분해 상위 계층이 도메인 규칙 위반으로 인식할 수 있게 한다. */
export class DomainException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'DomainException';
  }
}
