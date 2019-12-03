import { Photo } from './photo';

export class Photos {
  page: number;
  pages: number;
  perpage: number;
  total: number;
  photo: Array<Photo>;
}
