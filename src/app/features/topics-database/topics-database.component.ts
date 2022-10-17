import { Component, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import Topic from 'src/app/models/topic.model';
import { TopicsService } from 'src/app/services/topics.service';

@Component({
  selector: 'app-topics-database',
  templateUrl: './topics-database.component.html',
  styleUrls: ['./topics-database.component.css']
})
export class TopicsDatabaseComponent implements OnInit, OnChanges {

  topics:Topic[]=[];
  screen:'editor'|'list'='list';
  selectedTopicId:number|undefined=undefined;

  @Input() active:boolean=false;

  @Output() close = new  EventEmitter<boolean>();

  constructor(private service:TopicsService) { }

  ngOnInit(): void {
    this.loadTopics();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['active'].previousValue == false && changes['active'].currentValue == true) {
      this.loadTopics();
    }
  }

  loadTopics() {
    this.service.getTopics().subscribe(topics=>{
      console.log(topics);
      this.topics=topics;
      console.log("OFFICIAL:", this.topics);
    })
  }

  selectTopic(id:number) {
    this.selectedTopicId=id;
    this.screen='editor';
  }

  doClose(){
    this.close.emit(true);
  }
}
