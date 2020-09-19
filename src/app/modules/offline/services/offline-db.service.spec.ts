import { TestBed } from '@angular/core/testing';

import { PeristenceService } from './offline-db.service';

describe('OfflineDBService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PeristenceService = TestBed.get(PeristenceService);
    expect(service).toBeTruthy();
  });
});
