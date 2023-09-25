import { TestBed } from '@angular/core/testing';

import { InternmentService } from './internment.service';

describe('InternmentService', () => {
  let service: InternmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InternmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
