import { NoirItemsViewComponent } from './noir-items-view.component';
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
  
  beforeEach(() => {  
    component = new NoirItemsViewComponent();
    component.items = items;
    component.view = "list";
  });

  it('component created', () => {    
    expect(component).toBeTruthy();   
    expect(component.items).toEqual(items);   
    expect(component.view).toBe("list");    
  });

  it('doubleClick() raises itemSelected', () => {    
    const selectedItem = items[0];

    component.itemSelected.subscribe(item => expect(item).toEqual(selectedItem));
    
    component.doubleClick(items[0]);    
  });
});
