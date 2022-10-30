import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopicsService } from './services/topics.service';
import { ArmageddonModule } from '../armageddon/armageddon.module';
import { TopicPricesService } from './services/topic-prices.service';

@NgModule({
  declarations: [],
  imports: [CommonModule, ArmageddonModule],
  providers: [TopicsService, TopicPricesService],
})
export class TopicsModule {}
