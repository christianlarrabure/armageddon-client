export default interface Topic {
  id?: number;
  name: string;
  content: string;
  isA: 'concept' | 'character' | 'object';
  sdesc: string;
}
