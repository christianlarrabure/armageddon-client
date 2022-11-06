import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedComponent } from './views/feed/feed.component';
import { TopicsModule } from '../../topics/topics.module';
import { FeedItemComponent } from './components/feed-item/feed-item.component';
import {
  matDoDisturb,
  matArrowRight,
  matArrowDropUp,
  matEdit,
  matArrowBack,
  matSave,
} from '@ng-icons/material-icons/baseline';
import { NgIconsModule } from '@ng-icons/core';
import { ItemPriceComponent } from './components/item-price/item-price.component';
import { SingleItemPriceComponent } from './components/single-item-price/single-item-price.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { FeedViewComponent } from './components/feed-view/feed-view.component';
import { TopicViewComponent } from './components/topic-view/topic-view.component';
import { TopicEditComponent } from './components/topic-edit/topic-edit.component';
import { TopicPricesEditComponent } from './components/topic-prices-edit/topic-prices-edit.component';

@NgModule({
  declarations: [
    FeedComponent,
    FeedItemComponent,
    ItemPriceComponent,
    SingleItemPriceComponent,
    FeedViewComponent,
    TopicViewComponent,
    TopicEditComponent,
    TopicPricesEditComponent,
  ],
  imports: [
    CommonModule,
    TopicsModule,
    SharedModule,
    NgIconsModule.withIcons({
      matDoDisturb,
      matArrowRight,
      matArrowDropUp,
      matEdit,
      matArrowBack,
      matSave,
    }),
    FormsModule,
  ],
  exports: [FeedComponent],
})
export class FeedModule {}
