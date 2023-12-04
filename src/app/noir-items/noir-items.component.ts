import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Item, Pager, ItemsViewType } from '../app.models';
import { ItemsService } from '../service/items.service';
import { PagerComponent } from '../pager/pager.component';
import { NoirItemsFormComponent } from '../noir-items-form/noir-items-form.component';
import { LoaderComponent } from '../loader.component';
import { NoirItemsViewComponent } from '../noir-items-view/noir-items-view.component';
import { ItemsState } from '../state/items.state';
import * as ItemActions from '../state/items.reducer';

import { 
  filterSelector, 
  itemsSelector, 
  pagerSelector, 
  selectedItemSelector 
} from '../state/items.selectors';

@Component({
  selector: 'app-noir-items',
  standalone: true,
  imports: [
    CommonModule, 
    LoaderComponent,     
    PagerComponent, 
    NoirItemsViewComponent,
    NoirItemsFormComponent, 
  ],  
  templateUrl: './noir-items.component.html',
  styleUrl: './noir-items.component.css'
})
export class NoirItemsComponent implements OnInit {
  view: ItemsViewType = 'list';
  loading = false;
  
  items$: Observable<Item[]>;
  filter$: Observable<string>;
  pager$: Observable<Pager>;
  selectedItem$: Observable<Item | undefined>;

  constructor(
    private itemsService: ItemsService,
    private store: Store<ItemsState>
  ) {
    this.items$ = this.store.select(itemsSelector)
    this.pager$ = this.store.select(pagerSelector);
    this.filter$ = this.store.select(filterSelector);
    this.selectedItem$ = this.store.select(selectedItemSelector)
  }

  ngOnInit(): void {
    this.loading = true;
    
    this.itemsService.get().subscribe({
      next: items => { 
        this.store.dispatch(ItemActions.setItems({ items }));
        this.loading = false;
      },
      error: this.itemsServiceError
    });
  }

  filterInput(event: Event) {
    const input: HTMLInputElement = <HTMLInputElement>event.target;
    const action = ItemActions.setFilter({ filter: input.value });

    this.store.dispatch(action);
  }

  rowsPerPageChanged(val: number): void {
    this.store.dispatch(
      ItemActions.setRowsPerPage({ rowsPerPage: val })
    );
  }

  nextPageClick(): void {
    this.store.dispatch(ItemActions.nextPageClick());
  }

  prevPageClick(): void {
    this.store.dispatch(ItemActions.prevPageClick());
  }

  addNewClick(): void {
    this.store.dispatch(ItemActions.addNewItem());
  }

  viewClick(view: ItemsViewType): void {
    this.view = view;
    this.store.dispatch(ItemActions.setItemsView({ view }));
  }
  
  itemSelected(item: Item): void {        
    this.store.dispatch(ItemActions.editItem({ 
      item, 
      override: false 
    }))    
  }

  saveItem(item: Item): void {    
    this.loading = true;

    if(item.id) {
      this.updateItem(item);
    } else {
      this.createItem(item);
    }    
  }

  private itemsServiceError(err: any): void {    
    console.error(err);
    this.loading = false;
    alert('Error! View console log for details');
  }

  private updateItem(item: Item) {
    this.itemsService
      .update(item)
      .subscribe({
        next: (item) => {
          this.store.dispatch(ItemActions.itemUpdated({ item }));
          this.loading = false;
          alert('Item successfully updated!'); 
        },
        error: this.itemsServiceError
      });    
  }

  private createItem(item: Item) {
    this.itemsService
      .create(item)
      .subscribe({
        next: item => {          
          this.store.dispatch(ItemActions.itemCreated({ item }));
          this.loading = false;
          alert('Item successfully created!'); 
        },
        error: this.itemsServiceError
      });
  }
}
