import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Item } from '../app.models';
import { TruncatePipe } from '../truncate.pipe';

@Component({
  selector: 'app-tiles-view',
  standalone: true,
  imports: [CommonModule, TruncatePipe],
  templateUrl: './tiles-view.component.html',
  styleUrl: './tiles-view.component.css'
})
export class TilesViewComponent {
  @Input()
  items: Item[] = [];
}
