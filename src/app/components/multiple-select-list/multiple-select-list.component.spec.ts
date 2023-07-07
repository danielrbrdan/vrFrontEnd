import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultipleSelectListComponent } from './multiple-select-list.component';

describe('MultipleSelectListComponent', () => {
  let component: MultipleSelectListComponent;
  let fixture: ComponentFixture<MultipleSelectListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MultipleSelectListComponent]
    });
    fixture = TestBed.createComponent(MultipleSelectListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
