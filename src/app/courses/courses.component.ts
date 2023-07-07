import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { CourseDto } from '../models/dto/course.dto';
import { CourseService } from '../services/course.service';
import { tap } from 'rxjs';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder } from '@angular/forms';
import { StudentService } from '../services/student.service';
import { StudentDto } from '../models/dto/student.dto';

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
  currentCourse!: CourseDto;
  studentsList!: any[];
  students!: StudentDto[];
  studentsModalInstance!: NgbModalRef;

  constructor(
    private modalService: NgbModal,
    private courseService: CourseService,
    private formBuilder: FormBuilder,
    private studentService: StudentService
  ) {}

  ngOnInit(): void {
    this.loadCourses();
    this.loadStudents();
  }

  loadCourses() {
    this.courseService.findAll().pipe(
      tap(courses => {
        this.courses = courses
      })
    ).subscribe();
  }

  loadStudents() {
    this.studentService.findAll().pipe(
      tap(students => {
        this.students = students
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

  @ViewChild('studentsModal') 
  studentsModal!: ViewContainerRef;
  openStudentsModal(course: CourseDto) {
    this.currentCourse = course;
    
    this.studentsList = [
      ...this.students.filter(student => 
        !course.students.some(courseStudent => courseStudent.id === student.id)
      ),
      ...course.students.map(student => {
        return {...student, isSelected: true}
      })
    ]
    .map(student => {
      return {...student, title: student.name}
    });

    this.studentsModalInstance = this.modalService.open(this.studentsModal, { size: 'md' });
  }

  studentsSave(students: any[]){
    this.currentCourse.students = students.filter(student => student.isSelected)
    this.courseService.save(this.currentCourse).pipe(
      tap(()=> {
        this.loadCourses();
        this.studentsModalInstance.close();
      })
    ).subscribe()
  }

}
