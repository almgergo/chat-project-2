import { Component } from '@angular/core';
import { Topic } from './commons/model/topic-dto';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  topics: Topic[];
}
