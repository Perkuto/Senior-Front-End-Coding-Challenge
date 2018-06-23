import { Component, OnInit } from '@angular/core';
import {ImageService} from '../service/imagesearch.service';
import {Subscription, Observable, of} from 'rxjs';

import { Image } from '../Model/Image';

@Component({
    selector: 'app-imagescroll',
    templateUrl: './imagescroll.component.html',
    styleUrls: ['./imagescroll.component.css']
})

export class ImageScrollComponent implements OnInit{

    imageList: Image[];
    noResult: boolean = false;
    total: string = "0";
    toEnd : boolean = false;

    private currentPage: number = 1;
    private subscription: Subscription;

    loadMoreImages;

    constructor(private imageService:ImageService){
        this.imageList = [];
        this.loadMoreImages = this.pullImages.bind(this);
    }

    ngOnInit(){
        this.subscription = this.imageService.response
            .subscribe((data)=>this._handleDataSuccess(data));
    }

    ngOnDestroy(){
        this.subscription.unsubscribe();
    }

    private _handleDataSuccess(res){

        if (!res || res.stat !== "ok") return;
 
        let data = res.photos;
        this.toEnd = (data.page == data.pages);
        this.noResult = (data.total === "0") ? true : false;
        this.total = data.total;
        let result = data.photo.map(photo => {
            return new Image(photo)
        });
        if(data.page === 1) {
            this.imageList.length = 0;               
        }
        this.imageList.push(...result);           
    }

    pullImages(){
        return this.toEnd ? of(null) : this.imageService.getMoreImage();
    }
}