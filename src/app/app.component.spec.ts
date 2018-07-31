import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {PhotoListComponent} from './photos/photo-list/photo-list.component';
import {PhotoComponent} from './photos/photo/photo.component';
import {PhotoService} from './photos/shared/photo.service';
import {EMPTY as observableEmpty} from 'rxjs';
import {FormsModule} from '@angular/forms';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {ShareButtonModule} from '@ngx-share/button';
import {HttpClient} from '@angular/common/http';


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
  class HttpClientStub {
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
        InfiniteScrollModule,
        ShareButtonModule.forRoot()
      ],
      providers: [
        { provide: PhotoService, useClass: PhotoServiceStub},
        { provide: HttpClient, useClass: HttpClientStub}
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
