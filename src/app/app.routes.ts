import { Routes, Route } from '@angular/router';
import { authGuard } from './_helpers/auth.guard';
import { LoginComponent } from './login/login.component';
import { AppBuilderComponent } from './app-builder/app-builder.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CompLoaderComponent } from './app-builder/comp-loader/comp-loader.component';

console.log("START of APP ROUTES.ts");

export let routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: "full" },
    { path: 'login', component: LoginComponent }
];

let accessConfig: any = JSON.parse(localStorage.getItem("access_config") as string);

// if access_config is there, setup routes accordingly
if (accessConfig) {
    console.log("RUNNING ACCESS CONFIG INSIDE ROUTES");
    let navData: any = accessConfig.nav;

    let appRoute: any = {
        path: 'app',
        component: AppBuilderComponent,
        data: { navData: navData },
        children: []
    };

    let wildcardRoute: Route = {
        path: '**',
        component: PageNotFoundComponent
    };

    //iterate in each node of top array i.e. level2 elments from tree
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


