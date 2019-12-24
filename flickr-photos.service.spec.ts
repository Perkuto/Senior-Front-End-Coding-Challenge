import { TestBed } from '@angular/core/testing';

import { FlickrPhotosService } from './flickr-photos.service';

describe('FlickrPhotosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FlickrPhotosService = TestBed.get(FlickrPhotosService);
    expect(service).toBeTruthy();
  });
});
