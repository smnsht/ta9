import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Item, ItemsViewType } from '../app.models';
import { ItemsState, editItem, itemsSelector, itemsViewSelector } from '../items.state';
import { Store } from '@ngrx/store';
import { TruncatePipe } from '../truncate.pipe';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-noir-items-view',
  standalone: true,
  imports: [CommonModule, TruncatePipe],
  templateUrl: './noir-items-view.component.html',
  styleUrl: './noir-items-view.component.css'
})
export class NoirItemsViewComponent {
  items$: Observable<Item[]>;
  view$: Observable<ItemsViewType>;
    
  constructor(private store: Store<ItemsState>) {
    this.items$ = this.store.select(itemsSelector);    
    this.view$ = this.store.select(itemsViewSelector);    
  }

  doubleClick(item: Item): void {        
    this.store.dispatch(editItem({ 
      item, 
      override: false 
    }))    
  }
}
