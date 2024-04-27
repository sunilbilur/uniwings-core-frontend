import { Routes, Route } from '@angular/router';
import { authGuard } from './_helpers/auth.guard';
import { LoginComponent } from './login/login.component';
import { AppBuilderComponent } from './app-builder/app-builder.component';
import { CompsgridComponent } from './app-builder/compsgrid/compsgrid.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';


console.log("START of APP ROUTES.ts");

export let routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: "full" },
    { path: 'login', component: LoginComponent }
];

function getLeavesNodes(tree: any, node: string, level: number) {
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


let accessConfig: any = JSON.parse(localStorage.getItem("access_config") as string);

// if access_config is there, setup routes accordingly
if (accessConfig) {
    console.log("RUNNING ACCESS CONFIG INSIDE ROUTES");
    let appRoute: any = {
        path: 'app',
        component: AppBuilderComponent,
        data: { navData: accessConfig.nav },
        children: []
    };

    let navData: any = accessConfig.nav;

    //iterate in each node of top array i.e. level2 elments from tree
    for (let i = 0; i < navData.top.length; i++) {
        appRoute.children.push({
            path: navData.top[i],
            children: []
        });

        //get children of element at level2 in navData tree
        let leaves = getLeavesNodes(navData, navData.top[i], navData.level);

        // for each leaves node, add path in appRoute
        leaves.forEach((leafNodePath: any) => {
            appRoute.children[i].children.push({
                path: leafNodePath,
                component: CompsgridComponent,
                data: { compsData: accessConfig.comps[navData.top[i] + "/" + leafNodePath] }
            })
        });

    }
    routes.push(appRoute);
    let wildcardRoute: Route = {
        path: '**',
        component: PageNotFoundComponent
    };
    routes.push(wildcardRoute);
}

