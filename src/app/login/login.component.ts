import { Component } from '@angular/core';
import { Route, Router, Routes } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { AuthService } from '../_kitcoek-services/auth.service';
import { AppBuilderComponent } from '../app-builder/app-builder.component';
import { CompsgridComponent } from '../app-builder/compsgrid/compsgrid.component';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
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

  getLeavesNodes(tree: any, node: string, level: number) {
    let currentKeys: any = tree[node];
    let newKeys: any = [];

    // outer loop specified number of level, 
    // inner loop retrieves all children of nodes from currentKeys[]
    for (let k = 0; k < level - 2; k++) {
      for (let j = 0; j < currentKeys.length; j++) {
        newKeys.push(tree[currentKeys[j]]);
      }
      currentKeys = newKeys;
      currentKeys = currentKeys.flat();
      newKeys = [];
    }

    return currentKeys;
  }

  onSubmit() {
    this.authService.login(this.loginForm.value.username, this.loginForm.value.password).subscribe(
      (data: any) => {
        console.log(data);
        localStorage.setItem('user', data.jwt);
        localStorage.setItem('access_config', JSON.stringify(data.access_config));
        console.log("[log] START of onsubmit of login component");

        let navData: any = data.access_config.nav;
        let navigateRoute: any = null;

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
        for (let i = 0; i < navData.top.length; i++) {
          let leaves: any = null;

          if (navData.level > 1) {
            appRoute.children.push({
              path: navData.top[i].toLowerCase(),
              children: []
            });

            //get children of element at level2 in navData tree
            leaves = this.getLeavesNodes(navData, navData.top[i], navData.level);

            // for each leaves node, add path in appRoute
            leaves.forEach((leafNodePath: any) => {
              appRoute.children[i].children.push({
                path: leafNodePath,
                component: CompsgridComponent,
                data: { compsData: data.access_config.comps[(navData.top[i] + "/" + leafNodePath)] }
              })
            });

          } else {
            appRoute.children.push({
              path: navData.top[i].toLowerCase(),
              component: CompsgridComponent,
              //don't convert to lowercase here
              data: { compsData: data.access_config.comps[navData.top[i]] }
            });
          }

          // create route appending navData.top[0] with it's first leaf child node 
          // in first iteration of loop to navigate it to later after finishing this loop
          if (i == 0) {
            navigateRoute = "/" + navData.top[0].toLowerCase() + "/" + (leaves ? leaves[0] : "");
          }

        }

        // add a redirect for /app path
        // appRoute.children.unshift({
        //   path: '',
        //   redirectTo: "/app" + navigateRoute,
        //   pathMatch: "full"
        // })

        this.router.config.push(appRoute);
        this.router.config.push(wildcardRoute);

        this.printpath('', this.router.config);
        console.log("[log] END of onsubmit of login component")

        this.router.navigate(['/app' + navigateRoute]);
      }
    );
  }

}
