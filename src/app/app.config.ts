import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, InjectionToken } from '@angular/core';
import { provideState, provideStore } from '@ngrx/store';
import { reducer } from './items.state';

export const BACKEND_URL = new InjectionToken<string>("backend url");

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),    
    provideStore(),    
    provideState({
      name: 'items2',
      reducer: reducer
    }),
    { 
      provide: BACKEND_URL, 
      useValue: 'http://localhost:3000' // TODO
    },  
  ]
};
