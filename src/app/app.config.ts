import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, InjectionToken } from '@angular/core';
import { provideState, provideStore } from '@ngrx/store';
import { reducer } from './state/items.reducer';
import { environment } from '../environments/environment';
import { provideEffects } from '@ngrx/effects';
import { ItemEffects } from './state/item.effects';

export const BACKEND_URL = new InjectionToken<string>("backend url");

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),    
    provideEffects([ItemEffects]),
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
