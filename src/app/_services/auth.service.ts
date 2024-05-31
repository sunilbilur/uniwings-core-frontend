import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router, private http: HttpClient) {
  }

  login(username: string, password: string) {
    console.log("[log] auth.service.ts || inside login() function");
    return this.http.post('http://localhost:8000/auth/login', { username, password })
    //.shareReplay();
  }

  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('user');
    localStorage.removeItem('roleconf');

    this.router.config.pop();
    this.router.config.pop();

    this.router.navigate(['login']);
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
