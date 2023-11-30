import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Item } from '../app.models';
import { TruncatePipe } from '../truncate.pipe';
import { Store } from '@ngrx/store';
import { editItem } from '../store/items.store';

@Component({
  selector: 'app-tiles-view',
  standalone: true,
  imports: [CommonModule, TruncatePipe],
  templateUrl: './tiles-view.component.html',
  styleUrl: './tiles-view.component.css'
})
export class TilesViewComponent {
  @Input()
  items: Item[] | undefined;

  private store = inject(Store<any>)

  doubleClick(item: Item): void {    
    this.store.dispatch(editItem({ item }))
  }
}
