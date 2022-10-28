import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import Topic from '../../../../models/topic.model';
import { TopicsService } from '../../../../topics/topics.service';

@Component({
  selector: 'app-feed-item',
  templateUrl: './feed-item.component.html',
})
export class FeedItemComponent implements OnInit {
  @Input() topic?: Topic;
  @Output() clear = new EventEmitter<void>();

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
  }
}
