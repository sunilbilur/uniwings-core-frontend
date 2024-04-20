import { Routes } from '@angular/router';
import { authGuard } from './_helpers/auth.guard';
import { LoginComponent } from './login/login.component';
import { AppBuilderComponent } from './app-builder/app-builder.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'app', component: AppBuilderComponent, canActivate: [authGuard]},
    { path: '**', component: PageNotFoundComponent }
];
