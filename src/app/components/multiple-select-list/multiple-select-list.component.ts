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
  filteredDatas: any;

  @Output() sentEmitter = new EventEmitter<any>();
  @Output() cancelEmitter = new EventEmitter<any>();

  ngOnInit() {
    this.loadDatas();
  }
  loadDatas() {
    if (!this.datas || !this.selectedDatas) {
      return;
    }
    this.filteredDatas = this.datas = [
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

  filterItems(searchEvent: any) {
    let searchTerm: string = searchEvent?.target.value
    this.filteredDatas = this.datas.filter(item =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
}
