import {inject, TestBed} from '@angular/core/testing';
import {of as observableOf} from 'rxjs';

import {HttpService} from './http.service';
import {HttpClient} from '@angular/common/http';
import {API_KEY} from '../../app.const';


describe('HttpService', () => {

  /* stub definitions */
  class HttpClientStub {
    jsonp() {
    }
  }

  /* beforeEach definition */
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpService,
        {provide: HttpClient, useClass: HttpClientStub}
      ]
    });
  });

  /* Tests */

  it('should be created', inject([HttpService], (service: HttpService) => {
    expect(service).toBeTruthy();
  }));

  it('should get data', inject([HttpService, HttpClient],
    (service: HttpService, httpClient: HttpClient) => {
      const dataExample = {
        id: 1,
        name: 'DATA'
      };

      // Add spy on HttpClient
    spyOn(httpClient, 'jsonp').and.callFake(t => {
      return observableOf([dataExample]);
    });

    service.get('fakeUrl').subscribe(data => {
      console.log(data);
      expect(data.toString()).toContain(dataExample.toString());
    });

    expect(httpClient.jsonp).toHaveBeenCalledWith(jasmine.stringMatching('^fakeUrl/?.*' + API_KEY), 'jsoncallback');
    expect(httpClient.jsonp).toHaveBeenCalledTimes(1);

  }));

});
