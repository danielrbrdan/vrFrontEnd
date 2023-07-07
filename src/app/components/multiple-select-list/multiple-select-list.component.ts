import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-multiple-select-list',
  templateUrl: './multiple-select-list.component.html',
  styleUrls: ['./multiple-select-list.component.scss']
})
export class MultipleSelectListComponent {
  @Input() data!: any[];
  @Output() sentEmitter = new EventEmitter<any>();
  @Output() cancelEmitter = new EventEmitter<any>();


  send() {
    this.sentEmitter.emit(this.data);
  }

  cancel() {
    this.cancelEmitter.emit(this.data);
  }

}
