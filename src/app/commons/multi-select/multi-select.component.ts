import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-multi-select',
  templateUrl: './multi-select.component.html',
  styleUrls: ['./multi-select.component.css'],
})
export class MultiSelectComponent implements OnInit {

  @Input() values: any[];
  @Input() tooltip: string;
  @Input() selectedValues: any[] = [];


  @Output() checkedValues: EventEmitter<any[]> = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  @Input() valueFormatter = (x: any): string => x;
  @Input() valueComparator = (x: any, y: any): number => {
    if (x < y) {  return -1; }
    if (x > y) { return 1; }
    return 0;
   }

  toggleValue(value) {
    const valueIndex = this.selectedValues.indexOf(value);

    if (valueIndex >= 0) {
      this.selectedValues.splice(valueIndex, 1);
    } else {
      this.selectedValues.push(value);
    }

    this.selectedValues.sort((a, b) => this.valueComparator(a, b));
    this.checkedValues.emit(this.selectedValues);
  }

  isChecked(value): boolean {
    if (this.selectedValues.includes(value)) {
      return true;
    }

    return false;
  }

}
