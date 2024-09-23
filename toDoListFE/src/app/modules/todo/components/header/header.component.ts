import { Component } from '@angular/core';
import { UserStoreService } from '../../../login/services/user-store.service';
import { Observable } from 'rxjs';
import { IUser } from '../../../login/services/user-interface';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  name!: Observable<string>;
  constructor(userStore: UserStoreService) {
    this.name = userStore.getUsername();
  }
}
