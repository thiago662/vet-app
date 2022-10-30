import { TestBed } from '@angular/core/testing';

import { InterectionModalService } from './interection-modal.service';

describe('InterectionModalService', () => {
  let service: InterectionModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InterectionModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
