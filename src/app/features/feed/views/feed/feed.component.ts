import { Component, OnInit } from '@angular/core';
import { TopicsService } from '../../../../topics/topics.service';
import Topic from '../../../../models/topic.model';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
})
export class FeedComponent implements OnInit {
  constructor(private topicsService: TopicsService) {}

  public topics$ = this.topicsService.topicsMentioned$;
  savedTopics: Topic[] = [];

  ngOnInit(): void {
    this.topicsService.refreshTopics();
    this.topics$.subscribe((topics) => {
      topics.forEach((topic) => {
        const idx = this.savedTopics.indexOf(topic);
        if (idx == -1) {
          this.savedTopics.unshift(topic);
        }
      });
    });
  }

  clearItem(topic: Topic) {
    const idx = this.savedTopics.indexOf(topic);
    if (idx > -1) {
      this.savedTopics.splice(idx, 1);
    }
  }
}
