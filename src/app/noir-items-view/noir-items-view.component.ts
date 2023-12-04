import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Item } from '../app.models';
import { TruncatePipe } from '../truncate.pipe';

@Component({
  selector: 'app-noir-items-view',
  standalone: true,
  imports: [CommonModule, TruncatePipe],
  templateUrl: './noir-items-view.component.html',
  styleUrl: './noir-items-view.component.css'
})
export class NoirItemsViewComponent {
  
  @Input() items: Item[] | null = null;
  @Input() view = '';
  
  @Output() itemSelected = new EventEmitter<Item>();
  
  doubleClick(item: Item): void {  
    this.itemSelected.emit(item);
  }
}
