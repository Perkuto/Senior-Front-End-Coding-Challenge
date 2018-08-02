import {Injectable} from '@angular/core';
import {HttpService} from '../../shared/http/http.service';
import {PhotosResponse} from './photos-response';
import {API_PHOTOS_RECENT_METHOD, API_PHOTOS_SEARCH_METHOD, API_REST_SERVICES_URL, PHOTO_URL} from '../../app.const';
import {HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Photo} from './photo';

/**
 * Service for photo.
 */
@Injectable()
export class PhotoService {

  constructor(private httpService: HttpService) {
  }

  /**
   * Build a URL of a photo.
   * @param {Photo} photo The photo.
   * @returns {string} The URL of the photo.
   */
  getPhotoUrl (photo: Photo): string {
    return PHOTO_URL
      .replace('{farm-id}', String(photo.farm))
      .replace('{server-id}', String(photo.server))
      .replace('{id}', String(photo.id))
      .replace('{secret}', photo.secret);
  }

  /**
   * Get photos from API.
   * @param {string} textFilter Filter the list of photos by text.
   * @returns {Observable<PhotosResponse>}
   */
  getPhotos(textFilter: string = null, page: number = 1): Observable<PhotosResponse> {
    let params: HttpParams;
    if (textFilter) {
      params = new HttpParams()
        .set('method', API_PHOTOS_SEARCH_METHOD)
        .set('text', textFilter)
        .set('page', '' + page);
    } else {
      params = new HttpParams()
        .set('method', API_PHOTOS_RECENT_METHOD)
        .set('page', '' + page);
    }
    return this.httpService.get<PhotosResponse>(API_REST_SERVICES_URL, params);
  }

}
