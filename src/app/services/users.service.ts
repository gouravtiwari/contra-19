import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  url = 'https://c19-tracker.herokuapp.com'

  constructor(private http: HttpClient) { }

  usersShow(idToken): Observable<any> {
    return this.http.get(`${this.url}/users/${idToken}`);
  }

  usersUpdate(idToken): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Accept": 'application/json',
        'Content-Type':  'application/json'
      })
    };

    let requestData = {
      'idToken': idToken,
      "user": {
        "age": "60",
        "gender": "transgender", // Possible values: 'male', 'female', 'transgender'
        "zip_code": "400061",
        "country": "", // Not implemented
        "status": "infected"
      }
    }

    console.log('User updating-------------------')
    return this.http.patch(`${this.url}/users/${idToken}`, requestData, httpOptions);
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
    return this.http.post(`${this.url}/users`, requestData, httpOptions);
  }
}