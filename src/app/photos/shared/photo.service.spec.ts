import {inject, TestBed} from '@angular/core/testing';
import {PhotoService} from './photo.service';
import {HttpService} from '../../shared/http/http.service';

describe('PhotoService', () => {

  /* stub definitions */
  class HttpServiceStub {
  }

  /* beforeEach definition */
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PhotoService,
        {provide: HttpService, useClass: HttpServiceStub}
      ]
    });
  });

  /* Tests */

  it('should be created', inject([HttpService], (service: HttpService) => {
    expect(service).toBeTruthy();
  }));

});
