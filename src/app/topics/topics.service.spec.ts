import { TestBed } from '@angular/core/testing';

import { TopicsService } from './services/topics.service';

describe('TopicsService', () => {
  let service: TopicsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TopicsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
