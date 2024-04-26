import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule, withRouterConfig, } from '@angular/router';

import { CompsgridComponent } from '../compsgrid/compsgrid.component';
import { AppBuilderComponent } from '../app-builder.component';
import { PageNotFoundComponent } from '../../page-not-found/page-not-found.component';
import { LoginComponent } from '../../login/login.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit, OnDestroy{
  @Input() navData: any = null;

  constructor(private router: Router, private activateRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    console.log("[log] Navbar created");
    console.log("NAVDATA in navbar: ",this.navData);
  }

  ngOnDestroy(): void {
    console.log("[log] Nabar destroyed");
  }

}
