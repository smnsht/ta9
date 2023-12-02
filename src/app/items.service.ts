import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Item, ItemEditDTO } from './app.models';
import { BACKEND_URL } from './app.config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'  
})
export class ItemsService {

  private readonly resourceUrl: string;

  constructor(
    private http: HttpClient, 
    @Inject(BACKEND_URL) 
    backendUrl: string
  ) {       
    this.resourceUrl = `${backendUrl}/items`;  
  }
  
  get(): Observable<Item[]> {
    return this.http.get<Item[]>(this.resourceUrl);
  }

  create(item: Item): Observable<Item> {    
    item.id = crypto.randomUUID();
    return this.http.post<Item>(this.resourceUrl, item);
  }

  update(item: Item): Observable<Item> {    
    return this.http
      .put<ItemEditDTO>(`${this.resourceUrl}/${item.id}`, {
        name: item.name,
        color: item.color
      });
  }  
}
