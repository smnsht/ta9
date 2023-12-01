import { Component } from '@angular/core';
import { NoirItemsComponent } from './noir-items/noir-items.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NoirItemsComponent],
  template: `
  <main class="main">
    <app-noir-items></app-noir-items>
  </main>
  `
})
export class AppComponent {

}
