import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TerminalClientComponent } from './features/terminal-client/terminal-client.component';
import { InputComponent } from './features/input/input.component';
import { NgTerminalModule } from 'ng-terminal';
import { TopBarComponent } from './features/top-bar/top-bar.component';
import { NgIconsModule } from '@ng-icons/core';
import { heroUserSolid, heroScaleSolid } from '@ng-icons/heroicons/solid';
import { jamSwordF } from '@ng-icons/jam-icons';
import {
  matChairAlt,
  matBoy,
  matBed,
  matWbSunny,
  matNightlight,
  matWbTwilight,
  matTranslate,
  matFrontHand,
  matGroup,
  matFullscreenExit
} from '@ng-icons/material-icons/baseline';
import { CharacterPanelComponent } from './features/character-panel/character-panel.component';
import { AttributeProgressBarComponent } from './features/character-panel/attribute-progress-bar/attribute-progress-bar.component';
import { CharactersDialogComponent } from './features/characters-dialog/characters-dialog.component';
import { TopicsDatabaseComponent } from './features/topics-database/topics-database.component';
import { TopicEditorComponent } from './features/topics-database/topic-editor/topic-editor.component';
import { TopicViewerComponent } from './features/topics-database/topic-viewer/topic-viewer.component';
import { SingleTopicViewComponent } from './features/topics-database/topic-viewer/single-topic-view/single-topic-view.component';
import { QuillModule } from 'ngx-quill';
import { CheckboxComponent } from './features/input/checkbox/checkbox.component';

@NgModule({
  declarations: [
    AppComponent,
    TerminalClientComponent,
    InputComponent,
    TopBarComponent,
    CharacterPanelComponent,
    AttributeProgressBarComponent,
    CharactersDialogComponent,
    TopicsDatabaseComponent,
    TopicEditorComponent,
    TopicViewerComponent,
    SingleTopicViewComponent,
    CheckboxComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgTerminalModule,
    NgIconsModule.withIcons({
      heroUserSolid,
      matChairAlt,
      matBoy,
      matBed,
      matWbSunny,
      matNightlight,
      matWbTwilight,
      matTranslate,
      jamSwordF,
      matFrontHand,
      heroScaleSolid,
      matGroup,
      matFullscreenExit
    }),
    QuillModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
