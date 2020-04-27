import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SymptomsService {

  constructor(private http: HttpClient) {
    this.initSymptomsStorage();
  }

  symptomsShow(idToken, observed_date): Observable<any> {
    return this.http.get(`${environment.apiUrl}/symptoms/${observed_date}?idToken=${idToken}`);
  }

  initSymptomsStorage() {
    const isSymptomRecords = localStorage.getItem('symptomRecords');
    if (!isSymptomRecords) {
      localStorage.setItem('symptomRecords', '{}');
    }
  }

  getSymptomRecords() {
    const symptomRecords = localStorage.getItem('symptomRecords');
    if (symptomRecords) {
      return JSON.parse(symptomRecords);
    } else {
      return null;
    }
  }

  getSymptomRecord(date) {
    const symptomRecords = this.getSymptomRecords();

    if (symptomRecords) {
      return symptomRecords[new Date(date).toDateString()];
    } else {
      return null;
    }

  }

  addOrUpdateSymptom(date, symptoms) {
    const symptomRecords = this.getSymptomRecords()
    symptomRecords[date] = symptoms;

    localStorage.setItem('symptomRecords', JSON.stringify(symptomRecords));
  }

  update(symptomsPayload): Object {
    console.log(symptomsPayload);
    let observedDate = symptomsPayload.observed_date === '' ? new Date().toDateString() : symptomsPayload.observed_date;
    observedDate = new Date(observedDate).toDateString();

    const symptoms = {
      fever: symptomsPayload.fever,
      weakness: symptomsPayload.weakness,
      dry_cough: symptomsPayload.dry_cough,
      sore_throat: symptomsPayload.sore_throat,
      runny_nose: symptomsPayload.runny_nose,
      difficulty_in_breathing: symptomsPayload.difficulty_in_breathing
    }
    this.addOrUpdateSymptom(observedDate, symptoms);
    return {
      success: "Logged Symptoms successfully"
    };
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