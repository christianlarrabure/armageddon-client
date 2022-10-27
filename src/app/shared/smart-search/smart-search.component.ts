import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import Topic from 'src/app/models/topic.model';
import { TopicsService } from '../../topics/topics.service';

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
    this.showChanged.emit(value);
    this.show = value;
  }

  handleSearch() {
    this.topicsService.searchTopics(this.searchValue).subscribe((topics) => {
      this.foundTopics = topics;
    });
  }

  pickTopic(id: number | undefined) {
    this.changeShow(false);
    this.topicsService.selectedTopic.next(id);
  }
}
