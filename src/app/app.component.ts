import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemsService } from './items.service';
import { Observable } from 'rxjs';
import { Item } from './app.models';
import { ListViewComponent } from './list-view/list-view.component';
import { TilesViewComponent } from './tiles-view/tiles-view.component';
import { DetailsFormComponent } from './details-form/details-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ListViewComponent, TilesViewComponent, DetailsFormComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ta9';
  items$ = new Observable<Item[]>;
  items: Item[] = [];

  constructor(private itemsService: ItemsService) {}

  ngOnInit(): void {
    this.itemsService.get().subscribe(items => this.items = items);
  }  
}
