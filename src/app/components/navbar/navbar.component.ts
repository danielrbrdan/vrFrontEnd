import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  readonly menus = [
    {
      title: "Cursos",
      href: "/courses",
      icon: "bi bi-film"
    },
    {
      title: "Alunos",
      href: "/students",
      icon: "bi bi-file-earmark-person"
    },
  ]
}
