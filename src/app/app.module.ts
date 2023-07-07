import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentsComponent } from './components/components.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CoursesComponent } from './courses/courses.component';
import { StudentsComponent } from './students/students.component';
import { CourseService } from './services/course.service';
import { HttpClientModule } from '@angular/common/http';
import { StudentService } from './services/student.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MultipleSelectListComponent } from './components/multiple-select-list/multiple-select-list.component';

@NgModule({
  declarations: [
    AppComponent,
    ComponentsComponent,
    NavbarComponent,
    CoursesComponent,
    StudentsComponent,
    MultipleSelectListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    CourseService,
    StudentService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
