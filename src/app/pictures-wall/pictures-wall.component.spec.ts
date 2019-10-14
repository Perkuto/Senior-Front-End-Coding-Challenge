import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PicturesWallComponent } from './pictures-wall.component';

describe('PicturesWallComponent', () => {
  let component: PicturesWallComponent;
  let fixture: ComponentFixture<PicturesWallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PicturesWallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PicturesWallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
