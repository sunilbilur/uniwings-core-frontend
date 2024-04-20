import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NavbarComponent } from './navbar/navbar.component';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-app-builder',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './app-builder.component.html',
  styleUrl: './app-builder.component.css'
})
export class AppBuilderComponent {
  constructor(private authService: AuthService, private http: HttpClient) {
    

  }

  logoutUser() {
    this.authService.logout();
  }

  sendGet() {
    this.http.get("http://localhost:8000/dashboard").subscribe((res) => {
      console.log(res);
    })
  }
}
