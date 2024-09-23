import { Component } from '@angular/core';
import { ModalService } from '../../modal.service';
import { FormsModule } from '@angular/forms';
import { AsyncPipe, DatePipe, NgIf } from '@angular/common';
import { IToDo } from '../../../todo/components/todo-display/todo';
import { TodoStoreService } from '../../../todo/services/todo-store.service';
import { BehaviorSubject, Observable, take } from 'rxjs';

@Component({
  selector: 'app-add-modal',
  standalone: true,
  imports: [FormsModule, AsyncPipe, DatePipe, NgIf],
  templateUrl: './add-modal.component.html',
  styleUrl: './add-modal.component.css',
  providers: [DatePipe],
})
export class AddModalComponent {
  viewChange(event: Event) {
    if (event.target && (event.target as HTMLInputElement).valueAsDate != null)
      this.todo.completeBy = (event.target as HTMLInputElement).valueAsDate!;
  }
  isAddModal!: boolean;
  todo!: IToDo;
  date!: string | null;
  status!: string;

  private dateErrorSub = new BehaviorSubject<string>('');
  dateError: Observable<string> = this.dateErrorSub.asObservable();

  private titleErrorSub = new BehaviorSubject<string>('');
  titleError: Observable<string> = this.titleErrorSub.asObservable();

  private statusErrorSub = new BehaviorSubject<string>('');
  statusError: Observable<string> = this.statusErrorSub.asObservable();

  constructor(
    private datePipe: DatePipe,
    private todoStore: TodoStoreService,
    private modalService: ModalService
  ) {
    this.todoStore
      .fetchSingleToDo()
      .pipe(take(1))
      .subscribe((data) => {
        this.todo = data as IToDo;
        this.isAddModal = this.todo.id == -1 ? true : false;
        this.formatStatus();
      });
  }
  close() {
    this.modalService.close();
  }
  formatStatus() {
    this.status =
      this.todo.status[0] +
      this.todo.status.slice(1).replace('_', ' ').toLowerCase();
  }
  formatTodoStatus() {
    this.todo.status = this.status.replace(' ', '_').toUpperCase() as
      | 'COMPLETED'
      | 'LATE'
      | 'IN_PROGRESS';
  }
  addToDo() {
    if (!this.isValid()) return;

    this.formatTodoStatus();
    this.todoStore.addAToDo(this.todo);
    this.modalService.close();
  }

  isValid(): boolean {
    let isValid = true;
    if (this.isPastDate()) {
      this.dateErrorSub.next('date must be todays date or greater');
      isValid = false;
    } else this.dateErrorSub.next('');

    if (this.todo.title == '') {
      this.titleErrorSub.next('Please enter a title');
      isValid = false;
    } else this.titleErrorSub.next('');

    if (!this.isAddModal && this.status == 'Late') {
      this.statusErrorSub.next('status cant be late');
    } else this.statusErrorSub.next('');
    return isValid;
  }
  isPastDate(): boolean {
    let today = new Date();
    today.setUTCHours(0, 0, 0, 0);

    let formattedDate = this.isAddModal
      ? new Date(this.todo.completeBy.toISOString())
      : new Date(this.todo.completeBy);
    formattedDate.setUTCHours(0, 0, 0, 0);

    return today > formattedDate;
  }

  updateToDo() {
    if (!this.isValid()) return;
    this.formatTodoStatus();
    if (this.date) this.todo.completeBy = new Date(this.date);
    this.todoStore.update(this.todo);
    this.modalService.close();
  }
}
