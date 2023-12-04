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

  beforeEach(() => {    
    component = new NoirItemsFormComponent();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit() should set form defaults', () => {
    expect(component.item).toBeUndefined();

    component.item = item;
    component.ngOnInit();

    expect(component.name.value).toEqual(item.name);
    expect(component.color.value).toEqual(item.color);    
  });

  it('closeClick() raises cancelEditClick event', () => {
    component.cancelEditClick.subscribe((val) => expect(val).toBeUndefined());
    
    component.closeClick();    
  });

  it('saveClick() raises saveClicked', () => {
    component.item = item;
    component.ngOnInit();
    component.saveClicked.subscribe(val => expect(val).toEqual(item));
    component.saveClick();
  });
});
