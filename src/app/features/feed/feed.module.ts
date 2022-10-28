import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedComponent } from './views/feed/feed.component';
import { TopicsModule } from '../../topics/topics.module';
import { FeedItemComponent } from './components/feed-item/feed-item.component';
import { matDoDisturb } from '@ng-icons/material-icons/baseline';
import { NgIconsModule } from '@ng-icons/core';

@NgModule({
  declarations: [FeedComponent, FeedItemComponent],
  imports: [
    CommonModule,
    TopicsModule,
    NgIconsModule.withIcons({ matDoDisturb }),
  ],
  exports: [FeedComponent],
})
export class FeedModule {}
