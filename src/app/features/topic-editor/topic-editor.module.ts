import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopicEditorComponent } from './view/topic-editor/topic-editor.component';
import { TopicsModule } from 'src/app/topics/topics.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { IsASelectorComponent } from './components/is-aselector/is-aselector.component';
import { IsAOptionComponent } from './components/is-aoption/is-aoption.component';
import { FormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';

@NgModule({
  declarations: [
    TopicEditorComponent,
    IsASelectorComponent,
    IsAOptionComponent,
  ],
  imports: [CommonModule, TopicsModule, SharedModule, FormsModule, QuillModule],
  exports: [TopicEditorComponent],
})
export class TopicEditorModule {}
