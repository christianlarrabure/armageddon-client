import {
  Component,
  Output,
  Input,
  EventEmitter,
  AfterViewInit,
} from '@angular/core';
import { EFeedScreen } from '../../interfaces/FeedScreen.interface';
import Topic from '../../../../models/topic.model';
import { TopicsService } from '../../../../topics/services/topics.service';
import { Observable } from 'rxjs';
import { TopicPricesService } from '../../../../topics/services/topic-prices.service';
import TopicPrice from '../../../../models/topicPrice.model';

@Component({
  selector: 'app-topic-edit',
  templateUrl: './topic-edit.component.html',
})
export class TopicEditComponent implements AfterViewInit {
  @Output() openPage = new EventEmitter<EFeedScreen>();
  @Input() editedTopic$?: Observable<Topic>;

  topic: Topic = {
    name: '',
    content: '',
    isA: 'object',
    sdesc: '',
  };

  topicPrices: TopicPrice[] = [];

  constructor(
    private service: TopicsService,
    private prices: TopicPricesService
  ) {}

  ngAfterViewInit(): void {
    this.editedTopic$?.subscribe((topic) => {
      this.topic = topic;
    });
  }

  return() {
    this.openPage.emit(EFeedScreen.CONTEXT_MENU);
  }

  saveItem() {
    if (this.topic.id !== undefined) {
      this.service.updateTopic(this.topic);
    } else {
      this.service.createTopic(this.topic);
    }
    this.return();
  }
}
