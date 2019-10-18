import { Photo } from './photo';

export interface Photos {
    page: number;
    pages: number;
    perpage: number;
    total: number;
    photo: Array<Photo>;
}
