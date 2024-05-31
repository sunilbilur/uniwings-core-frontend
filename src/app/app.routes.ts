import { Routes, Route } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AppBuilderComponent } from './app-builder/app-builder.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CompLoaderComponent } from './app-builder/comp-loader/comp-loader.component';

console.log("[log] app.routes.ts || start of routes code");

export let routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: "full" },
    { path: 'login', component: LoginComponent }
];

let roleConfig: any = JSON.parse(localStorage.getItem("roleconf") as string);
let name: any = localStorage.getItem("name");

// if rolec is there in localstorage, setup routes accordingly
if (roleConfig) {
    console.log("[log] app.routes.ts || inside roleConfig if block");
    let navData: any = roleConfig.nav;

    let appRoute: any = {
        path: 'app',
        component: AppBuilderComponent,
        data: { navData: navData, name: name },
        children: []
    };

    let wildcardRoute: Route = {
        path: '**',
        component: PageNotFoundComponent
    };

    // check type field in navData array of objects,
    // add an object to routes based on type field
    for (let i = 0; i < navData.length; i++) {
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
                    data: {
                        compData: { compName: navData[i].entries[j].comp, compOptions: navData[i].entries[j].options }
                    }
                });
            }
        }
    }

    // push dynamically created routes to main routes array
    routes.push(appRoute);
    routes.push(wildcardRoute);
}
