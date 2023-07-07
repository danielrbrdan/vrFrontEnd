import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsComponent } from './students.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { CourseService } from '../services/course.service';
import { StudentService } from '../services/student.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('StudentsComponent', () => {
  let component: StudentsComponent;
  let fixture: ComponentFixture<StudentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentsComponent],
      providers: [StudentService, CourseService, HttpClient, HttpHandler],
      schemas: [NO_ERRORS_SCHEMA],
    });
    fixture = TestBed.createComponent(StudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
