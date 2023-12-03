import { CommonModule } from '@angular/common';
import { ItemsState } from '../state/items.state';
import { Store } from '@ngrx/store';
import { Item, ItemType } from '../app.models';
import { FormsModule } from '@angular/forms';
import { cancelEditItem } from '../state/items.reducer';

import { 
  Component, 
  EventEmitter, 
  Input, 
  Output
} from '@angular/core';

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

  constructor(private store: Store<ItemsState>){}  
  
  closeClick(): void {    
    this.store.dispatch(cancelEditItem());
  }

  saveClick(): void {        
    this.saveClicked.emit(this.itemClone!);
    this.closeClick();
  }
}
