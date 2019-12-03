import { FlickrPhotoResponse } from './flickr-photo-response';

export class FlickrPhotosResponse {
  page: number;
  pages: number;
  perpage: number;
  total: number;
  photo: Array<FlickrPhotoResponse>;
}
