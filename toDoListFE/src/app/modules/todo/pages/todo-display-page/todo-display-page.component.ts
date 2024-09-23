import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { TodoDisplayComponent } from '../../components/todo-display/todo-display.component';

@Component({
  selector: 'app-todo-display-page',
  standalone: true,
  imports: [HeaderComponent, TodoDisplayComponent],
  templateUrl: './todo-display-page.component.html',
  styleUrl: './todo-display-page.component.css',
})
export class TodoDisplayPageComponent {}
