import { Directive } from '@angular/core';
import { HostListener, ElementRef } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[appInfiniteScroll]'
})
export class InfiniteScrollDirective {

  @Output() scrolled = new EventEmitter();
  constructor(private el: ElementRef) {
  }

  @HostListener('scroll')
  onScroll() {
    const currentPosition = this.el.nativeElement.offsetHeight + this.el.nativeElement.scrollTop;
    const max = this.el.nativeElement.scrollHeight;
    if ( currentPosition === max) {
      this.scrolled.emit();
    }
  }





}
