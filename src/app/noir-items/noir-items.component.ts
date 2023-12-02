import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Item, Pager } from '../app.models';
import { ItemsService } from '../items.service';
import { PagerComponent } from '../pager/pager.component';
import { TruncatePipe } from '../truncate.pipe';
import { NoirItemsFormComponent } from '../noir-items-form/noir-items-form.component';
import { 
  ItemsState, 
  addNewItem, 
  editItem, 
  filterSelector, 
  itemsSelector2, 
  nextPageClick, 
  pagerSelector, 
  prevPageClick, 
  selectedItemSelector, 
  setFilter, 
  setItems, 
  setRowsPerPage 
} from '../items.state';


type ViewType = 'list' | 'tiles';

@Component({
  selector: 'app-noir-items',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, PagerComponent, NoirItemsFormComponent, TruncatePipe],
  templateUrl: './noir-items.component.html',
  styleUrl: './noir-items.component.css'
})
export class NoirItemsComponent implements OnInit {
  view: ViewType = 'list';

  items$: Observable<Item[]>;
  filter$: Observable<string>;
  pager$: Observable<Pager>;
  selectedItem$: Observable<Item | undefined>;

  constructor(
    private itemsService: ItemsService,
    private store: Store<ItemsState>
  ) {
    this.items$ = this.store.select(itemsSelector2);    
    this.pager$ = this.store.select(pagerSelector);
    this.filter$ = this.store.select(filterSelector);
    this.selectedItem$ = this.store.select(selectedItemSelector)
  }

  ngOnInit(): void {
    this.itemsService.get().subscribe(items => {
      this.store.dispatch(setItems({ items }));
    });
  }

  filterInput(event: Event) {
    const input: HTMLInputElement = <HTMLInputElement>event.target;
    this.store.dispatch(setFilter({ filter: input.value }));
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

  doubleClick(item: Item): void {        
    this.store.dispatch(editItem({ 
      item, 
      override: false 
    }))    
  }

  addNewClick(): void {
    this.store.dispatch(addNewItem());
  }

  saveItem(item: Item): void {
    console.log(item);
  }
}
