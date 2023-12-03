import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-loader',
    standalone: true,
    imports: [CommonModule],
    template: `
      <div [ngClass]="{ 'centered': centered }">
        <div class="loader"></div> {{ caption }}
    </div>
  `,
    styles: `
    .centered {
        text-align: -webkit-center;
    }
    .loader {
        border: 16px solid #f3f3f3;
        border-radius: 50%;
        border-top: 16px solid #3498db;
        width: 120px;
        height: 120px;
        animation: spin 2s linear infinite;
        -webkit-animation: spin 2s linear infinite; /* Safari */
    }

    @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
    }
  `
})
export class LoaderComponent {
    @Input()
    caption = 'Please wait...';

    @Input()
    centered = true;
}