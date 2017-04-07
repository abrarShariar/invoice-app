import { TestBed, inject } from '@angular/core/testing';

import { AreaService } from './area.service';

describe('AreaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AreaService]
    });
  });

  it('should ...', inject([AreaService], (service: AreaService) => {
    expect(service).toBeTruthy();
  }));
});
