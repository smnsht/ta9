import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagerComponent } from './pager.component';
import { first } from 'rxjs';

describe('PagerComponent', () => {
  let component: PagerComponent;
  let fixture: ComponentFixture<PagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PagerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('raises nextPageClick when "next" clicked', () => {
    component.nextPageClick.pipe(first()).subscribe((val) => {      
      expect(val).toBeUndefined();      
    });
    component.nextClick();
  });

  it('raises prevPageClick when "prev" clicked', () => {
    component.prevPageClick.pipe(first()).subscribe((val) => {      
      expect(val).toBeUndefined();      
    });
    component.prevClick();
  });

  it('raises new value for rowsPerPage when changed', () => {    
    const newRowsPerPage = 10;

    component.rowsPerPageChanged.pipe(first()).subscribe((newValue) => {
      expect(newValue).toBe(newRowsPerPage);
    });

    component.changed({
      target: {
        value: newRowsPerPage.toString()
      } as any 
    } as any);    
  });
});
