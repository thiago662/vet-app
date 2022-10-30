import { TestBed } from '@angular/core/testing';

import { InterectionService } from './interection.service';

describe('InterectionService', () => {
  let service: InterectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InterectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
