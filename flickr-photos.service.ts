import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { FlickrPhotoModal, PhotoModal } from './FlickrPhotoModal';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FlickrPhotosService {
  private photosSearchUrl = 'https://www.flickr.com/services/rest/?method=flickr.photos.search';

  public keywordStore = new BehaviorSubject<string>("");  
  public keyword$ = this.keywordStore.asObservable();
  oldKeyword: string;
  page : any = 1;

  constructor(private http: HttpClient) { }

  public findFlickrPhoto(keyword: string) :Observable <FlickrPhotoModal> {
    if (this.oldKeyword === keyword) {
      this.page++;
    }
    this.oldKeyword = keyword;
    const listParam = new HttpParams()
        .set('api_key',  '3259e20eb2108433663ccf3daaae0de5')        
        .set('text', keyword)
        .set('per_page',  '6')
        .set('page',  this.page)
        .set('format',  'json')
        .set('nojsoncallback',  '1');
        //80e6df2c9f39f038
     return this.http.get<FlickrPhotoModal>(this.photosSearchUrl , {params: listParam
                                            });
   }

   public getFlickrPhotos (keyword: string){  
    return this.findFlickrPhoto(keyword).pipe(map((res : FlickrPhotoModal)=>{
      const photosUrlList = [];
      res.photos.photo.forEach((photoModal: PhotoModal) => {
        const photoUrl = {
          url: `https://farm${photoModal.farm}.staticflickr.com/${photoModal.server}/${photoModal.id}_${photoModal.secret}`,
          title: photoModal.title
        };
        photosUrlList.push(photoUrl);
      }); 
      return photosUrlList;   
    }));  
  }
}
