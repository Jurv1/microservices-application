export interface IKafkaMessage<T> {
  topic: string;
  partition: string;
  timestamp: string;
  size: number;
  attributes: number;
  offset: string;
  key: any;
  value: T;
  headers: Record<string, any>;
}
