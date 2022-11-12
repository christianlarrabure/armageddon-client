import TopicPrice from './topicPrice.model';
import { Observable } from 'rxjs';
export default interface Topic {
  id?: number;
  name: string;
  content: string;
  isA: 'concept' | 'character' | 'object' | 'food';
  sdesc: string;
  taste: string | undefined;
}
