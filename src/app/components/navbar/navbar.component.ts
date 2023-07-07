import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  constructor(private router: Router) {}

  readonly menus = [
    {
      title: 'Cursos',
      href: '/courses',
      icon: 'bi bi-film',
    },
    {
      title: 'Alunos',
      href: '/students',
      icon: 'bi bi-file-earmark-person',
    },
  ];

  isCurrentRoute(routerName: string) {
    return this.router.url == routerName;
  }
}
