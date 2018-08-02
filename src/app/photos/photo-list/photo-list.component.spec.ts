import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {EMPTY as observableEmpty} from 'rxjs';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {PhotoListComponent} from './photo-list.component';
import {PhotoComponent} from '../photo/photo.component';
import {PhotoService} from '../shared/photo.service';


describe('PhotoListComponent', () => {
  /* Initialization */
  let component: PhotoListComponent;
  let fixture: ComponentFixture<PhotoListComponent>;

  /* Stubs definition */
  class PhotoServiceStub {
    getPhotos() {
      return observableEmpty;
    }
  }

  /* BeforeEachs definition */
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        PhotoComponent,
        PhotoListComponent
      ],
      imports: [
        InfiniteScrollModule
      ],
      providers: [
        { provide: PhotoService, useClass: PhotoServiceStub}
      ]
    }).compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(PhotoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /* Tests */
  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should load list of photos on init',  (done: DoneFn) => {
    // Set spy on PhotoService to check getPhotos function call
    const photoService = TestBed.get(PhotoService);
    spyOn(photoService, 'getPhotos').and.callFake(t => {
      return observableEmpty;
    });

    // Init component
    fixture = TestBed.createComponent(PhotoListComponent);
    component = fixture.componentInstance;
    component.keyword = 'my-keyword';
    component.page = 2;
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(photoService.getPhotos).toHaveBeenCalledWith('my-keyword', 2);
      expect(photoService.getPhotos).toHaveBeenCalledTimes(1);
      done();
    });
  });

});
