import { Component, OnInit, AfterViewInit } from '@angular/core';
import { TopicsService } from '../../../../topics/services/topics.service';
import Topic from '../../../../models/topic.model';
import { EFeedScreen } from '../../interfaces/FeedScreen.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css'],
})
export class FeedComponent implements OnInit, AfterViewInit {
  constructor(private topicsService: TopicsService) {}

  public topics$ = this.topicsService.topicsMentioned$;
  savedTopics: Topic[] = [];

  public screen: EFeedScreen = EFeedScreen.CONTEXT_MENU;
  public previousScreen: EFeedScreen = EFeedScreen.CONTEXT_MENU;
  public SCREEN_CONTEXT_MENU = EFeedScreen.CONTEXT_MENU;
  public SCREEN_TOPIC_VIEW = EFeedScreen.TOPIC_VIEW;
  public SCREEN_TOPIC_EDIT = EFeedScreen.TOPIC_EDIT;

  public doneAnimating: boolean = false;

  public selectedTopic$: Observable<Topic> | undefined = undefined;
  public editedTopic$: Observable<Topic> | undefined = undefined;

  ngOnInit(): void {
    this.topics$.subscribe((topics) => {
      topics.forEach((topic) => {
        const idx = this.savedTopics.indexOf(topic);
        if (idx == -1) {
          this.savedTopics.unshift(topic);
        }
      });
    });

    this.topicsService.selectedTopic$.subscribe((selectedTopic$) => {
      this.selectedTopic$ = selectedTopic$;
    });

    this.topicsService.editedTopic$.subscribe((editedTopic$) => {
      this.editedTopic$ = editedTopic$;
    });
  }

  ngAfterViewInit(): void {
    this.topicsService.refreshTopics();
  }

  clearItem(topic: Topic) {
    const idx = this.savedTopics.indexOf(topic);
    if (idx > -1) {
      this.savedTopics.splice(idx, 1);
    }
  }

  openPage(page: EFeedScreen) {
    this.previousScreen = this.screen;
    this.doneAnimating = false;
    this.screen = page;
    setTimeout(() => {
      this.doneAnimating = true;
    }, 1000);
  }

  newTopic() {
    this.topicsService.editedTopic.next(undefined);
    this.openPage(EFeedScreen.TOPIC_EDIT);
  }
}
