import { Style } from './style.enum';

export class PredictionResultObject {
    [style: string]: number
}


export class PredictionResult {
    style: Style;
    probability: number;
}
