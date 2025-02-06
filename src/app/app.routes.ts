import { Routes, Route } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AppLayoutComponent } from './app-layout/app-layout.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CompLoaderComponent } from './app-layout/comp-loader/comp-loader.component';
import { ContentContainerComponent } from './app-layout/content-container/content-container.component';
import { AboutComponent } from './about/about.component';

console.log("[log] app.routes.ts || start of routes code");

export let routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: "full" },
    {
        path: 'login/:iid/:iname',
        component: LoginComponent
    }
];

let priNav: any = JSON.parse(localStorage.getItem("pri_nav") as string);
let secNav: any = JSON.parse(localStorage.getItem("sec_nav") as string);
let iid: any = localStorage.getItem("iid");
let name: any = localStorage.getItem("name");

function generateRoutes(navData: any) {
    if (!navData) return [];

    return navData.flatMap((nav: any) => {
        const entries = nav.type === "entry" ? [nav] : nav.entries;
        return entries.map((entry: any) => ({
            path: entry.route,
            component: CompLoaderComponent,
            data: {
                compData: entry.comp,
            },
        }));
    });
}

// console.log("[log] app.routes.ts || priNav: ", priNav);
// console.log("[log] app.routes.ts || secNav: ", secNav);

if (priNav) {
    console.log("[log] app.routes.ts || inside roleConfig if block");

    // appRoutes configuration
    let appRoute: any = {
        path: 'app',
        component: AppLayoutComponent,
        data: {
            iid: iid,
            priNav: priNav,
            name: name
        },
        children: [
            {
                path: 'about',
                component: AboutComponent
            }
        ]
    };

    // wildcard route configuration
    let wildcardRoute: Route = {
        path: '**',
        component: PageNotFoundComponent
    };

    for (let nav of priNav) {
        appRoute.children.push({
            path: nav.route,
            component: ContentContainerComponent,
            data: {
                secNav: secNav[nav.route],
            },
            children: generateRoutes(secNav[nav.route])
        });
    }

    // push dynamically created routes to main routes array
    routes.push(appRoute);
    routes.push(wildcardRoute);
}
