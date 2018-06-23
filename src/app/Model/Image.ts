export class Image {
    url = '';
    title = '';

    constructor(photo) {
        this.url = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}`;
        this.title = photo.title;
    }
}