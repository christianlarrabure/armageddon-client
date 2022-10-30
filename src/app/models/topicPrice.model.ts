export default interface TopicPrice {
  id?: number;
  topicId: number;
  source: string;
  price: number;
  date: Date | undefined;
}
