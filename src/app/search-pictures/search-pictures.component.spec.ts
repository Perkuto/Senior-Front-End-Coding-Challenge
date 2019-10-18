import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchPicturesComponent } from './search-pictures.component';

describe('SearchPicturesComponent', () => {
  let component: SearchPicturesComponent;
  let fixture: ComponentFixture<SearchPicturesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchPicturesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchPicturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
