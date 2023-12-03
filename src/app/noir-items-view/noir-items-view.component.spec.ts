
import { NoirItemsViewComponent } from './noir-items-view.component';
import { of } from 'rxjs';
import { Item } from '../app.models';

const items: Item[] = [
  {
    "id": "c65449c8-b027-43f3-9944-215e8e3658c7",
    "name": "FRELIMO/RENAMO",
    "color": "#facafa",
    "created_at": new Date("2023-11-22T08:00:00.594Z"),
    "updated_at": new Date("2023-11-22T08:00:00.594Z"),
    "created_by": "Robert Mugabe"
  },
  {
    "id": "3e0f5e8e-7a80-4822-9caf-bea0f444ef6b",
    "name": "Communist Party of Kampuchea",
    "color": "#dafaca",
    "created_at": new Date("2023-11-23T09:20:00.594Z"),
    "updated_at": new Date("2023-11-23T09:20:00.594Z"),
    "created_by": "Pol Pot"
  },
];

describe('NoirItemsViewComponent', () => {
  let component: NoirItemsViewComponent;  
  const mockStore = {
    select: () => {},
    dispatch: () => {}
  };
  
  beforeEach(() => {  
    component = new NoirItemsViewComponent(mockStore as any);
    component.items$ = of(items);
    component.view$ = of("list");      
  });

  it('component created', () => {    
    expect(component).toBeTruthy();   
    expect(component.items$).toBeTruthy();        
    expect(component.view$).toBeTruthy();
    
    component.items$.subscribe(i => expect(i).toEqual(items));    
    component.view$.subscribe(v => expect(v).toBe("list") );    
  });

  it('doubleClick() dispatches editAction', () => {
    spyOn(mockStore, 'dispatch');
    
    component.doubleClick(items[0]);

    expect(mockStore.dispatch).toHaveBeenCalled();
  });
});
