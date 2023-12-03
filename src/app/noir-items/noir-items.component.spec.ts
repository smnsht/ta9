import { NoirItemsComponent } from './noir-items.component';
import { of } from 'rxjs';
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

  const mockItemsService = {
    get: () => of(items),
    update:(a: any) => { a; return of(items[0]); },
    create:(a: any) => { a; return of(items[0]) }
  };

  beforeEach(async () => {
    component = new NoirItemsComponent(mockItemsService as any, mockStore as any);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit() should load items', () => {
    spyOn(mockItemsService, 'get').and.returnValue(of(items));

    component.ngOnInit();
    expect(mockItemsService.get).toHaveBeenCalled();
  });

  it('nextPageClick() dispatches nextPgeClick()', () => {
    spyOn(mockStore, 'dispatch').and.callFake(action => {
      expect(action.type).toBe('Next Page Click');
    });

    component.nextPageClick();
  });

  it('prevPageClick() dispatches prevPgeClick()', () => {
    spyOn(mockStore, 'dispatch').and.callFake(action => {
      expect(action.type).toBe('Prev Page Click');
    });

    component.prevPageClick();
  });

  it('addNewClick() dispatches addNewItem()', () => {
    spyOn(mockStore, 'dispatch').and.callFake(action => {
      expect(action.type).toBe('Add New Item');
    });

    component.addNewClick();
  });

  it('viewClick() dispatches setItemsView() action', () => {
    spyOn(mockStore, 'dispatch').and.callFake(action => {
      expect(action).toEqual({
        view: 'tiles',
        type: 'Set Items View'
      });
    });

    component.viewClick(<ItemsViewType>"tiles");

    expect(component.view).toEqual(<ItemsViewType>"tiles");
  });

  it('saveItem() dispatched to updateUtem()', () => {
    const itemToUpdate = { ...items[0] };

    spyOn(mockItemsService, 'update').and.callFake((item) => {
      expect(component.loading).toBeTrue();
      expect(item).toEqual(itemToUpdate);      
      return of(item);
    });

    spyOn(mockStore, 'dispatch').and.callFake(action => {      
      expect(action.type).toEqual('Item Updated');
    });
    
    component.saveItem(itemToUpdate);    
  });

  it('saveItem() dispatched to createUtem()', () => {
    const itemToCreate = { ...items[0], id: '' };

    spyOn(mockItemsService, 'create').and.callFake(item => {      
      expect(component.loading).toBeTrue();
      expect(item).toEqual(itemToCreate);
      return of({ ...item, id: '11111' });
    });

    spyOn(mockStore, 'dispatch').and.callFake(action => {            
      expect(action.type).toEqual('New Item Created');      
    });
    
    component.saveItem(itemToCreate);
  });
});
