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
import { heroUserSolid } from '@ng-icons/heroicons/solid';

@NgModule({
  declarations: [
    AppComponent,
    TerminalClientComponent,
    InputComponent,
    TopBarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgTerminalModule,
    NgIconsModule.withIcons({ heroUserSolid }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
