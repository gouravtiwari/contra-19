import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SymptomsService {
  url = 'https://c19-tracker.herokuapp.com'

  constructor(private http: HttpClient) { }

  // TODO: Change routes to make them nested under users to leverage idToken scoping for safety
  symptomsShow(idToken, id): Observable<any> {
    return this.http.get(`${this.url}/symptoms/${id}`);
  }

  symptomsUpdate(idToken, id): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Accept": 'application/json',
        'Content-Type':  'application/json'
      })
    };

    let requestData = {
      'idToken': idToken,
      'id': id,
      "symptom": {
        "fever": "60",
        "param1": "transgender",
        "param2": "400061",
      }
    }

    return this.http.patch(`${this.url}/symptoms/${id}`, requestData, httpOptions);
  }

  symptomsCreate(idToken): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Accept": 'application/json',
        'Content-Type':  'application/json'
      })
    };

    let requestData = {
      'idToken': idToken,
      "symptom": {
        "fever": "60",
        "param1": "transgender",
        "param2": "400061",
      }
    }

    return this.http.post(`${this.url}/symptoms`, requestData, httpOptions);
  }
}