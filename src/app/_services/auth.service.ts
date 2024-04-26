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
    console.log("hit login function from authService");
    return this.http.post('http://localhost:8000/auth/login', { username, password })
    // this is just the HTTP call, 
    // we still need to handle the reception of the token
    //.shareReplay();
  }

  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('user');
    localStorage.removeItem('access_config');
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
