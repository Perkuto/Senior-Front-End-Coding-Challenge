import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareablePhotosWallsComponent } from './shareable-photos-walls.component';

describe('ShareablePhotosWallsComponent', () => {
  let component: ShareablePhotosWallsComponent;
  let fixture: ComponentFixture<ShareablePhotosWallsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShareablePhotosWallsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShareablePhotosWallsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
