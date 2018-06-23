import { Directive, AfterViewInit, ElementRef, Input,EventEmitter,Output} from "@angular/core";
import {Observable, fromEvent} from 'rxjs';
import { map, filter, debounceTime, distinctUntilChanged,tap} from 'rxjs/operators';

interface scrollPotision{
    sH: number;
    sT: number;
    cH: number;
};

@Directive({
    selector: '[infinite-scroll]'
})

export class InfiniteScrollDirective implements AfterViewInit{
    scrollEvent$: Observable<any>;
    resizeEvent$: Observable<any>;

    private el: any;

    @Input() scrollElement;
    @Input() percent:number = 70; 
    @Input() debounceInterval = 250;   
    @Output() scrollAction: EventEmitter<any> = new EventEmitter();

    constructor(private element:ElementRef){
        this.el = element.nativeElement;
    }

    ngAfterViewInit(){
      this.registerScrollEvent();
      this.registerResizeEvent();
    }    

    registerScrollEvent(){
        this.scrollEvent$ = fromEvent(document, 'scroll');
        let requestOnScroll$ = this.scrollEvent$
            .pipe(
                debounceTime(this.debounceInterval),
                distinctUntilChanged(),
                map(() => ({
                    sH: document.body.clientHeight,
                    sT: window.pageYOffset,
                    cH: window.innerHeight               
                })),
                filter((position) => this.needLoadMore(position))
            ); 
        requestOnScroll$.subscribe(() => {
            this.scrollAction.emit(null);
        });     
    }

    registerResizeEvent(){
        this.resizeEvent$ = fromEvent(window, 'resize');
        let requestOnResize$ = this.resizeEvent$
            .pipe(
                debounceTime(this.debounceInterval),
                distinctUntilChanged(),
                map(() => ({
                    sH: this.el.scrollHeight,
                    sT: window.pageYOffset,
                    cH: this.el.offsetHeight               
                })),
                filter((position) => this.needLoadMore(position))
            ); 
        requestOnResize$.subscribe(() => {
            this.scrollAction.emit(null);
        });     
    }    

    needLoadMore(position){
        return ((position.sT + position.cH) / position.sH) > (this.percent/100);
    }

    
}