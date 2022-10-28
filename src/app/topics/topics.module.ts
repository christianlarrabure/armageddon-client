import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopicsService } from './topics.service';
import { SharedModule } from '../shared/shared.module';
import { ArmageddonModule } from '../armageddon/armageddon.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, ArmageddonModule],
  providers: [TopicsService],
})
export class TopicsModule {}
