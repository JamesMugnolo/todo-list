import { ChangeDetectorRef, Injectable } from '@angular/core';
import { IUser } from './user-interface';
import {
  BehaviorSubject,
  catchError,
  EMPTY,
  map,
  mergeMap,
  Observable,
  take,
} from 'rxjs';
import { UserApiService } from './user-api.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
enum errorType {
  AuthError,
  ServerError,
  ClientError,
  None,
}

@Injectable({
  providedIn: 'root',
})
export class UserStoreService {
  logOut() {
    this.loginStatus.next(false);
    this.userSub.next({ username: '' });
    localStorage.clear();
    this.router.navigate(['']);
  }

  private loginStatus = new BehaviorSubject<boolean>(false);
  isLoggedIn: Observable<boolean> = this.loginStatus.asObservable();

  private userSub = new BehaviorSubject<IUser>({ username: '' });
  private user: Observable<IUser> = this.userSub.asObservable();

  getUsername(): Observable<string> {
    return this.user.pipe(map((user) => user.username));
  }
  constructor(private userAPI: UserApiService, private router: Router) {
    const userString = localStorage.getItem('app.user');

    if (userString) {
      const user = JSON.parse(userString);
      this.userSub.next(user);
      this.loginStatus.next(true);
    }
  }

  fetchUser(user: IUser, errorMessage: BehaviorSubject<string>) {
    const response = this.userAPI.get(user);

    response
      .pipe(
        catchError((err) => {
          errorMessage.next(this.handleError(err));
          return EMPTY;
        }),
        mergeMap((res) => {
          return this.userSub;
        }),
        take(1)
      )
      .subscribe((response: any) => {
        this.userSub.next(user);
        this.loginStatus.next(true);
        localStorage.setItem('app.user', JSON.stringify(user));
        this.router.navigate(['todos']);
      });
  }

  create(user: IUser, errorMessage: BehaviorSubject<string>) {
    const response: any = this.userAPI.post(user);

    response
      .pipe(
        catchError((err) => {
          errorMessage.next(this.handleError(err));
          return EMPTY;
        }),
        mergeMap((res) => {
          return this.userSub;
        }),
        take(1)
      )
      .subscribe((res: any) => {
        this.userSub.next(user);
        this.loginStatus.next(true);
        localStorage.setItem('app.user', JSON.stringify(user));
        this.router.navigate(['todos']);
      });
  }
  private handleError(error: HttpErrorResponse) {
    if (error.status === 401) {
      return 'invalid user';
    }
    return 'error';
  }
}
