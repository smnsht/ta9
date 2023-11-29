import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Item, ItemEditDTO } from './app.models';
import { BACKEND_URL } from './app.config';

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
  
  get() {
    return this.http.get<Item[]>(this.resourceUrl);
  }

  create(item: Item) {    
    return this.http.put<Item>(this.resourceUrl, item);
  }

  update(item: Item) {    
    return this.http.put<ItemEditDTO>(`${this.resourceUrl}/${item.id}`, <ItemEditDTO>item);
  }  
}
