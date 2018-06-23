import { Injectable } from '@angular/core';
import { Http} from '@angular/http';
import {Observable, BehaviorSubject, of} from 'rxjs';
import { map, catchError } from 'rxjs/operators';

const API_URL = "https://api.flickr.com/services/rest";
const API_KEY = "18470d9eeeb3597104c30f05a72269a8";
const params =  {
    "method": "flickr.photos.search",
    "api_key": API_KEY,
    "per_page": 24,
    "format": 'json',
    "nojsoncallback": 1,
    "page": 1,
    "text": ''
};

@Injectable()
export class ImageService{

    private subject = new BehaviorSubject(null);
    response = this.subject.asObservable();

    constructor(private http:Http){
    }

    searchImage(term: string, page:number = 1){
        let url = this._createRequest(term, page);
        this.http.get(`${API_URL}/?${url}`)
            .pipe(
                map(res=>res.json()),
                catchError(error => of(`Error: ${error}`))
            )
            .subscribe(value => this.subject.next(value));
    }

    getMoreImage(){
        let url = this._createRequest(params.text, params.page+1);
        this.http.get(`${API_URL}/?${url}`)
            .pipe(
                map(res=>res.json()),
                catchError(error => of(`Error: ${error}`))
            )
            .subscribe(value=> this.subject.next(value));
    }

    private _createRequest(term:string, page:number){
        params.text = term;
        params.page = page;
        return  Object.keys(params).map(key=>{
            return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
        }).join('&');
    }
}