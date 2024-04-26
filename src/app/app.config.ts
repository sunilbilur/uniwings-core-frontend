import { ApplicationConfig } from '@angular/core';

import { RouteReuseStrategy, provideRouter, withRouterConfig } from '@angular/router';
import { routes } from './app.routes';

import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { jwtInterceptor } from './_helpers/jwt.interceptor';

// console.log("[log] routes from config.ts: "+JSON.stringify(routes));

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withRouterConfig({ onSameUrlNavigation: 'ignore' })),
    provideHttpClient(withFetch(), withInterceptors([jwtInterceptor]))
  ]
};


