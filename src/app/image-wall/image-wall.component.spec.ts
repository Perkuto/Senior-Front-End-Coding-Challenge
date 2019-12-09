import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageWallComponent } from './image-wall.component';

describe('ImageWallComponent', () => {
  let component: ImageWallComponent;
  let fixture: ComponentFixture<ImageWallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageWallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageWallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
