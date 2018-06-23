import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { ImageService } from '../service/imagesearch.service';
import {Location} from '@angular/common';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-searchbar',
    template: `<div class="ga-search"><input #searchInput 
        type="search"
        aria-label="search"
        placeholder="Please enter your keyword!"
        (keyup.enter)="updateSearch()">
        <button [disabled]="loading"
        (click)="updateSearch()">
        Search</button>
        <span class="loader" *ngIf="loading"></span></div>`,
    styleUrls: ['./searchbar.component.css']
})

export class SearchBarComponent implements OnInit {
    loading:boolean = false;
    private subscription: Subscription;

    @ViewChild('searchInput') searchInput: ElementRef;

    constructor(
        private imageService:ImageService,
        private location: Location){
            this.location = location;
    }

    ngOnInit(){
        this.subscription = this.imageService.response
                .subscribe((res)=>this._handleDataSuccess(res));
        let deeplink = this._getSearch();
        if (deeplink) {
            this.query = deeplink;
            this.updateSearch();
        }    
    }
    
    ngOnDestroy(){
        this.subscription.unsubscribe();
    }

    updateSearch(){
        this.loading = true;
        this.imageService.searchImage(this.query);
    }

    private _getSearch(){
        let hash = window.location.hash;
        let query = hash ? hash.split('#').pop() : null
        return query ? decodeURIComponent(query) : null;
    }

    private _setSearch(query:string = ""){
        this.location.replaceState(query);
    }

    private _handleDataSuccess(res){
        if (!res) return;
        if(res.stat === "ok"){
            this.loading = false;
            this._setSearch(this.query);
        }else{
            console.log("Request error:" + res);
        }
    }      

    private get query(){
        return this.searchInput.nativeElement.value;
    }

    private set query(val:string){
        this.searchInput.nativeElement.value = val;
    }
}
