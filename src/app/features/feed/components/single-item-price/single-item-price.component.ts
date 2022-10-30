import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import TopicPrice from '../../../../models/topicPrice.model';
import { TopicPricesService } from '../../../../topics/services/topic-prices.service';

@Component({
  selector: 'app-single-item-price',
  templateUrl: './single-item-price.component.html',
})
export class SingleItemPriceComponent implements OnInit {
  @Input() topicPrice!: TopicPrice;
  @Output() saved = new EventEmitter<void>();
  editting: boolean = false;

  constructor(private prices: TopicPricesService) {}

  ngOnInit(): void {
    if (this.topicPrice.date === undefined) {
      this.topicPrice.date = new Date();
      this.editting = true;
    }
  }

  save() {
    if (this.topicPrice.id === undefined) {
      this.prices.createTopicPrice(this.topicPrice);
    } else {
      this.prices.updateTopicPrice(this.topicPrice);
      this.editting = false;
    }
    this.saved.emit();
  }

  editPrice() {
    this.editting = true;
  }

  deletePrice() {
    if (this.topicPrice.id !== undefined) {
      this.prices.deleteTopicPrice(this.topicPrice.id);
    } else {
      console.warn('Toppic price to be deleted is undefined.');
    }
  }
}
