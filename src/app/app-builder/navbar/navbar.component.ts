import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterModule, withRouterConfig, } from '@angular/router';
import { AuthService } from '../../_kitcoek-services/auth.service';

import { PanelMenuModule } from 'primeng/panelmenu';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, PanelMenuModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit, OnDestroy {
  @Input() navData: any = null;
  dropdownShow: any = {};

  constructor(private router: Router, private authService: AuthService) {
  }

  toggleDropdown(name: string) {
    if(this.dropdownShow[name] === undefined){
      this.dropdownShow[name] = false;
      return;
    }

    this.dropdownShow[name] = ! this.dropdownShow[name];
    console.log(this.dropdownShow);
  }

  ngOnInit(): void {
    console.log("[log] Navbar created");
    console.log("[log] navData in navbar: ", this.navData);
  }

  ngOnDestroy(): void {
    console.log("[log] Navbar destroyed");
  }

  logoutUser() {
    this.authService.logout();
  }
}
