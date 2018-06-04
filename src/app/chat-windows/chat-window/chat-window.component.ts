import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { ChatTab } from '../model/chat-tab';
import { UnsyncedMessages } from '../model/unsynced-messages';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/takeWhile';
import { Observable } from 'rxjs/Observable';
import { ChatMessage } from '../model/chat-message';


@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.css']
})
export class ChatWindowComponent implements OnInit, OnDestroy {

  @Input() chatTab: ChatTab = new ChatTab();
  @Output() sendUnsyncedMessages: EventEmitter<UnsyncedMessages> = new EventEmitter();

  unsyncedMessages: UnsyncedMessages;

  toDestroy = false;

  constructor() { }

  ngOnInit() {
    this.unsyncedMessages = new UnsyncedMessages();
    this.unsyncedMessages.partnerId = this.chatTab.partnerId;
    this.unsyncedMessages.messages = [];

    Observable.interval(1000)
    .takeWhile(() => !this.toDestroy)
    .subscribe(i => {
      this.showMessageSuccess();
    });
  }

  ngOnDestroy() {
    this.toDestroy = true;
  }

  addNewMessage(message: string, isUsers: boolean) {
    const newMessage: ChatMessage = {body: message, isUsers: isUsers, time: Date.now()};

    this.chatTab.messages.push(newMessage);

    this.unsyncedMessages.messages.push(newMessage);
  }

  showMessageSuccess() {
    if (this.unsyncedMessages.messages.length > 0) {
      this.sendUnsyncedMessages.emit(this.unsyncedMessages);
      this.unsyncedMessages.messages = [];
    }
  }

}
