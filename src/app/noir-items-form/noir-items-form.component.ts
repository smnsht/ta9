import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemsState, cancelEditItem } from '../items.state';
import { Store } from '@ngrx/store';
import { Item } from '../app.models';
import { FormsModule } from '@angular/forms';

type ItemType = Item | null | undefined;

@Component({
  selector: 'app-noir-items-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './noir-items-form.component.html',
  styleUrl: './noir-items-form.component.css'
})
export class NoirItemsFormComponent {

  @Output()
  saveClicked = new EventEmitter<Item>();

  private itemClone: ItemType;

  @Input()
  set item(value : ItemType) {    
    if(value) {
      this.itemClone = Object.assign({}, value);      
    } else {
      delete this.itemClone;
    }
  }

  get item(): ItemType {
    return this.itemClone;
  }

  private store = inject(Store<ItemsState>);
  
  closeClick(): void {    
    this.store.dispatch(cancelEditItem());
  }

  saveClick(): void {        
    this.saveClicked.emit(this.itemClone!);
    this.closeClick();
  }
}
