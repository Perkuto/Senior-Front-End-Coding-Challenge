import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FlickrService } from '@services/flickr.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { SearchComponent } from './search.component';
describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  beforeEach(() => {
    const flickrServiceStub = {
      photosSearch: (keyword, photosPerPage, page) => ({ pipe: () => ({}) }),
    };
    const routerStub = {
      events: { pipe: () => ({ subscribe: () => ({}) }) },
      navigate: array => ({}),
    };
    const activatedRouteStub = {};
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [SearchComponent],
      providers: [
        { provide: FlickrService, useValue: flickrServiceStub },
        { provide: Router, useValue: routerStub },
        { provide: ActivatedRoute, useValue: activatedRouteStub },
      ],
    });
    spyOn(SearchComponent.prototype, 'initPageLoad');
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
  });
  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
  it('photoHeight defaults to: 150', () => {
    expect(component.photoHeight).toEqual(150);
  });
  it('photoWidth defaults to: 150', () => {
    expect(component.photoWidth).toEqual(150);
  });
  it('photoMargin defaults to: 10', () => {
    expect(component.photoMargin).toEqual(10);
  });
  it('toolbarMargin defaults to: 64', () => {
    expect(component.toolbarMargin).toEqual(64);
  });
  it('loading defaults to: false', () => {
    expect(component.loading).toEqual(false);
  });
  it('lastPage defaults to: 0', () => {
    expect(component.lastPage).toEqual(0);
  });
});
