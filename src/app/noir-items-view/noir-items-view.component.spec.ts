import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoirItemsViewComponent } from './noir-items-view.component';

describe('NoirItemsViewComponent', () => {
  let component: NoirItemsViewComponent;
  let fixture: ComponentFixture<NoirItemsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoirItemsViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NoirItemsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
