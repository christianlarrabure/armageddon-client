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

@NgModule({
  declarations: [FeedComponent, FeedItemComponent, FeedContentComponent],
  imports: [
    CommonModule,
    TopicsModule,
    NgIconsModule.withIcons({
      matDoDisturb,
      matArrowRight,
      matArrowDropUp,
      matEdit,
    }),
  ],
  exports: [FeedComponent],
})
export class FeedModule {}
