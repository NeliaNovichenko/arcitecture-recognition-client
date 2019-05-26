import { Style } from './style.enum';

export class ResultModel {
    id: number;
    title: string;
    description: string;
    date: Date;

    imageDate: Date;
    imageName: string;
    imagePath: string;

    style: Style;
}
