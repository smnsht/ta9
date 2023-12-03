import { ItemsService } from './items.service';
import { HttpClient } from '@angular/common/http';
import { Item } from '../app.models';
import { of } from 'rxjs';

describe('ItemsService', () => {
  const BACKEND_URL = "http://localhost:3000";  

  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let service: ItemsService;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post', 'put']);
    service = new ItemsService(httpClientSpy, BACKEND_URL);    
  });

  it('should be created', () => {
    expect(service).toBeTruthy();    
  });

  it('get should return items', (done: DoneFn) => {
    const expectedItems: Item[] = [
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

    httpClientSpy.get.and.returnValue(of(expectedItems))    

    service.get().subscribe(items => {
      expect(items).toEqual(expectedItems);
      done();
    });

    expect(httpClientSpy.get.calls.count()).toBe(1);
  });

  it('create() should post', (done: DoneFn) => {
    const item: Item = {
      "id": "",
      "name": "FRELIMO/RENAMO",
      "color": "#facafa",
      "created_at": new Date("2023-11-22T08:00:00.594Z"),
      "updated_at": new Date("2023-11-22T08:00:00.594Z"),
      "created_by": "Robert Mugabe"
    };

    httpClientSpy.post.and.returnValue(of(item));
    
    service.create(item).subscribe(item => {
      expect(httpClientSpy.post).toHaveBeenCalledWith(service['resourceUrl'], item);
      done();
    });
  });

  it('update() should put', (done: DoneFn) => {
    const item: Item = {
      "id": "c65449c8-b027-43f3-9944-215e8e3658c7",
      "name": "FRELIMO/RENAMO",
      "color": "#facafa",
      "created_at": new Date("2023-11-22T08:00:00.594Z"),
      "updated_at": new Date(),
      "created_by": "Robert Mugabe"
    };

    const expectedUrl = `${service['resourceUrl']}/${item.id}`;

    httpClientSpy.put.and.returnValue(of(item));

    service.update(item).subscribe(item => {
      expect(httpClientSpy.put).toHaveBeenCalledWith(expectedUrl, item);
      done();
    });
  })
});
