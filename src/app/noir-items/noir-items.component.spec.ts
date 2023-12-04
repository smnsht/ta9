import { NoirItemsComponent } from './noir-items.component';
import { Item, ItemsViewType } from '../app.models';

describe('NoirItemsComponent', () => {
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

  Object.freeze(items);

  let component: NoirItemsComponent;

  const mockStore = {
    select: () => { },
    dispatch: (a: any) => { a }
  };

  beforeEach(async () => {
    component = new NoirItemsComponent(mockStore as any);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit() dispatches to loadItemsRequest()', () => {
    spyOn(mockStore, 'dispatch').and.callFake(action => {
      expect(action.type).toBe('[Items API] Load Items Request');
    });

    component.ngOnInit();    
  });

  it('nextPageClick() dispatches to nextPageClick()', () => {
    spyOn(mockStore, 'dispatch').and.callFake(action => {
      expect(action.type).toBe('Next Page Click');
    });

    component.nextPageClick();
  });

  it('prevPageClick() dispatches prevPageClick()', () => {
    spyOn(mockStore, 'dispatch').and.callFake(action => {
      expect(action.type).toBe('Prev Page Click');
    });

    component.prevPageClick();
  });

  it('addNewClick() dispatches to addNewItem()', () => {
    spyOn(mockStore, 'dispatch').and.callFake(action => {
      expect(action.type).toBe('Add New Item');
    });

    component.addNewClick();
  });

  it('viewClick() dispatches to setItemsView()', () => {
    spyOn(mockStore, 'dispatch').and.callFake(action => {
      expect(action).toEqual({
        view: 'tiles',
        type: 'Set Items View'
      });
    });

    component.viewClick(<ItemsViewType>"tiles");

    expect(component.view).toEqual(<ItemsViewType>"tiles");
  });
  
  it('saveItem() dispatched to putItem() when id is set', () => {
    const itemToUpdate = { ...items[0] };
    itemToUpdate.id = crypto.randomUUID();

    spyOn(mockStore, 'dispatch').and.callFake(action => {      
      expect(action.type).toEqual('[Items API] Update Item');
    });
    
    component.saveItem(itemToUpdate);    
  });

  it('saveItem() dispatched to postItem() when is is empty', () => {
    const itemToCreate = { ...items[0], id: '' };
    
    spyOn(mockStore, 'dispatch').and.callFake(action => {            
      expect(action.type).toEqual('[Items API] Save New Item');      
    });
    
    component.saveItem(itemToCreate);
  });
});
