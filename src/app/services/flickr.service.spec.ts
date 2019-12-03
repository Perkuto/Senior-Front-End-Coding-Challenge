import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FlickrPhotoResponse } from './../models/flickr-photo-response';
import { FlickrService } from './flickr.service';

describe('FlickrService', () => {
  let service: FlickrService;
  beforeEach(() => {
    const flickrPhotoResponseStub = {
      farm: {},
      server: {},
      id: {},
      secret: {},
      title: {},
    };
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FlickrService, { provide: FlickrPhotoResponse, useValue: flickrPhotoResponseStub }],
    });
    service = TestBed.get(FlickrService);
  });
  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
});
