import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemsState, cancelEditItem } from '../items.state';
import { Store } from '@ngrx/store';
import { Item } from '../app.models';

@Component({
  selector: 'app-noir-items-form',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './noir-items-form.component.html',
  styleUrl: './noir-items-form.component.css'
})
export class NoirItemsFormComponent {
  title = '?';  

  @Input()
  item: Item | null | undefined;

  private store = inject(Store<ItemsState>);
  // constructor(private store: Store<ItemsState>) {    
  // }

  closeClick(): void {    
    this.store.dispatch(cancelEditItem());
  }

  saveClick(): void {
    
    console.log('click')
  }
}
