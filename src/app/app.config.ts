import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, InjectionToken } from '@angular/core';
import { provideState, provideStore } from '@ngrx/store';
import { reducer } from './state/items.reducer';
import { environment } from '../environments/environment';

export const BACKEND_URL = new InjectionToken<string>("backend url");

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),    
    provideStore(),    
    provideState({
      name: 'items',
      reducer: reducer
    }),
    { 
      provide: BACKEND_URL, 
      useValue: environment.backendUrl
    },  
  ]
};
