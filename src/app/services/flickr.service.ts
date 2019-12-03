import { FlickrPhotoResponse } from './../models/flickr-photo-response';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@env';
import { Photos } from '@models/photos';
import { Photo } from '@models/photo';
import { FlickrSearchPhotosResponse } from '@models/flickr-search-photos-response';

@Injectable({
  providedIn: 'root',
})
export class FlickrService {
  constructor(private http: HttpClient) {}

  photosSearch(text: string, perPage: number, page: number): Observable<Photos> {
    const endpointPath = 'flickr.photos.search';

    const params = new HttpParams()
      .set('method', endpointPath)
      .set('api_key', environment.apiKey)
      .set('text', text)
      .set('per_page', perPage.toString())
      .set('page', page.toString())
      .set('format', 'json')
      .set('nojsoncallback', '1');

    return this.http
      .get<FlickrSearchPhotosResponse>(environment.flickrBaseUri, {
        params,
      })
      .pipe(
        map((response: FlickrSearchPhotosResponse) => {
          if (response.stat === 'ok') {
            return {
              page: response.photos.page,
              pages: response.photos.pages,
              perpage: response.photos.perpage,
              total: response.photos.total,
              photo: response.photos.photo.map(flickrPhoto => {
                // 0 in server and/or farm are invalid photos
                if (flickrPhoto.farm === 0 || flickrPhoto.server === '0') {
                  const photo404: Photo = { uri: '/assets/404.jpg', title: '404 not found' };
                  return photo404;
                } else {
                  return this.mapToPhoto(flickrPhoto);
                }
              }),
            };
          } else {
            return {
              page: 0,
              pages: 0,
              perpage: 0,
              total: 0,
              photo: [],
            };
          }
        })
      );
  }

  mapToPhoto(fPhoto: FlickrPhotoResponse): Photo {
    const photo: Photo = {
      uri: `https://farm${fPhoto.farm}.staticflickr.com/${fPhoto.server}/${fPhoto.id}_${fPhoto.secret}_q.png`,
      title: fPhoto.title,
    };
    return photo;
  }
}
