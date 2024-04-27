import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule, Routes } from '@angular/router';

import { AuthService } from '../_services/auth.service';
import { CompsHtmlFetcherService } from '../_services/comps-html-fetcher.service';
import { NavbarComponent } from './navbar/navbar.component';

@Component({
  selector: 'app-app-builder',
  standalone: true,
  imports: [NavbarComponent, RouterModule],
  templateUrl: './app-builder.component.html',
  styleUrl: './app-builder.component.css'
})
export class AppBuilderComponent implements OnInit, OnDestroy {

  // accessConfig has -> navData, compsData, AppBuilder gets navData from login
  // navData is passed from AppBuilder to NavBar
  // compsData is directly to compsGrid
  navData: any = null;

  constructor(private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute) {

    // fetch access config from localStorage and pass to children components.
    this.navData = JSON.parse(localStorage.getItem('access_config') as string).nav;
  }

  ngOnInit(): void {
    this.navData = this.route.snapshot.data['navData'];
  }


  ngOnDestroy(): void {
    this.router.config.pop();
    console.log("[log] appBuilder destroyed");
  }

  logoutUser() {
    this.authService.logout();
  }
}
