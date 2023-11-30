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
import { ItemsStore, editItem, selectItems, setFilter, setItems } from './store/items.store';

type ViewType = 'list' | 'tiles';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ListViewComponent, TilesViewComponent, DetailsFormComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ta9';
  view: ViewType = 'list';

  items$ = new Observable<Item[]>;
  itemsStore$: Observable<ItemsStore>;
  //items: Item[] = [];

  pager$: Observable<Pager>;
  rowsPerPageOptions = RowsPerPageTypeValues;  

  constructor(
    private itemsService: ItemsService, 
    private store: Store<any>
  ) {
    this.pager$ = store.select('pager');
    this.itemsStore$ = store.select('items');
  }

  ngOnInit(): void {
    this.itemsService.get().subscribe(items => {      
      this.store.dispatch(setItems({ items }));
      this.store.dispatch(setTotalRows({ totalRows: items.length }));
    });    
  }  

  filterInput(event: Event) {
    const input: HTMLInputElement = <HTMLInputElement>event.target;    
    this.store.dispatch(setFilter({ filter: input.value }));
  }

  rowsPerPageChanged(event: Event): void {
    const v = (<HTMLSelectElement>event.target).value;
    const action = setRowsPerPage({
      rowsPerPage: <RowsPerPageType>Number.parseInt(v)
    });
    this.store.dispatch(setRowsPerPage(action));
  }

  nextPageClick(): void {
    this.store.dispatch(nextPageClickAction());
  }

  prevPageClick(): void {
    this.store.dispatch(prevPageClickAction());
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
