import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {PhotoComponent} from './photo.component';
import {PhotoService} from '../shared/photo.service';
import {Photo} from '../shared/photo';


describe('PhotoComponent', () => {
  /* Initialization */
  let component: PhotoComponent;
  let fixture: ComponentFixture<PhotoComponent>;

  /* Stubs definition */
  class PhotoServiceStub {
    getPhotoUrl() {
      return 'http://fakeUrl';
    }
  }

  /* BeforeEachs definition */
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        PhotoComponent,
      ],
      providers: [
        { provide: PhotoService, useClass: PhotoServiceStub}
      ]
    }).compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(PhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /* Tests */
  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should load photo URL on init', () => {
    // Set spy on PhotoService to check getPhotoUrl function call
    const photoService = TestBed.get(PhotoService);
    spyOn(photoService, 'getPhotoUrl').and.callFake(t => {
      return 'photoUrl';
    });
    const photo: Photo = {
      id: 1,
      title: 'my-title',
      farm: 2,
      secret: 'my-secret',
      server: 3
    };

    // Init component
    fixture = TestBed.createComponent(PhotoComponent);
    component = fixture.componentInstance;
    component.photo = photo;
    fixture.detectChanges();

    expect(photoService.getPhotoUrl).toHaveBeenCalledWith(photo);
    expect(photoService.getPhotoUrl).toHaveBeenCalledTimes(1);
    expect(component.photoUrl).toContain('photoUrl');
  });

});
