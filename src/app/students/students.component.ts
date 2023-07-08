import {
  Component,
  ComponentRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { StudentDto } from '../models/dto/student.dto';
import { catchError, tap, throwError } from 'rxjs';
import { StudentService } from '../services/student.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder } from '@angular/forms';
import { CourseService } from '../services/course.service';
import { CourseDto } from '../models/dto/course.dto';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss'],
})
export class StudentsComponent {
  students!: StudentDto[];

  studentForm = this.formBuilder.group({
    id: undefined,
    name: '',
  });

  addModalInstance!: NgbModalRef;
  courseModalInstance!: NgbModalRef;
  courses!: CourseDto[];
  coursesList!: any[];
  currentStudent!: StudentDto;
  filteredStudents!: StudentDto[];

  constructor(
    private modalService: NgbModal,
    private studentService: StudentService,
    private formBuilder: FormBuilder,
    private courseService: CourseService,
  ) {}

  ngOnInit(): void {
    this.loadStudents();
    this.loadCourses();
  }

  loadStudents() {
    this.studentService
      .findAll()
      .pipe(
        tap((students) => {
          this.students = this.filteredStudents = students;
        }),
      )
      .subscribe();
  }

  loadCourses() {
    this.courseService
      .findAll()
      .pipe(
        tap((courses) => {
          this.courses = courses;
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
        this.studentForm.reset();
      },
      (reason) => {
        this.studentForm.reset();
      },
    );
  }

  addStudent() {
    let student: StudentDto = { ...(this.studentForm.value as StudentDto) };
    this.studentService
      .save(student)
      .pipe(
        tap(() => {
          this.filteredStudents = [];
          this.loadStudents();
          this.addModalInstance.close();
          this.studentForm.reset();
        }),
      )
      .subscribe();
  }

  deleteStudent(studentId: number) {
    if (!confirm("Deseja realmente deletar o aluno?")){
      return;
    }

    this.studentService
      .deleteById(studentId)
      .pipe(
        tap(() => {
          this.loadStudents();
        }),
        catchError(err => {
          alert(err.error.message)
          return throwError(err);
      })
      )
      .subscribe();
  }

  editStudent(student: StudentDto) {
    this.studentForm.patchValue(student);
    this.openModal();
  }

  @ViewChild('coursesModal')
  coursesModal!: ViewContainerRef;
  openCoursesModal(student: StudentDto) {
    this.currentStudent = student;
    this.courseModalInstance = this.modalService.open(this.coursesModal, {
      size: 'md',
    });
  }

  coursesSave(courses: any[]) {
    this.currentStudent.courses = courses.filter((course) => course.isSelected);
    this.studentService
      .save(this.currentStudent)
      .pipe(
        tap(() => {
          this.loadStudents();
          this.courseModalInstance.close();
        }),
      )
      .subscribe();
  }

  filterItems(searchEvent: any) {
    let searchTerm: string = searchEvent?.target.value
    this.filteredStudents = this.students.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
}
