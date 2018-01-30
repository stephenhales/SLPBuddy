import { TestBed, inject } from '@angular/core/testing';

import { MembraneService } from './membrane.service';

describe('MembraneService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MembraneService]
    });
  });

  it('should be created', inject([MembraneService], (service: MembraneService) => {
    expect(service).toBeTruthy();
  }));
});
