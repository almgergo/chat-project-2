import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-chat-input',
  templateUrl: './chat-input.component.html',
  styleUrls: ['./chat-input.component.css']
})
export class ChatInputComponent implements OnInit {

  @Output() messageSent: EventEmitter<string> = new EventEmitter();
  message: string;

  constructor() { }

  ngOnInit() {
  }

  sendMessage() {
    this.messageSent.emit(this.message);
    this.message = '';
  }

}
