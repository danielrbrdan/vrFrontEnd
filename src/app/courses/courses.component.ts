import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { CourseDto } from '../models/dto/course.dto';
import { CourseService } from '../services/course.service';
import { tap } from 'rxjs';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit{
  courses!: CourseDto[];

  courseForm = this.formBuilder.group({
    id: undefined,
    description: '',
    subject: '',
  });
  
  addModalInstance!: NgbModalRef;

  constructor(
    private modalService: NgbModal,
    private courseService: CourseService,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses() {
    this.courseService.findAll().pipe(
      tap(courses => {
        this.courses = courses
      })
    ).subscribe();
  }

  @ViewChild('addModal') 
  addModal!: ViewContainerRef;
  openModal() {
    this.addModalInstance = this.modalService.open(this.addModal, { size: 'md' }) 
  }

  addCourse() {
    let course: CourseDto = {...this.courseForm.value as CourseDto};
    this.courseService.save(course).pipe(
      tap (()=> {
        this.loadCourses();
        this.addModalInstance.close();
        this.courseForm.reset();
      })
    ).subscribe();
  }

  deleteCourse(courseId: number) {
    this.courseService.deleteById(courseId).pipe(
      tap (()=> {
        this.loadCourses();
      })
    ).subscribe();
  }

  editCourse(course: CourseDto) {
    this.courseForm.patchValue(course);
    this.openModal();
  }

}
