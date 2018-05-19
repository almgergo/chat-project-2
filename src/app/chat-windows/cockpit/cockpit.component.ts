import { Component, OnInit } from '@angular/core';
import { ChatTab } from '../model/chat-tab';

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
        {body: 'Szia', isUsers: false},
        {body: 'Szija', isUsers: true},
        {body: 'Szija', isUsers: true},
        {body: 'Szija', isUsers: true},
        {body: 'Szija', isUsers: true}
      ], partnerUsername: 'Béla', active: true},
      {id: 1, messages: [], partnerUsername: 'János', active: false}
    ];
    this.activeTab = this.chatTabs[0];
    // this.chatTabs = [];
  }

  changeActiveTab(tabId: number) {
    this.activeTab = this.chatTabs.find(ct => ct.id === tabId);
    console.log(this.activeTab.partnerUsername);
  }

  sendMessage(message: string) {
    console.log(message);
  }
}
