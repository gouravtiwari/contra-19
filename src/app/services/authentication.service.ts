import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

import { User } from '../models';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }
    setCurrentUser(user) {
      const userObj: User = user as User;

      localStorage.setItem('currentUser', JSON.stringify(user))
      this.currentUserSubject.next(userObj);
    }
    updateCurrentUser(currentUser, user) {
      user.idToken = currentUser.idToken;
      user.savedOn = currentUser.savedOn;
      this.setCurrentUser(user);
      console.log("Stored updated user locally: ", JSON.stringify(this.currentUserValue));
    }
    login(username: string, password: string) {
        // to try local use this URL /users/authenticate
        return this.http.post<any>(`${environment.apiUrl}/api/auth/login`, { username, password })
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.currentUserSubject.next(user);
                }

                return user;
            }));
    }
    logout() {
        const DATA = JSON.parse(localStorage.getItem('currentUser'));
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
        return this.http.post<any>(`${environment.apiUrl}/api/auth/logOut`, DATA);
    }
}
