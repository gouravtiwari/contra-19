import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient,
    private authService: AuthenticationService) { }

  usersShow(idToken): Observable<any> {
    return this.http.get(`${environment.apiUrl}/users/${idToken}`);
  }

  /**
   * Updates a user's profile
   * Returns a subscriber object
   */
  usersUpdate(user): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Accept": 'application/json',
        'Content-Type':  'application/json'
      })
    };

    const currentUser = this.authService.currentUserValue;

    // Fresh payload is needed as backend fields are not mapped to ionic model
    const requestData = {
      'user': {
        'age': user.age,
        'gender': user.gender,
        'status': user.status,
        'zip_code': user.zipCode,
        'locale': user.country
      }
    };

    // Update current user locally to persist values
    this.authService.updateCurrentUser(currentUser, user);

    console.log('User updating-------------------')
    console.log(currentUser.idToken);
    return this.http.patch(`${environment.apiUrl}/users/${currentUser.idToken}`, requestData, httpOptions);
  }

  /**
   * Creates user with id token
   * Returns a subscriber object
   */
  signUp(idToken): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Accept": 'application/json',
        'Content-Type':  'application/json'
      })
    };

    let requestData = { 'idToken': idToken }

    console.log('User registering------------------- idToken: ', idToken);
    return this.http.post(`${environment.apiUrl}/users`, requestData, httpOptions);
  }
}
