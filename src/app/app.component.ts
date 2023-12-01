import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemsService } from './items.service';
import { Observable } from 'rxjs';
import { Item, Pager } from './app.models';
import { ListViewComponent } from './list-view/list-view.component';
import { TilesViewComponent } from './tiles-view/tiles-view.component';
import { DetailsFormComponent } from './details-form/details-form.component';
import { 
  RowsPerPageType, 
  RowsPerPageTypeValues,   
  nextPageClick as nextPageClickAction, 
  prevPageClick as prevPageClickAction, 
  setRowsPerPage,
  setTotalRows
} from './store/pager.store';
import { Store } from '@ngrx/store';
import { ItemsStore, editItem, itemsSelector, setFilter, setItems } from './store/items.store';
import { ItemsState, itemsSelector2, nextPageClick2, pagerSelector, prevPageClick2, setItems2, setRowsPerPage2 } from './items.state';
import { PagerComponent } from './pager/pager.component';

type ViewType = 'list' | 'tiles';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ListViewComponent, TilesViewComponent, DetailsFormComponent, PagerComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ta9';
  view: ViewType = 'list';

  items$: Observable<Item[]>;
  items2$: Observable<Item[]>;
  itemsStore$: Observable<ItemsStore>;
  state$: Observable<ItemsState>;
  
  //itemss$: Observable<Item[]>;

  pager$: Observable<Pager>;
  pager2$: Observable<Pager>;
  rowsPerPageOptions = RowsPerPageTypeValues;  

  constructor(
    private itemsService: ItemsService, 
    private store: Store<any>
  ) {
    this.pager$ = store.select('pager');
    this.itemsStore$ = store.select('items');
    this.state$ = store.select('items2');

    this.items$ = this.store.select(itemsSelector);
    this.items2$ = this.store.select(itemsSelector2);
    this.pager2$ = this.store.select(pagerSelector);
  }

  ngOnInit(): void {
    this.itemsService.get().subscribe(items => {      
      this.store.dispatch(setItems({ items }));
      this.store.dispatch(setTotalRows({ totalRows: items.length }));

      this.store.dispatch(setItems2({ items }));
    });        
  }  

  filterInput(event: Event) {
    const input: HTMLInputElement = <HTMLInputElement>event.target;    
    this.store.dispatch(setFilter({ filter: input.value }));
  }

  rowsPerPageChanged(val: number): void {                
    this.store.dispatch(
      setRowsPerPage2({ rowsPerPage: val })
    );
  }

  nextPageClick(): void {
    this.store.dispatch(nextPageClick2());
  }

  prevPageClick(): void {
    this.store.dispatch(prevPageClick2());
  }

  addNewClick(): void {    
    const emptyItem: Item =  {
      id: '',
      name: '',
      color: '',
      created_at: new Date(),
      updated_at: new Date(),
      created_by: 'me'
    };

    this.store.dispatch(editItem({ item: emptyItem }))
  }
}
