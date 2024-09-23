import { Component, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { UserStoreService } from '../../modules/login/services/user-store.service';
import { AsyncPipe, NgIf } from '@angular/common';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgIf, AsyncPipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  isAuthenticated!: Observable<boolean>;
  constructor(private userStore: UserStoreService) {}
  ngOnInit() {
    this.isAuthenticated = this.userStore.isLoggedIn;
  }

  logout() {
    this.userStore.logOut();
  }
}
