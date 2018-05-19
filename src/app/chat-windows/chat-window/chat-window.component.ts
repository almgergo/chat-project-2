import { Component, OnInit, Input } from '@angular/core';
import { ChatTab } from '../model/chat-tab';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.css']
})
export class ChatWindowComponent implements OnInit {

  @Input() chatTab: ChatTab = new ChatTab();

  constructor() { }

  ngOnInit() {
  }

}
