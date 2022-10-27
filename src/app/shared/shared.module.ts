import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SmartSearchComponent } from './smart-search/smart-search.component';
import { BlurredBackgroundComponent } from './blurred-background/blurred-background.component';
import { CardComponent } from './card/card.component';
import { CardCloseButtonComponent } from './card/card-close-button/card-close-button.component';
import { matFullscreenExit } from '@ng-icons/material-icons/baseline';
import { NgIconsModule } from '@ng-icons/core';
import { FormsModule } from '@angular/forms';
import { TopicsModule } from '../topics/topics.module';
import { SmartSearchFoundTopicsComponent } from './smart-search-found-topics/smart-search-found-topics.component';

@NgModule({
  declarations: [
    SmartSearchComponent,
    BlurredBackgroundComponent,
    CardComponent,
    CardCloseButtonComponent,
    SmartSearchFoundTopicsComponent,
  ],
  imports: [
    CommonModule,
    NgIconsModule.withIcons({ matFullscreenExit }),
    FormsModule,
    TopicsModule,
  ],
  exports: [SmartSearchComponent, CardComponent, BlurredBackgroundComponent],
})
export class SharedModule {}
