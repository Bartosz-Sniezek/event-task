export interface ConnectionFactory<T> {
  create(): Promise<T>;
}