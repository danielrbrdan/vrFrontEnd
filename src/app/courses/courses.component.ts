import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { CourseDto } from '../models/dto/course.dto';
import { CourseService } from '../services/course.service';
import { catchError, tap, throwError } from 'rxjs';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder } from '@angular/forms';
import { StudentService } from '../services/student.service';
import { StudentDto } from '../models/dto/student.dto';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent implements OnInit {
  courses!: CourseDto[];

  courseForm = this.formBuilder.group({
    id: undefined,
    description: '',
    subject: '',
  });

  addModalInstance!: NgbModalRef;
  currentCourse!: CourseDto;
  studentsList!: any[];
  students!: StudentDto[];
  studentsModalInstance!: NgbModalRef;
  filteredCourses!: CourseDto[];

  constructor(
    private modalService: NgbModal,
    private courseService: CourseService,
    private formBuilder: FormBuilder,
    private studentService: StudentService,
  ) {}

  ngOnInit(): void {
    this.loadCourses();
    this.loadStudents();
  }

  loadCourses() {
    this.courseService
      .findAll()
      .pipe(
        tap((courses) => {
          this.courses = this.filteredCourses = courses;
        }),
      )
      .subscribe();
  }

  loadStudents() {
    this.studentService
      .findAll()
      .pipe(
        tap((students) => {
          this.students = students;
        }),
      )
      .subscribe();
  }

  @ViewChild('addModal')
  addModal!: ViewContainerRef;
  openModal() {
    this.addModalInstance = this.modalService.open(this.addModal, {
      size: 'md',
    });
    this.addModalInstance.result.then(
      (result) => {
        this.courseForm.reset();
      },
      (reason) => {
        this.courseForm.reset();
      },
    );
  }

  addCourse() {
    let course: CourseDto = { ...(this.courseForm.value as CourseDto) };
    this.courseService
      .save(course)
      .pipe(
        tap(() => {
          this.filteredCourses = [];
          this.loadCourses();
          this.addModalInstance.close();
          this.courseForm.reset();
        }),
      )
      .subscribe();
  }

  deleteCourse(courseId: number) {
    if (!confirm("Deseja realmente deletar o curso?")){
      return;
    }

    this.courseService
      .deleteById(courseId)
      .pipe(
        tap(() => {
          this.loadCourses();
        }),
        catchError(err => {
          alert(err.error.message)
          return throwError(err);
      })
      )
      .subscribe();
  }

  editCourse(course: CourseDto) {
    this.courseForm.patchValue(course);
    this.openModal();
  }

  @ViewChild('studentsModal')
  studentsModal!: ViewContainerRef;
  openStudentsModal(course: CourseDto) {
    this.currentCourse = course;
    this.studentsModalInstance = this.modalService.open(this.studentsModal, {
      size: 'md',
    });
  }

  studentsSave(students: any[]) {
    this.currentCourse.students = students.filter(
      (student) => student.isSelected,
    );
    this.courseService
      .save(this.currentCourse)
      .pipe(
        tap(() => {
          this.loadCourses();
          this.studentsModalInstance.close();
        }),
      )
      .subscribe();
  }

  filterItems(searchEvent: any) {
    let searchTerm: string = searchEvent?.target.value
    this.filteredCourses = this.courses.filter(item =>
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
}
