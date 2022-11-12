import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TerminalClientComponent } from './features/terminal-client/terminal-client.component';
import { InputComponent } from './features/input/input.component';
import { NgTerminalModule } from 'ng-terminal';
import { TopBarComponent } from './features/top-bar/top-bar.component';
import { NgIconsModule } from '@ng-icons/core';
import { heroUserSolid, heroScaleSolid } from '@ng-icons/heroicons/solid';
import {
  jamAlienF,
  jamAlien,
  jamBeerF,
  jamDoor,
  jamSwordF,
} from '@ng-icons/jam-icons';
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
  matFullscreenExit,
  matLocationOn,
  matSettings,
} from '@ng-icons/material-icons/baseline';
import {
  ionFootsteps,
  ionFlag,
  ionEar,
  ionEye,
  ionLockOpen,
  ionLockClosed,
  ionShieldHalf,
  ionBug,
  ionWalk,
} from '@ng-icons/ionicons';
import { featherFeather } from '@ng-icons/feather-icons';
import { CharacterPanelComponent } from './features/character-panel/character-panel.component';
import { AttributeProgressBarComponent } from './features/character-panel/attribute-progress-bar/attribute-progress-bar.component';
import { TopicsDatabaseComponent } from './features/topics-database/topics-database.component';
import { TopicViewerComponent } from './features/topics-database/topic-viewer/topic-viewer.component';
import { SingleTopicViewComponent } from './features/topics-database/topic-viewer/single-topic-view/single-topic-view.component';
import { QuillModule } from 'ngx-quill';
import { CheckboxComponent } from './features/input/checkbox/checkbox.component';
import { ArmageddonModule } from './armageddon/armageddon.module';
import { SharedModule } from './shared/shared.module';
import { SegmentedAttributeProgressBarComponent } from './features/character-panel/segmented-attribute-progress-bar/segmented-attribute-progress-bar.component';
import { FeedModule } from './features/feed/feed.module';
import { MirageModule } from './features/mirage/mirage.module';
import { ReconnectViewComponent } from './features/reconnect-view/reconnect-view.component';
import { CharacterSummaryConfigPanelComponent } from './features/character-panel/character-summary-config-panel/character-summary-config-panel.component';
import { CharacterSummaryItemComponent } from './features/character-panel/character-summary-item/character-summary-item.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    TerminalClientComponent,
    InputComponent,
    TopBarComponent,
    CharacterPanelComponent,
    AttributeProgressBarComponent,
    TopicsDatabaseComponent,
    TopicViewerComponent,
    SingleTopicViewComponent,
    CheckboxComponent,
    SegmentedAttributeProgressBarComponent,
    ReconnectViewComponent,
    CharacterSummaryConfigPanelComponent,
    CharacterSummaryItemComponent,
  ],
  imports: [
    ArmageddonModule,
    SharedModule,
    FeedModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MirageModule,
    DragDropModule,
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
      jamAlien,
      jamAlienF,
      jamDoor,
      jamBeerF,
      jamSwordF,
      matFrontHand,
      heroScaleSolid,
      matGroup,
      matFullscreenExit,
      matLocationOn,
      matSettings,
      ionFootsteps,
      ionEar,
      ionEye,
      ionFlag,
      ionLockOpen,
      ionLockClosed,
      ionShieldHalf,
      ionBug,
      ionWalk,
      featherFeather,
    }),
    QuillModule.forRoot(),
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
