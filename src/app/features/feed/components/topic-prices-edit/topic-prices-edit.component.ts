import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import TopicPrice from '../../../../models/topicPrice.model';
import { TopicPricesService } from '../../../../topics/services/topic-prices.service';
import Topic from '../../../../models/topic.model';

@Component({
  selector: 'app-topic-prices-edit',
  templateUrl: './topic-prices-edit.component.html',
})
export class TopicPricesEditComponent implements AfterViewInit {
  @Input() topic?: Topic;
  prices: TopicPrice[] = [];
  newPrice: TopicPrice = {
    topicId: 0,
    source: '',
    price: 0,
    date: new Date(),
  };

  constructor(private service: TopicPricesService) {}

  refreshPrices() {
    if (this.topic === undefined) {
      console.error('Topic is undefined while trying to refresh topic prices.');
      return;
    }

    if (this.topic.id === undefined) {
      console.error(
        'Topic ID is undefined while trying to refresh topic prices.'
      );
      return;
    }
    this.service.getTopicPricesByTopicId(this.topic.id).subscribe((prices) => {
      this.prices = prices;
    });
  }

  ngAfterViewInit(): void {
    this.refreshPrices();
  }

  addTopicPrice() {
    if (this.topic?.id === undefined) {
      return;
    }
    this.newPrice.topicId = this.topic?.id;
    this.service.createTopicPrice(this.newPrice);
    this.refreshPrices();
  }

  deleteTopicPrice(id: number | undefined) {
    if (id === undefined) {
      return;
    }
    this.service.deleteTopicPrice(id);
    this.refreshPrices();
  }
}
