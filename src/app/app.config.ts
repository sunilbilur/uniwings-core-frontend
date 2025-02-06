import { ApplicationConfig } from '@angular/core';

import { RouteReuseStrategy, provideRouter, withRouterConfig } from '@angular/router';
import { routes } from './app.routes';

import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { jwtInterceptor } from './_helpers/jwt.interceptor';
import { adminQueryInterceptor } from './_helpers/admin-query.interceptor';
import { provideToastr } from 'ngx-toastr';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withRouterConfig({ onSameUrlNavigation: 'ignore' })),
    provideHttpClient(withFetch(), withInterceptors([jwtInterceptor, adminQueryInterceptor])),
    provideAnimationsAsync(),
    provideToastr()
  ]
};

