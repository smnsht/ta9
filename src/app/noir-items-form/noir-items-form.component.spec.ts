import { NoirItemsFormComponent } from './noir-items-form.component';
import { Item } from '../app.models';

describe('NoirItemsFormComponent', () => {
  
  const item: Item = {
    "id": "c65449c8-b027-43f3-9944-215e8e3658c7",
    "name": "FRELIMO/RENAMO",
    "color": "#facafa",
    "created_at": new Date("2023-11-22T08:00:00.594Z"),
    "updated_at": new Date("2023-11-22T08:00:00.594Z"),
    "created_by": "Robert Mugabe"
  } as const;


  let component: NoirItemsFormComponent;
  let mockStore = {
    select: () => {},
    dispatch: (action: any) => { action }
  };

  beforeEach(() => {
    mockStore = {
      select: () => {},
      dispatch: () => {}
    };
    
    component = new NoirItemsFormComponent(mockStore as any);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('item setter', () => {
    expect(component.item).toBeUndefined();

    component.item = item;

    expect(component.item).toEqual(item);
    expect(component['itemClone']).toEqual(item);

    component.item = null;

    expect(component.item).toBeFalsy();
    expect(component['itemClone']).toBeUndefined();
  });

  it('closeClick() dispatches cancelEditItem() action', () => {
    spyOn(mockStore, 'dispatch').and.callFake(action => {      
      expect(action.type).toBe('Cancel Edit Item');
    });

    component.closeClick();    
  });

  it('saveClick() raises saveClicked', () => {
    component.item = item;
    component.saveClicked.subscribe(val => expect(val).toEqual(item));
    component.saveClick();
  });
});
