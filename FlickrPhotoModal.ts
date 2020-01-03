export class PhotoModal {
    id: string;
    owner: string;   
    secret: string;
    server: string;
    title: string;
    farm: string;
  }
  export class FlickrPhotoModal {
    photos: {
        photo: PhotoModal[];
      };
  }