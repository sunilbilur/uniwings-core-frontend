import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterModule, withRouterConfig, } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit, OnDestroy {
  @Input() navData: any = null;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    console.log("[log] Navbar created");
    console.log("[log] navData in navbar: ", this.navData);
  }

  ngOnDestroy(): void {
    console.log("[log] Navbar destroyed");
  }

}
