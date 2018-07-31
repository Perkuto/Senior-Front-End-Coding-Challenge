import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {PhotoListComponent} from './photos/photo-list/photo-list.component';
import {PhotoComponent} from './photos/photo/photo.component';
import {PhotoService} from './photos/shared/photo.service';
import {EMPTY as observableEmpty} from 'rxjs';
import {FormsModule} from '@angular/forms';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';


describe('AppComponent', () => {
  /* Initialization */
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

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
        AppComponent,
        PhotoComponent,
        PhotoListComponent
      ],
      imports: [
        FormsModule,
        InfiniteScrollModule
      ],
      providers: [
        { provide: PhotoService, useClass: PhotoServiceStub}
      ]
    }).compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /* Tests */
  it('should be created', () => {
    expect(component).toBeTruthy();
  });

});
