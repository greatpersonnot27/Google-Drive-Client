import { TestBed } from '@angular/core/testing';

import { GapiSessionServiceService } from './gapi-session-service.service';

describe('GapiSessionServiceService', () => {
  let service: GapiSessionServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GapiSessionServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
