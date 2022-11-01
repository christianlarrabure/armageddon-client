import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import Topic from 'src/app/models/topic.model';
import { TopicsService } from '../../topics/services/topics.service';

@Component({
  selector: 'app-smart-search',
  templateUrl: './smart-search.component.html',
  styleUrls: ['./smart-search.component.css'],
})
export class SmartSearchComponent implements OnInit {
  show: boolean = false;
  @Output() showChanged = new EventEmitter<boolean>();
  @Output() pickedTopic = new EventEmitter<number | undefined>();
  @Input() searchValue: string = '';
  foundTopics: Topic[] = [];

  constructor(private topicsService: TopicsService) {}

  ngOnInit(): void {
    this.topicsService.editedTopic.subscribe(() => {
      this.show = false;
    });
  }

  changeShow(value: boolean) {
    this.show = value;
    this.topicsService.smartSearchActive$.next(this.show);
  }

  handleSearch() {
    this.topicsService.searchTopics(this.searchValue).subscribe((topics) => {
      this.foundTopics = topics;
    });
  }

  async pickTopic(id: number | undefined) {
    this.changeShow(false);
    if (id !== undefined) {
      this.topicsService.getTopic(id).subscribe((topic) => {
        this.topicsService.selectedTopics$.next([topic]);
      });
    }
  }
}
