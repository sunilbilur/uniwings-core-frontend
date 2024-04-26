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

  navData: any = "entries data";
  compsData: any = "comps data";
  goodval : any;

  constructor(private authService: AuthService,
    private router: Router,
    private compsHtmlFetcher: CompsHtmlFetcherService,
    private route: ActivatedRoute) {

    // fetch access config from localStorage and pass to children components.
    let access_config: any;
    access_config = JSON.parse(localStorage.getItem('access_config') as string);

    this.navData = access_config.nav;
    this.compsData = access_config.comps;
  }

  ngOnInit(): void {
    this.navData = this.route.snapshot.data['navData'];
    this.compsData = this.route.snapshot.data['compsData'];
  }


  ngOnDestroy(): void {
    this.router.config.pop();
    console.log("[log] appBuilder destroyed");
  }

  logoutUser() {
    this.authService.logout();
  }
}
