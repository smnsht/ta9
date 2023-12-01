import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Item } from '../app.models';
import { Store } from '@ngrx/store';
import { ItemsStore, editItem, itemsSelector } from '../store/items.store';

@Component({
  selector: 'app-list-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-view.component.html',
  styleUrl: './list-view.component.css'
})
export class ListViewComponent {
  //@Input()
  //items: Item[] | undefined;

  items$: Observable<Item[]>;

  //private store = inject(Store<any>)
  constructor(private store: Store<ItemsStore>) {
    this.items$ = this.store.select(itemsSelector);
  }

  doubleClick(item: Item): void {    
    this.store.dispatch(editItem({ item }))
  }
}
