import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Photos } from '../interfaces/photos';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PictureService {

  constructor(
    private http: HttpClient
  ) { }

  searchPictures(search: string): Observable<Photos> {
    return this.http.get<Photos>('/assets/pictures.json');
  }

}
