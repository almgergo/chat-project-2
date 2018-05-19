import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TopicService } from './topic-service';
import { Observable } from 'rxjs/Observable';
import { FormControl } from '@angular/forms';
import { Topic } from '../../commons/model/topic-dto';

@Component({
  selector: 'app-topic-page',
  templateUrl: './topic-page.component.html',
  styleUrls: ['./topic-page.component.css']
})
export class TopicPageComponent implements OnInit {

  topics: Topic[] = [];
  activeTopics: Topic[] = [];
  inactiveTopics: Topic[] = [];

  searchText = '';

  @Output() topicsChanged: EventEmitter<Topic[]> = new EventEmitter();

  filteredInactiveTopics: Topic[] = [];

  topicSearchText: string;
  private searchField: FormControl;

  constructor(private topicService: TopicService ) {
    this.topicService.getTopics().subscribe(data => {
      this.topics = data;
      this.inactiveTopics = data;
      this.postProcessTopics();
    });

  }

  ngOnInit() {
    this.searchField = new FormControl();
    this.searchField.valueChanges
      .debounceTime(200)
      .distinctUntilChanged()
      .subscribe(
        searchText => {
          this.searchText = searchText.toUpperCase();
          this.postProcessTopics();
        }
    );
  }

  addTopic(topic: Topic) {
    this.activeTopics.push(topic);
    // this.inactiveTopics.splice(this.inactiveTopics.findIndex(t => t.id === topic.id), 1);
    this.postProcessTopics();
  }

  removeTopic(topic: Topic) {
    this.activeTopics.splice(this.activeTopics.findIndex(at => at.id === topic.id), 1);
    // this.inactiveTopics.push(topic);
    this.postProcessTopics();
  }

  postProcessTopics() {
    this.findInactiveTopics();
    this.filterInactiveTopics();
    this.orderTopics();
    this.topicsChanged.emit(this.activeTopics);
  }

  findInactiveTopics() {
    this.inactiveTopics = this.topics.filter(t => !this.activeTopics.some(at => at.id === t.id));
  }

  filterInactiveTopics() {
    this.inactiveTopics = this.inactiveTopics.filter(
      it => it.name.toUpperCase().indexOf(this.searchText) >= 0
    );
  }

  orderTopics() {
    this.orderActiveTopics();
    this.orderInactiveTopics();
  }

  topicFilter = (it1: Topic, it2: Topic) => {
    if (it1.searchCount > it2.searchCount) {
      return -1;
    }

    if (it1.searchCount < it2.searchCount) {
      return 1;
    }

    return 0;
  }

  orderActiveTopics() {
    this.activeTopics = this.activeTopics.sort((at1, at2) => this.topicFilter(at1, at2));
  }

  orderInactiveTopics() {
    this.inactiveTopics = this.inactiveTopics.sort((at1, at2) => this.topicFilter(at1, at2));
  }


}
