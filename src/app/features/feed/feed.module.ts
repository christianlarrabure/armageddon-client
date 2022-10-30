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
} from '@ng-icons/material-icons/baseline';
import { NgIconsModule } from '@ng-icons/core';
import { FeedContentComponent } from './components/feed-content/feed-content.component';
import { ItemPriceComponent } from './components/item-price/item-price.component';
import { SingleItemPriceComponent } from './components/single-item-price/single-item-price.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    FeedComponent,
    FeedItemComponent,
    FeedContentComponent,
    ItemPriceComponent,
    SingleItemPriceComponent,
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
    }),
    FormsModule,
  ],
  exports: [FeedComponent],
})
export class FeedModule {}
