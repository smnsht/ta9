import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Item, Pager, ItemsViewType } from '../app.models';
import { ItemsService } from '../items.service';
import { PagerComponent } from '../pager/pager.component';
import { NoirItemsFormComponent } from '../noir-items-form/noir-items-form.component';
import { 
  ItemsState, 
  addNewItem, 
  filterSelector, 
  itemCreated, 
  itemUpdated, 
  nextPageClick, 
  pagerSelector, 
  prevPageClick, 
  selectedItemSelector, 
  setFilter, 
  setItems, 
  setItemsView, 
  setRowsPerPage 
} from '../items.state';
import { LoaderComponent } from '../loader.component';
import { NoirItemsViewComponent } from '../noir-items-view/noir-items-view.component';


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
  
  filter$: Observable<string>;
  pager$: Observable<Pager>;
  selectedItem$: Observable<Item | undefined>;

  constructor(
    private itemsService: ItemsService,
    private store: Store<ItemsState>
  ) {
    this.pager$ = this.store.select(pagerSelector);
    this.filter$ = this.store.select(filterSelector);
    this.selectedItem$ = this.store.select(selectedItemSelector)
  }

  ngOnInit(): void {
    this.loading = true;
    
    this.itemsService.get().subscribe({
      next: items => { 
        this.store.dispatch(setItems({ items }));
        this.loading = false;
      },
      error: this.itemsServiceError
    });
  }

  filterInput(event: Event) {
    const input: HTMLInputElement = <HTMLInputElement>event.target;
    const action = setFilter({ filter: input.value });

    this.store.dispatch(action);
  }

  rowsPerPageChanged(val: number): void {
    this.store.dispatch(
      setRowsPerPage({ rowsPerPage: val })
    );
  }

  nextPageClick(): void {
    this.store.dispatch(nextPageClick());
  }

  prevPageClick(): void {
    this.store.dispatch(prevPageClick());
  }

  addNewClick(): void {
    this.store.dispatch(addNewItem());
  }

  viewClick(view: ItemsViewType): void {
    this.view = view;
    this.store.dispatch(setItemsView({ view }));
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
    alert('Error! View console log for details');
    console.error(err);
    this.loading = false;
  }

  private updateItem(item: Item) {
    this.itemsService
      .update(item)
      .subscribe({
        next: (item) => {
          this.store.dispatch(itemUpdated({ item }));
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
          this.store.dispatch(itemCreated({ item }));
          this.loading = false;
          alert('Item successfully created!'); 
        },
        error: this.itemsServiceError
      });
  }
}
