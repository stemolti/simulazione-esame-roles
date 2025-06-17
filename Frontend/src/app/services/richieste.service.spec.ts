import { TestBed } from '@angular/core/testing';

import { RichiesteService } from './richieste.service';

describe('RichiesteService', () => {
  let service: RichiesteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RichiesteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
