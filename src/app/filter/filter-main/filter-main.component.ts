import { Component, OnInit, ViewChild } from '@angular/core';
import { FilterDto } from '../model/filter-dto';
import { OnChanges } from '@angular/core/src/metadata/lifecycle_hooks';
import { Gender } from '../model/gender.enum';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/merge';
import { NgbDropdown, NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs/Subject';
import { trigger, style, transition, animate, keyframes, query, stagger } from '@angular/animations';
import { MenuItem } from '../model/menu-item';

@Component({
  selector: 'app-filter-main',
  templateUrl: './filter-main.component.html',
  styleUrls: ['./filter-main.component.css'],
  providers: [NgbDropdownConfig],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [   // :enter is alias to 'void => *'
        style({opacity: 0}),
        animate(500, style({opacity: 1}))
      ]),
      transition(':leave', [   // :leave is alias to '* => void'
        animate(500, style({opacity: 0}))
      ])
    ])
  ]

})
export class FilterMainComponent implements OnInit {
  filter: FilterDto = new FilterDto(20, 20, 30);


  userMenuItem: MenuItem = new MenuItem('user', false);
  targetMenuItem: MenuItem = new MenuItem('target', false);

  @ViewChild('userDrop') userDropdown: NgbDropdown;
  @ViewChild('targetDrop') targetDropdown: NgbDropdown;

  menu: { [id: string]: boolean; } = { };
  // menu: MenuItem[] = [new MenuItem(this.userDrop, false), new MenuItem(this.targetDrop, false)];

  termTarget$ = new Subject<{dropdown: NgbDropdown, menuItem: MenuItem}>();
  termUser$ = new Subject<{dropdown: NgbDropdown, menuItem: MenuItem}>();

  constructor() {


    this.termTarget$
    .debounceTime(200)
    .subscribe(dropdownItem => {
      if (!dropdownItem.menuItem.isOpen) {
        dropdownItem.dropdown.close();
      }
    });

    this.termUser$
    .debounceTime(200)
    .subscribe(dropdownItem => {
      if (!dropdownItem.menuItem.isOpen) {
        dropdownItem.dropdown.close();
      }
    });
  }

  ngOnInit() {
    this.userDropdown.autoClose = false;
    this.targetDropdown.autoClose = false;
  }

  openDropdown(dropdown: NgbDropdown, item: MenuItem) {
    dropdown.open();
    item.isOpen = true;
    console.log(item);
  }

  closeWithDelay(targetDrop: NgbDropdown, item: MenuItem, observableEmitter: Subject<{dropdown: NgbDropdown, menuItem: MenuItem}>) {
    item.isOpen = false;
    observableEmitter.next({dropdown: targetDrop, menuItem: item});
  }

}
