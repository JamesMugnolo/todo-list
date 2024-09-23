import { Component, Input } from '@angular/core';
import { TodoStoreService } from '../../services/todo-store.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { ModalService } from '../../../modals/modal.service';
import { AddModalComponent } from '../../../modals/components/add-modal/add-modal.component';
import { NgIf } from '@angular/common';
@Component({
  selector: 'app-todo-card',
  standalone: true,
  imports: [FontAwesomeModule, NgIf],
  templateUrl: './todo-card.component.html',
  styleUrl: './todo-card.component.css',
})
export class TodoCardComponent {
  show: boolean = false;
  isSelected = false;
  faPenToSquare = faPenToSquare;
  faCaret = faCaretDown;
  constructor(
    private todoStore: TodoStoreService,
    private modalService: ModalService
  ) {}
  formatDate(): string {
    if (this.completeBy) {
      return new Date(this.completeBy).toLocaleDateString();
    }
    return '';
  }
  formatStatus(): string {
    if (this.status && this.status !== 'LATE') {
      return (
        this.status.charAt(0).toUpperCase() + this.status.slice(1).toLowerCase()
      ).replace('_', ' ');
    }
    return this.status;
  }
  removeTodo(): void {
    this.todoStore.delete(this.id);
  }
  updateTodo() {
    this.todoStore.saveSingleToDo({
      id: this.id,
      userid: this.userid,
      title: this.title,
      description: this.description,
      completeBy: this.completeBy,
      status: this.status as 'COMPLETED' | 'LATE' | 'IN_PROGRESS',
    });
    this.modalService.open(AddModalComponent, {
      size: {
        width: '40%',
        minHeight: 'fit-content',
        maxHeight: '45%',
      },
    });
  }
  @Input()
  id!: number;

  @Input()
  userid!: number;

  @Input()
  title!: string;

  @Input()
  description!: string;

  @Input()
  status!: string;

  @Input()
  completeBy!: Date;
}
