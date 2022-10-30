import { TestBed } from '@angular/core/testing';

import { OwnerViewService } from './owner-view.service';

describe('OwnerViewService', () => {
  let service: OwnerViewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OwnerViewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
