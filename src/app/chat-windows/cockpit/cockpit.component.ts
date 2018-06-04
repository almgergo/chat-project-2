import { Component, OnInit } from '@angular/core';
import { ChatTab } from '../model/chat-tab';
import { UnsyncedMessages } from '../model/unsynced-messages';

@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrls: ['./cockpit.component.css']
})
export class CockpitComponent implements OnInit {

  chatTabs: ChatTab[];

  activeTab: ChatTab = new ChatTab();

  constructor() { }

  ngOnInit() {
    this.chatTabs = [
      {id: 0, messages: [
        {body: 'Szia', isUsers: false, time: Date.now() - 10000},
        {body: 'Szija', isUsers: true, time: Date.now() - 9000},
        {body: 'Szija', isUsers: true, time: Date.now() - 8000},
        {body: 'Szija', isUsers: true, time: Date.now() - 5000},
        {body: 'Szija', isUsers: true, time: Date.now() - 1000}
      ], partnerUsername: 'Béla', active: true, partnerId: 1, currentMessage: 'asdn'},
      {id: 1, messages: [], partnerUsername: 'János', active: false, partnerId: 2, currentMessage: 'fuoff'}
    ];
    this.activeTab = this.chatTabs[0];
    // this.chatTabs = [];
  }

  changeActiveTab(tabId: number) {
    this.activeTab = this.chatTabs.find(ct => ct.id === tabId);
    console.log(this.activeTab.partnerUsername);
  }

  sendMessage(unsyncedMessages: UnsyncedMessages) {
    console.log(this.activeTab.partnerId, ...unsyncedMessages.messages);
  }

}
