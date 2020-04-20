import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserConnectionsService {

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

    return this.http.post(`${environment.apiUrl}/user_connections`, requestData, httpOptions);
  }
}