import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserRegistrationService {
  url = 'https://c19-tracker.herokuapp.com'

  constructor(private http: HttpClient) { }

  usersShow(id): Observable<any> {
    console.log("in signup------------------------", this.http.get(`${this.url}users/1`));
    return this.http.get(`${this.url}users/1`);
  }

  signUp(idToken): Observable<any> {
    console.log("in signup post------------------------", idToken);
    const httpOptions = {
      headers: new HttpHeaders({
        "Accept": 'application/json',
        'Content-Type':  'application/json'
      })
    };

    let postData = { 'idToken': idToken }

    console.log('User registering-------------------')
    return this.http.post(`${this.url}/users`, postData, httpOptions)
      .subscribe(
        data => { return data['_body']; },
        error => { console.log(error); }
      );
  }
}