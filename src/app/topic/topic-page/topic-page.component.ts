import { Component, OnInit, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { TopicService } from './topic-service';
import { Observable } from 'rxjs/Observable';
import { FormControl } from '@angular/forms';
import { Topic } from '../../commons/model/topic-dto';
import { trigger, transition, style, animate, state } from '@angular/animations';

const topicFitAmount = 6;

@Component({
  selector: 'app-topic-page',
  templateUrl: './topic-page.component.html',
  styleUrls: ['./topic-page.component.css'],
  animations: [
    trigger('growShrinkStaticStart', [
      transition('* => void', [
          style({ opacity: '1', height: '*', 'padding-top': '*', 'padding-bottom': '*', 'margin-top': '*', 'margin-bottom': '*' }),
          animate('0.3s ease',
          style({ opacity: '0', height: '0', 'padding-top': '0', 'padding-bottom': '0', 'margin-top': '0', 'margin-bottom': '0' })
        )
      ]),
      transition('void => false', [
          /*no transition on first load*/
      ]),
      transition('void => *', [
          style({ opacity: '0', height: '0', 'padding-top': '0', 'padding-bottom': '0', 'margin-top': '0', 'margin-bottom': '0' }),
          animate('0.3s ease',
          style({ opacity: '1', height: '*', 'padding-top': '*', 'padding-bottom': '*', 'margin-top': '*', 'margin-bottom': '*' }))
      ])
  ])
  ]
})
export class TopicPageComponent implements OnInit {

  topics: Topic[] = [];
  bothTopics: Topic[] = [];
  activeTopics: Topic[] = [];
  inactiveTopics: Topic[] = [];
  selectedTopic: Topic = new Topic();

  @Output() topicsChanged: EventEmitter<Topic[]> = new EventEmitter();

  selectionCursor = -1;
  searchInput = '';
  private searchField: FormControl;

  @ViewChild('availableTopics') myScrollContainer: ElementRef;

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
      .debounceTime(50)
      .distinctUntilChanged()
      .subscribe(
        searchText => {
          this.searchInput = searchText;
          this.resetCursor();
          this.postProcessTopics();
        }
    );
  }

  /* ############### scroll ############### */

  scrollToSelection(isDown: boolean): void {
    try {
      // if () {
        if (isDown && this.selectionCursor >= topicFitAmount) {
          this.myScrollContainer.nativeElement.scrollTop =
          this.myScrollContainer.nativeElement.scrollHeight /
          this.inactiveTopics.length *
          (this.selectionCursor - topicFitAmount + 1 );
        } else if (!isDown && this.selectionCursor
          <= this.inactiveTopics.length - topicFitAmount) {
          this.myScrollContainer.nativeElement.scrollTop =
          this.myScrollContainer.nativeElement.scrollHeight /
          this.inactiveTopics.length *
          (this.selectionCursor ) ;
        }
      // }

    } catch (err) { }
  }

  /* ############### topic selection  ############### */

  resetCursor() {
    this.selectionCursor = -1;
    this.updateSelectionForTopics();
  }


  selectInput() {
    this.resetCursor();
    this.updateSelectionForTopics();
  }

  updateSelection(event: KeyboardEvent) {
    let isDown = false;
    console.log(this.myScrollContainer);

    switch ( event.keyCode ) {
      case 40:
       if (this.selectionCursor < this.bothTopics.length - 1) {
          this.selectionCursor += 1;
          isDown = true;
        }
        break;
      case 38:
        if (this.selectionCursor > 0) {
          this.selectionCursor -= 1;
          isDown = false;
        }
        break;
      case 13:
        this.addSelectedTopic();
        break;
      default: break;
    }

    this.reboundCursor();
    this.updateSelectionForTopics();
    // this.scrollToSelection(isDown);

  }

  addSelectedTopic() {
    if (this.selectionCursor >= 0 && this.selectionCursor < this.bothTopics.length) {
      const selectedTopic = this.bothTopics[this.selectionCursor];
      if (this.activeTopics.includes(selectedTopic)) {
        this.removeTopic(selectedTopic);

        if (this.selectionCursor < this.inactiveTopics.length) {
          this.selectionCursor = this.inactiveTopics.length;
        }

      } else {
        this.addExistingTopic(selectedTopic);

        if (this.selectionCursor >= this.inactiveTopics.length) {
          this.selectionCursor = this.inactiveTopics.length - 1;
        }
      }

    }
    this.postProcessTopics();
  }

  reboundCursor() {
    if (this.selectionCursor >= this.bothTopics.length) {
      this.selectionCursor = this.bothTopics.length - 1;
    } else if (this.selectionCursor < 0) {
      this.selectionCursor = 0;
    }
  }

  updateSelectionForTopics() {
    this.bothTopics.forEach((topic, index) => {
      topic.selected = index === this.selectionCursor;
    });
  }

  /* ############### add / remove topics ############### */

  addExistingTopic(topic: Topic) {
    this.activeTopics.push(topic);
    // this.clearSearch();
    this.postProcessTopics();
  }

  addNewTopic() {
    if (this.searchInput && this.searchInput.length > 0) {
      if (this.inactiveTopics.length > 0) {
        this.activeTopics.push(this.inactiveTopics[0]);
      } else {
        this.registerNewTopic(this.searchInput);
      }
    }

    this.clearSearch();
    this.postProcessTopics();
  }

  clearSearch() {
    this.searchInput = '';
  }

  registerNewTopic(topicName: string) {
    this.topicService.registerNewTopic(topicName).subscribe(data => {
      this.topics.push(data);
      this.activeTopics.push(data);
    });
  }

  removeTopic(topic: Topic) {
    this.activeTopics.splice(this.activeTopics.findIndex(at => at.name === topic.name), 1);
    // this.clearSearch();
    this.postProcessTopics();
  }

  postProcessTopics() {
    this.findInactiveTopics();
    this.filterInactiveTopics();
    this.orderTopics();
    this.topicsChanged.emit(this.activeTopics);
    this.bothTopics = this.inactiveTopics.concat(this.activeTopics);
  }

  findInactiveTopics() {
    this.inactiveTopics = this.topics.filter(t => !this.activeTopics.some(at => at.name === t.name));
  }

  filterInactiveTopics() {
    this.inactiveTopics = this.inactiveTopics.filter(
      it => it.name.toUpperCase().indexOf(this.searchInput.toUpperCase()) >= 0
    );
  }

  orderTopics() {
    this.orderActiveTopics();
    this.orderInactiveTopics();
  }

  topicFilter = (it1: Topic, it2: Topic) => {
    if (it1.searchCount > it2.searchCount) {
      return -1;
    } else if (it1.searchCount < it2.searchCount) {
      return 1;
    } else {
      if (it1.name > it2.name) {
        return 1;
      } else if (it1.name < it2.name) {
        return -1;
      } else {
        return 0;
      }
    }
  }

  orderActiveTopics() {
    this.activeTopics = this.activeTopics.sort((at1, at2) => this.topicFilter(at1, at2));
  }

  orderInactiveTopics() {
    this.inactiveTopics = this.inactiveTopics.sort((at1, at2) => this.topicFilter(at1, at2));
  }


}
