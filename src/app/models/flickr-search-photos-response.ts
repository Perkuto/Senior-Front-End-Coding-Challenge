import { FlickrPhotosResponse } from './flickr-photos-response';

export class FlickrSearchPhotosResponse {
  stat: string;
  photos: FlickrPhotosResponse;
}
