import { FlickrPhotoResponse } from './flickr-photo-response';

export interface FlickrPhotosResponse {
  page: number;
  pages: number;
  perpage: number;
  total: number;
  photo: Array<FlickrPhotoResponse>;
}
