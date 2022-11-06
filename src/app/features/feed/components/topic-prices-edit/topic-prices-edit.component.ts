import { Component, OnInit, Input } from '@angular/core';
import TopicPrice from '../../../../models/topicPrice.model';
import { TopicPricesService } from '../../../../topics/services/topic-prices.service';
import Topic from '../../../../models/topic.model';

@Component({
  selector: 'app-topic-prices-edit',
  templateUrl: './topic-prices-edit.component.html',
})
export class TopicPricesEditComponent implements OnInit {
  @Input() prices?: TopicPrice[];
  @Input() topic?: Topic;
  @Input() newPrice: TopicPrice = {
    topicId: 0,
    source: '',
    price: 0,
    date: new Date(),
  };

  constructor(service: TopicPricesService) {}

  ngOnInit(): void {}
}
