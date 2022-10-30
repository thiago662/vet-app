import { TestBed } from '@angular/core/testing';

import { AnimalViewService } from './animal-view.service';

describe('AnimalViewService', () => {
  let service: AnimalViewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnimalViewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
