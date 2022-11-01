import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import Topic from '../../../../models/topic.model';
import { TopicsService } from '../../../../topics/services/topics.service';
import { TopicPricesService } from '../../../../topics/services/topic-prices.service';
import { Observable } from 'rxjs';
import TopicPrice from 'src/app/models/topicPrice.model';
import { EFeedScreen } from '../../interfaces/FeedScreen.interface';

@Component({
  selector: 'app-feed-item',
  templateUrl: './feed-item.component.html',
})
export class FeedItemComponent implements OnInit {
  @Input() topic?: Topic;
  @Output() clear = new EventEmitter<void>();
  @Output() openPage = new EventEmitter<EFeedScreen>();

  constructor(private service: TopicsService) {}

  ngOnInit(): void {}

  clearItem() {
    this.clear.emit();
  }

  editItem() {
    this.service.editedTopic.next(this.topic?.id);
  }

  openItem() {
    this.service.selectedTopic.next(this.topic?.id);
    this.openPage.emit(EFeedScreen.TOPIC_VIEW);
  }
}
