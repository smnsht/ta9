import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemsStore, cancelEditItem } from '../store/items.store';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Item } from '../app.models';
import { FormGroup, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-details-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './details-form.component.html',
  styleUrl: './details-form.component.css'
})
export class DetailsFormComponent {
  itemsStore$: Observable<ItemsStore>;
  model: Item =  {
    id: '',
    name: '',
    color: '',
    created_at: new Date(),
    updated_at: new Date(),
    created_by: 'todo'
  };
  title = '?';

  //form = new FormGroup({});

  constructor(private store: Store<any>) {    
    this.itemsStore$ = store.select('items');
    this.itemsStore$.subscribe(store => { 
      if(store.selectedItem) {
        this.model = { ...store.selectedItem };
        this.title = store.selectedItem.id.length > 0 
          ? 'Edit Item' : 
          'Create New Item';
      }      
    });
  }

  closeClick(): void {
    this.store.dispatch(cancelEditItem());
  }

  saveClick(): void {
    this.model.name = 'foo';
    console.log(this.model)
  }
}
