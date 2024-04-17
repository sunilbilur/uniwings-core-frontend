import { ApplicationConfig } from '@angular/core';

import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { jwtInterceptor } from './_helpers/jwt.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideHttpClient(withFetch(), withInterceptors([jwtInterceptor]))]
};
