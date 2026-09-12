export interface UseCase<Input, Output> {
  excute(input: Input): Promise<Output> | Output;
}
