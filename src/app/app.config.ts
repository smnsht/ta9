import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, InjectionToken } from '@angular/core';

export const BACKEND_URL = new InjectionToken<string>("backend url");

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    { provide: BACKEND_URL, useValue: 'http://localhost:3000' }
  ]
};
