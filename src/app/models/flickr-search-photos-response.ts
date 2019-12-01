import { FlickrPhotosResponse } from './flickr-photos-response';

export interface FlickrSearchPhotosResponse {
  stat: string;
  photos: FlickrPhotosResponse;
}
