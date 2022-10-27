import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopicsService } from './topics.service';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [TopicsService],
})
export class TopicsModule {}
