import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserConnectionsService {
  url = 'https://c19-tracker.herokuapp.com'

  constructor(private http: HttpClient) { }

  userConnectionsCreate(idToken, friendIdToken, mode): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Accept": 'application/json',
        'Content-Type':  'application/json'
      })
    };

    let requestData = {
      'idToken': idToken,
      'friendIdToken': friendIdToken,
      'mode': mode
    }

    return this.http.post(`${this.url}/user_connections`, requestData, httpOptions);
  }
}