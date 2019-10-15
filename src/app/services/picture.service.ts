import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Photos } from '../interfaces/photos';
import { Photo } from '../interfaces/photo';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PictureService {

  private static readonly apikey: string = "d05676b692da425dc5191805e2adfc56";
  private static readonly apiMethod: string = "flickr.photos.search";
  private static readonly flickrBaseUri: string ='https://www.flickr.com/services/rest/';

  constructor(
    private http: HttpClient
  ) { }

  searchPictures(searchText: string, nbPerPage: number, pageNumber: number): Observable<Photos> {
    const params = new HttpParams()
    .set('method', PictureService.apiMethod)
    .set('api_key', PictureService.apikey)
    .set('text', searchText)
    .set('per_page', nbPerPage.toString())
    .set('page', pageNumber.toString())
    .set('format', 'json')
    .set('nojsoncallback', '1');
    return this.http.get<Photos>(PictureService.flickrBaseUri, {params});
  }

}
