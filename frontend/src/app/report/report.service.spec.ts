import { TestBed, inject } from '@angular/core/testing';

import { ReportService } from './report.service';

describe('ReportService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReportService]
    });
  });

  it('should ...', inject([ReportService], (service: ReportService) => {
    expect(service).toBeTruthy();
  }));
});
