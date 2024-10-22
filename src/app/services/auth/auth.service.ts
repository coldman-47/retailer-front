import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl = 'http://localhost:8000/shop/token/';
  token = new BehaviorSubject(localStorage.getItem('token'));
  connexionFailed = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) {
    console.log(localStorage);
    // if(localStorage) this.token.next(JSON.parse(<string>localStorage.getItem('token')))
  }

  login(credentials: any) {
    this.http.post(this.baseUrl, credentials).subscribe({
      next: (val: any) => {
        localStorage.setItem('token', JSON.stringify(val));
        this.token.next(val);
      },
      error: (err) => {
        this.connexionFailed.next(true);
      },
    });
  }

  refreshToken() {
    const { refresh, access } = JSON.parse(<string>this.token.value);
    return this.http.post(this.baseUrl + 'refresh/', { refresh });
    // try {
    //   const data: any = await this.http
    //     .post(this.baseUrl + 'refresh/', { refresh })
    //     .toPromise();
    // } catch (error) {
    // }
  }
}
