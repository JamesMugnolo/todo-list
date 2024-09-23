import { Component, ComponentRef, OnInit } from '@angular/core';
import { TodoCardComponent } from '../todo-card/todo-card.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IToDo } from './todo';
import { AddModalComponent } from '../../../modals/components/add-modal/add-modal.component';
import { ModalService } from '../../../modals/modal.service';
import { TodoStoreService } from '../../services/todo-store.service';
import { Observable } from 'rxjs';
import { AsyncPipe, NgFor } from '@angular/common';

@Component({
  selector: 'app-todo-display',
  standalone: true,
  imports: [TodoCardComponent, AddModalComponent, AsyncPipe, NgFor],
  templateUrl: './todo-display.component.html',
  styleUrl: './todo-display.component.css',
})
export class TodoDisplayComponent implements OnInit {
  toDos!: Observable<IToDo[]>;

  constructor(
    private http: HttpClient,
    private modalService: ModalService,
    private todoService: TodoStoreService
  ) {}
  openModalComponent() {
    this.todoService.saveSingleToDo(); //if nothing is passed in it saves a default todo
    this.modalService.open(AddModalComponent, {
      animations: {},
      size: {
        width: '40%',
        minHeight: 'fit-content',
        maxHeight: '45%',
      },
    });
  }
  ngOnInit(): void {
    const response = this.todoService.fetchAllToDos();
    if (response != undefined) this.toDos = response;
  }
}
