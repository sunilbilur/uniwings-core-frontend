import { Component, Input } from '@angular/core';
import { ActivatedRoute, Route, Router, Routes } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { AuthService } from '../_services/auth.service';
import { AppLayoutComponent } from '../app-layout/app-layout.component';
import { CompLoaderComponent } from '../app-layout/comp-loader/comp-loader.component';
import { ContentContainerComponent } from '../app-layout/content-container/content-container.component';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';

import { ClarityModule } from '@clr/angular';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, ClarityModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  iid: any;
  iname: any;

  loginForm: FormGroup;
  displayLoginAlert: boolean = false;

  constructor(private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute) {
    // Redirect to home if already logged in
    if (this.authService.isLoggedIn()) {
      this.router.navigate(["/app/"]);
    }

    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  printpath(parent: string, config: any) {
    for (let i = 0; i < config.length; i++) {
      const route = config[i];
      console.log(parent + '/' + route.path);
      if (route.children) {
        const currentPath = route.path ? `${parent}/${route.path}` : parent;
        this.printpath(currentPath, route.children);
      }
    }
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.iid = params['iid'];
      this.iname = params['iname'];
    });

    if(this.authService.checkInstitutionValidity(this.iid) === false) {
      this.router.navigate(['/error']);
    }
  }

  generateRoutes(navData: any) {
    let routes: any = [];

    if (!navData) {
      return routes;
    }

    for (let i = 0; i < navData.length; i++) {
      if (navData[i].type === "entry") {
        routes.push({
          path: navData[i].route,
          component: CompLoaderComponent,
          data: {
            compData: navData[i].comp,
          }
        });
      } else if (navData[i].type === "menu") {
        for (let j = 0; j < navData[i].entries.length; j++) {
          routes.push({
            path: navData[i].entries[j].route,
            component: CompLoaderComponent,
            data: {
              compData: navData[i].entries[j].comp,
            }
          });
        }
      }
    }
    return routes;
  }

  onSubmit() {
    this.authService.login(this.loginForm.value.username, this.loginForm.value.password, this.iid).subscribe(
      (data: any) => {
        if (data.status === 401) {
          console.log("[log] login.component.ts ");
        }

        console.log("[log] login.component.ts || data: ", data);
        localStorage.setItem('user', data.jwt);
        localStorage.setItem('name', data.name);
        localStorage.setItem('iid', this.iid);
        localStorage.setItem('pri_nav', JSON.stringify(data.pri_nav));
        localStorage.setItem('sec_nav', JSON.stringify(data.sec_nav));

        console.log("[log] login.component.ts || start of onSubmit() function");

        // appRoutes configuration
        let appRoute: any = {
          path: 'app',
          component: AppLayoutComponent,
          data: {
            iid: this.iid,
            priNav: data.pri_nav,
            name: data.name
          },
          children: []
        };

        // wildcard route configuration
        let wildcardRoute: Route = {
          path: '**',
          component: PageNotFoundComponent
        };

        for (let nav of data.pri_nav) {
          appRoute.children.push({
            path: nav.route,
            component: ContentContainerComponent,
            data: {
              secNav: data.sec_nav[nav.route],
            },
            children: this.generateRoutes(data.sec_nav[nav.route])
          });
        }

        // push dynamically created routes to main routes array
        this.router.config.push(appRoute);
        this.router.config.push(wildcardRoute);

        //print paths from router.config and log to console
        this.printpath('', this.router.config);
        console.log("[log] login.component.ts || End of onSubmit() function")

        this.router.navigate(['/app']);
      },
      (error: HttpErrorResponse) => {
        if (error.status == 401) {
          console.log("ERROR: WRONG username/password");
          this.displayLoginAlert = true;
        }
      }
    );
  }

}
