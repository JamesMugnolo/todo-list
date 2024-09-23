import { Component, OnInit, Sanitizer } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './core/navbar/navbar.component';
import { HeaderComponent } from './modules/todo/components/header/header.component';
import { TodoDisplayComponent } from './modules/todo/components/todo-display/todo-display.component';
import { LoginPageComponent } from './modules/login/pages/login-page/login-page.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent,
    HeaderComponent,
    TodoDisplayComponent,
    LoginPageComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'toDoListFE';

  constructor(public sanitizer: DomSanitizer) {}
}
