import { TestBed } from '@angular/core/testing';

import { NootService } from './noot.service';

describe('NootService', () => {
  let service: NootService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NootService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
