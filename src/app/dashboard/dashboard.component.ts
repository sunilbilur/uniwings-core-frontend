import { Component } from '@angular/core';
import { NavbarComponent } from './navbar/navbar.component';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  constructor(private authService: AuthService, private http: HttpClient) {
  }

  logoutUser() {
    this.authService.logout();
  }

  sendGet() {
    this.http.get("http://localhost:8000/dashboard").subscribe((res)=>{
      console.log(res);
    })
  }

}
