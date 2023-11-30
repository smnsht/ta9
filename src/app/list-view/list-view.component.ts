import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Item } from '../app.models';
import { Store } from '@ngrx/store';
import { editItem } from '../store/items.store';

@Component({
  selector: 'app-list-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-view.component.html',
  styleUrl: './list-view.component.css'
})
export class ListViewComponent {
  @Input()
  items: Item[] | undefined;

  private store = inject(Store<any>)
  //constructor(private store: Store<any>) {}

  rowDoubleClick(item: Item): void {    
    this.store.dispatch(editItem({ item }))
  }
}
