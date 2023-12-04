import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Item, Pager, ItemsViewType } from '../app.models';
import { PagerComponent } from '../pager/pager.component';
import { NoirItemsFormComponent } from '../noir-items-form/noir-items-form.component';
import { LoaderComponent } from '../loader.component';
import { NoirItemsViewComponent } from '../noir-items-view/noir-items-view.component';
import { ItemsState } from '../state/items.state';
import * as ItemActions from '../state/items.reducer';

import {
  filterSelector,
  itemsErrorSelector,
  itemsLoadingSelector,
  itemsSelector,
  pagerSelector,
  selectedItemSelector
} from '../state/items.selectors';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-noir-items',
  standalone: true,
  imports: [
    CommonModule,
    LoaderComponent,
    PagerComponent,
    NoirItemsViewComponent,
    NoirItemsFormComponent,
    FormsModule
  ],
  templateUrl: './noir-items.component.html',
  styleUrl: './noir-items.component.css'
})
export class NoirItemsComponent implements OnInit {
  view: ItemsViewType = 'list';
  filterModel = '';

  items$: Observable<Item[]>;
  filter$: Observable<string>;
  pager$: Observable<Pager>;
  loading$: Observable<boolean>;
  error$: Observable<string>;
  selectedItem$: Observable<Item | undefined>;

  constructor(private store: Store<ItemsState>) {
    this.items$ = this.store.select(itemsSelector)
    this.pager$ = this.store.select(pagerSelector);
    this.filter$ = this.store.select(filterSelector);
    this.loading$ = this.store.select(itemsLoadingSelector);
    this.error$ = this.store.select(itemsErrorSelector);
    this.selectedItem$ = this.store.select(selectedItemSelector)
  }

  ngOnInit(): void {    
    this.store.dispatch(ItemActions.loadItemsRequest());
  }

  filterInput() {
    this.store.dispatch(ItemActions.setFilter({
      filter: this.filterModel
    }));
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
    this.store.dispatch(ItemActions.editItem({ item }))
  }

  itemSelectionCanceled(): void {
    this.store.dispatch(ItemActions.cancelEditItem());
  }

  saveItem(item: Item): void {
    if (item.id) {
      this.store.dispatch(ItemActions.putItem({ item }));
    } else {
      this.store.dispatch(ItemActions.postItem({ item }));
    }
  }
}
