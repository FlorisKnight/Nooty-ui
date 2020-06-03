import { TestBed } from '@angular/core/testing';

import { WebsocketMapperService } from './websocket-mapper.service';

describe('WebsocketMapperService', () => {
  let service: WebsocketMapperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebsocketMapperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
