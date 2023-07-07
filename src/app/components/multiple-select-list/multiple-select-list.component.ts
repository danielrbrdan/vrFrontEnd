import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-multiple-select-list',
  templateUrl: './multiple-select-list.component.html',
  styleUrls: ['./multiple-select-list.component.scss'],
})
export class MultipleSelectListComponent implements OnInit {
  @Input() datas!: any[];
  @Input() selectedDatas!: any[];
  @Input() titleIndex = 'title';

  @Output() sentEmitter = new EventEmitter<any>();
  @Output() cancelEmitter = new EventEmitter<any>();

  ngOnInit() {
    this.datas = [
      ...this.selectedDatas.map((course) => {
        return { ...course, isSelected: true };
      }),
      ...this.datas.filter(
        (element) =>
          !this.selectedDatas.some(
            (selectedElement) => selectedElement.id === element.id,
          ),
      ),
    ].map((element) => {
      return { ...element, title: element[this.titleIndex] };
    });
  }

  send() {
    this.sentEmitter.emit(this.datas);
  }

  cancel() {
    this.cancelEmitter.emit(this.datas);
  }
}
