import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ChatTab } from '../../model/chat-tab';

@Component({
  selector: 'app-chat-input',
  templateUrl: './chat-input.component.html',
  styleUrls: ['./chat-input.component.css']
})
export class ChatInputComponent implements OnInit {

  @Input() chatTab: ChatTab;
  @Output() messageSent: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit() {
    console.log(this.chatTab);
  }

  sendMessage() {
    if (this.chatTab.currentMessage !== null && this.chatTab.currentMessage !== '') {
      this.messageSent.emit(this.chatTab.currentMessage);
    }
    this.chatTab.currentMessage = '';
  }

}
