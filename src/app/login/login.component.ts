import { Component, Input } from '@angular/core';
import { Route, Router, Routes } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { AuthService } from '../_services/auth.service';
import { AppLayoutComponent } from '../app-layout/app-layout.component';
import { CompLoaderComponent } from '../app-layout/comp-loader/comp-loader.component';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';

import { ClarityModule } from '@clr/angular';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, ClarityModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder) {
    // Redirect to home if already logged in
    if (this.authService.isLoggedIn()) {
      this.router.navigate(["app"]);
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

  onSubmit() {
    this.authService.login(this.loginForm.value.username, this.loginForm.value.password).subscribe(
      (data: any) => {
        localStorage.setItem('user', data.jwt);
        localStorage.setItem('name', data.name);
        localStorage.setItem('roleconf', JSON.stringify(data.roleConfig));

        let navData: any = data.roleConfig.nav;

        console.log("[log] login.component.ts || start of onSubmit() function");
        console.log("[log] login.component.ts || navData: ", navData);

        // appRoutes configuration
        // navData is sent to AppBuilder, navigation is built inside AppBuilder Component
        // compData is sent directly to the dynamically loaded components
        let appRoute: any = {
          path: 'app',
          component: AppLayoutComponent,
          data: { navData: navData, name: data.name},
          children: []
        };

        // wildcard route configuration
        let wildcardRoute: Route = {
          path: '**',
          component: PageNotFoundComponent
        };

        //set up routes according `type` field in navData in appRoutes
        for (let i = 0; i < navData.length; i++) {
          if (navData[i].type === "entry") {
            appRoute.children.push({
              path: navData[i].route,
              component: CompLoaderComponent,
              data: {
                compData: {
                  compName: navData[i].comp,
                  compOptions: navData[i].options
                }
              }
            });

          } else if (navData[i].type === "menu") {
            for (let j = 0; j < navData[i].entries.length; j++) {
              appRoute.children.push({
                path: navData[i].entries[j].route,
                component: CompLoaderComponent,
                data: {
                  compData: {
                    compName: navData[i].entries[j].comp,
                    compOptions: navData[i].entries[j].options
                  }
                }
              });
            }
          }
        }

        // push dynamically created routes to main routes array
        this.router.config.push(appRoute);
        this.router.config.push(wildcardRoute);

        //print paths from router.config and log to console
        this.printpath('', this.router.config);
        console.log("[log] login.component.ts || End of onSubmit() function")

        this.router.navigate(['/app/dashboard']);
      }
    );
  }

}
