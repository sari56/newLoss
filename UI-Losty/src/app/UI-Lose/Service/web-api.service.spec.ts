// import { TestBed } from '@angular/core/testing';
import { TestBed, inject } from '@angular/core/testing';
import { WebApiService } from './web-api.service';

describe('WebApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [WebApiService]
  }));

  it('should be created', () => {
    const service: WebApiService = TestBed.get(WebApiService);
    expect(service).toBeTruthy();
  });
});



