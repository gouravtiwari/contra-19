import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SymptomsService {

  constructor(private http: HttpClient) { }

  symptomsShow(idToken, observed_date): Observable<any> {
    return this.http.get(`${environment.apiUrl}/symptoms/${observed_date}?idToken=${idToken}`);
  }

  symptomsUpdate(idToken, observed_date): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Accept": 'application/json',
        'Content-Type': 'application/json'
      })
    };

    let requestData = {
      'idToken': idToken,
      'symptom': {
        'observed_date': '',
        'fever': '98.4',
        'weakness': true,
        'dry_cough': false,
        'sore_throat': true,
        'runny_nose': false,
        'difficulty_in_breathing': true
      }
    }

    return this.http.patch(`${environment.apiUrl}/symptoms/${observed_date}`, requestData, httpOptions);
  }

  symptomsCreate(idToken): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Accept": 'application/json',
        'Content-Type': 'application/json'
      })
    };

    let requestData = {
      'idToken': idToken,
      'symptom': {
        'observed_date': '',
        'fever': '98.4',
        'weakness': true,
        'dry_cough': false,
        'sore_throat': true,
        'runny_nose': false,
        'difficulty_in_breathing': true
      }
    }

    return this.http.post(`${environment.apiUrl}/symptoms`, requestData, httpOptions);
  }
}