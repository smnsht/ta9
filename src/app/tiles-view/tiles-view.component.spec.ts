import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TilesViewComponent } from './tiles-view.component';

describe('TilesViewComponent', () => {
  let component: TilesViewComponent;
  let fixture: ComponentFixture<TilesViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TilesViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TilesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
