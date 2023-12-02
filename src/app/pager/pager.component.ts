import { CommonModule } from '@angular/common';
import { Pager } from '../app.models';
import { 
  ChangeDetectionStrategy, 
  Component, 
  EventEmitter, 
  Input, 
  Output 
} from '@angular/core';



@Component({
  selector: 'app-pager',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  templateUrl: './pager.component.html',
  styleUrl: './pager.component.css'
})
export class PagerComponent {
  @Input()
  pager: Pager | null = null;

  @Input()
  options = [10, 20, 30, 40, 50];

  @Output()
  nextPageClick = new EventEmitter();

  @Output()
  prevPageClick = new EventEmitter();

  @Output()
  rowsPerPageChanged = new EventEmitter<number>();
  
  nextClick(): void {
    this.nextPageClick.emit();
  }

  prevClick(): void {
    this.prevPageClick.emit();
  }

  changed(event: Event) {
    const v = (<HTMLSelectElement>event.target).value;
    const newValue = Number.parseInt(v);

    this.rowsPerPageChanged.emit(newValue);    
  }    
}
