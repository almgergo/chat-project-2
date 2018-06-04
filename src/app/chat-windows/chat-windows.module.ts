import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CockpitComponent } from './cockpit/cockpit.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonsModule } from '../commons/commons.module';
import { ChatTabsComponent } from './chat-tabs/chat-tabs.component';
import { ChatWindowComponent } from './chat-window/chat-window.component';
import { ChatMessagesComponent } from './chat-window/chat-messages/chat-messages.component';
import { ChatInputComponent } from './chat-window/chat-input/chat-input.component';
import { FormsModule } from '@angular/forms';
import { ChatSyncService } from './cockpit/chat-sync-service';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    CommonsModule,
    FormsModule
  ],
  declarations: [CockpitComponent, ChatTabsComponent, ChatWindowComponent, ChatMessagesComponent, ChatInputComponent],
  exports: [CockpitComponent],
  providers: [ChatSyncService]
})
export class ChatWindowsModule { }
