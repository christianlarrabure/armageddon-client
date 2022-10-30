import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import Topic from '../../../../models/topic.model';
import { TopicPricesService } from '../../../../topics/services/topic-prices.service';
import { Observable } from 'rxjs';
import TopicPrice from 'src/app/models/topicPrice.model';

@Component({
  selector: 'app-item-price',
  templateUrl: './item-price.component.html',
})
export class ItemPriceComponent implements OnInit, AfterViewInit {
  @Input() topic?: Topic;

  constructor(private prices: TopicPricesService) {}

  topicPrices$: Observable<TopicPrice[]> | undefined;
  creating: boolean = false;

  subscribeTopicPrices() {
    if (this.topic?.id === undefined) {
      console.warn(
        "TOPIC PRICE can't be subscribed because TOPIC ID is undefined."
      );
      return;
    }

    this.topicPrices$ = this.prices.getTopicPricesByTopicId(this.topic?.id);
  }

  ngOnInit(): void {
    this.subscribeTopicPrices();
  }

  ngAfterViewInit(): void {
    this.prices.refreshTopicPrices();
  }

  addNew() {
    this.creating = true;
  }
}
