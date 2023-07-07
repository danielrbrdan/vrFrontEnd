import { Component, ComponentRef, ViewChild, ViewContainerRef } from '@angular/core';
import { StudentDto } from '../models/dto/student.dto';
import { tap } from 'rxjs';
import { StudentService } from '../services/student.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent {
  students!: StudentDto[];

  studentForm = this.formBuilder.group({
    id: undefined,
    name: '',
  });

  addModalInstance!: NgbModalRef;

  constructor(
    private modalService: NgbModal,
    private studentService: StudentService,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses() {
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

  addStudent() {
    let student: StudentDto = {...this.studentForm.value as StudentDto};
    this.studentService.save(student).pipe(
      tap (()=> {
        this.loadCourses();
        this.addModalInstance.close();
        this.studentForm.reset();
      })
    ).subscribe();
  }

  deleteStudent(studentId: number) {
    this.studentService.deleteById(studentId).pipe(
      tap (()=> {
        this.loadCourses();
      })
    ).subscribe();
  }

  editStudent(student: StudentDto) {
    this.studentForm.patchValue(student);
    this.openModal();
  }
}
