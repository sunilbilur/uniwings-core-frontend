import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router, private http: HttpClient) {
  }

  login(username: string, password: string, iid: string): Observable<any> {
    console.log("[log] auth.service.ts || inside login() function");
    return this.http.post('http://localhost:8000/auth/login', { username, password, iid })
    //.shareReplay();
  }

  checkInstitutionValidity(iid: string) {
    console.log("[log] auth.service.ts || inside checkInstitutionIidValidity() function");
    let institutionStatus = this.http.post('http://localhost:8000/auth/checkInstitutionIidValidity', { iid })
    console.log(institutionStatus);
    // return institutionStatus;
    return true;
  }

  logout(iid: string) {
    // remove user from local storage and set current user to null
    localStorage.removeItem('user');
    localStorage.removeItem('pri_nav');
    localStorage.removeItem('sec_nav');
    localStorage.removeItem('name');

    this.router.config.pop();
    this.router.config.pop();

    this.router.navigate(['login/' + iid + '/doesNotMatter']);
  }

  getJWT() {
    let jwt = localStorage.getItem('user');

    if (jwt)
      return jwt;
    else
      return null;
  }

  isLoggedIn() {
    if (localStorage.getItem('user'))
      return true;
    else
      return false;
  }

}
