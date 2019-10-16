import { Directive } from '@angular/core';
import { HostListener, ElementRef } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';

@Directive({
  selector: '[appInfiniteScroll]'
})
export class InfiniteScrollDirective {

  @Output() scrolled = new EventEmitter();

  constructor(private el: ElementRef) {

  }



  @HostListener('window:scroll', ['$event'])
  onScroll(event) {
    console.warn(event);
    this.scrolled.emit();
  }





}
