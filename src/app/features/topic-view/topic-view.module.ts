import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { TopicsModule } from '../../topics/topics.module';
import { TopicViewComponent } from './view/topic-view/topic-view.component';
import { TopStatusLineComponent } from './components/top-status-line/top-status-line.component';
import { NgIconsModule } from '@ng-icons/core';
import { matEdit, matDelete } from '@ng-icons/material-icons/baseline';
import { TopicViewButtonsComponent } from './components/topic-view-buttons/topic-view-buttons.component';

@NgModule({
  declarations: [
    TopicViewComponent,
    TopStatusLineComponent,
    TopicViewButtonsComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    TopicsModule,
    NgIconsModule.withIcons({ matEdit, matDelete }),
  ],
  exports: [TopicViewComponent],
})
export class TopicViewModule {}
