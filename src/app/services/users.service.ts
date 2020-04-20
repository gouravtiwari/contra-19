import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient,private authService: AuthenticationService) { }

  usersShow(idToken): Observable<any> {
    return this.http.get(`${environment.apiUrl}/users/${idToken}`);
  }

  usersUpdate(user): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Accept": 'application/json',
        'Content-Type':  'application/json'
      })
    };
    this.authService.setCustomCurrentUser(); //Just used for setting default user remove it once login is setup

    let currentUser = this.authService.currentUserValue;
    console.log(currentUser);
    let idToken = currentUser.idToken;
    let requestData = {
      'idToken': idToken,
      "user": user
    }

    console.log('User updating-------------------')
    console.log(idToken);
    return this.http.patch(`${environment.apiUrl}/users/${idToken}`, requestData, httpOptions);
  }

  signUp(idToken): Observable<any> {
    console.log("in signup post------------------------", idToken);
    const httpOptions = {
      headers: new HttpHeaders({
        "Accept": 'application/json',
        'Content-Type':  'application/json'
      })
    };

    let requestData = { 'idToken': idToken }

    console.log('User registering-------------------')
    return this.http.post(`${environment.apiUrl}/users`, requestData, httpOptions);
  }
}
