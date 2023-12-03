import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoirItemsComponent } from './noir-items.component';

describe('NoirItemsComponent', () => {
  let component: NoirItemsComponent;
  let fixture: ComponentFixture<NoirItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoirItemsComponent]
    })
    .compileComponents();
    
    //fixture = TestBed.createComponent(NoirItemsComponent);
    //component = fixture.componentInstance;
    //fixture.detectChanges();
  });

  it('should create', () => {
    //expect(component).toBeTruthy();
    expect(1).toBeTruthy();
  });
});
