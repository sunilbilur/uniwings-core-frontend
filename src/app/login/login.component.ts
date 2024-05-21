import { Component, Input } from '@angular/core';
import { Route, Router, Routes } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { AuthService } from '../_kitcoek-services/auth.service';
import { AppBuilderComponent } from '../app-builder/app-builder.component';
import { CompLoaderComponent } from '../app-builder/comp-loader/comp-loader.component';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';

import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, InputTextModule, FloatLabelModule, PasswordModule, ButtonModule],
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
        localStorage.setItem('access_config', JSON.stringify(data.access_config));
        console.log("[log] START of onsubmit of login component");

        let navData: any = data.access_config.nav;
        console.log("[log] navData: ",navData);

        // appRoutes configuration
        // navData to NavBar is sent through AppBuilder
        // compsData is sent directly to CompsGrid
        let appRoute: any = {
          path: 'app',
          component: AppBuilderComponent,
          data: { navData: navData },
          children: []
        };

        // wildcard route configuration
        let wildcardRoute: Route = {
          path: '**',
          component: PageNotFoundComponent
        };

        //iterate in each node of top array i.e. level2 elments from tree
        for (let i = 0; i < navData.length; i++) {
          console.log(navData[i]);
          if (navData[i].type === "entry") {
            appRoute.children.push({
              path: navData[i].route,
              component: CompLoaderComponent,
              data: { compData: { compName: navData[i].comp, compOptions: navData[i].options } }
            });

          } else if (navData[i].type === "menu") {
            for (let j = 0; j < navData[i].entries.length; j++) {
              appRoute.children.push({
                path: navData[i].entries[j].route,
                component: CompLoaderComponent,
                data: { compData: { compName: navData[i].entries[j].comp, compOptions: navData[i].entries[j].options } }
              });
            }
          }
        }

        // push dynamically created routes to main routes array
        this.router.config.push(appRoute);
        this.router.config.push(wildcardRoute);

        this.printpath('', this.router.config);
        console.log("[log] END of onsubmit of login component")

        this.router.navigate(['/app/dashboard']);
      }
    );
  }

}
