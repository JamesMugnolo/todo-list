import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserStoreService } from '../../services/user-store.service';
import { IUser } from '../../services/user-interface';
import { HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, take } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [FormsModule, AsyncPipe],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
})
export class LoginPageComponent {
  isSignin!: boolean;
  user!: IUser;

  private submissionErrorSub = new BehaviorSubject<string>('');
  submissionError: Observable<string> = this.submissionErrorSub.asObservable();

  constructor(private userStore: UserStoreService) {
    this.isSignin = true;
    this.user = { username: '' };
  }
  ngOnInit() {
    localStorage.clear();
  }
  submit(): void {
    this.clearError();
    if (this.isSignin) {
      this.userStore.fetchUser(this.user, this.submissionErrorSub);
    } else {
      this.userStore.create(this.user, this.submissionErrorSub);
    }
  }
  clearError(): void {
    this.submissionErrorSub.pipe(take(1)).subscribe((error: string) => {
      this.submissionErrorSub.next('');
    });
  }
}
