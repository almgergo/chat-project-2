import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ChatTab } from '../model/chat-tab';

@Component({
  selector: 'app-chat-tabs',
  templateUrl: './chat-tabs.component.html',
  styleUrls: ['./chat-tabs.component.css']
})
export class ChatTabsComponent implements OnInit {

  @Input() chatTabs: ChatTab[] = [];
  @Output() activeTab: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit() {  }

  selectTab(chatTab: ChatTab) {
    const chatTabsTmp = [...this.chatTabs];
    chatTabsTmp.forEach(ct => ct.active = ct.id === chatTab.id);
    this.chatTabs = chatTabsTmp;

    this.activeTab.emit(chatTab.id);
  }

}
