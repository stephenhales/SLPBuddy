import { TestBed, inject } from '@angular/core/testing';

import { WebpageService } from './webpage.service';

describe('WebpageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WebpageService]
    });
  });

  it('should be created', inject([WebpageService], (service: WebpageService) => {
    expect(service).toBeTruthy();
  }));
});
