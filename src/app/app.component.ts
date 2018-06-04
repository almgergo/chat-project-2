import { Component } from '@angular/core';
import { Topic } from './commons/model/topic-dto';
import { UserService } from './user-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  topics: Topic[];

  constructor(private userService: UserService) {
    const i = this.userService.userId;
  }
}
